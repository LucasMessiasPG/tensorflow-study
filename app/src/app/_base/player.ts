import { v1 as uuidV1 } from "uuid";
import random from 'random';

export default class Player{
  
  // player
  id = uuidV1();
  color: string

  // game
  mapSize: number = 0;
  position: [number, number]; // [ row, col ]
  objetive: [number, number]; // [ row, col ]
  iAmObjetive: boolean = false;
  win: boolean = false;
  lose: boolean = false;


  set row(value){ this.position[0] = value; }
  get row(){ return this.position[0] }
  
  set col(value){ this.position[1] = value; }
  get col(){ return this.position[1] }

  keyMoviments = [ "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight" ];

  constructor(color: string, mapSize: number){
    this.color = color;
    this.mapSize = mapSize;

    this.reset();
  }

  dispose(){}

  randomGaussian(min: number = -1, max: number = 1){
    return random.uniform(min, max)();
  }

  reset(){
    this.id = uuidV1();
    if(this.iAmObjetive){
      this.lose = false
    } else {
      this.win = false
    }
  }

  movement(keyPress: string){ throw new Error("not implemented")}

  
  predictMovement(){ throw new Error("not implemented") }

    
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
  randomKeyPress(){
    let index = Math.floor((this.keyMoviments.length - 0) * Math.random())
    return this.keyMoviments[index];
  }

  setObjetive([ row, col ]){
    if(!this.objetive){
      // @ts-ignore
      this.objetive = [];
      this.objetive[0] = row as number;
      this.objetive[1] = col as number;
    }
  }
}