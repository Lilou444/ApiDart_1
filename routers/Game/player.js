const router = require('express').Router()
const Player = require('../../models/player')

/* Players : liste */

// Get All
router.get('/', function(req, res, next) {
  let limit = parseInt(req.query.limit) || 20
  let offset = parseInt(req.query.offset) || 0
  if (limit > 100) limit = 100

  Promise.all([
    Player.getAll(limit, offset),
    Player.count()
  ]).then((results) => {
    res.format({
      html: () => {
        res.render('Players/index', {
          Players: results[0],
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

// Add player
router.post('/', (req, res, next) => {
  if (
    !req.body.name || req.body.name === '' ||
    !req.body.email || req.body.email === '' 
  ) {
    let err = new Error('Bad Request')
    err.status = 400
    return next(err)
  }

  Player.insert(req.body).then(() => {
    res.format({
      html: () => { res.redirect('/players') },
      json: () => { res.status(201).send({message: 'success'}) }
    })
  }).catch(next)
})

// New player
router.get('/new', function(req, res, next) {
  res.format({
    html: () => {
      res.render('players/edit', {
        Player: {},
        action: '/players'
      })
    },
    json: () => {
      let error = new Error('Bad Request')
      error.status = 400
      next(error)
    }
  })
})

// Edit player
router.get('/:id/edit', function(req, res, next) {
  Player.get(req.params.PlayerId).then((Player) => {
    if (!Player) return next()

    res.format({
      html: () => {
        res.render('players/form', {
          Player: Player,
          action: `/players/${Player.rowid}?_method=put`
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

// Get player by Id
router.get('/:id', (req, res, next) => {
  Player.get(req.params.id).then((Player) => {
    if (!Player) return next()

    res.format({
      html: () => { res.render('players/show', { Player: Player }) },
      json: () => { res.send({ data: Player }) }
    })
  }).catch(next)
})

// Edit player
router.patch('/:id', (req, res, next) => {
  Player.update(req.params.id, req.body).then(() => {
    res.format({
      html: () => { res.redirect(`/players/${req.params.id}`) },
      json: () => { res.status(200).send({ message: 'success' }) }
    })
  }).catch(next)
})

// Delete player
router.delete('/:id', (req, res, next) => {
  Player.remove(req.params.id).then(() => {
    res.format({
      html: () => { res.redirect(`/players`) },
      json: () => { res.status(200).send({ message: 'success' }) }
    })
  }).catch(next)
})

module.exports = router
