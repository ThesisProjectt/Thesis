const router = require('express').Router()
const c=require('../controller/adminController')
router.get('/getadmin',c.getadmin)
module.exports= router