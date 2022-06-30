
const express=require("express")
const app=express()
const bodyparser=require("body-parser")
const morgan=require("morgan")
const userroutes=require("./routes/userRoutes")

app.use(bodyparser({extended:false}))
app.use(bodyparser.json())
app.use(morgan('dev'))

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization")
    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET")
        return res.status(200).json({})
    }
    next()
})


app.use("/users",userroutes)

app.listen(5000,()=>{
    console.log("Server running on 5000");
})