import * as tf from "@tensorflow/tfjs";
import * as _ from "lodash";

const INPUTS = 4;
const HIDDEN = 2;
const OUTPUTS = 4;

export default class DeepQLearning{
  model: tf.Sequential;
  trainable: boolean = true;

  constructor(dqn?: tf.Sequential){
    if(dqn){
      this.model = dqn;
    } else {
      this.model = DeepQLearning.createModel()
    }
  }

  static createModel(){
    const model = tf.sequential();
    model.add(tf.layers.conv2d({
      filters: 128,
      kernelSize: 3,
      strides: 1,
      activation: "relu",
      inputShape: [15, 15, 2]
    }));

    for(let i = 0; i < HIDDEN; i++){
      model.add(tf.layers.batchNormalization());
      model.add(tf.layers.conv2d({
        filters: 256,
        kernelSize: 3,
        strides: 1,
        activation: "relu"
      }));
    }
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({
      units: 100,
      activation: "relu"
    }));

    model.add(tf.layers.dropout({ rate: 0.25 }));
    model.add(tf.layers.dense({ units: OUTPUTS }));
    return model;
  }

  static getOptimize(learningRate): tf.AdamOptimizer{
    return tf.train.adam(learningRate);
  }


  copy(): DeepQLearning {
    // @ts-ignore
    return tf.tidy(() => {
      const modelCopy = DeepQLearning.createModel();
      const w = this.model.getWeights();
      for (let i = 0; i < w.length; i++) {
        w[i] = w[i].clone();
      }
      modelCopy.setWeights(w);
      return new DeepQLearning(modelCopy);
    });
  }

  predict(stateTensor: any){
    return tf.tidy(() => {
      let ys: any = this.model.predict(stateTensor);
      let outputs = ys.dataSync();
      return _.indexOf(outputs, _.max(outputs));
    });
  }
}