const express=require('express')
const session=require('express-session')
const MongoStore=require('connect-mongo');
const parseurl =require('parseurl')
const cors=require('cors')
const connectDB=require('./errors/db/connect')
require('dotenv').config()
const PORT= 4000
var url;

const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(session({
    name:'jain',
    secret:'NO SECRET',
    saveUninitialized:true,
    resave:false, 
    store:MongoStore({
        client:true,
        mongoUrl: 'mongodb://localhost/test-app',//process.env.MONGO_URI2
    })  ,
    cookie:{    
         maxAge:5000
    }
}))
app.use((req,res,next)=>{
     url=parseurl(req).pathname
    if(!req.session.views)
        {req.session.views={}}
    req.session.views[url]=(req.session.views[url]||0)+1
    console.log(req.session.views[url])
    next()
})  

app.use('/foo',(req,res)=>{
    res.status(200).send(`<h1>HEY!! YOU VISITED ${url} PAGE ${req.session.views[url]} TIMES</h1>`)
})
app.use('/bar',(req,res)=>{
    res.status(200).send(`<h1>HEY!! YOU VISITED ${url} PAGE  ${req.session.views[url]}TIMES</h1>`)
})

const connectDatabaseFun=async ()=>{
    try{
            await connectDB(process.env.MONGO_URI2)
            app.listen(PORT,console.log(`server is listening on port ${PORT}`))
    }
    catch(err){console.log(err)}
}
connectDatabaseFun()