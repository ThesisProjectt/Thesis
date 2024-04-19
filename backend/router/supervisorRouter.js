const router = require('express').Router()
const c=require("../controller/superviserController")
router.post('/create',c.create)
router.get('/getsuper',c.getsuper)
router.get('/service/:id',c.ser)
router.post('/login',c.login)
router.get('/getsupermission/:id',c.supmission)
router.get('/suppermission/:id',c.suppmission)
module.exports= router
