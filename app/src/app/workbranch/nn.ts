import * as tf from "@tensorflow/tfjs";
// @ts-ignore
window.tf = tf;
tf.setBackend('cpu');

const INPUTS = 8;
const HIDDEN = 225;
const OUTPUTS = 5;

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
      units: HIDDEN,
      activation: 'sigmoid'
    });
    let hiddenlayers = [];
    let totalHiddenLayer = 4;
    let hiddenUnits = 225;

    for(let i = 0; i < totalHiddenLayer; i++){
      hiddenlayers.push(tf.layers.dense({
        units: hiddenUnits,
        activation: 'relu'
      }));
    }

    let outputLayer = tf.layers.dense({
      units: OUTPUTS,
      activation: 'sigmoid'
    });

    model.add(inputlayer);
    hiddenlayers.forEach(layer => model.add(layer));
    model.add(outputLayer);
    return model;
  }

  copy() {

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
