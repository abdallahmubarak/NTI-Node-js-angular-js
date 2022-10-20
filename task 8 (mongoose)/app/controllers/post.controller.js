const postModel=require('../db/models/user.models')

class Post{

    static addPost =async(req,res)=>{
        try {
            const postData=new postModel(...req.body)
            await postData.save()
            res.status(200).send({apiStatus:true, data:postData, message:"data add"})

            
        } catch (error) {
            res.status(500).send({apiStatus:false, data:e, message:e.message})

        }
    }
}

module.exports = Post