const router = require('express').Router()
const c=require('../controller/missionController')

router.get('/getmission',c.getAll)
<<<<<<< HEAD
// router.get('/getMyMission/:id',c.findd)
router.get('/getMission/:id',c.find)
router.post('/postmission',c.create)
=======
router.get('/getmission/:id',c.find)
>>>>>>> d9a02e677b5687487e457f408e2a8bb8761169ed

module.exports= router