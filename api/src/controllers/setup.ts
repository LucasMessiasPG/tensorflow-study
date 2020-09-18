import { Game, Position } from "./game";
import { Player } from "./player";
import { terminal as term } from "terminal-kit";

export class Setup{

  sizeMap: number = 15;
  game: Game;
  rounds: number = 0;

  constructor({ sizeMap }: { sizeMap?: number} ){
    this.sizeMap = sizeMap;
    this.game = new Game([0 , 0], { sizeMap });
  }

  newGame(opt: { target: Position }){
    this.rounds++;
    this.game = new Game(opt.target, { sizeMap: this.sizeMap });
  }

  createPlayer(color, opt: { position: Position }){
    let player = new Player(color , opt);
    this.game.registerPlayer(player, opt.position)
    return player;
  }

  getPlayer(id: string) {
    return this.game.getPlayer(id);
  }

  async step(fnStep: Function, fnEnd?: Function){
    this.game.time++;
    this.game.status = "playing";
    
    await fnStep(this.game.time);

    // @ts-ignore
    if(this.game.status == "end"){
      return fnEnd();
    }

    return this.step(fnStep, fnEnd);
  }

}