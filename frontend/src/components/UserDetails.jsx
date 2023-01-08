import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from './Pagination';
const UserDetails = () => {
    const [loader,setLoader]=useState(false)
    const [data,setData]=useState([])
    const [page,setPage]=useState(1)
    const [totalPages,setTotalPages]=useState(1)
    const [filter,setFilter]=useState("")
    const handleChange=(e)=>{
        setFilter(e.target.value)
    }
    function getdata(){
        setLoader(true)
        axios.get(`https://coinback-production.up.railway.app/userdetail?page=${page}&gender=${filter}`)
        .then((res)=>{ setTotalPages(res.data.totalPages);setData(res.data.data);setLoader(false)})
        .catch((err)=>{console.log(err)})
    }
    useEffect(()=>{
       
        getdata()
       
    },[page,filter])
  
  return (
    <>
    <h1>User Details</h1>
   
    <div id="sel">
        <select onChange={handleChange} >
            <option value="">Filter By Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
    </div>


    {
       loader?<div id="circle"><CircularProgress /></div>:
        <>
        <table>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>D.O.B</th>
                <th>Address</th>
                <th>Phone</th>
             </tr>
             {
                 data.map((el,i)=>{return(<>
                  <tr>
                    <td><img src={el.picture.large} alt="img"/></td>
                    <td>{el.name.title} {el.name.first} {el.name.last}</td>
                    <td>{el.email}</td>
                    <td>{el.gender.toUpperCase()}</td>
                    <td>{el.dob.date.split("T")[0]}</td>
                    <td>{el.location.street.number},{el.location.street.name},<br/>{el.location.city}<br/>{el.location.state},{el.location.country}</td>
                    <td>+{el.phone}</td>

                  </tr>
                 
                 </>)})
             }
           
</table>

      

        <div id="page">
          <Pagination page={page} totalPages={totalPages} handlePageChange={(value)=>setPage(value)}/>
        </div>
        </>
      }

        
    </>
  )
}

export default UserDetails