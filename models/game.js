
const inquirer = require('inquirer');

class Game {

  constructor(players){
      this.players = players
      this.currentPlayerId = 0  
      this.round = 0 
      this.gameOver = false
  }

  nextPlayer(){
     if( (this.currentPlayerId + 1) % this.players.length == 0 ){
         this.currentPlayerId = 0;
         return this.players[0];
     }
      else {
         this.currentPlayerId ++
         return  this.players[this.currentPlayerId+1];
        }
     }
  
  goPlay(player){
      if(player.shot === 1){
          console.log(" C'est à toi ! "+player.name);
        }
    }

    async  askNbPlayers() {
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
    
    
      async  askNamePlayer(nbPlayers) {
        let namePlayerTab = []
        for (let i = 1; i <= nbPlayers; i++) {
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
      
      async  askModeParams() {
    
        return await inquirer.prompt(
          {
            type: 'list',
            name: 'mode',
            message : 'Choisissez votre mode de jeu ! :',
            choices: ['Tour du monde', '301', 'Cricket']
          
          }
        )
      }
}
module.exports = Game
