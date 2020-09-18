import { Game, Moviments } from "./controllers/game";
import { Setup } from "./controllers/setup";
import { NeuralNetwork } from "./nn";
import readline from "readline";
import _ from "lodash";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BATCH_RANDOM = 100;
const SIZE_MAP = 5;
let player_brain = new NeuralNetwork({ sizeMap: SIZE_MAP }); 


let setup = new Setup({ sizeMap: SIZE_MAP });

let randomPosition = function(){
  let rngNumber = Math.round(Math.random() * 4);
  if(rngNumber == 3){
    return randomPosition();
  }
  return rngNumber;
};

let tagetPossition: [number, number] = [randomPosition(), randomPosition()];


let gameStart = async () => {
  
  setup.newGame({
    target: tagetPossition
  })

  let players = [
    setup.createPlayer("red", { position: [ 3, 3 ] }),
  ];
  let playersId = players.map(player => player.id);

  function randomMoviment(): number{
    return Math.round(Math.random() * 3);
  }

  function readMoviment(done){
    console.log("GREEN -----------------");
    let labelReadLine = setup.game.moviments.reduce((text, moviment, index) => {
      text += `${index} - ${moviment} \r\n`
      return text;
    }, "")
    rl.question(labelReadLine, (answer) => {
      answer = +answer
      if([0,1,2,3].includes(answer) === false) {
        console.log("opção invalida")
        return readMoviment(done);
      }
      
      done(answer);
    });
  }

  async function stepGame(time: number) {
    console.log("----------------------------------------------------------------")
    console.log(`round: ${setup.rounds} - time: ${time}`)

    for(let id of playersId){
      let player = setup.getPlayer(id);
      let movimentIndex = Math.round(Math.random() * 3);

      if(player.color == "green"){
        movimentIndex = await new Promise(resolve => {
          readMoviment(resolve);
        })
      } else {
        if(setup.rounds < BATCH_RANDOM){
          movimentIndex = randomMoviment();
        } else {
          movimentIndex = player_brain.predict([
            player_brain.map(player.position[0]),
            player_brain.map(player.position[1]),
            player_brain.map(setup.game.target[0]),
            player_brain.map(setup.game.target[1]),
          ]);
        }
        
      }

      let state = [
        player.position[0],
        player.position[1],
        setup.game.target[0],
        setup.game.target[1],
        _.range(4).map((number) => movimentIndex == number ? 1 : 0 )
      ]
      player.moviments.push(state);
      console.log(player.color, player.position, setup.game.target, movimentIndex);
      await player.moviment(setup.game.moviments[movimentIndex])

      if(player.win){
        break;
      }
    }
  }

  async function endGame(){
    let hasWinner = !!setup.game.winner;
    console.log(`game end - hasWinner: ${hasWinner}`);

    if(hasWinner == false){
      player_brain.mutate();
    } else {
      await player_brain.train(setup.game.winner.moviments);
      tagetPossition = [randomPosition(), randomPosition()]
    }
    
    gameStart();
  }
  setup.step(stepGame, endGame);
}

gameStart();