const router = require('express').Router()
const packhasRoute = require('../controller/packhaservices')

router.get('/getAllPacks',packhasRoute.getAllPacks)
router.get('/getOnePack/:id',packhasRoute.getOnePack)
// router.get('/getservives/:id',packhasRoute.find)
router.post('/addAPack',packhasRoute.add)
// router.put('/updateThisPack/:id',packhasRoute.updateThisPack)
router.put('/updateThisPack',packhasRoute.updateService)
router.delete('/deleteThisPack/:id',packhasRoute.deleteThisPack)
router.delete('/deleteFromPack',packhasRoute.deleteFromPack)

module.exports = router