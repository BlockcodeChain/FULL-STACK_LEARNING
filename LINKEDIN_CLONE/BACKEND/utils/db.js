import mongoose from "mongoose";

const ConnectDB= async ()=>{
   try{
     await mongoose.connect(process.env.MONGODB_URL)
    console.log("DB CONNECTED SUCCESSFULLY ✅")
   }
   catch(err){
   console.log("DB NOT CONNECTED SUCCESSFULLY ❌")
   console.error("ERROR ",err);
   }
}
export default ConnectDB;