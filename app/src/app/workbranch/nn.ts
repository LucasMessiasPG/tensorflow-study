import DEBUG from "debug";
import * as tf from "@tensorflow/tfjs";
// @ts-ignore
window.tf = tf;
// tf.setBackend('cpu');

const Log = DEBUG("tf.nn");

const INPUTS = 4;
const NODES = 64;
const OUTPUTS = 1;
const EPOCHS = 30;
const BATCH = 1;

export default class NeuralNetwork{

  model: tf.Sequential;
  constructor(nn?: any){
    if(nn){
      this.model = nn;
    } else {
      this.model = NeuralNetwork.createModel();
    }
    
  }

  static createModel(){
    const model = tf.sequential();
    let inputlayer = tf.layers.dense({
      inputShape: [INPUTS],
      units: NODES,
      activation: 'relu'
    });
    let hiddenlayers = [];
    let totalHiddenLayer = 16;
    let nodes = NODES;

    for(let i = 0; i < totalHiddenLayer; i++){
      hiddenlayers.push(tf.layers.dense({
        units: nodes,
        activation: 'relu'
      }));
    }

    let outputLayer = tf.layers.dense({
      units: OUTPUTS,
      activation: 'relu'
    });

    model.add(inputlayer);
    hiddenlayers.forEach(layer => model.add(layer));
    model.add(outputLayer);
    model.compile({ optimizer: "adam", loss: tf.losses.meanSquaredError, metrics: 'mse' })
    return model;
  }

  dispose() {
    this.model.dispose();
  }

  async train(history: any[]){
    Log({history});
    let X = history.map(h => h.slice(0,4))
    let y = history.map(h => h.slice(4))

    Log("treinando");
    await this.model.fit(tf.tensor2d(X,[X.length,4]), tf.tensor2d(y,[y.length,1]),  {
      epochs: EPOCHS,
      batchSize: BATCH,
      // callbacks: {onBatchEnd}
    })
    .then(() => {
      let predictY = this.model.predict(tf.tensor2d(X,[X.length,4]));
      //@ts-ignore
      let y = predictY.dataSync(); 
      Log("y =", y);
    })
    .catch(err => {
      Log("ERROR -> " , err);
    })

  }

  async copy() {
    
    // @ts-ignore
    return tf.tidy(() => {
      const modelCopy = NeuralNetwork.createModel();
      const w = this.model.getWeights();
      for (let i = 0; i < w.length; i++) {
        w[i] = w[i].clone();
      }
      
      modelCopy.setWeights(w);
      
      const nn = new NeuralNetwork(modelCopy);
      return nn;
    });
  }

  mutate(func) {
    tf.tidy(() => {
      const w = this.model.getWeights();
      for (let i = 0; i < w.length; i++) {
        let shape = w[i].shape;
        let arr = w[i].dataSync().slice();
        for (let j = 0; j < arr.length; j++) {
          arr[j] = func(arr[j]);
        }
        let newW = tf.tensor(arr, shape);
        w[i] = newW;
      }
      this.model.setWeights(w);
    });
  }

  predict(input_array) {
    // console.log(input_array);
    return tf.tidy(() => {
      let xs = tf.tensor([input_array]);
      let ys = this.model.predict(xs);

      // @ts-ignore
      let y_values = ys.dataSync();
      return y_values;
    });
  }
}
