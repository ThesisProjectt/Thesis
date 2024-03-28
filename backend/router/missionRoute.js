const router = require('express').Router()
const c=require('../controller/missionController')

router.get('/getmission',c.getAll)
// router.get('/getMyMission/:id',c.findd)
router.get('/getMission/:id',c.find)
// router.post('/postmission',c.create)
router.get('/getmission/:id',c.find)

module.exports= router