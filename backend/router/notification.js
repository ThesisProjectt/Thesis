const router = require('express').Router()
const c = require('../controller/notificationController')

router.post('/postnotification',c.create)
router.get('/getall/:id', c.fetchNotification)
router.delete('/delete/:id', c.removeNotifications)

module.exports= router