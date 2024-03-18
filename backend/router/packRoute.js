const router = require('express').Router()
const packRoute = require('../controller/packController')

router.get('/getPacks',packRoute.getPacks)
router.get('/getPack/:id',packRoute.getPack)
router.get('/get/:id',packRoute.find)
router.post('/addPack',packRoute.add)
router.put('/updatePack/:id',packRoute.updatePack)
router.delete('/deletePack/:id',packRoute.deletePack)

module.exports = router