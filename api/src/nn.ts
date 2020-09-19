import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import * as _ from "lodash";
import { Movements } from "./controllers/game";

const INPUTS = 4;
const NODES = 64;
const HIDDEN_LAYERS = 1;
const OUTPUTS = 1;

const EPOCHS = 15;
const BATCH = 4;

let history: any[] = []; 
let historyBatch: any[] = []; 

export class NeuralNetwork{

  sizeMap: number;
  model: tf.Sequential;
  mutationRate: number = 0.5;
  seed = 0;

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
      // activation: "sigmoid"
      activation: "relu6"
    }));


    for(let i = 0; i < HIDDEN_LAYERS; i++){
      model.add(tf.layers.dense({
        units: 16,
        // activation: 'sigmoid'
        activation: 'relu6'
      }));
    }

    model.add(tf.layers.dense({
      units: OUTPUTS,
      activation: "relu6"
    }));

    model.compile({ optimizer: "sgd", loss: tf.losses.meanSquaredError, metrics: 'mse' })
    return model;
  }

  async train(movements: number[][]){
    const onEpochEnd = function(epoch: number, logs: any){
      history = history.slice(-1000);
      history.push(logs);
      console.log(`epoch: ${epoch} - loss: ${logs.loss} - mse: ${logs.mse}`);
      tfvis.show.history({ name: 'onEpochEnd', tab: 'Training' }, history, ['loss', 'mse']);
    }

    let X = movements.map(h => h.slice(0,4))
    let y = movements.map(h => h.slice(4))

    console.log("train", { X, y });

    console.log(y)
    let X_train = tf.tensor2d(X, [X.length, 4]);
    let y_train = tf.tensor2d(y,[y.length, 1]);
    
    await this.model.fit(X_train, y_train, {
      epochs: EPOCHS,
      batchSize: BATCH,
      // callbacks:  tfvis.show.fitCallbacks({ name: 'train', tab: 'Training' }, ['loss', 'acc'])
      callbacks: {
        onEpochEnd: onEpochEnd,
        onBatchEnd: function(batch: any, logs: any){
          history = history.slice(-1000);
          historyBatch.push(logs);
        }
      }
    })
    .catch(console.error)
    // tfvis.show.history({ name: 'onBatchEnd', tab: 'Training' }, historyBatch, ['loss', 'acc']);

    let predict = this.model.predict(X_train)
    // @ts-ignore
    predict = predict.dataSync();
    console.log({ X, y, predict })
  }

  copy(opt?: any): NeuralNetwork{
    let { mutate } = opt || { mudate: false};
    let _copy = () => {
      const modelCopy = NeuralNetwork.createModel();
      // modelCopy.setWeights(this.model.getWeights());

      const w = this.model.getWeights();
      for (let i = 0; i < w.length; i++) {
        w[i] = w[i].clone();
      }
      modelCopy.setWeights(w);

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
      // console.log("inputsArr", inputsArr);
      let xs = tf.tensor([inputsArr]);
      let ys = this.model.predict(xs);
      // @ts-ignore
      let predictMovements = _.first(ys.dataSync());
      // console.log("predict movement", predictMovements);
      // return _.indexOf(predictMovements, _.max(predictMovements));
      let index = Math.round(+predictMovements);
      if(index > 3) {
        index = 3;
      }
      if(index < 0){
        index = 0;
      }
      return index;
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

  randomIndexMovement(): number{
    if(this.seed > 999999999){
      this.seed = 0;
    }
    let number = _.first(tf.randomUniform([1],0,3, "float32", this.seed++).dataSync());
    let decimal = number - Math.floor(number);
    // decimal = 0.50 -> 1
    // if(decimal > 0.4 && decimal < 0.500){
    //   console.log("!!! aconteceu")
    //   // return this.randomIndexMovement();
    //   return Math.ceil(number);
    // }
    return Math.round(number);
  }
  
}