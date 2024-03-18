const router = require('express').Router()
const serviceRoute = require('../controller/servicesController')

router.get('/getServices',serviceRoute.getServices)
router.get('/getService/:id',serviceRoute.getService)
router.get('/getServicebycategory',serviceRoute.getServicebyCategory)
// router.get('/get/:id',serviceRoute.find)
router.post('/addService',serviceRoute.add)
router.put('/updateService/:id',serviceRoute.updateService)
router.delete('/deleteService/:id',serviceRoute.deleteService)

module.exports = router