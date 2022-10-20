const mongoose=require("mongoose")
const postSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
        unique:true, 
    },
    postType:{
        type:String,
        trim:true,
        enum:["txt", "file"]
    },
    content:{
        type:String,
        trim:true,
        required: function(){ return this.postType=="txt"}
    },
    file:{
        type:String,
        trim:true,
        required: function(){ return this.postType!="txt"}
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},
{timeStamps:true})
const Post = mongoose.model("Post",postSchema)
module.exports = Post