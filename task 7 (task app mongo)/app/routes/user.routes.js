const router = require('express').Router()
const User = require('../controllers/user.controller')


router.get("/", User.index)//home

router.get("/add", User.add)
router.post("/add", User.addLogic)


router.get("/editStatus/:id", User.edit)
router.put("/editLogic/:id", User.editLogic)


router.get("/user/:id", User.single)



router.get("/del/:id", User.delUser)



module.exports = router