const router = require('express').Router()
const c=require('../controller/reportController')
router.post('/postereport',c.create)
module.exports= router