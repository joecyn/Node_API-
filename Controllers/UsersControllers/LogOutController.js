
const LogOutController=(req,res)=>{
    res.cookie("jwt"," ",{maxAge:1});
    res.status(200).send("Logged Out")
}

module.exports=LogOutController