
const jwt=require("jsonwebtoken")
const isAuthenticated= (req,res,next)=>{
    try{
    const token=req.cookies.jwt
       
        if(token){
            
            jwt.verify(token,process.env.TOKEN_SECRET,async(err,user)=>{
                if(err){
                    
                    res.status(400).send("Invalid token")
                }
                else{
                    
                    req.user=user;
                    next(); 
                }
            })
        }
        else{
            
            res.status(400).send("Not allowed")
            
            
        }

    }
    catch(err){
        console.log(err)
    }
}
module.exports=isAuthenticated;