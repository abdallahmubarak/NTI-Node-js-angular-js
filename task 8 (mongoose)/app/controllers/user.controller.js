const bcrypt =require('bcryptjs')
const userModel=require('../db/models/user.models')

class User{
static register =async(req,res)=>{
    try{
        const userData= new userModel(req.body)
        await userData.save()
        res.status(200).send({apiStatus:true,data:userData,message:"user added"})

    }catch(e){
res.status(400).send({apiStatus:false,data:e,message:e.message})
        
    }
}

static index =async(req,res)=>{
    try{
        const userData= new userModel(req.body).find()
        await userData.save()
        res.status(200).send({apiStatus:true,data:userData,message:"index"})

    }catch(e){
res.status(400).send({apiStatus:false,data:e,message:e.message})
        
    }
}


static single =async(req,res)=>{
    try{
        const userData= new userModel.findById(req.params.id)
        
        await userData.save()
        res.status(200).send({apiStatus:true,data:userData,message:"this is user "})

    }catch(e){
res.status(400).send({apiStatus:false,data:e,message:e.message})
        
    }
}

static delUser =async(req,res)=>{
    try{
        const userData= new userModel.findByIdAndDelete(req.params.id)
        await userData.save()
        res.status(200).send({apiStatus:true,data:userData,message:"user delet"})

    }catch(e){
res.status(400).send({apiStatus:false,data:e,message:e.message})
        
    }
}


static delAllUser =async(req,res)=>{
    try{
        const userData= new userModel.deleteMany()
        await userData.save()
        res.status(200).send({apiStatus:true,data:userData,message:"users deleteed"})

    }catch(e){
res.status(400).send({apiStatus:false,data:e,message:e.message})
        
    }
}
}

module.exports = User