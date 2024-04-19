const router = require('express').Router()
const c=require('../controller/missionController.js')

router.post('/createmission',c.cr)
router.get('/getmission',c.getAll)
// router.get('/getMyMission/:id',c.findd)
router.get('/getMission/:id',c.find)
// router.post('/postmission',c.create)
router.get('/getmission/:id',c.find)
router.put('/update/:id',c.update)
module.exports= router