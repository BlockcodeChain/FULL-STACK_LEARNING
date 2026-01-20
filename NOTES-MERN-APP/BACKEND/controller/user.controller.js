import User from '../module/user.model.js'
import bcryptjs from 'bcryptjs'
import gentoken from '../utils/token.js'
import jwt from "jsonwebtoken";

import verifyemail from '../emialverify/verifyMail.js'
export const register =async (req,res)=>{
  try{
     const {fullname ,username ,email,password }=req.body
     if(!fullname ||!username ||!email||!password ){
        return res.status(400).json({message:"All fields are required"})
     }
     const existuser=await User.findOne({username})
     if(existuser){
          return res.status(400).json({message:"username already Exist"})
     }
     const existemail= await User.findOne({email})
     if(existemail){
          return res.status(400).json({message:"email exist ,Please Login "})
     }
    //  hashpassword
    const hashpassword= await bcryptjs.hash(password,10);
  // newuser created
    const newuser= await User.create({
        fullname,
        username,
        email,
        password:hashpassword
    })
    // token 
    const token =await gentoken(newuser._id);
    newuser.token=token
    await newuser.save();
    // cookie
    res.cookie("token",token,{
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge:10*60*1000 

    })
     try {
      await verifyemail(token, newuser.email, newuser.username);
    } catch (emailErr) {
      console.log("Email error:", emailErr.message);
    }

     console.log(newuser)
     return res.status(201).json({ 
        success:true, 
        message:"Registration Successfull , Please check your email to verify your account."
    })
   
  }
  catch(err){
        console.log("REGISTER ERROR 👉", err); // 🔥 MUST
    return res.status(500).json({success:false,
        message:"Registration Errror"},
        
    )
  }
}

// verification
export const verification=async (req,res)=>{
     try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isVerified = true;
    user.token = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}