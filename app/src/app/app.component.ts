import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Game from "./workbranch/game";
import Player from "./workbranch/player";
import { random } from "mathjs";

const api = "http://localhost:8081";
@Component({
  selector: 'app-root',
  templateUrl: "app.html",
  styleUrls: ["app.scss"]
})
export class AppComponent {
  title = 'app';
  game: any;
  players1: Player[];
  bestPlayer: any;
  row: number;
  col: number;
  mutation: number = 0.1;
  mutationRate = 1;
  mutationValue = -1;
  player2: any;
  nextObjetive: number[] = [];
  playerDebug: any;
  debug: boolean;
  minWeigth: number = -1;
  maxWeigth: number = 1;
  totalPlayers: number = 100;

  constructor(private http: HttpClient){
    this.setupGame();
  }


  // @HostListener("window:keydown")

  mutationChange(status){
    if(status == "+"){
      this.mutation += 0.01;
    } else {
      this.mutation -= 0.01;
    }
    if(this.mutation < 0) this.mutation = 0;
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
  }

  stopGame(){
    this.game.stop();
  }

  startGame(){
    this.runGame(this.bestPlayer || new Player("red", [ this.row, this.col ]));
  }

  endGame(bestOldPlayer){
    this.game.stop();
    let objetive = this.game.objetivePlayer;
    let playersScore = [];
    if(this.players1.some(p => p.win)){
      playersScore = this.players1.filter(p => p.win).map(p => {
        return {
          win: true,
          player: p,
          score: p.winTime
        }
      });
    } 
    // else if( this.game.round > 500) {
    //   playersScore = [
    //     {
    //       player: bestOldPlayer,
    //       score: 1
    //     }
    //   ]
    // } 
    else {
      playersScore = this.players1.map(p => {
        let diffx = Math.pow((p.position[0] - p.objetive[0]),2);
        let diffy = Math.pow((p.position[1] - p.objetive[1]), 2);
        console.log(Math.sqrt(diffx + diffy))
        console.log("player", p.position)
        console.log("objetive", p.objetive)
        return {
          player: p,
          score: Math.sqrt(diffx + diffy) 
        }
      });
    }

    playersScore.sort((a, b) => {
      return a.score - b.score;
    });

    playersScore.length = 3;
    console.log(playersScore[0].player.position);
    this.bestPlayer = playersScore[0].player;
    this.runGame(this.bestPlayer);
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

  runGame(bestPlayer?){
    this.game.resetGame()
    console.clear = () => {}
    this.player2 = new Player("blue", [ this.row, this.col ])
    // this.game.setObjetive(player2, Math.round(Math.random() * (this.row -1)), Math.round(Math.random() * (this.col -1)));
    let row = 14;
    if(typeof this.nextObjetive[0] != "undefined"){
      row = this.nextObjetive[0];
    }
    let col = 14;
    if(typeof this.nextObjetive[1] != "undefined"){
      col = this.nextObjetive[1];
    }
    this.game.setObjetive(this.player2, row, col);
    this.game.safeStop = 3000;
    if(bestPlayer.position){
      this.game.setOldBestPlayerPosition(bestPlayer.position);
    }
    this.players1 = [];
    let position = [Math.round(Math.random() * (this.row -1)), Math.round(Math.random() * (this.col -1))]; 
    for(let i = 0; i < this.totalPlayers; i++){
      let player1 = bestPlayer.copy({
        mutationRate: this.mutationRate / 100,
        debug: this.debug,
        minWeigth: this.minWeigth,
        maxWeigth: this.maxWeigth,
      });
      this.players1.push(player1);
      this.game.newPlayer(player1, 7, 7);
    }
    this.game.start(() => {
      // frame (1 second)
      for(let player of this.players1){
        if(player.win){
          this.endGame(bestPlayer);
          break;
        }
        let keyPress = player.predictMovement(this.game.getAdjacentsTiles(player.position[0], player.position[1]));
        if(keyPress){
          player.movement(keyPress);
        }

      }
      if(this.player2.lose === false){
        // let keyPress = player2.predictRunner(this.game.getAdjacents(player2.position));
        // player2.movement(player2.randomMoment());
      }
      let bkpPlayer = this.players1[0];
      this.players1 = this.players1.filter(player => player.lose === false);
      if(!this.players1.length){
        this.players1.push(bkpPlayer);
        return this.endGame(bestPlayer);
      }
    }, () => this.endGame(bestPlayer));
  }
}
