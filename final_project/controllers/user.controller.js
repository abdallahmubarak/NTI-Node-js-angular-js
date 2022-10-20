const {resBuilder} = require("../helper/app.helper")
const userModel = require("../models/user.model")
const adminModel = require("../models/user.model")

// const fs=require("fs")
// const path= require("path")
class User{
       //Register Endpoint (Post) finshed
       static register = async(req,res)=>{
        try{
            const userData =new userModel(req.body)
            userData.userType="user"
            await userData.save()
            resBuilder(res,true, userData, " admin added")
        }
        catch(e){
            resBuilder(res,false, e, e.message)
        }
    }
       //Log in Endpoint (Post) finshed
       static login = async(req,res)=>{
        try{
            const userData = await userModel.login(req.body.email, req.body.password)
            const token = await userData.generateToken()
            resBuilder(res,true, {userData, token}, "log in")
        }
        catch(e){
            resBuilder(res,false, e, e.message)
        }
    }

    static logOut = async(req,res)=>{
        try{
            req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
            await req.user.save();      
        resBuilder(res,true, req.user , "logged out")
        }
        catch(e){
            resBuilder(res,false, req.user , e.message)

        }
    }
    
    // static addImgProfile = async(req,res)=>{
    //     try{
    //         fs.renameSync(req.file.path, `${req.file.path}${path.extname(req.file.originalname)}`)
    //         req.user.profileImage = `${req.file.path}${path.extname(req.file.originalname)}`
    //         await req.user.save()
    //         resBuilder(res, true, req.user, "addded")
    //     }
    //     catch(e){
    //         resBuilder(res, false, e, e.message)
    //     }
    // }
static addImg = async(req,res)=>{
 try{
    
    req.user.profileImage = req.file.path.replace("static\\", "")
    await req.user.save()
    resBuilder(res, true, req.user, "done")
 }
 catch(e){
    resBuilder(res, false, e, e.message)
 }
}
}
module.exports=User