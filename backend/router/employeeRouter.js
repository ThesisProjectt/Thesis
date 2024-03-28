const router = require('express').Router()
const c=require('../controller/employeeController')
router.get('/getemployee',c.getEmployee)
router.post('/postemployee',c.postEmployee)
router.put('/updateemployeeteam/:id',c.updateEmployeeteam)
router.get('/getEmployee/:id',c.getbyTeamId)
module.exports= router