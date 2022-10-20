const mongoose = require("mongoose")
const productSchema = mongoose.Schema({    
    name:{
        type:String,
        required:true,
        trim:true
    }, 
    price:{
        type:String,
        required:true,
        trim:true
    }, 
    description:{
    type:String,
    trim:true
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
    required:true
},
},
{timestamps:true})

const Product = mongoose.model("Product", productSchema)
module.exports = Product