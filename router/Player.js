const router = require('express').Router()

router.get('/', async (req, res, next) => {
    // get all 
})

router.get('/new', (req, res, next) => {
   // new 
})

router.get('/:id', async (req, res, next) => {
   //get by id
})

router.get('/:id/edit', (req, res, next) => {
   //get form
})

router.patch('/:id', (req, res, next) => {
   // get patch by id
})

router.delete('/:id', async (req, res, next) => {

  // delete
})

module.exports = router
