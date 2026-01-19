import express from 'express'
import dotenv from 'dotenv'
import ConnectDB from './utils/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/user.route.js'
const app=express()

dotenv.config({
    path:"./.env"
})
// 
const myport=process.env.PORT ||8000
// middleware
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// routing
app.use('/api/auth',authRouter)

// running server
app.listen(myport,(req,res)=>{
    ConnectDB()
    console.log(`Server running at port ${myport}`)
})