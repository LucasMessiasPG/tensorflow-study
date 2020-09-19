import _ from "lodash";
export default class Game {
    constructor(designMap) {
        this.designMap = designMap;
        this.mapPlayers = [];
        this.status = "waiting";
        this.end = false;
        this.time = 0;
        this.round = 0;
        this.timeout = 20;
        this.speed = 200;
        this.mutationRate = 0.1;
        this.resetGame();
    }
    resetGame() {
        this.time = 0;
        this.round++;
        this.mapPlayers = [];
        this.map = this.designMap.map((row, indexRow) => {
            return row.map((column, indexColumn) => {
                return {
                    players: [],
                    oldBestPlayer: false
                };
            });
        });
    }
    gameOver(status) {
        this.stop();
        this.status = status;
        this.end = true;
        this.resetGame();
    }
    setObjetive(player) {
        player.iAmObjetive = true;
        this.mapPlayers.forEach(_player => _player.setObjetive(player.row, player.col));
        this.objetive = player;
    }
    getAdjacentsTiles([row, col]) {
        let adjacent = [
            _.has(this.map, `${row - 1}.${col}`, false),
            _.has(this.map, `${row + 1}.${col}`, false),
            _.has(this.map, `${row}.${col - 1}`, false),
            _.has(this.map, `${row}.${col + 1}`, false),
        ];
        return adjacent.map(map => {
            return map ? 1 : 0;
        });
    }
    getRowCol([row, col]) {
        if (this.positionOnMap([row, col]) === false) {
            throw new Error(`out map ${row} - ${col}`);
        }
        return _.get(this.map, `${row}.${col}`);
    }
    positionOnMap([row, col]) {
        return !!_.has(this.map, `${row}.${col}`);
    }
    newPlayer(player, [row, col]) {
        if (this.positionOnMap([row, col]) === false) {
            throw new Error(`out map ${player.row} - ${player.col}`);
        }
        this.setPositionOnPlayer(player, [row, col]);
        if (!player.iAmObjetive && this.objetive) {
            player.setObjetive(this.objetive.row, this.objetive.col);
        }
        this.mapPlayers.push(player);
        // implemente movemento for player
        player.movement = (keyPress) => this.movement(player, keyPress);
        this.putPlayerOnMap(player);
    }
    setPositionOnPlayer(player, [row, col]) {
        player.position = [row, col];
    }
    hitOtherPlayer(players, player) {
        return players.some(_player => _player.color != player.color);
    }
    putPlayerOnMap(player) {
        let { players } = this.getRowCol(player.position);
        players.push(player);
        _.set(this.map, `${player.row}.${player.col}`, { players });
        this.checkWinLose(player);
    }
    checkWinLose(player) {
        let { players } = this.getRowCol(player.position);
        let hit = this.hitOtherPlayer(players, player);
        if (hit) {
            if (player.iAmObjetive) {
                player.lose = true;
            }
            else {
                player.win = true;
                this.objetive.lose = true;
                player.winTime = this.time;
            }
        }
    }
    getAdjacentsPlayers([row, col]) {
        let position1 = row - 1 >= 0 ? this.getRowCol([row - 1, col]) : [];
        let position2 = row + 1 <= this.map.length ? this.getRowCol([row + 1, col]) : [];
        let position3 = col - 1 >= 0 ? this.getRowCol([row, col - 1]) : [];
        let position4 = col + 1 <= this.map[0].length ? this.getRowCol([row, col + 1]) : [];
        let adjacent = [
            position1.length,
            position2.length,
            position3.length,
            position4.length,
        ];
        return adjacent.map(_number => {
            return typeof _number != "undefined" ? _number : 0;
        }).map(_number => {
            return _number > 0 ? 1 : 0;
        });
    }
    setOldBestPlayerPosition([row, col]) {
        let tile = this.getRowCol([row, col]);
        tile.oldBestPlayer = true;
        _.set(this.map, `${row}.${col}`, tile);
    }
    movement(player, keyPress) {
        let movement = {
            "ArrowUp": { row: player.row - 1 },
            "ArrowDown": { row: player.row + 1 },
            "ArrowLeft": { col: player.col - 1 },
            "ArrowRight": { col: player.col + 1 }
        };
        let { row, col } = movement[keyPress];
        if (typeof row == "undefined")
            row = player.row;
        if (typeof col == "undefined")
            col = player.col;
        if (this.positionOnMap([row, col]) === false) {
            // try move out map !!!!
            // lose ?
            return false;
        }
        this.updateMapPositionPlayer(player, [row, col]);
    }
    updateMapPositionPlayer(player, [row, col]) {
        let tile = this.getRowCol(player.position);
        tile.players = tile.players.filter(_player => _player != player);
        _.set(this.map, `${player.row}.${player.col}`, tile);
        this.mapPlayers = this.mapPlayers.filter(_player => _player != player);
        this.setPositionOnPlayer(player, [row, col]);
        this.mapPlayers.push(player);
        this.putPlayerOnMap(player);
    }
    start(frameUpdate, endFn) {
        let speed = this.speed;
        this.interval = setInterval(() => {
            if (speed != this.speed) {
                clearInterval(this.interval);
                return this.start(frameUpdate, endFn);
            }
            this.nextStep(frameUpdate, endFn);
        }, speed);
    }
    stop() {
        if (this.interval)
            clearInterval(this.interval);
    }
    nextStep(frameUpdate, endFn) {
        this.time++;
        frameUpdate();
        if (this.time > this.timeout) {
            this.gameOver("timeout");
            return endFn();
        }
    }
}
//# sourceMappingURL=game.js.map