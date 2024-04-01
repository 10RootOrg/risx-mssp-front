

import React ,{useEffect, useState} from 'react'
import axios from 'axios';
import lottie from 'lottie-web';
// import animationData from '../tmp.json';
import animationData from '../Components/Logos/Risx-mssp-logo-anim.json';

function TestPage() {
const backEndURL = "http://localhost:5000"
      


useEffect(() => {
    const anim = lottie.loadAnimation({
        container: document.getElementById('your-animation-container'), // Specify the DOM element where the animation should be rendered
        renderer: 'svg', // Choose the renderer (svg or canvas)
        loop: true, // Set loop option
        autoplay: true, // Set autoplay option
        animationData: animationData, // Pass the imported animation data
    });
    return () => anim.destroy(); // Cleanup animation on unmount
}, []);







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




    

    const make_json_to_v_raptor= async()=>{
        const time = new Date()
        const toolData = {
            tool_id: "1100",
             tool_name: "velociraptor",
             artifacts: ["Hardening Kitty"],
             time: time
            };
        // const Jason_to_nof = JSON.stringify(obj);

        
        try{
            const res = await axios.get(`${backEndURL}/tools/active-tool`,{params:toolData} );
           console.log("res.data", res.data);
       
           
               }catch(err)
               {console.log(err);}
        }


const app_get_all= async()=>{
console.log("getAlldata");
    try{
 const res = await axios.get(`${backEndURL}/Resources`);
console.log("res.data", res.data);
console.log("res.data", typeof res.data);

    }catch(err)
    {console.log(err);}
}

const app_post= async()=>{
        try{

            const postData = {
                Name: "john11",
                address: "NY"  
            };

     const res = await axios.post(`${backEndURL}/Resources` ,postData );
    console.log("res.data", res.data);
    // console.log("res.data", typeof res.data);
    
        }catch(err)

        {
           
            
            console.log(err.response.data);
            // console.log(err?.response?.data[0]?.message );
            
            ;}
    }

const app_delete= async()=>{
        try{

            const resourceId = '222';

     const res = await axios.delete(`${backEndURL}/Resources/${resourceId}`);
    console.log("res.data", res.data);
    // console.log("res.data", typeof res.data);
    
        }catch(err)

        {
           
            
            console.log(err.response.data);
            // console.log(err?.response?.data[0]?.message );
            
            ;}
    }

    const get_All_Resources_filtered= async()=>{
        console.log("get_All_Resources_filtered" );
            try{

                const type_list =  ['2004']
                const tool_list =  []


                const params ={
                    type_ids:type_list,
                    tool_ids:tool_list
                }
            

         const res = await axios.get(`${backEndURL}/Resources/all-resource-filtered`,{ params: params});
        console.log("res.data", res.data);
        console.log("res.data", typeof res.data);
        
            }catch(err)
            {console.log(err);}
        }

     const get_json= async()=>{
            console.log("getAlldata");



                try{
             const res = await axios.get(`${backEndURL}/tools/dehashed-json`,);
            console.log("res.data", res.data);
            console.log("res.data", typeof res.data);
            
                }catch(err)
                {console.log(err);}
            }
//   const get_json= async()=>{
//             console.log("get_json");
//                 try{

//              const res = await axios.get('https://api.dehashed.com/search?query=domain:sheba.co.il', {
//                 headers: {
//                   'Accept':'application/json'
//                 },
//                 auth: {
//                   username: 'shoresh100@proton.me',
//                   password: 'wjaf4rcr5y1dutcrhefkkpffacs79m5h'
//                 }
//               });


//             console.log("res.data", res.data);
      
            
//                 }catch(err)
//                 {console.log(err);}
//             }



// const getUserInfoByID = async()=>{
//     console.log("getUserInfoByID");
// const userId = 123456
//     try{
// const res = await axios.get(`${backEndURL}/Resources/users/${userId}`)
// console.log("res.data", res.data);
//     }catch(err)
//     {console.log(err);}
// }






    // useEffect(()=>{
    //     fetch("/api1").then(
    //         response => response.json()
    //     ).then(
    //         data => {set_backendData(data)}
    //     )
        
    //     },[])

    // console.log(backendData );
  return (
    <div >



        <p className=' '>   TestPage</p>

        <div style={{display:"flex", gap:"12px", flexDirection:"column"}}>



<button onClick={make_json_to_v_raptor}> make json to v raptor</button>
<button onClick={get_json}> get json from david</button>
<button onClick={app_get_all}> app.get - all</button>
 <button onClick={app_post}> app.post</button>
 <button onClick={app_delete}> app.delete</button>
 <button onClick={get_All_Resources_filtered}> Resources_filtered</button>

 <div id="your-animation-container" style={{ width: '50%', height: '100%' }}></div>

 
        </div>
  

     {/* <button onClick={getUserInfoByID}> Userdata</button> */}

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