const router = require('express').Router();
const Game = require('../models/Game/Game');


router.get('/', async (req,res) => {
  res.send('Dart player');

  Player.find({}, function(err, Players) {
    let PlayerMap = {};

    Players.forEach(function(Player) {
      PlayerMap[Player._id] = Player;
    });

    res.send(PlayerMap);
  });

});

router.get('/:id',  async (req,res,next) => {

    const Player = await Player.find({_id: req.params.id}).catch(next);
    res.send(Player);
});


router.post('/add', async (req,res,next) => {
    if( !req.body.title || req.body.title === '' ||
        !req.body.text || req.body.text === '')
      {
        let err = new Error('Please fill all the inputs');
        return next(err);
      }
    Player.collection.insertOne(req.body).then(() => {
      res.redirect('/api/Players');
    }).catch(next);
});

router.put('/edit/:id',async (req,res,next) => {
    Player.updateOne({_id: req.params.id}, {title: req.body.title, text: req.body.text }).then(() => {
      res.redirect('/api/Players');
    }).catch(next);
});


router.delete('/delete/:id', async (req,res) => {
   let id = req.params.id;
    Player.findByIdAndDelete(id).then(() => {
      res.redirect('/');
    }).catch(next);
});
module.exports = router;