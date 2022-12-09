const Post=require("../../Models/Post")
const Joi =require("joi")
const NewPostController=async (req,res)=>{
    const schema = Joi.object()
    .keys({
            title:Joi.string().required(),
            content: Joi.string().required(),
            author:Joi.string().required(),
        })

        const result=schema.validate(req.body)
        if(result.error)
        {   const Message=result.error.details[0].message
            
            res.status(400).send({Message:Message});
        }
        const{title,content,author}=req.body;

        try {
            await Post.create({
                title:title,
                content:content,
                author:author
            })
            res.status(200).send("Post Created")
            
        } catch (error) {
            res.status(400).send(error.message)
        }

};
module.exports=NewPostController