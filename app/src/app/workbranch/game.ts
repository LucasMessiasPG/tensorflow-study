import _ from "lodash";
import Player from "./player";

export default class Game{
  map: { oldBestPlayer: boolean, players: Player[]; }[][];
  mapPlayers: { player: Player, x: number, y: number }[] = [];
  status = "waiting";
  end = false;
  time: number = 0;
  round: number = 0;
  interval: any;
  timeout: number = 20;
  speed = 200;
  objetivePlayer: Player;
  safeStop: number = 100;

  constructor(private designMap: number[][]){
    this.resetGame();
  }

  resetGame(){
    this.time = 0;
    this.round++;
    if(this.round > this.safeStop) return this.stop();
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

  setObjetive(player: Player, x: number, y: number){
    player.iAmObjetive = true;
    this.mapPlayers.forEach(item => item.player.setObjetive(x, y));
    this.objetivePlayer = player;
    this.newPlayer(player, x, y);
  }

  getAdjacentsTiles(row, col){
    let adjacent = [
      _.get(this.map,`${--row}.${col}`, 0),
      _.get(this.map,`${++row}.${col}`, 0),
      _.get(this.map,`${row}.${--col}`, 0),
      _.get(this.map,`${row}.${++col}`, 0),
    ]
    return adjacent.map(map => {
      return map === 0 ? 0 : 1
    })
  }

  newPlayer(player: Player, x: number, y: number){
    if(!this.map[y] || !this.map[y][x]) throw new Error(`out map ${x} - ${y}`);
    if(!player.iAmObjetive){
      player.setObjetive(this.objetivePlayer.position[0], this.objetivePlayer.position[1]);
    }
    this.mapPlayers.push({
      player: player,
      x: x,
      y: y
    })
    player.movement = (keyPress) => this.movement(player, keyPress);
    this.putPlayerOnMap(player, x, y)
  }

  putPlayerOnMap(player: Player, x: number, y: number){
    let { players } = this.map[y][x];
    if(players.some(_player => _player.color != player.color)){
      if(player.iAmObjetive){
        player.lose = true;
      } else {
        this.objetivePlayer.lose = true;
        player.win = true;
        player.winTime = this.time;
      }
    }
    player.stay(y,x);
    players.push(player);
    this.map[y][x].players = players;
  }

  getAdjacents([row, col]){
    let adjacent = [
      _.get(this.map,`${--row}.${col}.players`, []).length,
      _.get(this.map,`${++row}.${col}.players`, []).length,
      _.get(this.map,`${row}.${--col}.players`, []).length,
      _.get(this.map,`${row}.${++col}.players`, []).length,
    ]
    return adjacent.map(_number => {
      return typeof _number != "undefined" ? _number : 0;
    }).map(_number => {
      return _number > 0 ? 1 : 0;
    })
  }

  setOldBestPlayerPosition([row, col]){
    this.map[row][col].oldBestPlayer = true;
  }

  movement(player: Player, keyPress: string){
    let mapPlayer = this.mapPlayers.find(mapPlayer => mapPlayer.player == player);
    if(!mapPlayer) return false;
    // if(!mapPlayer) throw new Error("player not found on map players");
    if(!this.map[mapPlayer.y] || !this.map[mapPlayer.y][mapPlayer.x]){
      // player.lose = true;
      return false;
    }
    let movement = {
      "ArrowUp": { y: mapPlayer.y - 1 },
      "ArrowDown": { y: mapPlayer.y + 1 },
      "ArrowLeft": { x: mapPlayer.x - 1 },
      "ArrowRight": { x: mapPlayer.x + 1 }
    }
    let { x, y } = movement[keyPress];
    let newPossition = {
      x: mapPlayer.x,
      y: mapPlayer.y
    }
    if(typeof  x != "undefined"){
      newPossition.x = x;
    }
    if(typeof  y != "undefined"){
      newPossition.y = y;
    }
    if(!this.map[newPossition.y] || !this.map[newPossition.y][newPossition.x]){
      return false
    };
    
    this.mapPlayers = this.mapPlayers.filter(mapPlayer => mapPlayer.player != player);
    this.map[mapPlayer.y][mapPlayer.x].players = this.map[mapPlayer.y][mapPlayer.x].players.filter(_player => player != _player);
    this.mapPlayers.push({ ...mapPlayer, ...newPossition });
    this.putPlayerOnMap(mapPlayer.player, newPossition.x, newPossition.y);
  }

  draw(){
    let emptyTile = "______";
    let gameScreen = [];
    gameScreen.push(`rows ${this.map.length} columns ${this.map[0].length}`)
    for(let row of this.map){
      let columnsDraw = [];
      for(let column of row){
        let players = column.players;
        let columnText = "";

        if(players.length){
          columnText = `${players.length}-${players[0].color}`;
        }
        
        let line = (columnText +  emptyTile).slice(0, emptyTile.length)
        columnsDraw.push(line);
      }
      gameScreen.push(columnsDraw.join(" | "));
    }
    console.log(gameScreen.join("\r\n"));
  }

  start(frameUpdate: Function, endFn: Function){
    console.clear();
    let speed = this.speed;
    this.interval = setInterval(() => {
      if(speed != this.speed){
        clearInterval(this.interval);
        return this.start(frameUpdate, endFn);
      }
      this.time++
      console.clear();
      frameUpdate();
      if(this.time > this.timeout){
        this.gameOver("timeout");
        return endFn();
      }
    }, speed);
  }

  stop(){
    if(this.interval) clearInterval(this.interval);
  }
}