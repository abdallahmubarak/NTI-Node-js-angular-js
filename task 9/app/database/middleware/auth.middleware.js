const jwt=require('jsonwebtoken')
const userModel=require('../models/user.model')
const auth =async(req,res,next)=>{
        try{
            const token =req.header('Authorization').replace('bearer','')
            const decoded =jwt.verify(token,process.env.JWTKEY)
            const userData =await userModel.findOne({
                _id:decoded._id,
                'tokens.token':token
            })
            if(!userData) throw new Error('unauthorzed')
            req.token =token
            req.user=userData
            next()
            res.status(200).send({apiStatus:true, data:userData,token, message:"logged in"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e, message:e.message})
        }
    }

    
module.exports=auth