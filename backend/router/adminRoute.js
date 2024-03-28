const router = require('express').Router()
const c=require('../controller/adminController')
router.get('/getadmin',c.getadmin)
router.post('/login',c.login)
module.exports= router