const express= require("express");
const AllPostsController = require("../../Controllers/PostControllers/AllpostsController");
const DeletePostController = require("../../Controllers/PostControllers/DeletePostController");
const NewPostController=require("../../Controllers/PostControllers/NewPostController")
const SinglePostController=require("../../Controllers/PostControllers/SinglePostController")
const isAuthenticated = require("../../Middlewares/Auth");

const router =express.Router()

//Getting all the Posts
router.get("/Posts",isAuthenticated,AllPostsController);

//Creating New Posts
router.post("/NewPost",isAuthenticated,NewPostController)


//Deleting a Post

router.delete("/delete/:id",isAuthenticated,DeletePostController)

//Single Post

router.get("/singlePost/:id",isAuthenticated,SinglePostController)
module.exports=router;