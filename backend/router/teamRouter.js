const router = require('express').Router()
const c=require('../controller/teamController')
router.post('/postteam',c.createteam)
module.exports= router