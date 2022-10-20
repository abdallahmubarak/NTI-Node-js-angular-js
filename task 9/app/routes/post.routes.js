const router = require('express').Router()

const postController = require("../controllers/post.controller")
const auth = require("../database/middleware/auth.middleware")

router.post("/add", auth, postController.create)


module.exports = router