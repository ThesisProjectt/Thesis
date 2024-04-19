const router = require('express').Router()
const c=require("../controller/superviserController")
router.post('/create',c.create)
// router.get('/getSuper',c.find)
router.get('/getsuper',c.getsuper)
router.get('/suppermission/:id',c.suppmission)

router.get("/getall",c.getalls)
router.get("/supernotteam",c.supernotuncludeteam)
module.exports= router
