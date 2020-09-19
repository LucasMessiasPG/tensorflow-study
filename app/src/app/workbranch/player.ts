import NeuralNetwork from "./nn";
import { v1 as uuidV1 } from "uuid";
import { random } from "mathjs";
import _ from "lodash";
import * as randomLib from "random";
import { create, all } from 'mathjs'
import { mod } from '@tensorflow/tfjs';
import * as tf from "@tensorflow/tfjs";
import DEBUG from "debug";

const config = { }
const math = create(all, config)

const Log = DEBUG("tf.player");

function randomG(v){ 
  var r = 0;
  for(var i = v; i > 0; i --){
      r += Math.random();
  }
  return r / v;
}

function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
};


/*
  https://p5js.org/reference/#/p5/map
*/
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

export default class Player{
  
  position: [number, number];
  color: string
  brain: NeuralNetwork;
  mapSize: [number, number];
  id = uuidV1()
  objetive: number[];
  lastBestScore: number = 1000;
  lose: boolean = false;
  win: boolean = false;
  winTime: number;
  iAmObjetive: boolean = false;
  mutationRate: number = 0.1
  debug: any = false;  
  maxWeigth = 1;
  minWeigth = -1;
  oldBestPlayer = false;
  historyMovement = [];

  constructor(color: string){
    this.color = color;
  }

  setMapSize(mapSize: [number, number]){
    this.mapSize = mapSize;
  }

  get row(){
    return this.position[0];
  }
  
  set row(value){
    this.position[0] = value;
  }

  get col(){
    return this.position[1];
  }
  
  set col(value){
    this.position[1] = value;
  }

  async makeBrain(brain?: NeuralNetwork, opt?: any){
    let { ignoreMutation = false, history } = opt || {};
    if(brain){
      // @ts-ignore
      this.brain = await brain.copy(this.color);
      if(!ignoreMutation){
        this.mutation();
      }
    } else {
      this.brain = new NeuralNetwork();
    }
  }

  setObjetive(row:number, col:number){
    this.objetive = [row, col];
  }

  movement(keyPress: string){
    throw new Error("not implemented");
  }
  
  setMutation(mutation: number){
    this.mutationRate = mutation;
  }

  mutation(){
    this.brain.mutate((value: any) => {
      if(this.mutationRate != 0 && random(0, 1) <= this.mutationRate){
        let _value =  value + randomLib.uniform(-1,1)();
        return _value;
      } else {
        return value;
      }
    });
  }

  async copy(opt?: any): Promise<Player>{
    let {  mutationRate, debug, minWeigth, maxWeigth, ignoreMutation } = opt || {};
    let player = new Player(this.color);
    player.setMapSize(this.mapSize);
    player.mutationRate = mutationRate || this.mutationRate;
    player.debug = debug;
    
    if(typeof minWeigth != "undefined"){
      player.minWeigth = minWeigth;
    }

    if(typeof maxWeigth != "undefined"){
      player.maxWeigth = maxWeigth;
    }

    await player.makeBrain(this.brain, { ignoreMutation });
    return player
  }

  values = new Map()
  count = 0

  randomMovement(){
    let movement = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight"
    ]
    // let randomMove = Math.round(Math.random() * 3)
    // let randomMove = Math.round(randomLib.uniform(0, 3)())
    //@ts-ignore
    let randomMove = Math.round(tf.randomUniform([1],0,3).dataSync())
    let value = 0
    
    if (this.values.has(randomMove)) {
      
      value = this.values.get(randomMove)
    }
    value++
    this.count++
    this.values.set(randomMove,value)
    if (this.count % 50 == 0) console.log(Array.from(this.values))
    return movement[randomMove];
  }

  predictMovement(forceMovement?: string){
    let inputs = [];

    let [ y, x ] = this.position;
    let [ y2, x2 ] = this.objetive;
    let diffx = Math.pow((x - x2),2);
    let diffy = Math.pow((y - y2), 2);
    // let score = diffx + diffy;

    // if(this.lastBestScore > score){
      // this.lastBestScore = score;
    // }

    const maxDistance = Math.sqrt(Math.pow(15,2) + Math.pow(15,2));
    inputs[0] = map(x, 0, this.mapSize[0], 0 ,1);
    inputs[1] = map(y, 0, this.mapSize[1], 0 ,1);
    inputs[2] = map(x2, 0, this.mapSize[0], 0 ,1);
    inputs[3] = map(y2, 0, this.mapSize[1], 0 ,1);

    // inputs[4] = adjacent[0]; // 0 || 1
    // inputs[5] = adjacent[1]; // 0 || 1
    // inputs[6] = adjacent[2]; // 0 || 1
    // inputs[7] = adjacent[3]; // 0 || 1
    inputs[4] = map(Math.sqrt(diffx + diffy), 0, maxDistance, 0, 1);
    // inputs[5] = map(Math.abs(x - x2), 0, this.mapSize[0], 0, 1);
    // inputs[6] = map(Math.abs(y - y2), 0, this.mapSize[1], 0, 1);

    
    let movement = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight"
    ]
    
    let key: string = forceMovement;
    
    if(!key){
      let actions = this.brain.predict(inputs);
      
      let maxAction = _.max(actions);
      let indexAction = _.indexOf(actions, maxAction);

      // Log(`predict actions: ${actions} - maxAction: ${maxAction} - indexAction: ${indexAction}`)
      if (Math.random() < 0.0) {
        Log("random movement");
        key = this.randomMovement()
      } else {
        key = movement[indexAction];
      }  
    }


    let indexMovement = movement.indexOf(key);
    this.historyMovement.push([
      inputs[0], 
      inputs[1], 
      inputs[2], 
      inputs[3], 
      inputs[4],
      // indexMovement+1
    ].concat(_.range(4).map(number => number === indexMovement ? 1 : 0)))

    return key;
  }

  train(){
    return this.brain.train(this.historyMovement);
  }

}