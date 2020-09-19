import { Setup } from "../../api/src/controllers/setup";
import { NeuralNetwork } from "../../api/src/nn";

let setup = new Setup({ sizeMap: 10 });
let brain = new NeuralNetwork({ sizeMap: 10 });


let humanPlay = false;
let totalRobots = 150
let timeoutEachStep = 1;

const RNG_ROUND = 1;


let historyMovements : any[] = [];
let randomPosition: any = function(){
  let rngNumber = Math.round(Math.random() * 9);
  if(rngNumber < 2 || rngNumber > 5){
    return rngNumber;
  }
  return randomPosition();
};

let targetPosition: [number, number] = [randomPosition(), randomPosition()];

function randomMovement(): number{
  let rng = brain.randomIndexMovement();
  return rng;
}

let gameStart = async () => {
  let moving = false;
  
  setup.newGame({
    target: targetPosition
  })
  


  let player: any = humanPlay ?  setup.createPlayer("green", { position: [ 5, 5 ] }) : void 0;
  
  let robots: any[] = []
  //  _.range(10, () => {
  //   return {
  //     robot: setup.createPlayer("red", { position: [ 5, 5 ] }),
  //     brain: brain.copy()
  //   };
  // });
  for(let i = 0; i < totalRobots; ++i){
    robots.push({
      robot: setup.createPlayer("red", { position: [ 5, 5 ] }),
      brain: brain.copy({ mutate: i != 0 })
    })
  }
  const screen = document.getElementById('game')


  setup.step(stepGame, endGame);
  
  render(screen);

  async function stepGame(time: number){
    console.log("----------------------------------------------------------------")
    console.log(`round: ${setup.rounds} - time: ${time}`)

    let timeout: Promise<any> = new Promise(resolve => setTimeout(resolve, timeoutEachStep));
  
    let movement = async (player: any, movementIndex: number) => {
      let state = [
        player.position[0],
        player.position[1],
        setup.game.target[0],
        setup.game.target[1],
        movementIndex
        // @ts-ignore
        // _.range(4).map((number: number) => movementIndex == number ? 1 : 0 )
      ]
      player.movements.push(state);
      if(!setup.game.movements[movementIndex]){
        console.log("movementIndex", movementIndex);
        throw "movimento invalido";
      }
      await player.movement(setup.game.movements[movementIndex]);
      return true;
    }
  
    let humanMovement = async () => {
      
      let movementIndex: number = await new Promise(resolve => {
        let keyPress = (event: any) => {
          const keyName = event.key;
          if(setup.game.movements.includes(keyName) && moving == false){
            document.removeEventListener('keydown', keyPress) 
            resolve(setup.game.movements.indexOf(keyName));
          }
        }
        document.addEventListener ('keydown', keyPress);
      })
      
      moving = true;
      await movement(player, movementIndex);
      moving = false;
      return true;
    }
  
    let robotMovement = async (robot: any, brain: any) => {
      
      let movementIndex: number;
      if(setup.rounds < RNG_ROUND){
        movementIndex = randomMovement();
      } else {
        movementIndex = brain.predict([
          robot.position[0],
          robot.position[1],
          setup.game.target[0],
          setup.game.target[1],
        ]);
      }

      return movement(robot, movementIndex);
    }
    let promises = robots
    .map((data: any) => {
      return robotMovement(data.robot, data.brain);
    });
  
    if(player){
      promises.push(humanMovement());
    }
  
    if(!!timeout){
      promises.push(timeout);
    }

    if(setup.rounds >= 10){
      humanPlay = false;
    }
    await Promise.all(promises);
  }
  
  async function endGame(){
    let hasWinner = !!setup.game.winner;
    console.log(`game end - hasWinner: ${hasWinner}`);
  
    if(hasWinner){
      targetPosition = [randomPosition(), randomPosition()]
      await brain.train(setup.game.winner.movements);
    }


    // if(hasWinner){
    //   if(setup.rounds < RNG_ROUND){
    //     historyMovements = historyMovements.concat(setup.game.winner.movements);
    //   } else {
    //     if(!historyMovements.length){
    //       await brain.train(setup.game.winner.movements);
    //     }
    //   }
    //   targetPosition = [randomPosition(), randomPosition()]
    // }

    // if(setup.rounds >= RNG_ROUND && historyMovements.length){
    //   await brain.train(historyMovements);
    //   historyMovements = [];
    // }
    gameStart();
  }
};

gameStart();


function render(screen: any){
  // console.log(screen);
  const context = screen.getContext('2d')
  context.fillStyle = 'white'
  context.clearRect(0, 0, setup.sizeMap, setup.sizeMap)

  context.fillStyle = 'blue'
  context.fillRect(setup.game.target[0], setup.game.target[1], 1, 1)

  for (const [ _ , player ] of Array.from(setup.game.players)) {
    context.fillStyle = player.color
    context.fillRect(player.position[0], player.position[1], 1, 1);
  }

  requestAnimationFrame(() => render(screen));
}