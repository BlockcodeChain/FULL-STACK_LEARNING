import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/user.route.js'
import ConnectDB from './utils/db.js'
const app=express()
dotenv.config({
    path:"./.env"
})
const myport=process.env.PORT ||3000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())
app.use('/api/auth',authRouter)
app.listen(myport,(req,res)=>{
    ConnectDB()
    console.log(`Server running at port ${myport}`)
})