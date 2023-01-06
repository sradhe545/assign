import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Button = () => {
  const navigate=useNavigate()
  const handleFetch=()=>{
   axios.get("http://localhost:8080/user").then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
  }

  const handleDetails=()=>{
    navigate("/userdetails")
   }
  return (
    <div>
        <button onClick={handleFetch}>Fetch Users</button>
        <button>Delete Users</button>
        <button onClick={handleDetails}>User Details</button>

        </div>
  )
}

export default Button