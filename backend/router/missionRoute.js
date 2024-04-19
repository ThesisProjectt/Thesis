const router = require('express').Router()
const c=require('../controller/missionController')

router.get('/getmission',c.getAll)
router.get('/getmission/:id',c.find)
router.put('/update/:id',c.update)
module.exports= router