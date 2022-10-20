const router = require('express').Router()
const User = require("../controllers/user.controller")
const auth = require("../database/middleware/auth.middleware")


router.post("/register", User.register)
router.post("/login", User.login)

router.get("/", auth,User.index)
router.get("/single/:id",auth, User.single)

router.get("/changeStatus", auth,User.changeStatus)
router.get("/edit", auth,User.edit)


router.delete("/", auth,User.delMany)
router.delete("/single/:id",auth, User.delSingle)
router.post("/me", auth,User.profile)
router.post("/logout", auth,User.logOut)

module.exports = router