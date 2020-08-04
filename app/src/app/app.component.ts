import { Component, HostListener } from '@angular/core';
import Train from "./dqn/train";
import Game from "./dqn/game";
import Player from "./dqn/player";

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
  totalPlayers: number = 50;

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
  train: Train;

  constructor(){
    this.setupGame();
  }

  setupGame(){
    console.log("start");
    let mapSize = 15;
    this.game = new Game(mapSize)
  }

  startTrain(){
    let player1 = new Player("red", 15);
    let player2 = new Player("blue", 15);
    this.train = new Train(player1, this.game, { objetive: player2 })
  }

  stopTrain(){
    this.train.stop = true;
  }
  // setupGame(){
  //   if(this.game){
  //     this.game.stop();
  //   }
  //   this.row = 15;
  //   this.col = 15;
  //   let design = [];
  //   for(let i = 0; i < this.row; i++){
  //     design[i] = [];
  //     for(let j = 0; j < this.col; j++){
  //       design[i][j] = 1; 
  //     } 
  //   }
  //   this.game = new Game(design);
  // }

  // stopGame(){
  //   this.game.stop();
  // }

  // startGame(){
  //   let initialPlayer: Player = this.bestPlayer;
  //   if(!initialPlayer){
  //     initialPlayer = this.createPlayer("red");
  //   }
  //   this.runGame(initialPlayer);
  // }

  // nextPositionPlayer2(){
  //   this.positionIndex++;
  // }

  // endGame(bestOldPlayer){
  //   this.game.stop();
  //   let playersScore = [];

  //   if(this.hasWinner()){
  //     this.nextPositionPlayer2()
  //     playersScore = this.players1.map(p => {
  //       return {
  //         win: true,
  //         player: p,
  //         score: p.winTime
  //       }
  //     });
  //   } else {
  //     playersScore = [{
  //       player: bestOldPlayer,
  //       score: 1
  //     }];
  //   }

  //   playersScore.sort((a, b) => {
  //     return a.score - b.score;
  //   });

  //   this.bestPlayer = _.first(playersScore).player.fullCopy();
  //   this.clearListPlayer1();
  //   this.runGame(this.bestPlayer);
  // }

  // hasWinner(){
  //   return this.players1.some(player1 => player1.win);
  // }

  // createPlayer(color: string){
  //   let player = new Player(color);
  //   player.setMapSize([this.game.map.length, this.game.map[0].length]);
  //   player.mutationRate = this.game.mutationRate
  //   player.makeBrain();
  //   return player;
  // }

  // createListPlayer1(playerToCopy: Player){
  //   let listPlayers = [];
  //   for(let i = 0; i < this.totalPlayers; i++){
  //     listPlayers.push(this.createPlayer(playerToCopy.color));
  //   }
  //   playerToCopy.brain.dispose();
  //   this.players1 = listPlayers;
  //   return this.players1
  // }

  // clearListPlayer1(){
  //   if(this.players1 && this.players1.length){
  //     this.players1.forEach(player1 => player1.brain.dispose());
  //   }
  //   this.players1 = [];
  // }


  // hasBestPlayer(players){
  //   return (players || []).some(player => player.oldBestPlayer);
  // }

  // setObjetive(row, col){
  //   this.nextObjetive = [col, row];
  // }

  // debugPlayer(){
  //   this.debug = !this.debug;
  // }

  // getRandomPosition(){
  //   return Math.round(randomLib.uniform(0, (this.game.map.length -1))());
  // }

  // getNextPositionPlayer2(): [number, number]{
  //   let player2Position: [number, number] = this.bluePositions[this.positionIndex < 4 ? this.positionIndex : 4] as [number, number];

  //   // random mode
  //   if(player2Position[0] == -1 && player2Position[1] == -1){
  //     player2Position = null;
  //     if(this.positionIndex != this.oldPositionIndex){
  //       this.oldPositionIndex = this.positionIndex;
  //       player2Position = [
  //         this.getRandomPosition(),
  //         this.getRandomPosition()
  //       ];
  //     }
  //   }
  //   if(!player2Position){
  //     player2Position = this.oldPosition;
  //   }

  //   if(typeof this.nextObjetive[0] != "undefined"){
  //     player2Position[0] = this.nextObjetive[0];
  //   }
  //   if(typeof this.nextObjetive[1] != "undefined"){
  //     player2Position[1] = this.nextObjetive[1];
  //   }

  //   this.oldPosition = player2Position;
  //   return player2Position;
  // }

  // createPlayer2(){
  //   if(this.player2) this.player2.brain.dispose();
  //   this.player2 = this.createPlayer("blue")
  //   return this.player2;
  // }

  // runGame(bestPlayer?: Player){
  //   this.game.resetGame()

  //   let player2 = this.createPlayer2();
  //   let player2Position = this.getNextPositionPlayer2();
  //   this.game.newPlayer(player2, player2Position);
  //   this.game.setObjetive(player2);

  //   if(bestPlayer.position){
  //     this.game.setOldBestPlayerPosition(bestPlayer.position);
  //   }
  //   let players1 = this.createListPlayer1(bestPlayer.fullCopy());
  //   for(let player1 of players1){
  //     this.game.newPlayer(player1, [ 7, 7]);
  //   }

  //   this.game.start(() => {
  //     // frame (1 second)
  //     for(let player of this.players1){
  //       if(player.win){
  //         this.endGame(player);
  //         break;
  //       }
  //       let keyPress = player.predictMovement(this.game.getAdjacentsTiles(player.position));
  //       if(keyPress){
  //         player.movement(keyPress);
  //       }

  //     }
  //     if(this.player2.lose === false){
  //       // let keyPress = player2.predictRunner(this.game.getAdjacents(player2.position));
  //       // player2.movement(player2.randomMoment());
  //     }
  //     let bkpPlayer = this.players1[0].fullCopy();
  //     this.players1 = this.players1.filter(player => {
  //       return  player.lose === false
  //     });

  //     if(!this.players1.length){
  //       this.players1.push(bkpPlayer);
  //       return this.endGame(bestPlayer);
  //     }
  //   }, () => this.endGame(bestPlayer));
  // }
}
