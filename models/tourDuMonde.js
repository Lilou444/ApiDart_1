
const Game = require('./game');

const inquirer = require('inquirer');



module.exports = class TourDeMonde extends Game {
    constructor(players){
        super(players)
    }

    async playGame() {

        return await this.Score(this, this.players[0]);
    }
    

  async  Shoot (player) {
    return await inquirer.prompt(
        {
            type: 'number',
            name: 'shoot',
            message: 'lances ta flêchette : ' + player.name,
            validate: function (value){
                if(isNaN(parseFloat(value))) {
                    return "Saisis ton nombre !" 
                }
                if (value <= 0 || value >= 21) {
                    throw new RangeError( "La valeur doit être comprise entre " + 0 + " et " + 21 );
                }
                return true
            }
        },
      )
} 
    async Score(game, player) {  

        var shoot = await this.Shoot(player)

        console.log(player)
        console.log(shoot)
            if(!game.gameOver){         
                if(shoot[0] === 20 && player.score === 19){
                    player.isPlay = false;
                    player.shot = 1;
                    game.round = game.round + 1
                    player.score = 0
                    console.log(player.name+"fin du jeu");
                    player = game.nextPlayer();
                    console.log(player)
                    return this.Score(game, player);
                }

                if(shoot[0] === game.score+1){
                    game.score = shoot[0];
                    console.log('tu as touché ta cible');
                }
                
                if(player.shot === 3){
                    player.shot = 1;
                    game.round = game.round + 1
                    player = game.nextPlayer();
                    return this.Score(game, player);
                }else{
                    player.shot++;
                    return this.Score(game, player);
                }
            }
        }
        }