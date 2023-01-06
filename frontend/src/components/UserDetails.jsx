import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
const UserDetails = () => {
    const [data,setData]=useState([])
    const [page,setPage]=useState(1)
    const [totalPage,setTotalPage]=useState(1)
    const [isLoading,setIsLoading]=useState(false)

    const [filter,setFilter]=useState("")
    const handleChange=(e)=>{
        setFilter(e.target.value)
    }

    function getdata(){
        setIsLoading(true)
        axios.get(`https://coinback-production.up.railway.app/userdetail?page=${page}&gender=${filter}`)
        .then((res)=>{ setTotalPage(res.data.totalPages);setData(res.data.data);setIsLoading(false)})
        .catch((err)=>{console.log(err)})
    }
   
    console.log(isLoading);
    useEffect(()=>{
       
        getdata()
       
    },[page,filter])
  
  return (
    <>
    <div id="page">
        <button disabled={page===1} onClick={()=>setPage(page-1)}>PREV</button>
        <button>{page}</button>
        <button disabled={page===totalPage} onClick={()=>setPage(page+1)}>NEXT</button>
    </div>
    <div id="sel">
        <select onChange={handleChange} >
            <option value="">Filter By Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
    </div>
    {
        isLoading?<div id="circle"><CircularProgress /></div>:
  
    <div id="gr">
        {
            data.map((el,i)=>{return(<>
              <div id="sm">
                <div id="img">
                    
                <img src={el.picture.large} alt="img"/>
                </div>
                

                    
                    <div id="name">
                        <p><b>{el.name.title} {el.name.first} {el.name.last}</b></p>
                      
                    </div>
                    <div><p>Gender: <b>{el.gender.toUpperCase()}</b></p></div>

                    <div id="mail">
                        <div><MailOutlineIcon/></div>
                        <p><b>{el.email}</b></p>
                    </div>
                    
                    <p>D.O.B- {el.dob.date.split("T")[0]}</p>
                    
                    <div>
                        <div id="mail">
                            <div><LocationOnIcon/></div>
                            <p >{el.location.street.number},{el.location.street.name},{el.location.city}</p>
                        </div>
                        
                        <p id="coun">{el.location.state},{el.location.country}</p>
                        
                        <div id="ph">
                            <div><PhoneIcon/></div>
                            <p>+{el.phone}</p>
                        </div>
                        <p></p>
                    </div>
                  
              </div>
            </>)})
        }

        
    </div>
      }
    </>
  )
}

export default UserDetails