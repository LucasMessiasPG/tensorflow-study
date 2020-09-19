import { Component, HostListener } from '@angular/core';
import Game from "./workbranch/game";
import Player from "./workbranch/player";
import _ from "lodash";
import * as randomLib from "random";
import DEBUG from "debug";

const Log = DEBUG("tf.app.component");

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

  async setupGame(){
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
    
    this.me = await this.createPlayer("green");
  }

  @HostListener('window:keydown', ['$event'])
  onKeyUp(evt){
    if(evt.key.toLowerCase() == "r"){
      this.runGame(this.bestPlayer)
      .then(() => {
        this.game.stop();
      })
      
    } else if(evt.key.toLowerCase() == "s"){
      if(this.game.status == "waiting"){
        this.startGame();
      }if(this.game.status == "stop"){        
        if(this.game.end){
          this.runGame(this.bestPlayer);
        } else {
          this.playGame();
        }
      } else if(this.game.status == "playing"){
        this.game.stop();
      } else {
        Log(">>>>>>>>>>>", this.game.status);
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
    await this.runGame();
  }

  nextPositionPlayer2(){
    this.positionIndex++;
  }

  async endGame(){
    this.game.stop();
    let playersScore = [];

    playersScore = [this.humanPlay ? this.me : void 0].concat(this.players1).filter(p => p).map(p => {

      let [ y, x ] = p.position;
      let [ y2, x2 ] = p.objetive;
      let diffx = Math.pow((x - x2),2);
      let diffy = Math.pow((y - y2), 2);
      
      let distance = Math.sqrt(diffx + diffy)

      return {
        win: p.win,
        player: p,
        score: distance
      }
    });

    
    playersScore.sort((a, b) => {
      return a.score - b.score;
    });

    
    Log("playersScore", playersScore);

    let winPlayer;
    if(playersScore.some(p => p.win)){
      Log("criando novo bestPlayer");
      winPlayer = playersScore.find(p => p.win);
      
      this.game.status = "training";
      await winPlayer.player.train();
      this.game.status = "stop";
      
    }

    this.bestPlayer = await (winPlayer || playersScore[0]).player.copy({ ignoreMutation: true });
    // this.game.setOldBestPlayerPosition(this.bestPlayer.position);

    if(this.hasWinner()){
      this.nextPositionPlayer2()
    }

    this.clearListPlayer1();
  }

  hasWinner(){
    if(this.me.win) return true;
    return this.players1.some(player1 => player1.win);
  }

  async createPlayer(color: string){
    let player = new Player(color);
    player.setMapSize([this.game.map.length, this.game.map[0].length]);
    // Log("this.game.mutationRate", this.game.mutationRate);
    player.mutationRate = this.game.mutationRate
    await player.makeBrain(null, { ignoreMutation: true });
    return player;
  }

  async createListPlayer1(playerToCopy: Player){
    let listPlayers = [];
    for(let i = 0; i < this.totalPlayers; i++){
      let p = await playerToCopy.copy()
      p.color = "red";
      listPlayers.push(p);
    }
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
    this.nextObjetive = [row, col];
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

  async createPlayer2(){
    if(this.player2) this.player2.brain.dispose();
    this.player2 = await this.createPlayer("blue")
    return this.player2;
  }

  async runGame(bestPlayer?: Player){

    if(!bestPlayer) {
      bestPlayer = await this.createPlayer("red");
    }

    if(!this.humanPlay && !this.totalPlayers){
      Log("no players");
      return ;
    }
    this.game.resetGame()
    this.game.status = "playing"

    await this.newObjective();

    if(bestPlayer.position){
      this.game.setOldBestPlayerPosition(bestPlayer.position);
    }
    
    let players1 = await this.createListPlayer1(bestPlayer);
    for(let player1 of players1){
      this.game.newPlayer(player1, [ 7, 7]);
    }

    if(this.humanPlay){
      console.log(this.bestPlayer || this.me);
      this.me = await (this.bestPlayer || this.me).copy({ ignoreMutation: true });
      this.me.color = "green";
      if(this.me){
        this.game.newPlayer(this.me, [ 7, 7 ])
      }
    }

    this.playGame();
  }

  async newObjective(){
    let player2 = await this.createPlayer2();
    let player2Position = this.getNextPositionPlayer2();
    this.game.newPlayer(player2, player2Position);
    this.game.setObjetive(player2)
  }

  playGame(){
    this.game.start(async () => {
      // frame (1 second)

      if(!this.game.objetive){
        await this.newObjective();
      }

      if(this.humanPlay && this.me){
        if(!this.me.position){
          this.game.newPlayer(this.me, [7,7]);
        }
        let keyPredict = this.me.predictMovement(this.nextMovement);
        // Log(keyPredict, this.nextMovement);
        this.me.movement(this.nextMovement);
      }

      // if(this.humanPlay && this.me.win){
      //   await this.endGame(this.me);
      // } else {

      if(this.game.end === false){
        for(let player of this.players1){
          let keyPress = player.predictMovement();
          if(keyPress){
            player.movement(keyPress);
          }
        }
      }

      if(this.game.end === true) {
        return this.endGame();
      }

    }, () => this.endGame())
  }
}
