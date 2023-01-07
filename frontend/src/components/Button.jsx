import React, {useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Button = () => {
  const [isloading,setIsLoading]=useState(false)
  const navigate=useNavigate()

  const handleFetch=async ()=>{
    if(isloading) return alert("Please Wait data is fetching now...")
    setIsLoading(true)
    console.log("mid"+isloading);
    await axios.get("https://coinback-production.up.railway.app/user").then((res)=>{console.log(res.data);setIsLoading(false)}).catch((err)=>{console.log(err)})
  
   console.log("after"+isloading);
 alert(`Data Fetched Successfully`)
  }
const handleDelete=()=>{
  alert(`Data will be Deleted Now`)
  axios.delete("https://coinback-production.up.railway.app/delete").then((res)=>{console.log("Deleted")}).catch((err)=>{console.log(err)})
 
}
  const handleDetails=()=>{
    navigate("/userdetails")
   }
  return (
    <div id="first">
        <button onClick={handleFetch}>Fetch Users</button>
        <button  onClick={handleDelete}>Delete Users</button>
        <button onClick={handleDetails}>User Details</button>

        </div>
  )
}

export default Button