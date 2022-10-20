const mongoose=require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:5,
        maxlength:20
    }, 
    age:{
        type:Number,
        min:21,
        max:60,
        default:21
    }, 
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate:function(value){
            if(!validator.isEmail(value)) throw new Error("invalid email formT")
        }
    }, 
    password:{
        type:String,
        trim:true,
        // match: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$/
    }, 
    image:{
        type:String,
        trim:true
    }, 
    status:{
        type:Boolean,
        default:false
    },
    gender:{
        type:String,
        trim:true,
        lowercase:true,
        enum:["male", "female"]
    }, 
    addresses:[{        
        addrTye:{
            type:String,
            trim:true    
        },
        addrDetails:{
            type:String,
            trim:true    
        }
    }],
    tokens:[{
        token:{type:String, required:true}
    }]
},
{timestamps:true})

UserSchema.virtual('myPosts',{
    ref:'Post',
    localField:"_id",
    foreignField:"userId"
})

UserSchema.methods.toJSON = function(){
    const data = this.toObject()
    delete data.password
    delete data.__v
    delete data.tokens
    return data
}

UserSchema.pre("save", async function(){
    if(this.isModified("password"))
        this.password = bcrypt.hash(this.password, 8)
})

UserSchema.statics.checkPass = async(user, oldPass)=>{
    const isValid = await bcrypt.compare(oldPass, user.password)
    return isValid
}

UserSchema.statics.login = async function(email, password){
    const userData = await User.findOne({email})
    if(!userData) throw new Error("invlid email")
    // const isValid = await bcrypt.compare(password, userData.password)
    const isValid = await this.checkPass(userData, password)
    if(!isValid) throw new Error("invalid password")    
    return userData
}

UserSchema.methods.generateToken = async function(){
    const user = this
    if(user.tokens.length===5)throw new Error("No, User exsit 5 ")
    const token = jwt.sign({_id: user._id}, process.env.JWTKEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model("User",UserSchema)
module.exports = User