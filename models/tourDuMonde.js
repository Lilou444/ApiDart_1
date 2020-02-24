
const Game = require('./game');

const inquirer = require('inquirer');



module.exports = class TourDeMonde extends Game {
    constructor(players){
        super(players)
    }

    async playGame() {

        return await this.Score(this, this.players[0]);
    }
    
    async Score(game, player) {  

        var shoot = await game.Shoot()

        console.log(player)
        console.log(shoot)
        console.log(player.name + ' c\’est ton tour');

            while(!game.gameOver){ 

                if(shoot[0] === 3 && player.score === 2){
                    player.isPlay = false;
                    player.shot = 1;
                    game.round = game.round + 1
                    player.score = 0
                    console.log(player.name+"fin du jeu");
                    player = game.nextPlayer();
                    return this.Score(game, player);
                }

                if(shoot[0] === game.score+1){
                    game.score = shoot[0];
                    console.log('tu as touché ta cible');
                }
                
                if(player.shot === 2){
                    player.shot = 1;
                    game.round ++
                    player.score ++
                    console.log(game);
                    player = game.nextPlayer();
                    console.log(player);
                    return this.Score(game, player);
                }else{
                    player.shot++;
                    return this.Score(game, player);
                }
            }
        }
}