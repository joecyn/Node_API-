const express= require("express");
const loginController = require("../../Controllers/UsersControllers/LoginController");
const router =express.Router();
const RegisterController=require("../../Controllers/UsersControllers/RegisterController")
const isAuthenticated=require("../../Middlewares/Auth")
const LogOutController=require("../../Controllers/UsersControllers/LogOutController")

//Register route
router.post("/Register",RegisterController)

//Login  Route
router.post("/Login",loginController)

//Home Route
router.get("/Home",isAuthenticated,(req,res)=>{
    res.status(200).send("Welcome home")
})

router.get("/LogOut",isAuthenticated,LogOutController)
module.exports=router;