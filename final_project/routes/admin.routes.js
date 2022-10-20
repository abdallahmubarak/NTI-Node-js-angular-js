const router = require("express").Router()
const Admin=require('../controllers/admin.controller')
const {auth, authAdmin, authUser} = require("../middleware/auth.middleware")

//

module.exports = router