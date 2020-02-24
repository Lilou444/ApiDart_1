const inquirer = require('inquirer');


async function askNbPlayers() {
    return await inquirer.prompt(
      {
        type: 'input',
        name: 'nbPlayers',
        message: 'Saissisez le nombre de participants !',
        validate: function (v){
          if(isNaN(parseFloat(v))) { return "Saisissez un chiffre" }
          if (v <= 1) { return "Pour jouer saissez au moins 2 joueurs" }
          if (v >= 10) { return "Max 10 joueurs peuvent jouer" }
          return true
      },
      filter:Number,
      },
    )
  }


  async function askNamePlayer(nbPlayers) {
    let namePlayerTab = []
    for (let i = 0; i < nbPlayers; i++) {
       await inquirer.prompt(
        {
          type: 'input',
          name: 'playerName',
          message: 'Quel est ton nom joueur  ' + i + ' ?'
        }
      ).then((answer) => {
        namePlayerTab.push(answer.playerName)
        console.log(`Bienvenue sur DartMaster ${answer.playerName}`)
      })
    }
    return namePlayerTab
  }
  
  async function askModeParams() {

    return await inquirer.prompt(
      {
        type: 'list',
        name: 'mode',
        message : 'Choisissez votre mode de jeu ! :',
        choices: ['Tour du monde', '301', 'Cricket']
      
      }
    )
  }

module.exports = {
  askModeParams,
  askNamePlayer,
  askNbPlayers,

}