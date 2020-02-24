const router = require('express').Router();
const Game = require('../models/Game/Game');


router.get('/', async (req,res) => {
  Game.find({}, function(err, Games) {
    let GameMap = {};

    Games.forEach(function(Game) {
      GameMap[Game._id] = Game;
    });

    res.send(GameMap);
  });

});

router.post('/', async (req,res,next) => {
  if( !req.body.mode || req.body.mode === '' ||
  !req.body.name || req.body.name === '')
{
  let err = new Error('Please fill all the inputs');
  return next(err);
}
Game.collection.insertOne(req.body).then(() => {
res.redirect('/games');
}).catch(next);

});

router.get('/new', async (req,res,next) => {
  res.format({
    html: function () {
        res.redirect('/:id/edit')
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
        res.send('Game')
    }
})
});


router.get('/edit/:id',async (req,res,next) => {
  const Game = await Game.find({_id: req.params.id}).catch(next);
    res.format({
      html: function () {
          res.redirect('/games')
      },
      json: function () {
          res.status(err.status)
      }
  })
});


router.patch('/:id',async (req,res,next) => {
    Game.updateOne({_id: req.params.id}, {title: req.body.name, text: req.body.email }).then(() => {
      res.redirect('/Games');
    }).catch(next);
    res.format({
      html: function () {
          res.redirect('/')
      },
      json: function () {
          res.json(Game)
      }
});})


router.delete('/:id', async (req,res) => {
   let id = req.params.id;
    Game.findByIdAndDelete(id).then(() => {
      res.redirect('/');
    }).catch(next);
});

module.exports = router;