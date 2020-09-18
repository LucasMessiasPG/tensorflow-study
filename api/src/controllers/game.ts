import { v1 } from "uuid";
import { Player } from "./player";

export type Moviments = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
export type Position = [ number, number ];

export class Game{

  id = v1()
  status: "idle" | "stoped" | "playing" | "training" | "end" = "idle"
  players = new Map()
  target: Position
  time = 0
  sizeMap: number = 15
  winner: Player
  timeout = 20;

  moviments: Moviments[] = [
    "ArrowUp",
    "ArrowDown",
    "ArrowRight",
    "ArrowLeft"
  ];

  constructor(target: Position, opt?: { sizeMap: number }){
    if(target[0] >= opt.sizeMap || target[1] >= opt.sizeMap){
      throw new Error(`target out range of map: sizeMap ${opt.sizeMap} - target ${target}`)
    }
    this.target = target;
    this.sizeMap = opt.sizeMap;
  }

  getPlayer(id: string){
    return this.players.get(id);
  }

  registerPlayer(player: Player, position: Position){
    player.moviment = (keyPress: Moviments) => {
      return this.actionMoviment(player, keyPress);
    };
    player.setPosition = (position: Position) => {
      return this.actionSetPlayerPosition(player, position)
    }
    player.setPosition(position);
  }

  async actionMoviment(player: Player, keyPress: Moviments){
    if(!player.position) throw new Error(`player ${player.color}: not has a valid position`);
    let [ row, col ] = player.position;

    switch(keyPress){
      case "ArrowUp":
        col--;
        break;
      case "ArrowDown":
        col++;
        break;
      case "ArrowLeft":
        row--;
        break;
      case "ArrowRight":
        row++;
        break;
      default: 
        throw new Error(`${keyPress} is not a valid moviment`);
    }
    if(row < 0 || col < 0 || row >= this.sizeMap || col >= this.sizeMap){
      return player.setPosition(player.position);
    }
    await player.setPosition([row, col]);
  }

  async actionSetPlayerPosition(player: Player, position: Position){
    player.status = "waiting";
    player.position = position;

    if(this.players.has(player.id)){
      this.players.delete(player.id);
    }

    this.players.set(player.id, player);

    if(this.hitTarget(player)){
      await this.setWinnier(player);
    } else {
      if(this.timeout <= this.time){
        this.allLose();
      // } else if(this.finishAllMoviments()){
        // this.nextStep();
      }
    }
  }


  hitTarget(player: Player){
    let [ row_player, col_player ] = player.position;
    let [ row_target, col_target ] = this.target;
    return  row_player == row_target && col_player == col_target;
  }

  async setWinnier(player: Player){
    player.win = true;
    player.status = "winner";
    this.status = "end";
    this.winner = player;
  }

  allLose(){
    this.status = "end";
    for(let [ _, player] of Array.from(this.players)){
      player.status = "idle";
    }
  }
}