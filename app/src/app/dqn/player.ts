
import * as tf from "@tensorflow/tfjs";
import ReplayMemory from "./replay_memory";
import DeepQLearning from "./dqn";

import Player from "../_base/player";

const REPLAY_BUFFER_SIZE = 64;
const LEARNING_RATE = 0.0001;

export default class PlayerDQN extends Player {

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
        super(color, mapSize)
    }

    init(){
        
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
    }

    reset(){
        this.cumulativeReward = 0;
        this.frameCount = 0;
    }

    
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

    if(!this.keyMoviments[action]) throw new Error(`invalid moviment: ${action}`)
    return this.keyMoviments[action];
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
    let batch = this.replayMemory.sample(batchSize);
    batch = batch.filter(item => item);
    const NUM_ACTIONS = 4;
    const lossFunction = () => tf.tidy(() => {
      const stateTensor = this.getStateTensor(batch.map(example => {
        console.log(example[1]);
        return example[0]
      }), this.mapSize, this.mapSize);
      const actionTensor = tf.tensor1d(batch.map(example => example[1]), 'int32');

      console.log(actionTensor);
      // @ts-ignore
      const qs = this.onlineNetwork.model.apply(stateTensor, {training: true}).mul(tf.oneHot(actionTensor, NUM_ACTIONS)).sum(-1);

      const rewardTensor = tf.tensor1d(batch.map(example => example[2]));
      const nextStateTensor = this.getStateTensor(batch.map(example => example[4]), this.mapSize, this.mapSize);
      // @ts-ignore
      const nextMaxQTensor =this.targetNetwork.predict(nextStateTensor).max(-1);
      const doneMask = tf.scalar(1).sub(tf.tensor1d(batch.map(example => example[3])).asType('float32'));
      const targetQs =rewardTensor.add(nextMaxQTensor.mul(doneMask).mul(gamma));
      return tf.losses.meanSquaredError(targetQs, qs);
    })

    // @ts-ignore
    const grads = tf.variableGrads(lossFunction);
    // Use the gradients to update the online DQN's weights.
    optimizer.applyGradients(grads.grads);
    tf.dispose(grads);
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
}