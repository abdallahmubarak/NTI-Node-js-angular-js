const productModel =require('../models/product.model')
const {resBuilder} = require("../helper/app.helper")

class Product{

    static addProduct=async(req,res)=>{
        try {
            const prductData= new productModel(...req.body)
            await prductData.save()
            resBuilder(res,true, prductData, "added")
        } catch (error) {
            resBuilder(res,false, prductData, "product do not added")
        }
    }


}
module.exports=Product