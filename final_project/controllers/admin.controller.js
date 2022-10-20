const adminModel=require('../models/user.model')
const {resBuilder} = require("../helper/app.helper")

class Admin{
    static addAdmin = async(req,res)=>{
        try{
            const adminData =new adminModel(req.body)
            await adminData.save()
            resBuilder(res,true, adminData, " admin added")
        }
        catch(e){
            resBuilder(res,false, e, e.message)
        }
    }
    
    

}
module.exports=Admin