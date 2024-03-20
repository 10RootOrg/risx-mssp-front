

import React ,{useEffect, useState} from 'react'
import axios from 'axios';


function TestPage() {
const backEndURL = "http://localhost:5000"
      
    const [backendData, set_backendData]= useState([{}])   
    
    const [Resources, set_Resources]= useState([])   

    // const getAlldata= async()=>{
    //     console.log("getAlldata");
    //         try{
    //      const res = await axios.get(`${backEndURL}/entities/default-columns`);
    //     console.log("res.data", res.data);
    //     console.log("res.data", typeof res.data);
        
    //         }catch(err)
    //         {console.log(err);}
    //     }


const getAlldata= async()=>{
console.log("getAlldata");
    try{
 const res = await axios.get(`${backEndURL}/Resources`);
console.log("res.data", res.data);
console.log("res.data", typeof res.data);

    }catch(err)
    {console.log(err);}
}


const getUserInfoByID = async()=>{
    console.log("getUserInfoByID");
const userId = 123456
    try{
const res = await axios.get(`${backEndURL}/Resources/users/${userId}`)
console.log("res.data", res.data);
    }catch(err)
    {console.log(err);}
}






    useEffect(()=>{
        fetch("/api1").then(
            response => response.json()
        ).then(
            data => {set_backendData(data)}
        )
        
        },[])

    console.log(backendData );
  return (
    <div >



        <p className=' '>   TestPage</p>
     <button onClick={getAlldata}> Alldata</button>
     <button onClick={getUserInfoByID}> Userdata</button>

{(typeof backendData.users ===  "undefined") ? (
    <p>loading..</p>
):(
    backendData.users.map((user,i)=> (
        <p key={i}>{user}</p>
    ))
) }



        </div>
  )
}

export default TestPage