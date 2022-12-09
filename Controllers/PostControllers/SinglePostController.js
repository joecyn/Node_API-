const Post=require("../../Models/Post")
const SinglePostController=async (req,res)=>{
    const id= req.params.id;
    try {
        const post=await Post.findById({_id:id})
        if(!post){
            res.status(400).send("No Post found")
        }
        else{
            res.status(200).send(post)
        }
        
    } catch (error) {
        res.status(400).send(error.message)
    }

};
module.exports=SinglePostController