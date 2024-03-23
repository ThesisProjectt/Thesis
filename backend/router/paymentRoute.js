const router = require('express').Router()
const packRoute = require('../controller/paymentController')

router.post('/payment',packRoute.Add)
router.post('/verify/:id',packRoute.Verify)
// router.get('/success',packRoute.success)
// router.get('/fail',packRoute.fail)

module.exports = router