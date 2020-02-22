const router = require('express').Router()


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

