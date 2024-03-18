const router = require('express').Router()
const c=require('../controller/requestController')
router.post('/postrequest',c.create)
router.get('/getrequest',c.getAll)
module.exports= router