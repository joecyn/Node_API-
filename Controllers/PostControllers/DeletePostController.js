const Post=require("../../Models/Post")
const DeletePostController=async (req,res)=>{
    const id =req.params.id;
    const userId=req.user.id;
    try {
       
        const post= await Post.findById({_id:id})
        
        if(!post){
            res.status(400).send("Post not found")
        }
        const postAuthorId=post.author._id
        console.log(JSON.stringify(postAuthorId))
        //console.log(postAuthorId)
        //console.log(JSON.stringify(userId))
        
        if(JSON.stringify(postAuthorId)===JSON.stringify(userId)){
            await Post.findByIdAndDelete({_id:id})
            res.status(200).send("Post deleted")
        }
        else{
            res.status(400).send("Cannot delete the post")
        }
        

    } catch (error) {
        res.status(400).send(error.message)
    }

};
module.exports=DeletePostController