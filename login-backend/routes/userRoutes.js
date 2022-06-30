const express=require('express')
const { createUser, getUser, getAllUsers, fetchToken, deleteUser } = require('../controllers/userController')
const { checkAdmin, checkRole } = require('../middleware/auth')
const checkToken = require('../middleware/jwt')
const router=express.Router()

router.route("/login").post(fetchToken)
router.route("/:empid").get(checkToken,getUser).delete(checkToken,checkRole,deleteUser);
router.route("/").post(checkToken,checkRole,createUser).get(checkToken,checkRole,getAllUsers);



module.exports=router