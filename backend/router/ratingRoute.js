const router = require('express').Router()
const c=require('../controller/ratingController')
router.get('/getrating',c.getrating)
module.exports= router