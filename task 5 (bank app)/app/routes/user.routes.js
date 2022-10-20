const router = require("express").Router()
const userController = require("../controller/user.controller")

router.get("/", userController.getHome)//home page

router.get("/add", userController.getAdd)

router.post("/addCustomar", userController.postAddCustomar)

router.get('/single/:id',userController.getSingle)

router.get('/edit/:id',userController.getEdit)
router.post('/editUser:id',userController.postEdit)
router.get("/delete/:id", userController.deleteUser)




module.exports = router