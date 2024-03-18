const router = require('express').Router()
const categoryRoute = require('../controller/categoryController')

router.get('/getCategories',categoryRoute.getCatgories)
router.get('/getCategory/:id',categoryRoute.getCategory)
router.post('/addCategory',categoryRoute.add)
router.put('/updateCategory/:id',categoryRoute.updateCategory)
router.delete('/deleteCategory/:id',categoryRoute.deleteCategory)

module.exports = router