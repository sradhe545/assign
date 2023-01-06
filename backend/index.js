const express=require("express")
const mongoose=require("mongoose")
const axios = require('axios')
const dotenv=require("dotenv").config()
const User = require("./model/user.model")
const cors=require("cors")
const { response } = require("express")
const app=express()

mongoose.connect(process.env.MONGO_URL||8000).then(()=>{console.log("Running")}).catch(()=>{console.log("error")})
app.use(cors())
app.use(express.json())
let arr=[]
app.get("/user",  (req, res) => {
    axios.get("https://randomuser.me/api/?results=50")
    .then((response)=> {  
        
        let userData= User.create(response.data.results)   
       return  res.send({msg:"User Data Created Successfully"})    
    })
    .catch((error)=>{      
        console.log(error);   
    })
})
app.get("/userdetail",  async(req, res) => {

    let limit = Number(req.query.limit) || 20
    let page= Number(req.query.page) || 1
    let gender = req.query.gender||"both"
    const genderOptions=["male","female"]
    gender === "both"? (gender = [...genderOptions]): (gender = req.query.gender.split(","))
      try{
        let userData=await User.find({}).skip((page-1)*limit).limit(limit).where("gender").in([...gender])
        const count = await User.countDocuments({gender: { $in: [...gender] }})
        let obj={
            totalPages: Math.ceil(count/limit),
            dataLength:userData.length,
            limit: limit,
            currentPage: page,
            data:userData
        }
        return res.status(200).send(obj)  
      }catch(err){
        console.log(err)
        return res.send({msg:err}) 
      }
       
    })
    
app.delete("/delete",async (req,res)=>{
   
     await User.deleteMany().then(()=>{
        return res.send({msg:"Deleted"}) 
     }).catch(()=>{return res.send({msg:err}) })
})
app.listen(process.env.PORT,()=>{
    console.log(`Running at Port no. ${process.env.PORT}`);
})