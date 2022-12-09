const bcrypt=require("bcrypt")
const Joi =require("joi")
const User=require("../../Models/User")
const jwt =require("jsonwebtoken")

const RegisterController=async(req,res)=>{
     //creating JWT token
     const maxAge=3*26*60*60;
     const createToken=(id)=>{
         return jwt.sign({id},process.env.TOKEN_SECRET,{
            expiresIn:maxAge
         });
     }
  
    const schema = Joi.object()
    .keys({
        name:Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$"))
   
  })
    //const result = schema.validate(data);
    const result=schema.validate(req.body)
   // const{name,email,password}=req.body;
    if(result.error)
    {   const Message=result.error.details[0].message
        
        res.status(400).send({Message:Message});
    }
    else{
        const findUser= await User.findOne({email:req.body.email})
        const username=await User.findOne({name:req.body.name})
    if(findUser || username){
        const Message="User already Exists. Please Login "
        
        res.status(400).send({Message:Message});
     
    }
    else{

        try{
            const{name,email,password}=req.body;
            const hashedPassword= await bcrypt.hash(password,10);
            const newUser= await User.create({name:name,email:email,password:hashedPassword})
            //create token
            const token=createToken({id:newUser._id,name:newUser.name});
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
            const user={
                name:newUser.name,
                email:newUser.email
            }
            res.status(200).send({user})
            
        }
        catch(err){
            res.status(200).send(err.message)
            //console.log(err)
        }
    }
    
        
    }
    
    
}
module.exports=RegisterController