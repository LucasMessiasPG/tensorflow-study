import NeuralNetwork from "./nn";
import { v1 as uuidV1 } from "uuid";
import { random } from "mathjs";
import * as randomLib from "random";
function randomG(v) {
    var r = 0;
    for (var i = v; i > 0; i--) {
        r += Math.random();
    }
    return r / v;
}
function constrain(n, low, high) {
    return Math.max(Math.min(n, high), low);
}
;
/*
  https://p5js.org/reference/#/p5/map
*/
function map(n, start1, stop1, start2, stop2, withinBounds) {
    var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
        return newval;
    }
    if (start2 < stop2) {
        return constrain(newval, start2, stop2);
    }
    else {
        return constrain(newval, stop2, start2);
    }
}
;
export default class Player {
    constructor(color) {
        this.id = uuidV1();
        this.lastBestScore = 1000;
        this.lose = false;
        this.win = false;
        this.iAmObjetive = false;
        this.mutationRate = 0.1;
        this.debug = false;
        this.maxWeigth = 1;
        this.minWeigth = -1;
        this.oldBestPlayer = false;
        this.color = color;
    }
    setMapSize(mapSize) {
        this.mapSize = mapSize;
    }
    get row() {
        return this.position[0];
    }
    set row(value) {
        this.position[0] = value;
    }
    get col() {
        return this.position[1];
    }
    set col(value) {
        this.position[1] = value;
    }
    makeBrain(brain, opt) {
        let { ignroeMutation = false } = opt || {};
        if (brain) {
            // @ts-ignore
            this.brain = brain.copy();
            if (!ignroeMutation) {
                this.mutation();
            }
        }
        else {
            this.brain = new NeuralNetwork();
        }
    }
    setObjetive(row, col) {
        this.objetive = [row, col];
    }
    movement(keyPress) {
        throw new Error("not implemented");
    }
    setMutation(mutation) {
        this.mutationRate = mutation;
    }
    mutation() {
        this.brain.mutate((value) => {
            if (this.mutationRate != 0 && random(0, 1) <= this.mutationRate) {
                let _value = value + randomLib.uniform(this.minWeigth, this.maxWeigth)();
                return _value;
            }
            else {
                return value;
            }
        });
        if (this.debug)
            this.debug = false;
    }
    fullCopy() {
        return this.copy({ ignroeMutation: true });
    }
    copy(opt) {
        let { mutationRate, debug, minWeigth, maxWeigth, ignroeMutation } = opt || {};
        let player = new Player(this.color);
        player.setMapSize(this.mapSize);
        player.mutationRate = mutationRate;
        player.debug = debug;
        if (typeof minWeigth != "undefined") {
            player.minWeigth = minWeigth;
        }
        if (typeof maxWeigth != "undefined") {
            player.maxWeigth = maxWeigth;
        }
        player.makeBrain(this.brain, { ignroeMutation });
        return player;
    }
    randomMovement() {
        let movement = [
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ];
        return movement[Math.round(Math.random() * 3)];
    }
    predictMovement(adjacent) {
        let inputs = [];
        let [y, x] = this.position;
        let [y2, x2] = this.objetive;
        let diffx = Math.pow((x - x2), 2);
        let diffy = Math.pow((y - y2), 2);
        let score = diffx + diffy;
        if (this.lastBestScore > score) {
            this.lastBestScore = score;
        }
        const maxDistance = Math.sqrt(Math.pow(15, 2) + Math.pow(15, 2));
        inputs[0] = map(x, 0, this.mapSize[0], 0, 1);
        inputs[1] = map(y, 0, this.mapSize[0], 0, 1);
        inputs[2] = map(x2, 0, this.mapSize[0], 0, 1);
        inputs[3] = map(y2, 0, this.mapSize[1], 0, 1);
        // inputs[4] = adjacent[0]; // 0 || 1
        // inputs[5] = adjacent[1]; // 0 || 1
        // inputs[6] = adjacent[2]; // 0 || 1
        // inputs[7] = adjacent[3]; // 0 || 1
        // inputs[4] = map(Math.sqrt(diffx + diffy), 0, maxDistance, 0, 1);
        // inputs[5] = map(Math.abs(x - x2), 0, this.mapSize[0], 0, 1);
        // inputs[6] = map(Math.abs(y - y2), 0, this.mapSize[1], 0, 1);
        let action = this.brain.predict(inputs);
        let max = -Infinity;
        action.forEach(moveValue => {
            if (moveValue > max) {
                max = moveValue;
            }
        });
        let movement = [
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ];
        let indexArr = action.indexOf(max);
        if (indexArr == 4) {
            return "";
        }
        return movement[indexArr];
    }
}
//# sourceMappingURL=player.js.map