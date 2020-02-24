const router = require('express').Router();
const Game = require('../models/Game/Game');


router.get('/', async (req,res) => {
  const Games = await Game.find({}, function(err, Games) {
    let GameMap = {};

    Games.forEach(function(Game) {
      GameMap[Game._id] = Game;
    });
    res.send(GameMap);
  });
  res.format({
    html: function () {
      res.render('listGame');
    },
    json: function () {
        res.send(Games)
    }
});
})

router.post('/', async (req,res,next) => {

  const Game = new Game({
    name: req.body.name,
    mode: req.body.mode,
  })

  Game.save((newGame) => {
    res.format({
      html: function () {
        res.redirect('formGame'+ newGame.id);
      },
      json: function () {
        const Game = await Game.collection.insertOne(newGame)
        res.json(Game)
      }
    })
  })
});

//   if( !req.body.name || req.body.name === '' ||
//   !req.body.email || req.body.email === '')
// {
//   let err = new Error('Please fill all the inputs');
//   return next(err);
// }
// const Games = await Game.collection.insertOne(req.body).then(() => {
// res.redirect('/Games');
// }).catch(next);
// res.format({
//   html: function () {
//     res.render('formGame');
//   },
//   json: function () {
//       res.send('new')
//   }
// });

router.get('/new', async (req,res,next) => {
  res.format({
    html: function () {
      res.render('formGame');
    },
    json: function () {
        res.send('new')
    }
})
});

router.get('/:id',  async (req,res,next) => {
  const Game = await Game.find({_id: req.params.id}).catch(next);
  res.format({
    html: function () {
        res.redirect('/:id/edit')
    },
    json: function () {
        res.json(Game)
    }
})
});

router.get('/edit/:id',async (req,res,next) => {
    res.format({
      html: function () {
        const Game = await Game.find({_id: req.params.id}).catch(next);
        res.render('formGame',{Game})
      },
      json: function () {
          res.render('error')
      }
  })
});

router.patch('/:id',async (req,res,next) => {
    Game.findByIdAndUpdate({_id: req.params.id}, {title: req.body.name, text: req.body.mode }).then(() => {
      res.format({
        html: function () {
          res.render('/games')
        },
        json: function () {
            res.json('error')
        }
    })
    }).catch(next);
;})

router.delete('/:id', async (req,res) => {
   let id = req.params.id;
    Game.findByIdAndDelete(id, () => {
      res.format({
        html: function () {
          res.render('/games')
        },
        json: function () {
            res.json('error')
        }
    })
    })
});

module.exports = router;