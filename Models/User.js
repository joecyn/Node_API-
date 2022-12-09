const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,"Name should be atleast 10 characters"],
        maxLength:[255,"Name  too long"]
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Name should be atleast 8 characters"]
        

    },
    email:{
        type:String,
        required:true,
        unique:true
    }
});

module.exports=mongoose.model("User",userSchema)