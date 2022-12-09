const Post=require("../../Models/Post")
const AllPostsController=async (req,res)=>{
    try {
        const Posts=await Post.find().populate("author");
        if(Posts.length > 0){
            res.status(200).send({Posts})
        }
        else{
            res.status(200).send("There are no Posts")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }

};
module.exports=AllPostsController