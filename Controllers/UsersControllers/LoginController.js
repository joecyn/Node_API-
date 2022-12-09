const User=require("../../Models/User");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken")
const Joi =require("joi")
const loginController=async(req,res)=>{
    //creating JWT token
    const maxAge=3*26*60*60;
    const createToken=(id,name)=>{
       return jwt.sign({id,name},process.env.TOKEN_SECRET,{
           expiresIn:maxAge
       });
       
    }
    const schema = Joi.object()
    .keys({
        
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$"))
   
  })
   
    const result=schema.validate(req.body)
    if(result.error)
    {   const Message=result.error.details[0].message
        res.status(400).send({Message:Message});
    }
    try{
    const{email,password}=req.body;
    
    
    const findUser= await User.findOne({email:email})
    if(!findUser) {
        const Message="User does not Exist please Register";
        res.status(400).send({Message:Message});
        
    } 
    

    const match= await bcrypt.compare(password,findUser.password)

    if(!match) {
        const Message ="Invalid password or User name";
        res.status(400).send({Message:Message});
        
    }
    else{
        
        const token=createToken(findUser._id,findUser.name);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(200).send("Logged in");
        
    }
    
    
    
    }
    catch(err){
        res.status(400).send(err.message);
        console.log(err)
    }
    

}
module.exports=loginController;
