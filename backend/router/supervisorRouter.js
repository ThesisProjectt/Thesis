const router = require('express').Router()
const c=require("../controller/superviserController")
router.post('/create',c.create)
module.exports= router
