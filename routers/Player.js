const router = require('express').Router();
const Player = require('../models/Player');


router.get('/', async (req,res) => {
  const players = await Player.find({}, function(err, Players) {
    let PlayerMap = {};

    Players.forEach(function(Player) {
      PlayerMap[Player._id] = Player;
    });
    res.send(PlayerMap);
  });
  res.format({
    html: function () {
      res.render('listPlayer');
    },
    json: function () {
        res.send(players)
    }
});
})

router.post('/', async (req,res,next) => {

  const player = new Player({
    name: req.body.name,
    email: req.body.email,
  })

  player.save((newPlayer) => {
    res.format({
      html: function () {
        res.redirect('formPlayer'+ newPlayer.id);
      },
      json: function () {
        const player = await Player.collection.insertOne(newPlayer)
        res.json(player)
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
// const players = await Player.collection.insertOne(req.body).then(() => {
// res.redirect('/players');
// }).catch(next);
// res.format({
//   html: function () {
//     res.render('formPlayer');
//   },
//   json: function () {
//       res.send('new')
//   }
// });

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
        res.json(Player)
    }
})
});

router.get('/edit/:id',async (req,res,next) => {
    res.format({
      html: function () {
        const Player = await Player.find({_id: req.params.id}).catch(next);
        res.render('formPlayer',{Player})
      },
      json: function () {
          res.render('error')
      }
  })
});

router.patch('/:id',async (req,res,next) => {
    Player.findByIdAndUpdate({_id: req.params.id}, {title: req.body.name, text: req.body.email }).then(() => {
      res.format({
        html: function () {
          res.render('/players')
        },
        json: function () {
            res.json('error')
        }
    })
    }).catch(next);
;})

router.delete('/:id', async (req,res) => {
   let id = req.params.id;
    Player.findByIdAndDelete(id, () => {
      res.format({
        html: function () {
          res.render('/players')
        },
        json: function () {
            res.json('error')
        }
    })
    })
});

module.exports = router;