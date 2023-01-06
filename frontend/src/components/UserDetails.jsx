import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'


const UserDetails = () => {
    const [data,setData]=useState([])
    const [page,setPage]=useState(1)
    const [totalPage,setTotalPage]=useState(1)

    const [filter,setFilter]=useState("")
    const handleChange=(e)=>{
        setFilter(e.target.value)
    }

    function getdata(){
        axios.get(`http://localhost:8080/userdetail?page=${page}&gender=${filter}`)
        .then((res)=>{ setTotalPage(res.data.totalPages);setData(res.data.data)})
        .catch((err)=>{console.log(err)})
    }
   
    console.log(data);
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
    <div id="gr">
        {
            data.map((el,i)=>{return(<>
              <div id="sm">
                <div id="img">
                    
                <img src={el.picture.large} alt="img"/>
                </div>
                

                    
                    <div id="name">
                        
                        <p id="title">{el.name.title}</p>
                        <p>{el.name.first}</p>
                        <p>{el.name.last}</p>
                    </div>
                    <div><p>{el.gender}</p></div>
                    <p>{el.email}</p>
                    <p>D.O.B- {el.dob.date.split("T")[0]}</p>
                    <div>
                        <p>{el.location.street.number},{el.location.street.name},{el.location.city}</p>
                        <p>{el.location.state},{el.location.country}</p>
                        
                        <p>+{el.phone}</p>
                        <p></p>
                    </div>
                  
              </div>
            </>)})
        }

        
    </div>
    </>
  )
}

export default UserDetails