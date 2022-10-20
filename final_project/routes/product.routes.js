const router = require("express").Router()
const Product =require('../controllers/product.controller')
const {auth, authAdmin, authUser} = require("../middleware/auth.middleware")

router.post('/addproduct',auth,Product.addProduct)

module.exports = router