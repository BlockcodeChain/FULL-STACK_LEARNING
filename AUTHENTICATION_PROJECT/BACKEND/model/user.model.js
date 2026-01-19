import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    
    },

    password: {
      type: String,
      required:true,
      minlength: [8, "Password must be at least 8 characters"],
      maxlength: [32, "Password cannot be more than 32 characters"],
      
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    accountVerified: {
      type: Boolean,
      default: false,
    }, 

    verificationCode: {
      type: Number,
    },

    verificationCodeExpire: {
      type: Date,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
