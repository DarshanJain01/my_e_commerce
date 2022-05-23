const connectDB=require('./errors/db/connect')
const express=require('express')
const cors=require('cors')
const Task=require('./models/schema')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/error-handler')

const welcome=require('./routes/welcome')
const people=require('./routes/people')
const myData=require('./routes/mydata')
const path=require('path')
require('dotenv').config()  
const app=express()
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use('/login',welcome)
    app.use('/getData',myData)  
    app.use('/v1/',people)
 
    app.use(notFound)
    app.use(errorHandler)
    const port=process.env.PORT||4000
    const start= async ()=>{
        try{    
        await connectDB(process.env.MONGO_URI);
        }
        catch(e){
            console.log(e);
        }
    }
    start();
    app.listen(port,()=>console.log(`hello,server is listening on port ${port}`))
