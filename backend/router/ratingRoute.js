const router = require('express').Router()
const c=require('../controller/ratingController')

router.get('/getrating',c.getrating)
router.post('/giverate', c.giveRate)

module.exports= router