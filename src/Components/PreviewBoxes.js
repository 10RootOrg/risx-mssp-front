import React , {useState , useEffect , useContext} from 'react';
import { ReactComponent as IconLastRun } from './icons/ico-lastrun.svg';
 import { ReactComponent as IconReadMore } from './icons/ico-readmore.svg';
 import { ReactComponent as IcoKey } from './icons/ico-eye.svg';
 import { PopUp_For_Read_More ,
  //  PopUp_For_Nuclei_data ,
    PopUp_For_Dehashed_data} from "./PopUp_Smart.js";
 import { PopUp_before_active_module____Nuclei } from "./PopUp_active_modules.js";
 import { format_date_type_a } from '../Components/Features/DateFormat';
import GeneralContext from '../Context';
import  {Counter}  from './Features/AnimationCounter.js'
import axios from 'axios';
import './PreviewBoxes.css';
import './StatusDisplay.css';



import{  Chart as ChartJS,
   ArcElement,
  BarElement,CategoryScale,LinearScale,
  Tooltip
  } from 'chart.js';
import { Doughnut , Bar } from 'react-chartjs-2';

  ChartJS.register(
    ArcElement,
    BarElement,CategoryScale,LinearScale,
    Tooltip
   
  );

 
 
 


function openInNewTab (toolURL) {
  
  const newWindow = window.open(toolURL, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}
const Handle_active_module= async(tool_id,backEndURL)=>{

   try{
       const res = await
       axios.get(`${backEndURL}/tools/active-module`, {
         params: {
          module_id: tool_id ,
         }
       });
   
      //  set_popUp_all_good____txt({  HeadLine:"Beginning of data processing",paragraph:"This process may take several minutes. The information will be displayed on the 'Results' section." ,buttonTitle:"Ok"})
      //  set_popUp_all_good____show(true)
       if(res.data){
      
 
       }
   
          }catch(err)
          {console.log(err);}
   }

const handle_Main_Btn =(tool_id,toolURL,backEndURL ,set_Show_PopUp_before_active_module_id)=>{

    console.log("tool_id" , tool_id);

    // console.log("moduleLinks" , moduleLinks);




    if      (tool_id ===  '2001005') {
      set_Show_PopUp_before_active_module_id(tool_id)
      // Handle_active_module(tool_id,backEndURL)
    
    }
  //  else if (tool_id ===  '2001009') { set_Show_PopUp_tool___Dehashed(true)  }
    else {openInNewTab(toolURL) }
    


    
     
  }

  const check_last_response2 =async(Info,backEndURL,set_last_response,set_StatusColorClass)=>{
     const params = {module_id : Info.tool_id }
    try{
        const res = await axios.get(`${backEndURL}/results/check_last_req_and_res_for_module`,{params:params})
        if(res){

         set_last_response(res.data?.last_request);
console.log(res.data?.last_request);
if ( res.data?.last_response ){
// console.log("got some data for", Info?.Tool_name  );
// console.log("minute",Info?.threshold_time );
// console.log(res.data?.last_request - res.data?.last_response);
const nowTime = new Date ;
const lastResponseTime = new Date(res.data?.last_response );
console.log(nowTime);
console.log(lastResponseTime);
const timeDiffMs =  nowTime.getTime() -lastResponseTime.getTime() ;
const timeDiffMinutes = Math.floor(timeDiffMs / (1000 * 60));


console.log("last check in minutes" , timeDiffMinutes);
if ( timeDiffMinutes  > Info.threshold_time){console.log(timeDiffMinutes ,"too much time"); set_StatusColorClass('Bg-Red')}
else if ( timeDiffMinutes  <=  Info.threshold_time  ){console.log("it fine");  set_StatusColorClass('Bg-Blue-Glow')}
else{set_StatusColorClass('Bg-Grey2')}





}


          }
    }
    catch(err){console.log(err);}
}

function PreviewBox_type0_static({
  HeadLine,BigNumber,
  SmallNumber,StatusColor,
  date, resource_type_id ,
  description_short,
  filter_Resource,
  set_filter_Resource,
  text_under_big_number
  }) {
   


 
  
    return (
      <div className={`PreviewBox PreviewBox_static  `}
      // className={`box ${isFocused ? 'focused' : ''}`}
      // is_Filtering
 
        
        
        > 
      <div className='PreviewBox_HeadLine' ></div>
  
  
      <div> 
       
      <div className='PreviewBox_BigNumber     font-type-h1 Color-Blue-Glow' > <Counter target={BigNumber}  isHovered={true}  /> </div>
      <div className='PreviewBox_SmallNumber   font-type-txt Color-Blue-Glow mr-a' >{text_under_big_number}</div>
      </div>
  
       <div className='PreviewBox_ButtomLine' ></div> {/*dont delete */}
      </div>
    )
  }

function PreviewBox_type1_number({
HeadLine,BigNumber,
SmallNumber,StatusColor,
date, resource_type_id ,
description_short,
filter_Resource,
set_filter_Resource,
 
 
}) {
 
  const [isHovered, setIsHovered] = useState(false);
  const [is_Filtering, set_is_Filtering] = useState(false);

  useEffect(() => { 

  
        if (filter_Resource?.type_ids?.length === 0 ) {
    
          // console.log("zero filter--999" );
    
          set_is_Filtering(false)
        }
     
    
    },[filter_Resource])
    
 
const  handle_filter_by_Type = (id) => {
 
  
if (id === null || id === undefined){
 
  
  set_filter_Resource({type_ids:[],tool_ids:[]})
  // set_clear_all_btns_filter_preview(true)
  // const stayAsYouR = filter_Resource.tool_ids
  // set_filter_Resource({type_ids:[],tool_ids:stayAsYouR})
  return
}



else{

const found = filter_Resource.type_ids.find((ids) => ids ===  id);
 


if (found  === undefined){
const stayAsYouR = filter_Resource.tool_ids
set_filter_Resource({type_ids:[...filter_Resource.type_ids,id],    tool_ids:stayAsYouR})
set_is_Filtering(true)
// set_clear_all_btns_filter_preview(false)

return
}

else if (found  === id){
   
  const index = filter_Resource.type_ids.indexOf(id);
 const filterd = filter_Resource.type_ids.filter(element => element  !== id);

 const stayAsYouR = filter_Resource.tool_ids
 set_filter_Resource({type_ids:filterd,tool_ids:stayAsYouR})
 set_is_Filtering(false)
 
return
}

 

}
 
 

}

const handleHover = () => {
  setIsHovered(true);
};

const handleLeave = () => {
  setIsHovered(false);
};




 




  const StatusColorClass =
  StatusColor === 'red' ? 'Bg-Red' :
  StatusColor === 'blue' ?'Bg-Blue-Glow' : 
  'Bg-Grey2';

  return (
    <div className={`PreviewBox PreviewBox_for_type_count ${is_Filtering   ? 'PreviewBox_Filtering' : ''}`}
    // className={`box ${isFocused ? 'focused' : ''}`}
    // is_Filtering
      onClick={()=>{handle_filter_by_Type(resource_type_id) }}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      
      
      > 
    <div className='PreviewBox_HeadLine' >
      <p  className="font-type-menu" >{HeadLine}</p>

 <div className={`${StatusColorClass}  light-bulb-type1`}/>

       </div>


    <div> 
     
    <div className='PreviewBox_BigNumber     font-type-h1 Color-White' > <Counter target={BigNumber} isHovered={isHovered} /> </div>
    <div className='PreviewBox_SmallNumber   font-type-txt Color-White' >UnActive:{SmallNumber}</div>
    </div>

     <div className='PreviewBox_ButtomLine' >

       <IconLastRun />
       <div className='font-type-very-sml-txt ' >{date}</div>

     </div> {/*dont delete */}
    </div>
  )
}

function PreviewBox_type2_pie({HeadLine , bar_numbers, bar_headlines, bar_title_legend}) {
 
const [has_data, set_has_data]= useState(false)
// const bar_numbers_zero = [1]

useEffect(() => {
  let sum = 0;

  for (let i = 0; i < bar_numbers.length; i++) {
    // console.log(bar_numbers[i]);
    sum += bar_numbers[i];
  }

  if (sum === 0) {
    set_has_data(false);
  } else {
    set_has_data(true);
  }
}, [bar_numbers]);
   

  

  // console.log(bar_numbers);
  // console.log(all_Resource_Types);
  // const countArray = all_Resource_Types.map(item => item.count);
  // console.log(countArray); // This will log: [7, 2]
  const backgroundColors = bar_numbers.map((item, index, array) => {
    const alpha = (index + 1) / array.length; // Calculate alpha based on the item's position
    return `rgba(0, 219, 255, ${alpha})`; // Return red with calculated transparency
  });
  
  const data ={
    // labels: ['Yes', 'No'],
    labels:   bar_headlines,
    // labels:   all_Resource_Types.map(item => item.resource_type_name),
    datasets:[{
      label:bar_title_legend,
      // data: bar_numbers,
      // data: bar_numbers_zero,
      data:    has_data ? bar_numbers :  [1],

  
      
      backgroundColor:backgroundColors,
      borderWidth:0
      // style={{opacity:   (index +1) / all_Resource_Types.length   }} />
    }]
  }
   
  const options= {
    cutout: 15,
    legend: {
       display: false
    },
    tooltips: {
       enabled: false
    },
  
   
  
  
  };
    return (
      <div className='PreviewBox PreviewBox-twice-size' >
  
            <div className='PreviewBox_HeadLine' > <p  className="font-type-menu" >{HeadLine}</p> </div>
   
        <div className='display-flex   justify-content-space-between' style={{ height:"100%"}}>
  
        <div className='display-flex  ' style={{   width:"100%" ,height:"130px",}}>
        <Doughnut  data={data}  options={options}  ></Doughnut>
           {/* <Doughnut  data={has_data ? data : data}  options={options}  ></Doughnut> */}
           </div>
  
  
<div className='display-flex  justify-content-center  ' style={{   width:"100%" ,gap:"2px" }}>
        <div className='display-flex flex-direction-column justify-content-center  ' style={{ marginRight:"10px",   gap:"2px" }}>
  {Array.isArray(bar_headlines) && bar_headlines?.map((Info, index) => {
return(
<div className='display-flex' style={{marginRight:"auto"}} key={index}>
<div className={` Bg-Blue-Glow light-bulb-type1 mr-a`}  style={{opacity:   (index +1) / bar_headlines.length   }} />
<p className='   font-type-txt Color-White  ' >{Info} </p>
</div>
)
})}
  </div>

       <div className='display-flex flex-direction-column   ' style={{  gap:"2px"  }}>
       {Array.isArray(bar_numbers) &&  bar_numbers?.map((Info, index) => {
  return(
    <div className='display-flex'  style={{  marginLeft:"auto"}} key={index}>
     <p className='   font-type-txt Color-White  '> {Info}</p>
    </div>
  )
   })}
       </div>
       </div>




        </div>
         
   
         
          </div>
    )
  }

function PreviewBox_type3_bar({HeadLine , bar_numbers, bar_headlines, bar_title_legend}) {
 
  const backgroundColors = bar_numbers.map((item, index, array) => {
    const alpha = (index + 1) / array.length; // Calculate alpha based on the item's position
    return `rgba(0, 219, 255, ${alpha})`; // Return red with calculated transparency
  });
  
  const data ={
    // labels: ['Yes', 'No'],
    labels:   bar_headlines,
    // labels:   all_Resource_Types.map(item => item.resource_type_name),
    datasets:[{
      label:bar_title_legend,
      data: bar_numbers,
      backgroundColor:backgroundColors,
      borderWidth:0,
      borderRadius: 100,
      barPercentage: 1.0,
        // barThickness:30,
        categoryPercentage: 1
      // style={{opacity:   (index +1) / all_Resource_Types.length   }} />
    }]
  }
   
  const options= {
 
    legend: {
       display: false
    },
    tooltips: {
       enabled: false
    },
  
    scales: {
      x: {
        display: false,  
        grid: {
          display: false,  
          categoryPercentage:  1.0, // Adjust the space between categories/bars
          barPercentage:   1.0, // Ensure bars are 10% of the category width

        },
      },
      y: {
        display: true,  
        beginAtZero: true,
        grid: {
          display: false,  
        },
        ticks: {
          color: '#E5E5E5',  
          precision: 0 // Display only full numbers (integers)
        },

      },  
    },
  
  
  };
    return (
      <div className='PreviewBox PreviewBox-twice-size' >
  
            <div className='PreviewBox_HeadLine' > <p  className="font-type-menu" >{HeadLine}</p> </div>
   
        <div className='display-flex   justify-content-space-between' style={{ height:"100%" ,paddingRight:"20px", paddingLeft:"20px" , gap:"20px"}}>
  
        <div className='display-flex  'style={{ height: "auto", maxHeight: "150px", width: "100%", maxWidth: "600px", overflow: "hidden" }}> 
        <Bar  data={data}  options={options}  style={{   width:"auto" }} ></Bar></div>
  
  
<div className='display-flex  justify-content-center  ' style={{   width:"auto" ,gap:"2px" }}>
        <div className='display-flex flex-direction-column justify-content-center  ' style={{ marginRight:"10px",   gap:"2px" }}>
  {Array.isArray(bar_headlines) &&  bar_headlines?.map((Info, index) => {
return(
<div className='display-flex' style={{marginRight:"auto"}} key={index}>
<div className={` Bg-Blue-Glow light-bulb-type1 mr-a`}  style={{opacity:   (index +1) / bar_headlines.length   }} />
<p className='   font-type-txt Color-White  ' >{Info} </p>
</div>
)
})}
  </div>

       <div className='display-flex flex-direction-column   ' style={{  gap:"2px"  }}>
       {Array.isArray(bar_numbers) &&  bar_numbers?.map((Info, index) => {
  return(
    <div className='display-flex'  style={{  marginLeft:"auto"}} key={index}>
     <p className='   font-type-txt Color-White  '> {Info}</p>
    </div>
  )
   })}
       </div>
       </div>




        </div>
         
   
         
          </div>
    )
  }
  
function PreviewBox_type4_legend2({HeadLine , bar_numbers, bar_headlines, bar_title_legend,Count_Failed}) {
//   const[items_count, set_items_count]=useState({Failed:44})
//  console.log("Count_Failed",Count_Failed);
      const process_height = 16;
      const process_width = 66;
{/* <p className='   font-type-txt Color-Grey1'   style={{...text_style2   }} ></p> */}

      const statuses = [
        { count: 222, label: 'Complete',        description:"", bar: 'finish', time_text:"" ,error_note:false},
        { count: 1,   label: 'Complete*',       description:"(not in time)", bar: 'finish', time_text:"+15 Days" ,error_note:true},
        { count: 27,  label: 'Hunt',      description:"", bar: 'half', time_text:""   ,error_note:false},
        { count: 1,   label: 'Hunt*',     description:"(time passed)", bar: 'half',  time_text:"+20 Hrs" ,error_note:true},
        { count: Count_Failed,   label: 'Failed',          description:"",  bar: 'failed' ,time_text:"",  error_note:false},
      ];
      
      
      
      
            return (
      <div className='PreviewBox PreviewBox-twice-size' style={{ }}>
       
      <div className='PreviewBox_HeadLine' >
         <p  className="font-type-menu" >{HeadLine}</p> 
         
         </div>

         <div className="status-table">
      {statuses.map((status, index) => (
        <div key={index} className="status-row">
          <div className="font-type-txt Color-Grey1  status-count">{status?.count}</div>
          <div className="font-type-txt Color-White status-label">{status?.label} <span className="font-type-txt Color-Grey1">{status?.description} </span></div>

<div className="status-bar-and-time">  

<div className="status-bar">
            <div className={`status-bar-fill ${status?.bar}`}/>
          </div>
          <div className={`font-type-txt   time-general  ${status.error_note === true ?  'not-in-time' : 'in-time'}  `}>{status?.time_text}</div>


</div>



        </div>
      ))}
    </div>
        
           
                 
                  </div>
      
      
      
            )
          }
   
          
function PreviewBox_Not_active_tools({      show_only_this_tools, set_show_only_this_tools, dont_show_this_tools2, set_dont_show_this_tools2}) {
 
 
            function ToggleSwitch({ Info, onToggle }) {
              const [isChecked, setIsChecked] = useState(false);
           
              const handleChange = () => {
                setIsChecked(!isChecked);
                onToggle(Info); // Call the onToggle function passed from the parent, if needed
              };
            
              return (
                <label className="switch">
                  <input
                  disabled={isChecked}
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                  />
                  <span className="slider round"></span>
                </label>
              );
            }
            
            const handleToggle = (Info) => {
              // setIsChecked(true);
              setTimeout(() => {
          
          // to show the box again
          const newArry =   [ ...show_only_this_tools,  Info?.tool_id ]
          set_show_only_this_tools( newArry);
          
          // to dlete from not show list
            const indexNumber = dont_show_this_tools2.findIndex(x => x.tool_id  ===     Info?.tool_id);
           
          
          const newArry2 = dont_show_this_tools2
          // const index = array.indexOf(5);
          if (indexNumber > -1) { 
            newArry2.splice(indexNumber, 1); 
          }
           set_dont_show_this_tools2(newArry2)
          
          //  setIsChecked(false);
          
          
            }, 250);    };
          
           
          
            return (
          <>
          
           
          
            <div className='PreviewBox PreviewBox-of-tools' style={{
          
            //  flexShrink:5,
               flexGrow:1, 
               width:"248px",
              //  maxWidth:"210px",
              //  minWidth:"210px",
               }} > 
            
          
          <div style={{
            
            paddingTop:"var(--space-d)",
            paddingBottom:"var(--space-d)",
            paddingLeft:"var(--space-c)",
            paddingRight:"var(--space-c)", 
           display:'flex',
           flexDirection:'column',
            justifyContent:"space-between",
            
            height:"100%",
          
          }}>
          
          
          <div className=' '  > 
           
           <p className='  text-center    font-type-h4 Color-White mb-d'  style={{maxwidth:"350px"}} >UnActive</p>
           {/* <p className='text-center   font-type-txt Color-White  mb-a'    style={{maxwidth:"250px"}}>Return to Tools Dashboard</p> */}
           <div style={{
           
              height:"170px",
              overflowY: "auto"
           }}>
          
          {dont_show_this_tools2?.map((Info, index) => {
          return(
          <>
          <div className=' '  
           key={index}
           style={{
            display:"flex",
            justifyContent:"left",
            alignItems: "center",
            marginTop:"var(--space-b)",
          
           }}
           >
                     <ToggleSwitch Info={Info} onToggle={handleToggle} />
          
       
            <p className='text-center   font-type-txt Color-White  ml-b'    style={{ }}>{Info?.headline}</p>
           </div>
           
          </>
           
          
          
          )
          
           }
           )}
          
          
           </div>
          
          
          
          
           </div>
          
            
          
          
          
           
          
          
          
          <div>
          <button className="btn-type2"><p className='font-type-menu '>Turn on all</p>  </button> 
          </div>
          
          </div>
          
          
          
          
          
              </div>
          </>
          
            
            )
          }
          
 

function PreviewBox_type_module({ Info,  HeadLine,description,  StatusColor,date, logoAddress_1,logoAddress_2,  readMoreText,buttonTitle,iconAddress,toolURL , tool_id, show_only_this_tools, set_show_only_this_tools,     dont_show_this_tools2, set_dont_show_this_tools2 ,all_Tools , backEndURL ,notification_number}) {    
  const {  set_all_Tools   } = useContext(GeneralContext);
 
  const [logoAddress_1_ForSrc, set_logoAddress_1_ForSrc] = useState("")
  const [logoAddress_2_ForSrc, set_logoAddress_2_ForSrc] = useState("")
  
  // const IconAddressForSrc = require( `${iconAddress}`);

  const [IconAddressForSrc, set_IconAddressForSrc] = useState("")
  const [popUp_show, set_popUp_show] = useState(false);

  const [last_response, set_last_response] = useState(0)

  const [disabled, set_disabled] = useState(false)
  const [StatusColorClass, set_StatusColorClass] = useState("Bg-Grey2")
 

  useEffect(() => {
    check_last_response2(Info,backEndURL,set_last_response,set_StatusColorClass);
        }, [notification_number]);
   


  const handleReadMore = () =>{
    set_popUp_show(true);
  }

 


async function  ShowInUi (Info){
  console.log("now is ------------- ", Info?.ShowInUi);
  console.log("change to  --- ---------- ", !Info?.ShowInUi);
 
  try{
    // set_disable_ShowInUi_btn(true);
    const res = await
    axios.put(`${backEndURL}/tools/show-in-ui`,  {
      params: {
       module_id: tool_id ,
       set_ShowInUi_to: !Info?.ShowInUi,
      }
    });
    if(res.data){
      // set_disable_ShowInUi_btn(false);
    const index = all_Tools.findIndex(tool => tool.tool_id === tool_id);
    if (index !== -1) {
      // Create a new copy of the all_Tools array
      const updatedTools = [...all_Tools];
      // Update the specific tool
      updatedTools[index] = { ...updatedTools[index], tool_id: tool_id, ShowInUi: !Info?.ShowInUi };
      // Set the state with the updated array
      set_all_Tools(updatedTools);
   
    }
  
   
  
    }
  
       }catch(err){
        // set_disable_ShowInUi_btn(false);
        console.log(err);}
   }
 
 
   async function  enable_disable_module(Info){
    console.log("enable_disable_module", !Info?.isActive);
     
    
    try{
      set_disabled(true);
      const res = await
      axios.put(`${backEndURL}/tools/enable-disable`, {
        params: {
         module_id: tool_id ,
         set_enable_disable_to: !Info?.isActive,
        }
      });
    
    
      if(res.data){
      const index = all_Tools.findIndex(tool => tool.tool_id === tool_id);
      if (index !== -1) {
        // Create a new copy of the all_Tools array
        const updatedTools = [...all_Tools];
        // Update the specific tool
        updatedTools[index] = { ...updatedTools[index], tool_id: tool_id, isActive: !Info?.isActive };
        // Set the state with the updated array
        set_all_Tools(updatedTools);
        set_disabled(false);
      }
    
     
    
      }
    
         }catch(err){set_disabled(false);console.log(err);}
    
    
    //  console.log(Info?.isActive);
    // console.log(Info.Tool_name);
    
     }


  useEffect(() => {
    if (logoAddress_1 !== "" &&  logoAddress_1 !== null &&  logoAddress_1 !== undefined ) {
 
     const  Src = require( `${logoAddress_1}`)
      set_logoAddress_1_ForSrc(Src)
    }
    if (logoAddress_2 !== "" &&  logoAddress_2 !== null &&  logoAddress_2 !== undefined ) {
   
     const  Src = require( `${logoAddress_2}`)
      set_logoAddress_2_ForSrc(Src)
    }
    if (iconAddress !== "" &&  iconAddress !== null &&  iconAddress !== undefined ) {
   
     const  Src = require( `${iconAddress}`)
     set_IconAddressForSrc(Src)
    }

    }, []);

 
  return (

<>

<PopUp_For_Read_More
        HeadLine={HeadLine}
        readMoreText={readMoreText}
        logoAddress_1_ForSrc={logoAddress_1_ForSrc}
        toolURL={toolURL}
        buttonTitle={buttonTitle}
        set_popUp_show={set_popUp_show}
        popUp_show={popUp_show}
        IconAddressForSrc={IconAddressForSrc}
      />
{/* ////////////////////////////////////////////////////////////////////////////////////////// */}
    <div className='PreviewBox PreviewBox-of-tools'
    style={{
      flexGrow:1
     }}
    > 

    <div className='PreviewBox_HeadLine' >

    <label className="switch"><input type="checkbox" 
checked={Info?.isActive}
disabled={disabled}
 onClick={() => enable_disable_module(Info)} 
//  onChange={console.log(Info) }
 /> <span className="slider round"></span></label>  
{Info.BoxType === "Tools_a" &&  <>
 {/* ///////////// 1 or 2 logos /////////////// */}


 {logoAddress_2_ForSrc !== "" ? (
     <div className='display-flex     mr-a ml-a' style={{  }}>
 
     <img src={logoAddress_1_ForSrc} alt="logo"   className='responsive-logos-type_a'  />
     <p  className="font-type-very-sml-txt   Color-Grey1 mr-a ml-a" >&</p>
     <img src={logoAddress_2_ForSrc} alt="logo"     className='responsive-logos-type_a'  />
     </div>
    ):(
      <div className='display-flex ' style={{marginRight:"24px"}}>
        
      <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
      <img src={logoAddress_1_ForSrc} alt="logo" maxwidth="140" height="20"  />
      </div>
    )  }

</>}

  <div className={`${StatusColorClass}  light-bulb-type1`}/></div>







    <div className='display-flex justify-content-center align-items-center flex-direction-column'  > 
  {Info.BoxType === "Tools_a" ? (
    <>
    <img src={IconAddressForSrc} alt="Icon" width="70" height="70" className='mb-a' />
    <p className='text-center     font-type-h4 Color-White mb-a'  style={{maxwidth:"350px"}} >{HeadLine}</p>
    <p className='text-center   font-type-txt Color-White  mb-a '    style={{maxwidth:"250px"}}>{description}</p>
   </>


  ):(
<>
<div className='display-flex justify-content-center align-items-center flex-direction-column'  > 

<p className='text-center     font-type-h4 Color-White  '  style={{maxwidth:"350px"}} >{HeadLine}</p>
  <p className='text-center   font-type-txt Color-White  mb-a cutLongParagraph'    style={{maxwidth:"250px"}}>{description}</p>

{logoAddress_2_ForSrc !== "" ? (
   <div className='display-flex mb-b' style={{  }}>
    
   {/* <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p> */}
   <img src={logoAddress_1_ForSrc} alt="logo"   className='responsive-logos-type_b'  />
   <p  className="font-type-very-sml-txt   Color-Grey1 mr-a ml-a" >&</p>
   <img src={logoAddress_2_ForSrc} alt="logo"     className='responsive-logos-type_b'  />
   </div>
  ):(
    <div className='display-flex mb-b' style={{marginRight:"5px"  }}>
    <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
    <img src={logoAddress_1_ForSrc} alt="logo" maxwidth="140px" height="30"  />
    </div>
  )  }


</div>

</>
  )}     






    <button className="btn-type3 mb-c" onClick={()=>handleReadMore()}><p className=' font-type-txt'>Read More</p><IconReadMore className="icon-type1 "  />  </button>

    <button className="btn-type2" onClick={()=>handle_Main_Btn(tool_id,toolURL,backEndURL )}><p className='font-type-menu ' >{buttonTitle} </p>  </button> 

   
    </div>




    <div className='PreviewBox_ButtomLine' >
     <IconLastRun />
     <div className='font-type-very-sml-txt Color-Grey1' style={{marginRight:"auto"}}>{last_response == 0 ? ("UnRealized"):(format_date_type_a(last_response))}   </div>
     <button className="btn-type4"   tool_id={Info?.tool_id}      onClick={() => ShowInUi(Info)} ><p className=' font-type-txt'></p><IcoKey className="icon-type1"/></button>



   </div> {/*dont delete */}
     
    </div>
</>


  )
}

export {  PreviewBox_type0_static ,PreviewBox_type1_number, PreviewBox_type3_bar,   PreviewBox_Not_active_tools,PreviewBox_type2_pie ,PreviewBox_type4_legend2, PreviewBox_type_module};