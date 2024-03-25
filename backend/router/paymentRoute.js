const router = require('express').Router()
const packRoute = require('../controller/paymentController')

router.post('/payment',packRoute.Add)
router.post('/verify/:id',packRoute.Verify)
router.get('/success',packRoute.Success)
router.get('/fail',packRoute.Fail)

module.exports = router