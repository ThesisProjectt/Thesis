const router = require('express').Router()
const c=require('../controller/notificationController')
router.post('/postnotification',c.create)
module.exports= router