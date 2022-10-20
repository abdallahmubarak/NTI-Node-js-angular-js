const userModel = require("../database/models/user.model")
const auth =require('../database/middleware/auth.middleware')
class User{
    static register = async(req,res)=>{
        try{
            const userData = new userModel(req.body)
            await userData.save()
            res.status(200).send({apiStatus:true, data: userData, message:"user added"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e, message:e.message})
        }
    }
    static index = async(req,res)=>{
        try{
            const users = await userModel.find()
            res.status(200).send({apiStatus:true, data:users, message:"all data fetched"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e, message:e.message})
        }
    }
    static single = async(req,res)=>{
        try{
            const users = await userModel.findById(req.params.id)
            // const users = await userModel.findOne({_id:req.params.id})
            if(!users) throw new Error("user not found")
            res.status(200).send({apiStatus:true, data:users, message:"all data fetched"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e, message:e.message})
        }
    }
    static delSingle = async(req,res)=>{
        try{
            const users = await userModel.findByIdAndDelete(req.params.id)
            // const users = await userModel.deleteOne({_id:req.params.id})
            if(!users) throw new Error("user not found")
            res.status(200).send({apiStatus:true, data:users, message:"all data fetched"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e, message:e.message})
        }
    }
    static delMany = async(req,res)=>{
        try{
            const users = await userModel.deleteMany()
            // const users = await userModel.remove()
            res.status(200).send({apiStatus:true, data:users, message:"all data fetched"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e, message:e.message})
        }

    }
    static login = async(req,res)=>{
        try{
            const userData = await userModel.login(req.body.email, req.body.password)
            const token = await userData.generateToken()
            res.status(200).send({apiStatus:true, data:userData,token, message:"logged in"})
        }
        catch(e){
            res.status(500).send({apiStatus:false, data:e, message:e.message})
        }
    }
    static profile =async(req,res)=>{
        try {
            res.send({apiStatus:true,data:req.user,message:'data fetched'})

        } catch (e) {
            res.status(500).send({apiStatus:false, data:e, message:e.message})

        }
    }
    static changeStatus =async(req,res)=>{
        try {
            if(req.header('status')=='activate'){
                if(req.user.status) throw new Error('already active')
                req.user.status=true
                await req.user.save()
            }else if(req.header('status'=='deactivate')){
                if(!req.user.status) throw new Error('already active')
                req.user.status=false
                await req.user.save()
            }
            else throw new Error('invalid status')
            res.send({apiStatus:true,data:req.user,message:'changed'})

        } catch (e) {
            res.status(500).send({apiStatus:false, data:e, message:e.message})

        }
    }
    static edit=async(req,res)=>{
        try {
            const keys = Object.keys(req.body)
            const allowedEdits = ["name", "email"]
            const valid =keys.every((el) => allowedEdits.includes(el))
            if(!valid) throw new Error('invalid edit key')
            keys.forEach((k)=>req.body[k]=req.body[k])
            await req.user.save()
            res.status(200).send({apiStatus:true,data:userEdit, message:"user edited"})

           }
           catch (e) {
            res.status(500).send({apiStatus:false, data:e, message:e.message})
           }
    
        }
    static logOut =async(req,res)=>{
        try {

            req.user.tokens=req.user.tokens.filter(t=> t.token != req.token)
            await res.user.save()
            res.status(200).send({apiStatus:true,data:'', message:"log out"
        })
        } catch (e) {
            res.status(500).send({apiStatus:false, data:e, message:e.message})

        }
    }
    
    static logOutAll =async(req,res)=>{
        try {
            req.user.tokens=[]
            // await userModel.findByIdAndUpdate({_id:req.user._id},
            // {tokens:[]},
            //   {runValidators:true})
           await req.user.save()
            res.status(200).send({apiStatus:true,data:'', message:"log out"
        })
        } catch (e) {
            res.status(500).send({apiStatus:false, data:e, message:e.message})

        }
    }

}
module.exports=User