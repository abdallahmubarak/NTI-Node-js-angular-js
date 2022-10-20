const router = require("express").Router()
const User = require("../controllers/user.controller")
//const {auth, authAdmin, authUser} = require("../middleware/auth.middleware")
router.post('/register', User.register)
router.post("/login", User.login)
router.get('/logout',User.logOut)
//router.get("/me", auth,authUser,User.me)

// const multer  = require('multer')
// const upload = multer({ dest: 'static/' })
// router.post("/imgUpload",auth, upload.single("img"), User.addImgProfile)

//const upload = require("../middleware/fileUpload.middleware")
//router.post("/imgUpload", auth,upload.single("img"), User.addImg)
module.exports = router