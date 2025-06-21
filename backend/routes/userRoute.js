const express=require("express").Router();
const userController=require('../controller/userController')


express.post("/signup",userController.userSignUp)
express.post("/login",userController.userLogin)
express.get("/user/:id",userController.getUser)

module.exports=express;