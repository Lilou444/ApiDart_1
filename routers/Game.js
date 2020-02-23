const router = require('express').Router()
const Game = require('../models/Game/Game')

/* Games : liste */

// Get All
router.get('/', function(req, res, next) {
  let limit = parseInt(req.query.limit) || 20
  let offset = parseInt(req.query.offset) || 0
  if (limit > 100) limit = 100

  Promise.all([
    Game.getAll(limit, offset),
    Game.count()
  ]).then((results) => {
    res.format({
      html: () => {
        res.render('Games/index', {
          Games: results[0],
          count: results[1].count,
          limit: limit,
          offset: offset
        })
      },
      json: () => {
         //
      }
    })
  }).catch(next)
})

// Add Game
router.post('/', (req, res, next) => {
  if (
    !req.body.name || req.body.name === '' ||
    !req.body.email || req.body.email === '' 
  ) {
    let err = new Error('Bad Request')
    err.status = 400
    return next(err)
  }

  Game.insert(req.body).then(() => {
    res.format({
      html: () => { res.redirect('/Games') },
      json: () => { res.status(201).send({message: 'success'}) }
    })
  }).catch(next)
})

// New Game
router.get('/new', function(req, res, next) {
  res.format({
    html: () => {
      res.render('Games/edit', {
        Game: {},
        action: '/Games'
      })
    },
    json: () => {
      let error = new Error('Bad Request')
      error.status = 400
      next(error)
    }
  })
})

// Edit Game
router.get('/:id/edit', function(req, res, next) {
  Game.get(req.params.GameId).then((Game) => {
    if (!Game) return next()

    res.format({
      html: () => {
        res.render('Games/form', {
          Game: Game,
          action: `/Games/${Game.rowid}?_method=put`
        })
      },
      json: () => {
        let error = new Error('Bad Request')
        error.status = 400
        next(error)
      }
    })
  }).catch(next)
})

// Get Game by Id
router.get('/:id', (req, res, next) => {
  Game.get(req.params.id).then((Game) => {
    if (!Game) return next()

    res.format({
      html: () => { res.render('Games/show', { Game: Game }) },
      json: () => { res.send({ data: Game }) }
    })
  }).catch(next)
})

// Edit Game
router.patch('/:id', (req, res, next) => {
  Game.update(req.params.id, req.body).then(() => {
    res.format({
      html: () => { res.redirect(`/Games/${req.params.id}`) },
      json: () => { res.status(200).send({ message: 'success' }) }
    })
  }).catch(next)
})

// Delete Game
router.delete('/:id', (req, res, next) => {
  Game.remove(req.params.id).then(() => {
    res.format({
      html: () => { res.redirect(`/Games`) },
      json: () => { res.status(200).send({ message: 'success' }) }
    })
  }).catch(next)
})

module.exports = router
