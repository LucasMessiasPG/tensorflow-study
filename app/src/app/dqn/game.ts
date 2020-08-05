import Player from "./player";
import Game from "../_base/game";

export default class GameDQN extends Game{

  constructor(size: number){
    super(size);
  }

  movement(player: Player, keyPress: string){
    let old_postion: [number, number] = player.position.slice() as [number, number];

    let movement = {
      "ArrowUp": { row: player.row - 1 },
      "ArrowDown": { row: player.row + 1 },
      "ArrowLeft": { col: player.col - 1 },
      "ArrowRight": { col: player.col + 1 }
    }
    let { row, col } = movement[keyPress];

    if(typeof row == "undefined") row = player.row;
    if(typeof col == "undefined") col = player.col;
    if(this.positionOnMap([row, col]) === false){
      // try move out map !!!!
      // lose ?
      return false;
    }
    this.updateMapPositionPlayer(player, [ row, col ]);
    
    let reward = this.checkWinLose(player);
    let { done } = player.feedbackMoviment(keyPress, reward, old_postion);
    // @ts-ignore
    if(process && process.env.DRAW){
      this.draw();
    }
    return done;
  }

  drawPlayerStats(player1: Player){
    if(player1){
      console.log(`id: ${player1.id}`);
      console.log(`win:`, player1.win);
      console.log(`frameCount: ${player1.frameCount}`)
      console.log(`cumulativeReward: ${player1.cumulativeReward}`)
    }
  }
}

