import * as tf from "@tensorflow/tfjs";
import Player from "./player";
import Game from "./game";
import fs from "fs";
import path from "path";

const BACTH_SIZE = 64;
const GAMMA = 0.99; // Reward discount rate
const SAVE_PATH = path.resolve(__dirname, "./models/dqn");
const SYNC_EVERY_FRAMES = 1000 // Frequency at which weights are sync'ed from the online network to the target network.

const MAP_SIZE = 5;

class MovingAverager {
  buffer: any[];
  constructor(bufferLength) {
    this.buffer = [];
    for (let i = 0; i < bufferLength; ++i) {
      this.buffer.push(null);
    }
  }

  append(x) {
    this.buffer.shift();
    this.buffer.push(x);
  }

  average() {
    return this.buffer.reduce((x, prev) => x + prev) / this.buffer.length;
  }
}

export default class Train {
  player: Player;
  game: Game;
  stop: boolean;

  constructor(player?: Player, game?: Game, opt?: any){
    let { objetive, mapSize = MAP_SIZE } = opt || {};

    this.initGame();
    this.start();
  }

  initGame(){
    console.log("reset game");
    if(!this.game){
      this.game = new Game(MAP_SIZE);
    }
    this.game.resetGame();
    this.player = new Player("red", MAP_SIZE);
    let player2 = new Player("blue", MAP_SIZE);
    
    this.game.setObjetive(player2);

    this.game.newPlayer(player2, this.game.getRandomPosition());
    this.game.newPlayer(this.player, this.game.getRandomPosition());
  }

  stopAction(){
    console.log("stop");
    throw "stop";
  }

  async start(){
    console.log(1);
    for(let i = 0; i < this.player.replayBufferSize; ++i){
      if(this.stop) this.stopAction();
      this.playStep(true);
    }

    const rewardAverager100 = new MovingAverager(100);
    const optimizer = tf.train.adam(this.player.learningRate);
    let tPrev = new Date().getTime();
    let frameCountPrev = this.player.frameCount;
    let averageReward100Best = -Infinity;

    
    console.log(2);
    while(true){
      if(this.stop) this.stopAction();
      this.player.trainOnReplayBatch(BACTH_SIZE, GAMMA, optimizer);
      let done = this.playStep();
      if(this.player.iAmObjetive) throw new Error("TODO: implement objetive train");
      if(done){
        this.initGame();
        const t = new Date().getTime();
        const framesPerSecond = (this.player.frameCount - frameCountPrev) / (t - tPrev) * 1e3;
        tPrev = t;
        frameCountPrev = this.player.frameCount;

        rewardAverager100.append(this.player.cumulativeReward);
        const averageReward100 = rewardAverager100.average();

        console.log(
          `Frame #${this.player.frameCount}: ` +
          `cumulativeReward100=${averageReward100.toFixed(1)}; ` +
          `(epsilon=${this.player.epsilon}) ` +
          `(${framesPerSecond.toFixed(1)} frames/s)`);

        if (averageReward100 >= 100 || this.player.frameCount >= 1000000) {
          break;
        }

        if(averageReward100 > averageReward100Best){
          averageReward100Best = averageReward100; 

          if (!fs.existsSync(SAVE_PATH)) {
            fs.mkdirSync(SAVE_PATH);
          }
          await this.player.onlineNetwork.model.save(`file://${SAVE_PATH}`);
          console.log(`Saved DQN to ${SAVE_PATH}`);
        }
      }

      if (this.player.frameCount % SYNC_EVERY_FRAMES === 0) {
        this.player.targetNetwork = this.player.onlineNetwork.copy()
        console.log('Sync\'ed weights from online network to target network');
      }
    }
  }

  playStep(random?){
    let keyPress = this.player.predictMovement(random);
    return this.game.movement(this.player, keyPress);
  }
}

// @ts-ignore
if(process.env.START_TRAIN){
  new Train();
}