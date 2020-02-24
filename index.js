const Player = require('./models/Player');
const Game = require('./models/game');
const TourDuMonde = require('./models/tourDuMonde');



let nbPlayers;
let namePlayers;
let mode;
let modeGame = null;
let playersParams = [];
goGame = new Game


async function main() {

 nbPlayers = await goGame.askNbPlayers()
 namePlayers = await goGame.askNamePlayer(nbPlayers.nbPlayers)

 playersParams = []
 for (let index = 0; index < namePlayers.length; index++) {
   const name = namePlayers[index]
   playersParams.push(new Player(name))
  }

  randomPlayer(playersParams)
  mode = await goGame.askModeParams()
  if (mode.mode === 'Tour du monde'){
   modeGame = new TourDuMonde(playersParams) 
   modeGame.playGame()
  }
  if(mode.mode === '301'){
    game = new the301(playersParams)
    modeGame.playGame()
  }
}

async function randomPlayer(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
   }
main()