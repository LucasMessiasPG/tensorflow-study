import _ from "lodash";
import DEBUG from "debug";
import * as tf from "@tensorflow/tfjs";
// @ts-ignore
window.tf = tf;
// tf.setBackend('cpu');

const Log = DEBUG("tf.nn");

const INPUTS = 5;
const NODES = 64;
const OUTPUTS = 4;
const EPOCHS = 20;
const BATCH = 1;

export default class NeuralNetwork{

  model: tf.Sequential;
  training = false;
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
      activation: 'sigmoid'
    });
    
    let hiddenlayers = [];
    let totalHiddenLayer = 0;
    let nodes = NODES;

    

    for(let i = 0; i < totalHiddenLayer; i++){
      hiddenlayers.push(tf.layers.dense({
        units: nodes,
        activation: 'sigmoid'
      }));
      // hiddenlayers.push(tf.layers.leakyReLU())
      hiddenlayers.push(tf.layers.dropout({ rate:0.1 }))

    }

    let outputLayer = tf.layers.dense({
      units: OUTPUTS,
      activation: 'softmax'
    });


    model.add(inputlayer);
    model.add(tf.layers.dropout({ rate:0.1 }))
    hiddenlayers.forEach(layer => model.add(layer));
    model.add(outputLayer);
    model.compile({ optimizer: "adam", loss: tf.losses.sigmoidCrossEntropy, metrics: 'accuracy' })
    return model;
  }

  dispose() {
    this.model.dispose();
  }

  onEpochEnd(epoch, logs){
    // Log({ epoch, logs });
    Log(`epoch: ${epoch} - loss: ${logs.loss} - acc: ${logs.acc}`)
  }

  async train(history: any[]){
    
    Log({ history })
    let X = history.map(h => h.slice(0,5))
    let y = history.map(h => h.slice(5))
    Log({X, y});
    Log("treinando");
    this.training = true;
    await this.model.fit(tf.tensor2d(X,[X.length,5]), tf.tensor2d(y,[y.length,4]),  {
      epochs: EPOCHS,
      batchSize: BATCH,
      callbacks: { onEpochEnd: this.onEpochEnd }
    })
    .then(() => {
      let predictY = this.model.predict(tf.tensor2d(X,[X.length,5]));
      //@ts-ignore
      let y = predictY.dataSync(); 
      Log("y =", _.chunk(y, 4));
    })
    .catch(err => {
      Log("ERROR -> " , err);
    })
    .then(() => {
      this.training = false;
    })

  }

  async copy(color: string) {
    
    // @ts-ignore
    return tf.tidy(() => {
      const modelCopy = NeuralNetwork.createModel();
      
      const w = this.model.getWeights();
      // let sumW = tf.tensor(0)
      // for (let i = 0; i < w.length; i++) {
      //   w[i] = w[i].clone();
      //   sumW = sumW.add(w[i].sum());
      // }
    
      // Log(`w ${color}:`, sumW.dataSync());
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
        let arr = w[i].clone().dataSync().slice();
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
      return ys.dataSync();
    });
  }
}
