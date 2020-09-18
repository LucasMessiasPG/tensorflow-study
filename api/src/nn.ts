import * as tf from "@tensorflow/tfjs";
import * as _ from "lodash";
import { Moviments } from "./controllers/game";

const INPUTS = 4;
const NODES = 64;
const HIDDEN_LAYERS = 16;
const OUTPUTS = 4;

const EPOCHS = 60;
const BATCH = 1;

export class NeuralNetwork{

  sizeMap: number;
  model: tf.Sequential;
  mutationRate: number = 0.9;

  constructor({ sizeMap, model }: { sizeMap: number, model?: tf.Sequential}){
    this.sizeMap = sizeMap;
    if(model){
      this.model = model;
    } else {
      this.model = NeuralNetwork.createModel();
    }
  }

  static createModel(){
    let model = tf.sequential();

    model.add(tf.layers.dense({
      inputShape: [INPUTS],
      units: NODES,
      activation: "relu"
    }));


    for(let i = 0; i < HIDDEN_LAYERS; i++){
      model.add(tf.layers.dense({
        units: NODES,
        activation: 'relu'
      }));
    }

    model.add(tf.layers.dense({
      units: OUTPUTS,
      activation: "relu"
    }));

    model.compile({ optimizer: "adam", loss: tf.losses.meanSquaredError, metrics: 'mse' })
    return model;
  }

  async train(moviments: number[][]){

    const onEpochEnd = function(epoch: number, logs: any){
      console.log(`epoch: ${epoch} - loss: ${logs.loss} - mse: ${logs.mse}`);
    }

    let X = moviments.map(h => h.slice(0,4))
    let y = moviments.map(h => h.slice(4)[0])

    console.log("train", { X, y });

    console.log(y)
    let X_train = tf.tensor2d(X, [X.length, 4]);
    let y_train = tf.tensor2d(y,[y.length, 4]);
    
    await this.model.fit(X_train, y_train, {
      epochs: EPOCHS,
      batchSize: BATCH,
      callbacks: {
        onEpochEnd
      }
    })
    .catch(console.error)

    let predict = this.model.predict(X_train)
    // @ts-ignore
    predict = predict.dataSync();
    console.log({ X, y, predict })
  }

  copy(opt?: any): NeuralNetwork{
    let { mutate } = opt || { mudate: false};
    let _copy = () => {
      const modelCopy = NeuralNetwork.createModel();
      modelCopy.setWeights(this.model.getWeights(true));
      
      const nn = new NeuralNetwork({ sizeMap: this.sizeMap, model: modelCopy});
      if(mutate){
        nn.mutate();
      }
      return nn;
    }


    // @ts-ignore
    return tf.tidy(_copy);
  }

  dispose(){
    this.model.dispose();
  }

  mutate() {
    tf.tidy(() => {
      const w = this.model.getWeights();
      for (let i = 0; i < w.length; i++) {
        let shape = w[i].shape;
        let arr = w[i].dataSync().slice();
        for (let j = 0; j < arr.length; j++) {
          
          let rng = _.first(tf.randomUniform([1],-1,1).dataSync());
          let mutate = _.first(tf.randomUniform([1],0,1).dataSync());
          
          if(this.mutationRate > mutate){
            arr[j] = arr[j] + rng;
          }
        }
        let newW = tf.tensor(arr, shape);
        w[i] = newW;
      }
      this.model.setWeights(w);
    });
  }

  predict(inputsArr: any[]) {

    return tf.tidy(() => {
      let xs = tf.tensor([inputsArr]);
      let ys = this.model.predict(xs);
      // @ts-ignore
      let predictMoviments = ys.dataSync();
      return _.indexOf(predictMoviments, _.max(predictMoviments));
    });
  }

  map(n: any) {
    let start1 = 0;
    let stop1 = this.sizeMap;
    let start2 = 0;
    let stop2 = 1;
    
    var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    return newval;
  };
}