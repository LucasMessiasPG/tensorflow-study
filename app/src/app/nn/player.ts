import NeuralNetwork from "./nn";
import { v1 as uuidV1 } from "uuid";
import { random } from "mathjs";
import _ from "lodash";
import Player from "../_base/player";


export default class PlayerNN extends Player {

	mutationRate: number;
	brain: NeuralNetwork;
	minWeigth: number = -1;
	maxWeigth: number = 1;

	constructor(color: string, mapSize: number) {
		super(color, mapSize);
	}


	makeBrain(brain?: NeuralNetwork, opt?: any) {
		let { ignroeMutation = false } = opt || {};
		if (brain) {
			// @ts-ignore
			this.brain = brain.copy();
			if (!ignroeMutation) {
				this.mutation();
			}
		} else {
			this.brain = new NeuralNetwork();
		}
	}

	movement(keyPress: string) { throw new Error("not implemented"); }

	setMutation(mutation: number) {
		this.mutationRate = mutation;
	}

	mutation() {
		this.brain.mutate((value: any) => {
			if (this.mutationRate != 0 && random(0, 1) <= this.mutationRate) {
				let _value = value + this.randomGaussian(this.minWeigth, this.maxWeigth)
				return _value;
			} else {
				return value;
			}
		});
	}

	fullCopy() {
		return this.copy({ ignroeMutation: true });
	}

	copy(opt?: any): PlayerNN {
		let { mutationRate, debug, minWeigth, maxWeigth, ignroeMutation } = opt || {};
		let player = new PlayerNN(this.color, this.mapSize);
    player.mutationRate = mutationRate;

		if (typeof minWeigth != "undefined") {
			player.minWeigth = minWeigth;
		}

		if (typeof maxWeigth != "undefined") {
			player.maxWeigth = maxWeigth;
		}
		player.makeBrain(this.brain, { ignroeMutation });
		return player
	}

	randomMoment() {
		return this.randomKeyPress();
  }
  
  dispose(){
    if(this.brain){
      this.brain.dispose();
    }
  }
  

	predictMovement() {
		let inputs = [];
    !this.position && console.log(this)
		let [y, x] = this.position;
		let [y2, x2] = this.objetive;
		let diffx = Math.pow((x - x2), 2);
    let diffy = Math.pow((y - y2), 2);
    
		const maxDistance = Math.sqrt(Math.pow(15, 2) + Math.pow(15, 2));
		inputs[0] = this.normalizeValue(x, 0, this.mapSize, 0, 1);
		inputs[1] = this.normalizeValue(y, 0, this.mapSize, 0, 1);
		inputs[2] = this.normalizeValue(x2, 0, this.mapSize, 0, 1);
    inputs[3] = this.normalizeValue(y2, 0, this.mapSize, 0, 1);
		let action = this.brain.predict(inputs);

    let index = _.indexOf(action, _.max(action));
		return this.keyMoviments[index];
	}

}