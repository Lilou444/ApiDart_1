const router = require('express').Router();
const Player = require('../models/Player');


router.get('/', async (req,res) => {
  Player.find(function(err, player) {
    if (err) {
      console.log(err);
    } else {
      res.render('listPlayer', { player: player });
      console.log(player);
    }
});
})


router.post('/', async (req,res,next) => {
  if( !req.body.name || req.body.name === '' ||
  !req.body.email || req.body.email === '' )
{
  let err = new Error('Please fill all the inputs');
  return next(err);
}
Player.collection.insertOne(req.body).then(() => {
  res.redirect('/players');
}).catch(() =>{
   res.status(201).json('player')
})
});

router.get('/new', async (req,res,next) => {
  res.format({
    html : () => {
      res.render('formPlayer',{
        id: "",
        name: "",
        email: "",
        method: 'POST'
      })
    },
    json : () => {
      res.status(406).json('NOT_API_AVAILABLE')
    }
  })

});


router.get('/:id', async (req, res, next) => {

  Player.findById({_id: req.params.id})
  .then((player) => {
    res.format({
      html : () => {
        res.redirect('/players/' + req.params.id + '/edit')
      },
      json : () => {
        res.json(player)
      }
    })
  })
  .catch((err) => {
    return next(err)
  })
})

router.get('/:id/edit', (req, res, next) => {

  Player.findOne({_id: req.params.id})
  .then((player) => {
    res.format({
      html : () => {
        res.render('formPlayer', {
          id: req.params.id,
          name: player.name,
          email: player.email,
          method: 'PATCH'
        })
      },
      json : () => {
        res.status(406).send('NOT_API_AVAILABLE')
      }
    })

  })
  .catch((err) => {
    return next(err)
  })
})




router.patch('/:id', (req, res, next) => {
  const body = {}
  if(req.body.name !== undefined){
    body.name = req.body.name
  }
  if(req.body.email !== undefined){
    body.email = req.body.email
  }
  console.log(body)
  Player.findByIdAndUpdate({_id: req.params.id}, body, () => {
      res.format({
          html: () => {
              Player.find().then((player) =>{
                res.render('listPlayer',{
                  player: player
                });
              });
          },
          json: async () => {
              const player = await Player.findOne({_id: req.params.id})
              res.json(player)
          }
      })
  })
})



router.delete('/:id', async (req, res, next) => {
  Player.findByIdAndDelete({_id: req.params.id}, () => {
      res.format({
          html: () => {
            res.render('listPlayer', {
              player: player,
              method: 'DELETE'
            })
          },
          json: () => {
              res.status(204).send()
          }
      })
  })

})




module.exports = router;