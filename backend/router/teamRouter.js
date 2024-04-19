const router = require('express').Router()
const c=require('../controller/teamController')
router.post('/postteam',c.createteam)
router.post('/teamwithoutteam',c.teamwithoutmission)
router.get('/getteam',c.getteam)
module.exports= router