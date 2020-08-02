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
    let hidden = tf.layers.dense({
      inputShape: [INPUTS],
      units: HIDDEN,
      activation: 'sigmoid'
    });
    let output = tf.layers.dense({
      units: OUTPUTS,
      activation: 'softmax'
    });
    model.add(hidden);
    model.add(output);
    return model;
  }

  randomNormal(){
    return {
      input : tf.randomNormal([INPUTS, OUTPUTS]),
      output: tf.randomNormal([OUTPUTS, INPUTS])
    };
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
