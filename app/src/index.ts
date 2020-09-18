import { Setup } from "../../api/src/controllers/setup";
import { NeuralNetwork } from "../../api/src/nn";

let setup = new Setup({ sizeMap: 10 });
let brain = new NeuralNetwork({ sizeMap: 10 });


let humanPlay = false;
let totalRobots = 10

let randomPosition: any = function(){
  let rngNumber = Math.round(Math.random() * 4);
  if(rngNumber == 3){
    return randomPosition();
  }
  return rngNumber;
};

let tagetPossition: [number, number] = [randomPosition(), randomPosition()];

let gameStart = async () => {
  let moving = false;
  
  setup.newGame({
    target: tagetPossition
  })
  


  let player: any = humanPlay ?  setup.createPlayer("green", { position: [ 8, 8 ] }) : void 0;
  
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
      brain: brain.copy({ mutate: i === 0 })
    })
  }
  const screen = document.getElementById('game')


  setup.step(stepGame, endGame);
  
  render(screen);

  async function stepGame(time: number){
    console.log("----------------------------------------------------------------")
    console.log(`round: ${setup.rounds} - time: ${time}`)
    let timeout: Promise<any> = new Promise(resolve => setTimeout(resolve, 5));
  
    let moviment = async (player: any, movimentIndex: number) => {
      let state = [
        player.position[0],
        player.position[1],
        setup.game.target[0],
        setup.game.target[1],
        // @ts-ignore
        _.range(4).map((number: number) => movimentIndex == number ? 1 : 0 )
      ]
      player.moviments.push(state);
      await player.moviment(setup.game.moviments[movimentIndex]);
      return true;
    }
  
    let humanMoviment = async () => {
      
      let movimentIndex: number = await new Promise(resolve => {
        let keyPress = (event: any) => {
          const keyName = event.key;
          if(setup.game.moviments.includes(keyName) && moving == false){
            document.removeEventListener('keydown', keyPress) 
            resolve(setup.game.moviments.indexOf(keyName));
          }
        }
        document.addEventListener ('keydown', keyPress);
      })
      
      moving = true;
      await moviment(player, movimentIndex);
      moving = false;
      return true;
    }
  
    let robotMoviment = async (robot: any, brain: any) => {
      let movimentIndex: number = brain.predict([
        brain.map(robot.position[0]),
        brain.map(robot.position[1]),
        brain.map(setup.game.target[0]),
        brain.map(setup.game.target[1]),
      ]);
      return moviment(robot, movimentIndex);
    }
    let promises = robots
    .map((data: any) => {
      return robotMoviment(data.robot, data.brain);
    });
  
    if(player){
      promises.push(humanMoviment());
    }
  
    if(!!timeout){
      promises.push(timeout);
    }
    await Promise.all(promises);
  }
  
  async function endGame(){
    let hasWinner = !!setup.game.winner;
      console.log(`game end - hasWinner: ${hasWinner}`);
  
    if(hasWinner){
      await brain.train(setup.game.winner.moviments);
      tagetPossition = [randomPosition(), randomPosition()]
    }
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