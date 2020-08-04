import _ from "lodash";
import Player from "./player";
import random from "random";

export default class Game{
  map: { oldBestPlayer: boolean, players: Player[]; }[][];
  mapPlayers: Player[] = [];
  status = "waiting";
  end = false;
  time: number = 0;
  round: number = 0;
  interval: any;
  timeout: number = 20;
  speed = 100;
  objetive: Player;
  mutationRate = 0.1;
  designMap: any[];

  constructor(size: number){
    this.designMap = [];
    for(let i = 0; i < size; ++i){
      this.designMap[i] = [];
      for(let j = 0; j < size; ++j){
        this.designMap[i][j] = 1; 
      } 
    }
    this.resetGame();
  }

  resetGame(){
    this.time = 0;
    this.round++;
    this.mapPlayers = [];
    this.map = this.designMap.map((row: number[], indexRow: number) => {
      return row.map((column: number, indexColumn: number) => {
        return {
          players: [] as Player[],
          oldBestPlayer: false
        };
      })
    })
  }

  getRandomPosition(): [number, number]{
    let max = this.map.length;
    let min = 0
    let fnRandom = random.uniform(max, min);
    return [
      Math.floor(fnRandom()),
      Math.floor(fnRandom())
    ];
  }

  gameOver(status: string){
    this.stop();
    this.status = status;
    this.end = true;
    this.resetGame();
  }

  setObjetive(player: Player){
    player.iAmObjetive = true;
    this.mapPlayers.forEach(_player => _player.setObjetive(player.position));
    this.objetive = player;
  }

  getAdjacentsTiles([row , col]){
    let adjacent = [
      _.has(this.map,`${row - 1}.${col}`),
      _.has(this.map,`${row + 1}.${col}`),
      _.has(this.map,`${row}.${col - 1}`),
      _.has(this.map,`${row}.${col + 1}`),
    ]
    return adjacent.map(map => {
      return map ? 1 : 0
    })
  }

  getRowCol([ row, col ]){
    if(this.positionOnMap([ row, col ]) === false){
      throw new Error(`out map ${row} - ${col}`);
    }
    return _.get(this.map, `${row}.${col}`)
  }

  positionOnMap([ row, col ]){
    return !!_.has(this.map, `${row}.${col}`);
  }

  newPlayer(player: Player, [ row, col ]){
    if(this.positionOnMap([ row, col ]) === false){
      throw new Error(`out map ${player.row} - ${player.col}`);
    }

    this.setPositionOnPlayer(player, [ row, col ]);
    
    if(!player.iAmObjetive && this.objetive){
      player.setObjetive(this.objetive.position);
    }

    this.mapPlayers.push(player)

    // implemente movemento for player
    player.movement = (keyPress) => this.movement(player, keyPress);
    this.putPlayerOnMap(player)
  }

  setPositionOnPlayer(player: Player, [ row, col ]){
    player.position = [ row, col ];
  }

  hitOtherPlayer(players, player: Player){
    return players.some(_player => _player.color != player.color);
  }

  putPlayerOnMap(player: Player){
    let { players } = this.getRowCol(player.position);
    
    players.push(player);
    _.set(this.map, `${player.row}.${player.col}`, { players });
  }

  checkWinLose(player: Player){
    let { players } = this.getRowCol(player.position);
    let hit = this.hitOtherPlayer(players, player);
    const LOSE_REWARD = -10;
    const WIN_REWARD = 10;
    let reward = -0.2;
    if(hit){
      if(player.iAmObjetive){
        reward = LOSE_REWARD;
        player.lose = true;
      } else {
        player.win = true;
        reward = WIN_REWARD
        this.objetive.lose = true;
      }
    }
    return reward;
  }

  getAdjacentsPlayers([row, col]){
    let position1 = row - 1 >= 0 ? this.getRowCol([row - 1, col]) : [];
    let position2 = row + 1 <= this.map.length ? this.getRowCol([row + 1, col]) : [];
    let position3 = col - 1 >= 0 ? this.getRowCol([row, col - 1]) : [];
    let position4 = col + 1 <= this.map[0].length ? this.getRowCol([row, col + 1]) : [];

    let adjacent = [
      position1.length, // up
      position2.length, // down
      position3.length, // left
      position4.length, // right
    ]
    return adjacent.map(_number => {
      return typeof _number != "undefined" ? _number : 0;
    }).map(_number => {
      return _number > 0 ? 1 : 0;
    })
  }

  setOldBestPlayerPosition([row, col]){
    let tile = this.getRowCol([ row, col ]);
    tile.oldBestPlayer = true;
    _.set(this.map, `${row}.${col}`, tile);
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
    if(process.env.DRAW){
      this.draw();
    }
    return done;
  }

  updateMapPositionPlayer(player: Player, [ row, col ]){
    let tile = this.getRowCol(player.position);
    
    tile.players = tile.players.filter(_player => _player != player);
    _.set(this.map, `${player.row}.${player.col}`, tile);
    
    this.mapPlayers = this.mapPlayers.filter(_player => _player != player);

    this.setPositionOnPlayer(player, [ row, col ]);
    
    this.mapPlayers.push(player);
    this.putPlayerOnMap(player);
  }

  start(frameUpdate: Function, endFn: Function){
    let speed = this.speed;
    this.interval = setInterval(() => {
      if(speed != this.speed){
        clearInterval(this.interval);
        return this.start(frameUpdate, endFn);
      }
      this.nextStep(frameUpdate, endFn);
    }, speed);
  }

  stop(){
    if(this.interval) clearInterval(this.interval);
  }

  nextStep(frameUpdate: Function, endFn: Function){
    this.time++
    frameUpdate();
    if(this.time > this.timeout){
      this.gameOver("timeout");
      return endFn();
    }
  }

  draw(){

    function clearConsoleAndScrollbackBuffer() {
      // @ts-ignore
      process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");console.clear();
    }
    clearConsoleAndScrollbackBuffer()
    let mapPrint = [];
    let rowPrint = [" "];
    for(let row of this.map){
      rowPrint.push("_")
    }
    rowPrint.push(" ");
    mapPrint.push(rowPrint.join(" "));
    let player1: Player;
    for(let row of this.map){
      let rowPrint = [" "];
      for(let col of row){
        let { players } = col;
        if(players.length == 0){
          rowPrint.push("_")
          continue;
        }
        let color = players[0].color;
        if(color == "red"){
          player1 = players[0];
        }
        rowPrint.push(color.slice(0,1))

      }
      rowPrint.push(" ")
      mapPrint.push(rowPrint.join("|"))
    }
    // console.log(mapPrint);
    console.log(mapPrint.join("\r\n"));
    if(player1){
      console.log(`id: ${player1.id}`);
      console.log(`win:`, player1.win);
      console.log(`frameCount: ${player1.frameCount}`)
      console.log(`cumulativeReward: ${player1.cumulativeReward}`)
    }
  }
  
}