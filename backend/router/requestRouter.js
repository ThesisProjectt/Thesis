const router = require('express').Router()
const c=require('../controller/requestController')
const {checkToken} = require("../middleware/authorization")

// router.use(checkToken)
router.post('/postrequest',c.create)
router.get('/getrequest',c.getAll)
router.get('/getonlyrequest',c.getonlyrequest)
router.delete("/deletreq/:id",c.deleted)
module.exports= router