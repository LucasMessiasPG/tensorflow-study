import { Component, HostListener } from '@angular/core';
import Game from "./workbranch/game";
import Player from "./workbranch/player";
import _ from "lodash";
import * as randomLib from "random";

const api = "http://localhost:8081";
@Component({
  selector: 'app-root',
  templateUrl: "app.html",
  styleUrls: ["app.scss"]
})
export class AppComponent {
  title = 'app';
  game: Game;
  players1: Player[] = [];
  bestPlayer: any;
  row: number;
  col: number;
  player2: any;
  nextObjetive: number[] = [];
  playerDebug: any;
  debug: boolean;
 
  minWeigth: number = -1;
  maxWeigth: number = 1;


  totalPlayers: number = 0;
  gameSpeed: number = 100;
  gameTimeout: number = 50;

  me: Player;
  nextMovement: string = "ArrowUp";
  humanPlay = false;

  bluePositions: number[][] = [
    [0,0],
    [14,14],
    [14,0],
    [0,14],
    [-1,-1]
  ]
  positionIndex = 0;
  oldPositionIndex = 0;
  oldPosition: any = [];

  constructor(){
    this.setupGame();
  }

  setupGame(){
    if(this.game){
      this.game.stop();
    }
    this.row = 15;
    this.col = 15;
    let design = [];
    for(let i = 0; i < this.row; i++){
      design[i] = [];
      for(let j = 0; j < this.col; j++){
        design[i][j] = 1; 
      } 
    }
    
    this.game = new Game(design);

    if(this.gameSpeed){
      this.game.speed = this.gameSpeed;
    }

    if(this.gameTimeout){
      this.game.timeout = this.gameTimeout;
    }

    this.me = this.createPlayer("green");
  }

  @HostListener('window:keydown', ['$event'])
  onKeyUp(evt){
    if(evt.key.toLowerCase() == "r"){
      this.runGame(new Player("red"))
      .then(() => {
        this.game.stop();
      })
      
    } else if(evt.key.toLowerCase() == "s"){
      if(this.game.status == "waiting"){
        this.startGame();
      }if(this.game.status == "stop"){
        this.playGame(this.bestPlayer);
      } else if(this.game.status == "playing"){
        this.game.stop();
      } else {
        console.log(this.game.status);
      }
    }

    if(evt.key.toLowerCase() == "a"){
      this.humanPlay = !this.humanPlay;
    }

    let movement = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight"
    ]
    if(movement.includes(evt.code)){
      this.nextMovement = evt.code;
    }
  }

  stopGame(){
    this.game.stop();
  }

  async startGame(){
    let initialPlayer: Player = this.bestPlayer;
    if(!initialPlayer){
      initialPlayer = this.createPlayer("red");
    }
    await this.runGame(this.humanPlay ? this.me : initialPlayer);
  }

  nextPositionPlayer2(){
    this.positionIndex++;
  }

  async endGame(bestOldPlayer){
    this.game.stop();
    let playersScore = [];

    if(this.hasWinner()){
      this.nextPositionPlayer2()
      playersScore = [this.humanPlay ? this.me : void 0].concat(this.players1).filter(p => p).map(p => {
        return {
          win: true,
          player: p,
          score: p.winTime
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

    this.bestPlayer = await _.first(playersScore).player.fullCopy();
    this.clearListPlayer1();

    if(this.humanPlay && this.me.win){
      this.game.status = "training";
      await this.me.train();
      this.game.status = "stop";
    }
    // this.runGame(this.bestPlayer);
  }

  hasWinner(){
    if(this.me.win) return true;
    return this.players1.some(player1 => player1.win);
  }

  createPlayer(color: string){
    let player = new Player(color);
    player.setMapSize([this.game.map.length, this.game.map[0].length]);
    player.mutationRate = this.game.mutationRate
    player.makeBrain();
    return player;
  }

  createListPlayer1(playerToCopy: Player){
    playerToCopy.color = "red";
    let listPlayers = [];
    for(let i = 0; i < this.totalPlayers; i++){
      listPlayers.push(this.createPlayer("red"));
    }
    playerToCopy.brain.dispose();
    this.players1 = listPlayers;
    return this.players1
  }

  clearListPlayer1(){
    if(this.players1 && this.players1.length){
      this.players1.forEach(player1 => player1.brain.dispose());
    }
    this.players1 = [];
  }


  hasBestPlayer(players){
    return (players || []).some(player => player.oldBestPlayer);
  }

  setObjetive(row, col){
    this.nextObjetive = [col, row];
  }

  debugPlayer(){
    this.debug = !this.debug;
  }

  getRandomPosition(){
    return Math.round(randomLib.uniform(0, (this.game.map.length -1))());
  }

  getNextPositionPlayer2(): [number, number]{
    let player2Position: [number, number] = this.bluePositions[this.positionIndex < 4 ? this.positionIndex : 4] as [number, number];

    // random mode
    if(player2Position[0] == -1 && player2Position[1] == -1){
      player2Position = null;
      if(this.positionIndex != this.oldPositionIndex){
        this.oldPositionIndex = this.positionIndex;
        player2Position = [
          this.getRandomPosition(),
          this.getRandomPosition()
        ];
      }
    }
    if(!player2Position){
      player2Position = this.oldPosition;
    }

    if(typeof this.nextObjetive[0] != "undefined"){
      player2Position[0] = this.nextObjetive[0];
    }
    if(typeof this.nextObjetive[1] != "undefined"){
      player2Position[1] = this.nextObjetive[1];
    }

    this.oldPosition = player2Position;
    return player2Position;
  }

  createPlayer2(){
    if(this.player2) this.player2.brain.dispose();
    this.player2 = this.createPlayer("blue")
    return this.player2;
  }

  async runGame(bestPlayer?: Player){
    if(!this.humanPlay && !this.totalPlayers){
      console.log("no players");
      return ;
    }
    this.game.resetGame()
    this.game.status = "playing"

    this.newObjective();

    if(bestPlayer.position){
      this.game.setOldBestPlayerPosition(bestPlayer.position);
    }
    let players1 = this.createListPlayer1(await bestPlayer.fullCopy());
    for(let player1 of players1){
      this.game.newPlayer(player1, [ 7, 7]);
    }

    if(this.humanPlay){
      this.me = await this.me.copy();
      if(this.me){
        this.game.newPlayer(this.me, [ 7, 7 ])
      }
    }

    this.playGame(bestPlayer);
  }

  newObjective(){
    let player2 = this.createPlayer2();
    let player2Position = this.getNextPositionPlayer2();
    this.game.newPlayer(player2, player2Position);
    this.game.setObjetive(player2)
  }

  playGame(bestPlayer){
    this.game.start(async () => {
      // frame (1 second)

      if(!this.game.objetive){
        this.newObjective();
      }

      if(this.humanPlay && this.me){
        if(!this.me.position){
          this.game.newPlayer(this.me, [7,7]);
        }
        let keyPredict = this.me.predictMovement(this.nextMovement);
        // console.log(keyPredict, this.nextMovement);
        this.me.movement(this.nextMovement);
      }

      if(this.humanPlay && this.me.win){
        await this.endGame(this.me);
      } else {
        for(let player of this.players1){
          if(player.win){
            await this.endGame(player);
            break;
          }
          let keyPress = player.predictMovement();
          if(keyPress){
            player.movement(keyPress);
          }
  
        }

      }

      if(this.players1.length){
        let bkpPlayer = await this.players1[0].fullCopy();
        this.players1 = this.players1.filter(player => {
          return  player.lose === false
        });
  
        if(!this.players1.length){
          this.players1.push(bkpPlayer);
          return this.endGame(bestPlayer);
        }
      }

    }, () => this.endGame(bestPlayer))
  }
}
