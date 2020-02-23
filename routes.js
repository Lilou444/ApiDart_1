const router = require('express').Router()

 
const Game = require('./routers/Game.js')
const Player = require('./routers/Player.js')

// error à ajouter non encore traitée 


// routes 
router.use('/games',Game)
router.use('/players', Player)


router.get('/', function (err,req, res, next) {
  res.format({
      html: function () {
          res.redirect('/games')
      },
      json: function () {
          res.status(err.status)
      }
  })
})


router.get('/', function (err, req, res, next) {
    res.format({
        html: function () {
            res.render(err)
        },
        json: function ()  {
            res.status(err.status)
        }
    })
})

module.exports = router
