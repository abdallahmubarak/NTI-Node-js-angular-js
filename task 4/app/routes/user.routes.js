const router = require("express").Router()
const userController = require("../controller/user.controller")
router.get("/add", userController.add)
router.get("/addMethod",userController.addMethod)
router.get("/addPost", userController.addPost)
router.post("/addPostMethod", userController.addPostMethod)
router.get("/", userController.showAll)

router.get("/single/:id", userController.single) //req.params
router.get("/edit/:id",userController.edit)
router.get("/delete/:id", userController.del)
router.post("/editLogic/:id", userController.editLogic)
module.exports = router