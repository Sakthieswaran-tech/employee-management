const express=require('express')
const { createUser, getUser } = require('../controllers/userController')
const router=express.Router()


router.route("/login").post(getUser)

router.route("/").post(createUser)

module.exports=router