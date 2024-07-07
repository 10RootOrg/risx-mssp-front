

import React ,{useEffect, useState} from 'react'
import axios from 'axios';
import lottie from 'lottie-web';
// import animationData from '../tmp.json';
import animationData from '../Components/Logos/Risx-mssp-logo-anim.json';

function TestPage() {

const backEndURL = "http://40.69.58.105:5555"
const [backendData, set_backendData]= useState([{}])   
    
const [Resources, set_Resources]= useState([])   







const json_file_info ={
    "table": [
      {
        "Column1": "Value1",
        "Column2": "Value2",
        "Column3": "critical",
        "Column4": "High",
        "Column5": "Vafffffffffff fffffffffffff  ffffffffff fdddddddd df df fd fd df df dffdgfffffflue5"
      },
      {
        "Column1": "Valu ffffffff gfhgfh gfh dfg dfg dfsdgfkj e rot34509 jp43fjpoei4jfpoweijrfp prej podirj fpoirfedjg poifedj podfi jvpofdij vpo e6",
        "Column2": "Value7",
        "Column3": "Value8",
        "Column4": "Value9",
        "Column5": "Value10"
      },
      {
        "Column1": "Value11",
        "Column2": "High",
        "Column3": "Value13",
        "Column4": "Critical",
        "Column5": "Value15"
      }
    ]
  }
  


  const [cell_width, set_cell_width] = useState(() => {
    if (json_file_info?.table[0]) {
      const totalKeys = Object.keys(json_file_info.table[0]).length;
      const width1 = 190/totalKeys;
      const finalWidth = width1 > 30 ? 30 : width1;
      document.documentElement.style.setProperty('--cell-width', `${finalWidth}vh`);
      return `${finalWidth}vh`;
    } else {
      document.documentElement.style.setProperty('--cell-width', '100px');
      return "100px";
    }
  });

const get_all_tabels= async()=>{
    console.log("getAlldata");
        try{
     const res = await axios.get(`${backEndURL}/Resources`);
    console.log("res.data", res.data);
    console.log("res.data", typeof res.data);
    
        }catch(err)
        {console.log(err);}
    }



function string_to_date(dateString){

    const dateStringArray = dateString.split("-");
    const day = dateStringArray[0]
    const month = dateStringArray[1]
    const year = dateStringArray[2] 
    const hour = dateStringArray[3] 
    const minute = dateStringArray[4] 
    const second = dateStringArray[5] 
    const event = new Date(`${month} ${day}, ${year} ${hour}:${minute}:${second}`);

return event
}


function compare_dates(end_date, start_date){
    const compare = (end_date - start_date)/60000

    if(compare>0){
        // console.log("in time");
        return "In Time"
    }
    if(compare<0){
        //  console.log("not in time" ); 
    
     
    
        if(-compare <= 59){
            // console.log("pass by", -compare, "Min"); 
            const return_this = "pass by "+ -compare + " Min"
         return return_this
        }
    
        if(  59 < -compare &&   1439 > -compare){
            const hours  = Math.floor(-compare / 60);
            const minutes = -compare % 60;
            const return_this = "pass by " + hours + " Hr " + minutes + " minutes";
            return return_this;

        }
        if(   1440 <= -compare ){
            const days  = Math.floor(-compare / 1440);
            const remainingHours = Math.floor((-compare % 1440) / 60); // Calculate remaining hours
            const return_this = "pass by " + days + " days and " + remainingHours + " hours";
            return return_this
        
    
        }
    }
 
return  
}

const LastIntervalDate = string_to_date("22-05-24-12-26-18");
const expire_date =      string_to_date("22-05-24-12-20-18");

const note = compare_dates(expire_date,LastIntervalDate)
console.log(note);








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












const change_table_risx= async()=>{

const toolData = {
    tool_id: "1100",
        tool_name: "velociraptor",
        artifacts: ["Hardening Kitty"],

    };

try{
    const res = await axios.put(`${backEndURL}/tools/tmp1`,{params:toolData} );
    console.log("res.data", res.data);

    
        }catch(err)
        {console.log(err);}
}


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

const get_XML= async()=>{
        console.log("getAlldata",backEndURL);



            try{
            const res = await axios.get(`${backEndURL}/tools/get-xml`,);
        console.log("res.data", res.data);
        console.log("res.data", typeof res.data);
        
            }catch(err)
            {console.log(err);}
        }



const write_to_csv= async()=>{

                    try{
             
                        const postData = {
                            Name: "john11",
                            address: "NY"  
                        };
            
                 const res = await axios.post(`${backEndURL}/results/write_to_csv` ,postData );
                console.log("res.data", res.data);
                // console.log("res.data", typeof res.data);
                    }catch(err)
                    {console.log(err.response.data)}  }




async function get_aggregate_macro_data(SubModuleName,ResponsePath){

if(SubModuleName === undefined){console.log("SubModuleName undefined"); return}
if(ResponsePath === undefined){console.log("ResponsePath undefined"); return}

        try{ 
        
            console.log("get_aggregate_macro_data for ", SubModuleName);
            const res = await axios.get(`${backEndURL}/results/velociraptor-aggregate-macro`, {
                params: {
                    SubModuleName: SubModuleName,
                    ResponseFile: ResponsePath
                }
            });

            // if (res  ) {
            //     console.log("sssssssssssssssssssssssssssss",  res);
            // }

            if (res.data.success === false ) {
                console.log("aggregate_macro_data_from false",  res.data);
            }
            

            if (res.data.success === true) {
                console.log("aggregate_macro_data_from  true",  res.data.data );
            
            
            }
            

        } catch (err) {
            console.log(   '----------', err);
            console.log(err.response?.data?.message || 'An error occurred');
           }
        }
                

  return (
    <div >


        <p className=' '>   TestPage</p>

        <div style={{display:"flex", gap:"12px", flexDirection:"column"}}>


        

<button onClick={()=>get_aggregate_macro_data("HardeningKitty","response_VelociraptorHardeningKitty_01-07-2024-08-38-56")}>get_aggregate_macro_data</button>  
<button onClick={change_table_risx}>change_table_risx</button>
<button onClick={make_json_to_v_raptor}> make json to v raptor</button>
<button onClick={get_json}> get json from david</button>
<button onClick={app_get_all}> app.get - all</button>
<button onClick={app_post}> app.post</button>
<button onClick={app_delete}> app.delete</button>
<button onClick={get_All_Resources_filtered}> Resources_filtered</button>

<button onClick={get_XML}> get_XML</button>

<button onClick={write_to_csv }> write to csv </button>


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



{json_file_info?.table?.length !== 0 ? (
  <>               
    <div className="table_smart">
      {Object.keys(json_file_info?.table[0]).map((key) => (
        <div className="parent-container" onClick={()=>set_cell_width("500px")} key={key} style={{width: cell_width}}>
          <p className="table_smart_col font-type-menu Color-White">{key}</p>
        </div>
      ))}
    </div>
    {json_file_info?.table.map((item, index) => (
      <div key={index} className="table_smart">
        {Object.keys(item).map((key, idx) => {
          const value = item[key];
          return (
            <div className="parent-container" key={idx} style={{width: cell_width}}>
              <div className="table_smart_col">
              {/* {typeof value === 'string' && value.toLowerCase() === 'high' ? (
                  <span className="tagit_type1 tagit_type1_high">
                    {value}
                  </span>
                ) : (
                  
                  <span 
                    className="cell-content"
                    style={{
                      color: (() => {
                        if (typeof value === 'string') {
                          const lowerValue = value.toLowerCase();
                          if (lowerValue === 'critical') return "var(--color-Red)";
                          if (lowerValue === 'high') return "var(--color-Orange-Red)";
                        }
                        return 'var(--color-Grey1)';  // Default color
                      })(),
                    }}
                  >
                    {typeof value === 'object' ? JSON.stringify(value) : value}
                  </span>
                )} */}




                {typeof value === 'string' &&  (
                  <span 
                    className="cell-content"
                    style={{
                      color: (() => {
                        if (typeof value === 'string') {
                          const lowerValue = value.toLowerCase();
                          if (lowerValue === 'critical') return "var(--color-Red)";
                          if (lowerValue === 'high') return "var(--color-Orange-Red)";
                        }
                        return 'var(--color-Grey1)';  // Default color
                      })(),    }}
                  >
                    {typeof value === 'object' ? JSON.stringify(value) : value}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    ))}
  </>
) : null}



        </div>
  )
}

export default TestPage