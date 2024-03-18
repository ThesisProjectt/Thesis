const router = require('express').Router()
const client=require('../controller/clientController')
// const {checkToken} = require("../middleware/authorization")

// router.use(checkToken)
router.get('/getclient', client.getClient)
router.get('/getimg/:id', client.getImgClient)
router.post("/signup", client.signUp);
router.post("/login", client.login );
router.put("/newpwd", client.changePassword)
router.get('/profile/:id', client.findOneClient)
router.put('/update/:id', client.updateClient)
router.get('/oneclient/:id',client.getoneclient)
router.put('/updateclient/:id',client.updateuser)

module.exports= router