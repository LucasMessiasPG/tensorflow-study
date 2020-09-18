import { v1 } from "uuid";
import { Moviments, Position } from "./game";

export class Player {
  id = v1();
  color: string;
  position: Position;
  win = false;
  status: "waiting" | "idle" | "winner" = "idle";
  score: number;
  moviments: number[][] = [];

  constructor(color: string, opt?: any){
    this.color = color;
  }

  async moviment(keyPress: Moviments){ throw new Error("moviment not implemented"); }

  async setPosition(position: Position){
    this.position = position;
  }

}