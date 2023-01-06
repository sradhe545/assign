const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const app=express()

mongoose.connect(process.env.PORT||5000).then(()=>{console.log("Running")}).then(()=>{console.log("error")})




app.listen(process.env.PORT,()=>{
    console.log(`Running at Port no. ${process.env.PORT}`);
})