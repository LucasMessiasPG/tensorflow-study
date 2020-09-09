import _ from "lodash";
import Player from "./player";

export default class Game{
  map: { oldBestPlayer: boolean, players: Player[]; }[][];
  mapPlayers: Player[] = [];
  status = "waiting";
  end = false;
  time: number = 0;
  round: number = 0;
  interval: any;
  timeout: number = 20;
  speed = 200;
  objetive: Player;
  mutationRate = 0.1;

  constructor(private designMap: number[][]){
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

  gameOver(status: string){
    this.stop();
    this.status = status;
    this.end = true;
    this.resetGame();
  }

  setObjetive(player: Player){
    player.iAmObjetive = true;
    this.mapPlayers.forEach(_player => _player.setObjetive(player.row, player.col));
    this.objetive = player;
  }

  getAdjacentsTiles([row , col]){
    let adjacent = [
      _.has(this.map,`${row - 1}.${col}`, false),
      _.has(this.map,`${row + 1}.${col}`, false),
      _.has(this.map,`${row}.${col - 1}`, false),
      _.has(this.map,`${row}.${col + 1}`, false),
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
      player.setObjetive(this.objetive.row, this.objetive.col);
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
    return players.some(_player => {
      return _player.color == "blue" && _player.color != player.color;
    });
  }

  putPlayerOnMap(player: Player){
    let { players } = this.getRowCol(player.position);
    
    players.push(player);
    _.set(this.map, `${player.row}.${player.col}`, { players });
    this.checkWinLose(player);
  }

  checkWinLose(player: Player){
    let { players } = this.getRowCol(player.position);
    let hit = this.hitOtherPlayer(players, player);

    if(hit){
      if(player.iAmObjetive){
        player.lose = true;
      } else {
        player.win = true;
        this.objetive.lose = true;
        player.winTime = this.time;
      }
    }
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

  async start(frameUpdate: Function, endFn: Function){
    let speed = this.speed;
    this.status = "playing";
    while(this.status == "playing"){
      let timeout = new Promise(resolve => setTimeout(resolve, speed));
      await this.nextStep(frameUpdate, endFn);
      await timeout;
    }
  }

  stop(){
    this.status = "stop";
  }

  async nextStep(frameUpdate: Function, endFn: Function){
    this.time++
    await frameUpdate();
    if(this.time > this.timeout){
      await this.gameOver("timeout");
      return endFn();
    }
  }
}