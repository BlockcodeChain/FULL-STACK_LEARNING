import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
      fullname:{
        type:String,
        required:true
      },
      username:{
        type:String,
        required:true,
        unique:true
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
        type:String,
        required:true
      },
      isVerified:{
        type:Boolean,
        default:false
      },
      isLoggedIn:{
        type:Boolean,
        default:false
      },
        token:{
            type:String,
            default:null
        },
         otp:{
            type:Number,
            default:null
        },
        otpexpiry:{
            type:Date,
            default:null
        }
},{timestamps:true})

const userModel= mongoose.model("User",userSchema)

export default userModel