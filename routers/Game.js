const router = require('express').Router();
const Game = require('../models/Game/Game');


//get game list
router.get('/', async (req,res) => {
  Game.find(function(err, game) {
    if (err) {
      console.log(err);
    } else {
      res.render('listGame', { game: game});
      console.log(game);
    }
});
})

// insert game
router.post('/', async (req,res,next) => {
  if( !req.body.name || req.body.name === '' ||
  !req.body.mode || req.body.mode === '' ||
  !req.body.status || req.body.status === '')
{
  let err = new Error('Please fill all the inputs');
  return next(err);
}
Game.collection.insertOne(req.body).then(() => {
  res.redirect('/games');
}).catch(() =>{
  res.status(201).send()
});
});


// new game with a form 
router.get('/new', async (req,res,next) => {
  res.format({
    html : () => {
      res.render('formGame', {
        id: "",
        name: "",
        mode: "",
        status: "",
        method: 'POST'
      })
    },
    json : () => {
      res.status(406).send()
    }
  })

});


// get by id for edit 
router.get('/:id', async (req, res, next) => {

  Game.findById({_id: req.params.id})
  .then((game) => {
    res.format({
      html : () => {
        res.render('game', {
          game: game,
        })
      },
      json : () => {
        res.json(game)
      }
    })
  })
  .catch((err) => {
    return next(err)
  })
})

router.get('/:id/edit', (req, res, next) => {

  Game.findOne({_id: req.params.id})
  .then((game) => {
    res.format({
      html : () => {
        res.render('formGame', {
          id: req.params.id,
          name: game.name,
          mode: game.mode,
          status: game.status,
          method: 'PATCH'
        })
      },
      json : () => {
        res.send('error')
      }
    })

  })
  .catch((err) => {
    return next(err)
  })
})

// patch a game 
router.patch('/:id', (req, res, next) => {
  const body = {}
  if(req.body.name !== undefined){
    body.name = req.body.name
  }
  if(req.body.mode !== undefined){
    body.mode = req.body.mode
  }
  console.log(body)
  Game.findByIdAndUpdate({_id: req.params.id}, body, () => {
      res.format({
          html: () => {
              Player.find().then((game) =>{
                res.render('listGame',{
                  game: game
                });
              });
          },
          json: async () => {
              const game = await Game.findOne({_id: req.params.id})
              res.json(game)
          }
      })
  })
})

// delete a game 
router.delete('/:id', async (req, res, next) => {
  Game.findByIdAndDelete({_id: req.params.id}, () => {
      res.format({
          html: () => {
              res.redirect('/games')
          },
          json: () => {
              res.status(204).send()
          }
      })
  })

})


module.exports = router;