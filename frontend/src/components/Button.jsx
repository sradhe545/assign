import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Button = () => {
  const navigate=useNavigate()
  const handleFetch=()=>{
   axios.get("https://coinback-production.up.railway.app/user").then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
   alert(`Data Fetched Successfully`)
  }
const handleDelete=()=>{
  axios.delete("https://coinback-production.up.railway.app/delete").then((res)=>{console.log("Deleted")}).catch((err)=>{console.log(err)})
  alert(`Data Fetched Successfully`)
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