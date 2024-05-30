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
    console.log("check_last_response2 ", Info.Tool_name);
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
    console.log(bar_numbers[i]);
    sum += bar_numbers[i];
  }

  if (sum === 0) {
    set_has_data(false);
  } else {
    set_has_data(true);
  }
}, [bar_numbers]);
   

  

  console.log(bar_numbers);
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
  
function PreviewBox_type4_legend({HeadLine , bar_numbers, bar_headlines, bar_title_legend}) {
 
const column_height = "20px";
const process_height = 16;
const process_width = 66;
// Bg-Blue-Hover
const column_style = {
height:"auto"  ,
justifyContent:"start",
gap:"8px" ,
alignItems:"start",
width: "auto",
 

}


const column_text_style = {
height:column_height  ,
display:"flex",
// justifyContent:"center",
alignItems:"center" ,
whiteSpace: "nowrap",
overflow: "hidden",
textOverflow: "ellipsis",
width: "auto" ,
minWidth:"auto",
maxWidth:"auto",

padding:"0"
 }

const Legend_of_complete = ({ number })=>(
  <div style={{ height: column_height, width:"auto" ,display:"flex",alignItems:"center"  ,justifyContent:"center" }}>
    <div className='display-flex   Bg-Blue-Glow'   style={{ height: process_height ,width:process_width,  borderRadius:"15px" }}/> 
      </div>);  


const Legend_of_complete_not_in_time = ({ number })=>(
  <div style={{ height: column_height, width:"auto" ,display:"flex",alignItems:"center"  ,justifyContent:"center" }}>
    <div className='display-flex   Bg-Blue-Glow'   style={{ height: process_height ,width:process_width,  borderRadius:"15px" }}/> 
    {/* <div className='display-flex   Bg-Orange ml-b' style={{ height: process_height * 0.7  ,width:process_height * 0.7,  borderRadius:"15px" }}/>  */}
  <p className='   font-type-txt Color-Grey1 ml-b 'style={{marginTop:"auto", marginBottom:"auto", width:"100%"}} >{number}</p>
      </div>);  
 
 const Legend_of_processing  = ({  })=>(
  <div style={{ height: column_height, width:"auto" ,display:"flex",alignItems:"center"  ,justifyContent:"center" }}>
    <div className='display-flex   Bg-Blue-Glow'   style={{ height: process_height ,width:process_width/2,  borderTopLeftRadius:"15px" , borderBottomLeftRadius:"15px" }}/> 
    <div className='display-flex   Bg-Blue-Hover'   style={{ height: process_height ,width:process_width/2,  borderTopRightRadius:"15px" , borderBottomRightRadius:"15px" }}/> 
        </div>);  

const Legend_of_processing_not_in_time = ({ number })=>(
  <div style={{ height: column_height, width:"auto" ,display:"flex",alignItems:"center"  ,justifyContent:"center" }}>
    <div className='display-flex   Bg-Blue-Glow'   style={{ height: process_height ,width:process_width/2,  borderTopLeftRadius:"15px" , borderBottomLeftRadius:"15px" }}/> 
    <div className='display-flex   Bg-Blue-Hover'   style={{ height: process_height ,width:process_width/2,  borderTopRightRadius:"15px" , borderBottomRightRadius:"15px" }}/> 
    <div className='display-flex   Bg-Orange ml-b' style={{ height: process_height * 0.7  ,width:process_height * 0.7,  borderRadius:"15px" }}/> 
  <p className='   font-type-txt Color-Grey1 ml-b 'style={{marginTop:"auto", marginBottom:"auto"}} >{number}</p>
      </div>);  

const Legend_of_Faild  = ({ })=>(
  <div style={{ height: column_height, width:"auto" ,display:"flex",alignItems:"center"  ,justifyContent:"center" }}>
    <div className='display-flex   Bg-Blue-Glow'   style={{ height: process_height ,width:process_width/2,  borderTopLeftRadius:"15px" , borderBottomLeftRadius:"15px" }}/> 
    <div className='display-flex   Bg-Red'   style={{ height: process_height ,width:process_width/2,  borderTopRightRadius:"15px" , borderBottomRightRadius:"15px" }}/> 
        </div>);  

const text_style2 = {
  // backgroundColor:"blue",
  alignItems:"center" ,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  }
const Legend_of_processing_not_in_time2 = ({ number })=>(
  // <div style={{ height: column_height, width:"auto" ,display:"flex",alignItems:"center"  ,justifyContent:"center" }}>
    // <div style={{ width: "100%",display:"flex"}}>  
 <div  style={{  display:"flex" }} >


    <div   style={{  display:"flex" ,marginTop:"auto",  marginBottom:"auto"}}>
    <div className='display-flex   Bg-Blue-Glow'   style={{ height: process_height ,width:process_width/2,  borderTopLeftRadius:"15px" , borderBottomLeftRadius:"15px" }}/> 
    <div className='display-flex   Bg-Blue-Hover'   style={{ height: process_height ,width:process_width/2,  borderTopRightRadius:"15px" , borderBottomRightRadius:"15px" }}/> 
    </div>



    {/* <div className='display-flex   Bg-Orange ml-b' style={{ height: process_height * 0.7  ,width:process_height * 0.7,  borderRadius:"15px" }}/>  */}
      
    <p className='   font-type-txt Color-Grey1 ml-a'   style={text_style2} >{number}</p>

      
       </div>)


       const Legend_of_processing_not_in_time3 = ({ number })=>(
        // <div style={{ height: column_height, width:"auto" ,display:"flex",alignItems:"center"  ,justifyContent:"center" }}>
          // <div style={{ width: "100%",display:"flex"}}>  
       <div  style={{  display:"flex" , width:""}} >
      
      
          <div   style={{  display:"flex" ,marginTop:"auto",  marginBottom:"auto"}}>
          <div className='display-flex   Bg-Blue-Glow'   style={{ height: process_height ,width:process_width/2,  borderTopLeftRadius:"15px" , borderBottomLeftRadius:"15px" }}/> 
          <div className='display-flex   Bg-Blue-Hover'   style={{ height: process_height ,width:process_width/2,  borderTopRightRadius:"15px" , borderBottomRightRadius:"15px" }}/> 
          </div>
      
                  
          <p className='   font-type-txt Color-Grey1 ml-a'   style={text_style2} >{number}</p>
      
            
             </div>)
       
       
       ;  




      return (
<div className='PreviewBox PreviewBox-twice-size' style={{ }}>
 
<div className='PreviewBox_HeadLine' >
   <p  className="font-type-menu" >{HeadLine}</p> </div>

<div  style={{ 
  height:"100%" ,
 width:"100%" ,
   display:"flex",
   gap:"5px",
  //  justifyContent:"space-around",
  //  backgroundColor:"pink",
  //  justifyContent:"strech",
  //  alignItems:"center"
   
   
   }}>


{/* <div  className='display-flex '  style={{  width:"auto"  }} > */}
<div style={{   width:"30%" , backgroundColor:"red" }}>
<p className='   font-type-txt Color-White'    style={{...text_style2, minWidth:"60px"}} >Complete</p>
<p className='   font-type-txt Color-White'    style={{...text_style2, minWidth:"60px"}} >Complete</p>
<p className='   font-type-txt Color-White'    style={{...text_style2, minWidth:"60px"}} >Failed</p>
</div>




{/* <div  className='display-flex '  style={{  width:"auto"  }} > */}
<div style={{   width:"30%" , backgroundColor:"yellow" ,marginRight:"auto"}}>
{/* <p className='   font-type-txt Color-Grey1'   style={{...text_style2,  maxWidth:"40%"}} >dd</p>
<p className='   font-type-txt Color-Grey1'   style={{...text_style2,  maxWidth:"40%"}} >Editonal text Editonal text Editonal text Editonal text</p>
<p className='   font-type-txt Color-Grey1'   style={{...text_style2,   maxWidth:"40%"}} >NOne</p> */}
<p className='   font-type-txt Color-Grey1'   style={{...text_style2   }} >texts</p>
<p className='   font-type-txt Color-Grey1'   style={{...text_style2   }} ></p>

<p className='   font-type-txt Color-Grey1'   style={{...text_style2   }} >Editonal text Editonal text Editonal text Editonal text</p>

 </div>

 <div style={{  width:"40%" ,
   backgroundColor:"purple"
    }}>
<Legend_of_processing_not_in_time3 number={"+2 Days"}/>  
<Legend_of_processing_not_in_time3 number={""}/>  
<Legend_of_processing_not_in_time3 number={"+2 Days"}/>  
</div>

 


  
  </div>
   

 
     
           
            </div>



      )
    }

function PreviewBox_type4_legend2({HeadLine , bar_numbers, bar_headlines, bar_title_legend}) {
 
      const process_height = 16;
      const process_width = 66;
{/* <p className='   font-type-txt Color-Grey1'   style={{...text_style2   }} ></p> */}

      const statuses = [
        { count: 222, label: 'Complete',        description:"", bar: 'finish', time_text:"" ,error_note:false},
        { count: 1,   label: 'Complete*',       description:"(not in time)", bar: 'finish', time_text:"+15 Days" ,error_note:true},
        { count: 27,  label: 'In Process',      description:"", bar: 'half', time_text:""   ,error_note:false},
        { count: 1,   label: 'In Process*',     description:"time passed too long text should cut", bar: 'half',  time_text:"+20 Hrs" ,error_note:true},
        { count: 5,   label: 'Failed',          description:"",  bar: 'failed' ,time_text:"",  error_note:false},
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
      



function PreviewBox_type_tools_a({ Info,  HeadLine,description,  StatusColor,date, logoAddress_1,logoAddress_2,  readMoreText,buttonTitle,iconAddress,toolURL , tool_id, show_only_this_tools, set_show_only_this_tools,     dont_show_this_tools2, set_dont_show_this_tools2 ,all_Tools , backEndURL ,notification_number}) {
  // const {   moduleLinks  } = useContext(GeneralContext);      
 
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

 
function turn_on_off_tool(){
 
  setTimeout(() => {

    const indexNumber = show_only_this_tools.findIndex(x => x === tool_id);
    if (indexNumber !== -1) {
        const tempArray = [...show_only_this_tools]; // Make a copy of the array
        tempArray.splice(indexNumber, 1); // Remove the element at the found index
        set_show_only_this_tools(tempArray); // Update the state

        const thisTool = all_Tools.filter((tool) => tool.tool_id === tool_id );
         const tempArray2 = dont_show_this_tools2
         tempArray2.push(thisTool[0]);
         set_dont_show_this_tools2(tempArray2);
 
    }
}, 250); // W
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

    <div className='PreviewBox PreviewBox-of-tools'
    style={{
      flexGrow:1
     }}
    > 

    <div className='PreviewBox_HeadLine' >

   <label className="switch"><input type="checkbox" 
  //  checked={true}
  defaultChecked
   
    disabled={disabled}
    // onChange={turn_on_off_tool}
    // onClick={() => set_disabled(true)} 
    // tool_id={Info?.tool_id}
    /> <span className="slider round"></span></label>    {/* //  checked={Info?.Monitor} */}




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

  <div className={`${StatusColorClass}  light-bulb-type1`}/></div>
  
    <div className='display-flex justify-content-center align-items-center flex-direction-column'  > 
    <img src={IconAddressForSrc} alt="Icon" width="70" height="70" className='mb-a' />
    <p className='text-center     font-type-h4 Color-White mb-a'  style={{maxwidth:"350px"}} >{HeadLine}</p>
    <p className='text-center   font-type-txt Color-White  mb-a'    style={{maxwidth:"250px"}}>{description}</p>
    <button className="btn-type3 mb-c" onClick={()=>handleReadMore()}><p className=' font-type-txt'>Read More</p><IconReadMore className="icon-type1 "  />  </button>

    <button className="btn-type2" onClick={()=>handle_Main_Btn(tool_id,toolURL,backEndURL )}><p className='font-type-menu ' >{buttonTitle} </p>  </button> 

   
    </div>

    <div className='PreviewBox_ButtomLine' >
     <IconLastRun />
     <div className='font-type-very-sml-txt Color-Grey1' style={{marginRight:"auto"}}>{last_response == 0 ? ("UnRealized"):(format_date_type_a(last_response))}   </div>

     <button className="btn-type4"   tool_id={Info?.tool_id} onClick={turn_on_off_tool} ><p className=' font-type-txt'></p><IcoKey className="icon-type1"/></button>

     {/* <label className="switch"><input type="checkbox" 
  //  checked={true}
  defaultChecked
    onChange={turn_on_off_tool}
    disabled={disabled}
    onClick={() => set_disabled(true)} 
    tool_id={Info?.tool_id}
    /> <span className="slider round"></span></label>   */}



   </div> {/*dont delete */}
     
    </div>
</>


  )
}

function PreviewBox_type_tools_b({ Info, HeadLine,description,  logoAddress_1,logoAddress_2, readMoreText,buttonTitle, toolURL, show_tool_PreviewBoxs_type_a_b, tool_id, show_only_this_tools, set_show_only_this_tools,   dont_show_this_tools2, set_dont_show_this_tools2, all_Tools , backEndURL ,notification_number}) {
 
 
  // const StatusColorClass =
  // StatusColor === 'red' ? 'Bg-Red' :
  // StatusColor === 'blue' ?'Bg-Blue-Glow' : 
  // 'Bg-Grey2';


  // const {   moduleLinks  } = useContext(GeneralContext);      

 
  const [Show_popUp___Read_More,     set_Show_popUp___Read_More] = useState(false);
  // const [Show_PopUp_tool___Nuclei,  set_Show_PopUp_tool___Nuclei] = useState(false);
  const [Show_PopUp_tool___Dehashed,   set_Show_PopUp_tool___Dehashed] = useState(false);

  const [Show_PopUp_before_active_module_id,  set_Show_PopUp_before_active_module_id] = useState('');
  const [Show_PopUp_before_active_module___Nuclei,  set_Show_PopUp_before_active_module___Nuclei] = useState(false);

  const [logoAddress_1_ForSrc, set_logoAddress_1_ForSrc] = useState("")
  const [logoAddress_2_ForSrc, set_logoAddress_2_ForSrc] = useState("")

  const [last_response, set_last_response] = useState(0)

  const [disabled, set_disabled] = useState(false)
  const [StatusColorClass, set_StatusColorClass] = useState("Bg-Grey2")
 

useEffect(() => {
  check_last_response2(Info,backEndURL,set_last_response,set_StatusColorClass);
      }, [notification_number]);
 


  const handleReadMore = () =>{
    set_Show_popUp___Read_More(true);
  }


  useEffect(() => {

if (Show_PopUp_before_active_module_id === '' || Show_PopUp_before_active_module_id === undefined){return}
else if (Show_PopUp_before_active_module_id === '2001005'){set_Show_PopUp_before_active_module___Nuclei(true)}


  }, [Show_PopUp_before_active_module_id]);
 
  useEffect(() => {
    if (logoAddress_1 !== "" &&  logoAddress_1 !== null &&  logoAddress_1 !== undefined ) {
 
     const  Src = require( `${logoAddress_1}`)
      set_logoAddress_1_ForSrc(Src)
    }
    if (logoAddress_2 !== "" &&  logoAddress_2 !== null &&  logoAddress_2 !== undefined ) {
 
     const  Src = require( `${logoAddress_2}`)
      set_logoAddress_2_ForSrc(Src)
    }



    }, []);

 
 

    function turn_on_off_tool(){

      setTimeout(() => {
    
        const indexNumber = show_only_this_tools.findIndex(x => x === tool_id);
        if (indexNumber !== -1) {

          const tempArray = show_only_this_tools;
          const newArr = tempArray.slice(0, indexNumber).concat(tempArray.slice(indexNumber + 1));
         set_show_only_this_tools( newArr);

       
         const thisTool = all_Tools.filter((tool) => tool.tool_id === tool_id );
         const tempArray2 = dont_show_this_tools2
         tempArray2.push(thisTool[0]);
         set_dont_show_this_tools2(tempArray2);


        }
    }, 250); // W
    }

  return (
<>


{Show_popUp___Read_More &&
<PopUp_For_Read_More
        HeadLine={HeadLine}
        readMoreText={readMoreText}
        logoAddress_1_ForSrc={logoAddress_1_ForSrc}
        toolURL={toolURL}
        buttonTitle={buttonTitle}
        set_popUp_show={set_Show_popUp___Read_More}
        popUp_show={Show_popUp___Read_More}
      />}



{Show_PopUp_tool___Dehashed && 
<PopUp_For_Dehashed_data
        HeadLine={HeadLine}
        readMoreText={readMoreText}
        logoAddress_1_ForSrc={logoAddress_1_ForSrc}
        toolURL={toolURL}
        buttonTitle={buttonTitle}
        set_popUp_show={set_Show_PopUp_tool___Dehashed}
        popUp_show={Show_PopUp_tool___Dehashed}
      />}




 {Show_PopUp_before_active_module___Nuclei && 
 <PopUp_before_active_module____Nuclei
 set_Show_PopUp_before_active_module_id={set_Show_PopUp_before_active_module_id}
 Show_PopUp_before_active_module_id={Show_PopUp_before_active_module_id}


 logoAddress_1_ForSrc={logoAddress_1_ForSrc}
 set_popUp_show={set_Show_PopUp_before_active_module___Nuclei}
 popUp_show={Show_PopUp_before_active_module___Nuclei}


/>

 }





  <div className='PreviewBox PreviewBox-of-tools' > 


{show_tool_PreviewBoxs_type_a_b ? (<>

  <div className='PreviewBox_HeadLine' style={{  height:20}}>
 
 <label className="switch"><input type="checkbox"  defaultChecked 
 disabled={disabled}
//  onClick={() => set_disabled(true)} 
//  onChange={turn_on_off_tool}
 /> <span className="slider round"></span></label>    {/* //  checked={Info?.Monitor} */}

<div className={`${StatusColorClass}  light-bulb-type1`}/></div>

  <div className='display-flex justify-content-center align-items-center flex-direction-column'  > 
  {/* <img src={IconAddressForSrc} alt="Icon" width="70" height="70" className='mb-a' /> */}
  <p className='text-center     font-type-h4 Color-White mb-a'  style={{maxwidth:"350px"}} >{HeadLine}</p>
  <p className='text-center   font-type-txt Color-White  mb-b cutLongParagraph'    style={{maxwidth:"250px"}}>{description}</p>



{/* ///////////// 1 or 2 logos /////////////// */}
  {logoAddress_2_ForSrc !== "" ? (
   <div className='display-flex mb-a' style={{  }}>
   {/* <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p> */}
   <img src={logoAddress_1_ForSrc} alt="logo"   className='responsive-logos-type_b'  />
   <p  className="font-type-very-sml-txt   Color-Grey1 mr-a ml-a" >&</p>
   <img src={logoAddress_2_ForSrc} alt="logo"     className='responsive-logos-type_b'  />
   </div>
  ):(
    <div className='display-flex mb-a' style={{marginRight:"5px"  }}>
    <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
    <img src={logoAddress_1_ForSrc} alt="logo" maxwidth="140px" height="30"  />
    </div>
  )  }





<button className="btn-type3 mb-c" onClick={()=>handleReadMore()}><p className=' font-type-txt'>Read More</p><IconReadMore className="icon-type1 " />  </button>

 
<button className="btn-type2" onClick={()=>handle_Main_Btn(tool_id,toolURL,backEndURL ,set_Show_PopUp_before_active_module_id)}><p className='font-type-menu ' >{buttonTitle} </p>  </button> 
 
  


  </div>
  <div className='PreviewBox_ButtomLine' >
     <IconLastRun />
     <div className='font-type-very-sml-txt Color-Grey1' style={{marginRight:"auto"}}>{last_response == 0 ? ("UnRealized"):(format_date_type_a(last_response))}   </div>

     <button className="btn-type4"   tool_id={Info?.tool_id} onClick={turn_on_off_tool} ><p className=' font-type-txt'></p><IcoKey className="icon-type1"/></button>

     {/* <label className="switch"><input type="checkbox" 
  //  checked={true}
  defaultChecked
    onChange={turn_on_off_tool}
    disabled={disabled}
    onClick={() => set_disabled(true)} 
    // tool_id={Info?.tool_id}
    /> <span className="slider round"></span></label>   */}



   </div> {/*dont delete */}

</>):(<p>loading</p> )}






    </div>
</>

  
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

 {/* <label className="switch">
  <input type="checkbox"  
  key={index}
    checked={isChecked}
   onChange={()=>turn_on(Info)}
   /> 
  <span className="slider round"></span></label>    */}
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


export {  PreviewBox_type0_static ,PreviewBox_type1_number, PreviewBox_type3_bar, PreviewBox_type4_legend,PreviewBox_type_tools_a,PreviewBox_type_tools_b , PreviewBox_Not_active_tools,PreviewBox_type2_pie ,PreviewBox_type4_legend2};