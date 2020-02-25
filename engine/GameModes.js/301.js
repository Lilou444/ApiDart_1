const Game = require('../GameMode');
const Player = require('../player');

module.exports = class the301 extends Game {
    constructor(players){
        super(players)
    }

    async playGame() {
        return await this.Score(this, this.players[0]);
    }
    
    async Score(game, player) {  
        
        var shoot = await game.Shoot301()
        player.score = 301
        console.log(player)
        const result = player.score - (shoot.sector.sector * shoot.multiplier.multiplier );
        const shoot301Score = shoot.sector.sector * shoot.multiplier.multiplier;
        console.log(shoot301Score)
        while(player.shot === 2 && !game.gameOver){
            
            if(player.score - result === 0){
                player.score -= shoot301Score;
                player.isPlay = false;
                game.round ++;
                player.shot = 1;
                player = game.nextPlayer();   
                return this.Score(game, player)
            }else if(player.score - result === 1 || player.score - result <0 ) {
                 console.log("Mauvais tir")
            }else{
                player.score -= shoot301Score
            }
              player.shot = 1;
              player.score ++;
              game.round ++;
              shoot301Score = 0;
              player = game.nextPlayer();   
              return this.Score(game, player)


            }
            player.shoot ++;
            return this.Score(game, player)

        }
}