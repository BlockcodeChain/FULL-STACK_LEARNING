import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './utils/db.js'
 import {errorMiddleware} from './middleware/error.middleware.js'
 
dotenv.config({
    path:"./.env",
})
const myport=process.env.PORT||3000
const app=express();

app.listen(myport,(req,res)=>{
     ConnectDB()
    console.log(`Server running on port ${myport}`)
})
// Error-handling middleware (add at the end, after all routes)
app.use(errorMiddleware)