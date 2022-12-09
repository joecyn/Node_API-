const express=require("express");
const mongoose=require("mongoose");
const dotenv =require("dotenv")
const cookieParser= require("cookie-parser");
const app=express();
const PostRoutes=require("./Routes/Post/PostRoutes");
const UserRoutes=require("./Routes/User/UserRoutes")

//Middlewares
dotenv.config()
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/posts",PostRoutes);
app.use("/api/users", UserRoutes)

//DATABASE CONNCETION
mongoose.connect("mongodb://0.0.0.0:27017/API_USERS")
        .then(()=>{
            console.log("Connected!")
        })
        .catch((err)=>{
            console.log(err)
        })




app.listen(3000,()=>{
    console.log("Server running");
});