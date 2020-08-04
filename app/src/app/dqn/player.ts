import { v1 as uuidV1 } from "uuid";
import * as tf from "@tensorflow/tfjs";
import _ from "lodash";
import DeepQLearning from "./dqn";
import ReplayMemory from "./replay_memory";

const REPLAY_BUFFER_SIZE = 64;
const LEARNING_RATE = 0.0001;

export default class Player{
  
  // player
  id = uuidV1();
  color: string

  // game
  mapSize: number = 0;
  position: [number, number]; // [ row, col ]
  objetive: [number, number]; // [ row, col ]
  iAmObjetive: boolean = false;
  win: boolean;
  lose: boolean;

  // dqn

  onlineNetwork: DeepQLearning;
  targetNetwork: DeepQLearning;
  optimizer: tf.AdamOptimizer;
  replayMemory: ReplayMemory;
  frameCount: number;
  cumulativeReward: number;
  epsilonDecayFrames: number;
  epsilonFinal: number;
  epsilonInit: number;
  epsilonIncrement_: number;
  epsilon: number;
  replayBufferSize: number;
  learningRate: number;

  constructor(color: string, mapSize: number){
    this.color = color;
    this.mapSize = mapSize;

    this.onlineNetwork = new DeepQLearning();
    this.targetNetwork = new DeepQLearning();
    this.targetNetwork.trainable = false;

    this.replayBufferSize = REPLAY_BUFFER_SIZE
    
    this.epsilonDecayFrames = 100000
    this.epsilonFinal = 0.01
    this.epsilonInit = 0.5
    this.epsilonIncrement_ = (this.epsilonFinal - this.epsilonInit) / this.epsilonDecayFrames;

    this.learningRate = LEARNING_RATE;
    this.optimizer = DeepQLearning.getOptimize(this.learningRate);
    this.replayMemory = new ReplayMemory()
    this.frameCount = 0;
    this.reset();
  }

  reset(){
    this.id = uuidV1();
    this.cumulativeReward = 0;
    this.frameCount = 0;
    if(this.iAmObjetive){
      this.lose = false
    } else {
      this.win = false
    }
  }

  movement(keyPress: string){ throw new Error("not implemented")}

  predictMovement(){
    if(this.frameCount >= this.epsilonDecayFrames){
      this.epsilon = this.epsilonFinal;
    } else {
      this.epsilon = this.epsilonInit + this.epsilonIncrement_  * this.frameCount;
    }
    this.frameCount++;

    let action;
    if (Math.random() < this.epsilon) {
      let max = 4 // total inputs
      let min = 0
      action = Math.floor((max - min) * Math.random());
    } else {

      let state = {
        player: [
          this.normalizeValue(this.position[0], 0, this.mapSize, 0, 1),
          this.normalizeValue(this.position[1], 0, this.mapSize, 0, 1)
        ],
        objetive: [
          this.normalizeValue(this.objetive[0], 0, this.mapSize, 0, 1),
          this.normalizeValue(this.objetive[1], 0, this.mapSize, 0, 1)
        ]
      }
      action = this.onlineNetwork.predict(this.getStateTensor(state, 15, 15));
    }

    let movement = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight"
    ]
    if(!movement[action]) throw new Error(`invalid moviment: ${action}`)
    return movement[action];
  }

  feedbackMoviment(action: string, reward: number, old_postion: [number, number]){
    let done = this.iAmObjetive ? this.lose : this.win;
    let state = {
      player: old_postion,
      objetive: this.objetive
    };
    
    let nextState = {
      player: this.position,
      objetive: this.objetive
    }
    
    this.replayMemory.append([ state , action, reward, done, nextState ]);
    this.cumulativeReward += reward;
    const output = {
      action,
      cumulativeReward: this.cumulativeReward,
      done
    };
    if(done){
      this.reset();
    }
    return output;
  }

  trainOnReplayBatch(batchSize, gamma, optimizer){

    // entender oq esta sendo feito aqui \/
    // let batch = this.replayMemory.sample(batchSize);
    // batch = batch.filter(item => item);
    // const NUM_ACTIONS = 4;
    // const lossFunction = () => tf.tidy(() => {
    //   const stateTensor = this.getStateTensor(batch.map(example => {
    //     console.log(example[1]);
    //     return example[0]
    //   }), this.mapSize, this.mapSize);
    //   const actionTensor = tf.tensor1d(batch.map(example => example[1]), 'int32');

    //   console.log(actionTensor);
    //   // @ts-ignore
    //   const qs = this.onlineNetwork.model.apply(stateTensor, {training: true}).mul(tf.oneHot(actionTensor, NUM_ACTIONS)).sum(-1);

    //   const rewardTensor = tf.tensor1d(batch.map(example => example[2]));
    //   const nextStateTensor = this.getStateTensor(batch.map(example => example[4]), this.mapSize, this.mapSize);
    //   // @ts-ignore
    //   const nextMaxQTensor =this.targetNetwork.predict(nextStateTensor).max(-1);
    //   const doneMask = tf.scalar(1).sub(tf.tensor1d(batch.map(example => example[3])).asType('float32'));
    //   const targetQs =rewardTensor.add(nextMaxQTensor.mul(doneMask).mul(gamma));
    //   return tf.losses.meanSquaredError(targetQs, qs);
    // })

    // // @ts-ignore
    // const grads = tf.variableGrads(lossFunction);
    // // Use the gradients to update the online DQN's weights.
    // optimizer.applyGradients(grads.grads);
    // tf.dispose(grads);
  }

  setObjetive([ row, col ]){
    this.objetive = [ row, col ];
  }


  normalizeValue(value: number, min: number, max: number, outMin: number, outMax: number){
    function constrain(n, low, high) {
      return Math.max(Math.min(n, high), low);
    };
    
    function map(n: any, start1: any, stop1: any, start2: any, stop2: any, withinBounds?: any) {
      var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
      if (!withinBounds) {
        return newval;
      }
      if (start2 < stop2) {
        return constrain(newval, start2, stop2);
      } else {
        return constrain(newval, stop2, start2);
      }
    };

    return map(value, min, max, outMin, outMax);
  }

  getStateTensor(state, h, w) {
    if (!Array.isArray(state)) {
      state = [state];
    }
    const numExamples = state.length;
    // TODO(cais): Maintain only a single buffer for efficiency.
    const buffer = tf.buffer([numExamples, h, w, 2]);
  
    for (let n = 0; n < numExamples; ++n) {
      if (state[n] == null) {
        continue;
      }
      
      buffer.set(1, n, state[n].player[0], state[n].player[1], 1);
      buffer.set(1, n, state[n].objetive[0], state[n].objetive[1], 1);
    }
    return buffer.toTensor();
  }

  set row(value){ this.position[0] = value; }
  get row(){ return this.position[0] }
  
  set col(value){ this.position[1] = value; }
  get col(){ return this.position[1] }

}