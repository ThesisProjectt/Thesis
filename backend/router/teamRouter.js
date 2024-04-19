const router = require('express').Router()
const c=require('../controller/teamController')
router.post('/postteam',c.createteam)
router.get('/getteam/:id',c.getAllTeam)
module.exports= router