const router = require('express').Router()
const c=require("../controller/superviserController")
router.post('/create',c.create)
router.get('/getsuper',c.getsuper)


module.exports= router
