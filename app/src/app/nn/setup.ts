import Game from "./game";
import Player from "./player";
import _ from "lodash";
import { ThrowStmt } from '@angular/compiler';

export default class SetupNN {
  game: Game;
  bestPlayer: Player;
  totalPlayers: number = 2;
  players1: Player[] = [];
  player2: Player;
  positionPlayer2: [number, number];
  mutationRate = 0.1

  constructor(size: number){
    this.game = new Game(size);
  }
  static start(mapSize: number = 15){
    let context = new SetupNN(mapSize)
    return context;
  }

  resetGame(){
    this.stopGame();
    this.game.reset();
  }

  stopGame(){
    this.game.stop();
  }

  startGame(){
    if(this.game.status == "playing") return ;
    this.game.reset();
    let player: Player = this.bestPlayer;
    if(!player){
      player = new Player("red", this.game.size);
    }
    this.runGame(player);
  }

  endGame(bestOldPlayer: Player){
    this.game.stop();
    if(this.game.end){
      this.game.reset();
    }
    let playersScore = [];
    
    if(this.hasWinner()){
      this.positionPlayer2 = this.game.getRandomPosition();
      playersScore = this.players1.map(p => {
        return {
          win: true,
          player: p
        }
      });
    } else {
      playersScore = [{
        player: bestOldPlayer,
        score: 1
      }];
    }

    playersScore.sort((a, b) => {
      return a.score - b.score;
    });

    this.bestPlayer = _.first(playersScore).player.fullCopy();
    this.clearListPlayer1();
    if(this.player2) this.player2.dispose();
    this.game.changeGen();
    if(bestOldPlayer.position){
      this.game.setOldBestPlayerPosition(bestOldPlayer.position)
    }
    this.runGame(this.bestPlayer)
  }

  runGame(bestPlayer: Player){
    if(this.player2) this.player2.dispose();
    this.player2 = new Player("blue", this.game.size);
    if(!this.positionPlayer2){
      this.positionPlayer2 = this.game.getRandomPosition();
    }
    this.game.newPlayer(this.player2, this.positionPlayer2);
    this.game.setObjetive(this.player2);

    if(bestPlayer.position){
      this.game.setOldBestPlayerPosition(bestPlayer.position);
    }
    let listPlayer1 = this.createListPlayers(bestPlayer.fullCopy()); 
    for(let player1 of listPlayer1){
      let position: [number, number] = [ Math.floor(this.game.size / 2), Math.floor(this.game.size / 2) ];
      this.game.newPlayer(player1, position);
    }

    this.game.start(() => this.stepFrame(bestPlayer), () => this.endGame(bestPlayer))
  }

  stepFrame(bestPlayer: Player){
    for(let player of this.players1){
      if(player.win){
        this.endGame(player);
        break;
      }
      let keyPress = player.predictMovement();
      if(keyPress){
        player.movement(keyPress);
      }
    }
    let bkpPlayer = this.players1[0].fullCopy();
    this.players1 = this.players1.filter(player => {
      if(player.lose){
        player.dispose();
      }
      return player.lose === false
    });
    
    if(!this.players1.length){
      this.players1.push(bkpPlayer);
      return this.endGame(bestPlayer);
    }
  }
  hasWinner(){
    return this.players1.some(player1 => player1.win);
  }

  clearListPlayer1(){
    if(this.players1 && this.players1.length){
      this.players1.forEach(player1 => player1.brain.dispose());
    }
    this.players1 = [];
  }

  createListPlayers(playerToCopy: Player){
    let listPlayers = [];
    for(let i = 0; i < this.totalPlayers; i++){
      listPlayers.push(playerToCopy.copy({ mutationRate: this.mutationRate }));
    }
    playerToCopy.dispose();
    this.players1 = listPlayers;
    return this.players1
  }
  
}