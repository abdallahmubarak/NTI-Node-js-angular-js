const e = require("express")
const postModel = require("../database/models/post.model")
class Post{
    static create =async(req,res)=>{
        try {
            const postData =new postModel({...req.body,userId: req.user._id})
            await postData.save()
            res.status(200).send({apiStatus:true, data:postData, message:"post add"})

            
        } catch (error) {
            res.status(500).send({apiStatus:true, data:e, message:e.message})
        }
    }
    static myPosts =async(req,res)=>{
        try {
            await req.user.populate("MyPosts")
            res.status(200).send({
                data:req.user.myPosts,
                message:"data true",
                apiStatus:true
            })
        
            
        } catch (error) {
            res.status(500).send({apiStatus:true, data:e, message:e.message})
        }
    }

}
module.exports=Post