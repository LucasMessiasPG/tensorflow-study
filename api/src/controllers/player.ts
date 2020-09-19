import { v1 } from "uuid";
import { Movements, Position } from "./game";

export class Player {
  id = v1();
  color: string;
  position: Position;
  win = false;
  status: "waiting" | "idle" | "winner" = "idle";
  score: number;
  movements: number[][] = [];

  constructor(color: string, opt?: any){
    this.color = color;
  }

  async movement(keyPress: Movements){ throw new Error("movement not implemented"); }

  async setPosition(position: Position){
    this.position = position;
  }

}