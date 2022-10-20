const router = require("express").Router()
const userController =  require("../controllers/post.controller")

router.post('/add',userController.addPost)

module.exports = router