const router = require('express').Router()
const c=require("../controller/superviserController")
router.post('/create',c.create)
<<<<<<< HEAD
router.get('/getSuper',c.find)
=======
router.get('/getsuper',c.getsuper)


>>>>>>> d9a02e677b5687487e457f408e2a8bb8761169ed
module.exports= router
