const router = require('express').Router()
const packRoute = require('../controller/client')

router.get('/getClients',packRoute.getClients)
router.get('/getClient/:id',packRoute.getClient)
router.post('/addClient',packRoute.add)
router.put('/updateClient/:id',packRoute.updateClient)
router.delete('/deleteClient/:id',packRoute.deleteClient)


module.exports = router