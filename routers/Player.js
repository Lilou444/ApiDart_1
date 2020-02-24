const router = require('express').Router();
const Player = require('../models/Player');


router.get('/', async (req,res) => {
  Player.find({}, function(err, Players) {
    let PlayerMap = {};

    Players.forEach(function(Player) {
      PlayerMap[Player._id] = Player;
    });
    res.send(PlayerMap);
  });

});

router.post('/', async (req,res,next) => {
  if( !req.body.name || req.body.name === '' ||
  !req.body.email || req.body.email === '')
{
  let err = new Error('Please fill all the inputs');
  return next(err);
}
Player.collection.insertOne(req.body).then(() => {
res.redirect('/players');
}).catch(next);

});

router.get('/new', async (req,res,next) => {
  res.format({
    html: function () {
      res.render('formPlayer');
    },
    json: function () {
        res.send('new')
    }
})
});


router.get('/:id',  async (req,res,next) => {
  const Player = await Player.find({_id: req.params.id}).catch(next);
  res.format({
    html: function () {
        res.redirect('/:id/edit')
    },
    json: function () {
        res.send('player')
    }
})
});

router.get('/edit/:id',async (req,res,next) => {
  const Player = await Player.find({_id: req.params.id}).catch(next);
    res.format({
      html: function () {
        res.render('formPlayer')
      },
      json: function () {
          res.status(err.status)
      }
  })
});

router.patch('/:id',async (req,res,next) => {
    Player.updateOne({_id: req.params.id}, {title: req.body.name, text: req.body.email }).then(() => {
      res.redirect('/players');
    }).catch(next);
;})

router.delete('/:id', async (req,res) => {
   let id = req.params.id;
    Player.findByIdAndDelete(id).then(() => {
      res.redirect('/');
    }).catch(next);
});

module.exports = router;