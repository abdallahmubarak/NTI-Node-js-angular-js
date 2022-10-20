const mongoose =require('mongoose')
const postSchema =mongoose.Schema('Post',{
    title:{
        type:String,
        trim:true,
        unique:true
    },
    postType:{type:String,
        trim:true,
        unique:true,
        enum:['txt','file']
    },
    contact:{type:String,
        trim:true,
        unique:true,
        required:function(){return this.postType=='txt'}
    },
    file:{type:String,
        trim:true,
        unique:true,
        required:function(){return this.postType!=='txt'}
    }
    
})

const Post =mongoose.model('Posts',postSchema)
module.exports=Post