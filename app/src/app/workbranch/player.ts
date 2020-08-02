import NeuralNetwork from "./nn";
import { v1 as uuidV1 } from "uuid";
import { random } from "mathjs";
import _ from "lodash";


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
  maxWeigth = -Infinity;
  minWeigth = Infinity;
  oldBestPlayer = false;

  constructor(color: string, _mapSize: [number, number]){
    this.color = color;
    this.mapSize = _mapSize;
  }

  makeBrain(brain: NeuralNetwork){
    if(brain){
      // @ts-ignore
      this.brain = brain.copy();

      this.mutation();
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

  stay(row: number, column: number){
    this.position = [row, column];
  }
  
  setMutation(mutation: number){
    this.mutationRate = mutation;
  }

  mutation(){
    this.brain.mutate((value: any) => {
      if(this.mutationRate != 0 && random(0, 1) <= this.mutationRate){
        let _value =  value + random(this.minWeigth * 2, this.maxWeigth * 2);
        // if(this.debug){
        //   console.log(">", value);
        //   console.log(">>", _value);
        //   console.log(">>>", this.maxWeigth, this.minWeigth);
        // }
        return _value;
      } else {
        return value;
      }
    });
    if(this.debug) this.debug = false;
  }

  copy(opt?: any): Player{
    let {  mutationRate, debug, minWeigth, maxWeigth } = opt || {};
    let player = new Player(this.color, this.mapSize);
    player.mutationRate = mutationRate;
    player.debug = debug;
    
    if(typeof minWeigth != "undefined"){
      player.minWeigth = minWeigth;
    }

    if(typeof maxWeigth != "undefined"){
      player.maxWeigth = maxWeigth;
    }
    player.makeBrain(this.brain);
    return player
  }

  randomMoment(){
    let movement = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight"
    ]
    return movement[Math.round(Math.random() * 3)];
  }
  predictRunner(adjacents){
    console.log(adjacents);
    /*
     ___ ___ ___ ___ ___
    |___|___|___|___|___|
    |___|___|___|___|___|
    |___|___|_o_|___|___|
    |___|_o_|_>_|_o_|___|
    |___|___|_o_|___|___|
    |___|___|___|___|___|
    |___|___|___|___|___|

    > player
    o seeing tiles

    */

   let inputs = [];

   inputs[0] = adjacents[0];
   inputs[1] = adjacents[1];
   inputs[2] = adjacents[2];
   inputs[3] = adjacents[3];
   inputs[4] = 0;

   let action = this.brain.predict(inputs);
   let max = -Infinity;
   action.forEach(moveValue => {
     if(moveValue > max){
       max = moveValue;
     }
   })
   
   let indexArr = action.indexOf(max);

   let movement = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight"
  ]

   return movement[indexArr];
  }


  predictMovement(adjacent){

    let inputs = [];

    let [ y, x ] = this.position;
    let [ y2, x2 ] = this.objetive;
    let diffx = Math.pow((x - x2),2);
    let diffy = Math.pow((y - y2), 2);
    let score = diffx + diffy;

    if(this.lastBestScore > score){
      this.lastBestScore = score;
    }

    const maxDistance = Math.sqrt(Math.pow(15,2) + Math.pow(15,2));
    inputs[0] = map(x, 0, this.mapSize[0], 0 ,1);
    inputs[1] = map(y, 0, this.mapSize[0], 0 ,1);
    inputs[2] = map(x2, 0, this.mapSize[0], 0 ,1);
    inputs[3] = map(y2, 0, this.mapSize[1], 0 ,1);
    inputs[4] = adjacent[0]; // 0 || 1
    inputs[5] = adjacent[1]; // 0 || 1
    inputs[6] = adjacent[2]; // 0 || 1
    inputs[7] = adjacent[3]; // 0 || 1
    // inputs[4] = map(Math.sqrt(diffx + diffy), 0, maxDistance, 0, 1);
    // inputs[5] = map(Math.abs(x - x2), 0, this.mapSize[0], 0, 1);
    // inputs[6] = map(Math.abs(y - y2), 0, this.mapSize[1], 0, 1);


    let action = this.brain.predict(inputs);

    let max = -Infinity;
    action.forEach(moveValue => {
      if(moveValue > max){
        max = moveValue;
      }
    })

    let movement = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight"
    ]

    if(max == 4){
      return "";
    }

    let indexArr = action.indexOf(max);
    return movement[indexArr];
  }

}