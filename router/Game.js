const router = require('express').Router()
const {
    UnprocessableError,
    NotAvailableError,
    HttpError
} = require('../errors/HttpError')
const GameModel = require('./../models/Game')
const GamePlayerModel = require('./../models/GamePlayer')
const GameShotModel = require('./../models/GameShot')
const PlayerModel = require('./../models/Player')
const Game = require('./../engine/gamemodes/301')

router.get('/', async (req, res, next) => {
   //get
})


router.post('/', (req, res, next) => {
  // post
})


router.get('/new', (req, res, next) => {
   // new
})


router.get('/:id', async (req, res, next) => {
   // get by id 
})



router.get('/:id/edit', (req, res, next) => {
// edit
})

router.patch('/:id', async (req, res, next) => {

 //patch
})

router.delete('/:id', async (req, res, next) => {

   // delete
})

