const router = require("express").Router()
const userController =  require("../controllers/user.controller")

router.post('/register',userController.register)
router.get('/',userController.index)
router.get('/single/:id',userController.single)
router.delete('/',userController.delUser)
router.delete('/single/:id',userController.delAllUser)
module.exports = router