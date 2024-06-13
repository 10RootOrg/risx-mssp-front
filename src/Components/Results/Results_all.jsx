import React, { useState , useContext ,useEffect} from 'react'
 
import { ReactComponent as IconBIG } from '../icons/ico-Results.svg';
import { ReactComponent as IconSettings } from '../icons/ico-settings.svg';
 import ResourceGroup_Action_btns from '../ResourceGroup/ResourceGroup_Action_btns';
 import ResourceGroup_buttomLine from '../ResourceGroup/ResourceGroup_buttomLine';
 import axios from 'axios';
 import GeneralContext from '../../Context.js';
 import { format_date_type_a ,format_date_type_c} from '../Features/DateFormat';
 import '../StatusDisplay.css'; 

  // Adjust the path as needed based on your project structure
 
 
import {PopUp_All_Good ,PopUp_Request_info } from '../PopUp_Smart'



import {PopUp_For_velociraptor_response  , PopUp_For__Nuclei__response} from '../PopUp_response_modules'
 import LMloader from "../Features/LMloader.svg";
 import './Results_all.css'
function Results_All({
  Preview_this_Results ,
  set_Preview_this_Results,
   loader ,
    set_loader,
    filter_Resource,
    set_filter_Resource
  }) {
    const {  backEndURL ,all_Tools } = useContext(GeneralContext);


  const [PopUp_velociraptor_response__show, set_PopUp_velociraptor_response__show] = useState(false);
  // const [popUp_Add_or_Edit__status, set_popUp_Add_or_Edit__status] = useState("edit");

  const [PopUp_All_Good__show, set_PopUp_All_Good__show] = useState(false);
  const [PopUp_All_Good__txt, set_PopUp_All_Good__txt] = useState({
    HeadLine:"Success",
    paragraph:"successfully",
    buttonTitle:"Close"
  });


  const [PopUp_Request_info__show, set_PopUp_Request_info__show] = useState(false);
  const [PopUp_Request_info__txt, set_PopUp_Request_info__txt] = useState({
    HeadLine:"In process",
    paragraph:"The request has been sent",
    buttonTitle:"Close"
  });

const status_bar_width = "140px"

  const [PopUp_For__Nuclei__response__show, set_PopUp_For__Nuclei__response__show] = useState(false);
  const [json_file_info, set_json_file_info] = useState({})
  const [json_file_data, set_json_file_data] = useState({})



const handle_click_json = (Info) =>{
// console.log(Info);

if (Info.Status  == "Failed"   ){
  set_PopUp_Request_info__txt({ HeadLine:"Failed", paragraph:"The process stopped for an unknown reason", buttonTitle:"Close" })
  set_PopUp_Request_info__show(true)
  return}

 else if (Info.Status  != "Complete" || Info.Status   == null || Info.Status    == "" ||    Info.Status   == undefined      ){
    set_PopUp_Request_info__txt({ HeadLine:"In process", paragraph:"The request has been sent", buttonTitle:"Close" })
    set_PopUp_Request_info__show(true)
    return}



const  get_Json_single_response = async()=>{
try{
 console.log(Info);

 if (Info?.ResponsePath === undefined ){ console.log("Info?.ResponsePath" ,  Info?.ResponsePath );return;}
const params = {file_name : Info?.ResponsePath }


console.log(params);
 const res = await axios.get(`${backEndURL}/results/velociraptor-single-result`,{ params: params});
 

 if (typeof res.data === "string") {
  set_PopUp_Request_info__txt({ HeadLine:"No results", paragraph: "Looks like no results file been created yet"   , buttonTitle:"Close" })
  set_PopUp_Request_info__show(true)

  console.log(res.data )  ;
return
 }



if (res){
   console.log("velociraptor-single-result    ",res.data);
 if (Info?.ModuleID === "2000000") {
  set_json_file_data(Info)
  set_json_file_info(res.data)
  set_PopUp_velociraptor_response__show(true)
 
 }

else{

  if (Info?.ModuleID === "2001005") { //nuclie

const tool = all_Tools?.filter((tool) =>  tool?.tool_id === Info?.ModuleID)
console.log("tool" ,tool);
    let updatedInfo = { ...Info, logoAddress_1: tool[0]?.logoAddress_1};
    console.log("updatedInfo" ,updatedInfo);
    set_json_file_data(updatedInfo)
    
    console.log(Info);
 
    set_json_file_info(res.data)
    set_PopUp_For__Nuclei__response__show(true)
   
   }
  



  // set_json_file_info(res.data)

}
  // console.log("222" , res.data.length)
  // console.log("000" ,typeof res.data?.table)
  // console.log("222" , res.data?.table)
  // console.log("444" , res.data?.table.length)
   
  ;}
}

catch(err){console.log(err);}

}

get_Json_single_response();  

}


useEffect(() => {
  // Sorting the array and updating the state with the sorted array
  const sortedResults = [...Preview_this_Results].sort((a, b) => {
    const dateA = new Date(a. response_time);
    const dateB = new Date(b. response_time);
    return dateB - dateA;  
  });
  set_Preview_this_Results(sortedResults);
}, [ ]); // This will re-sort the array whenever Preview_this_Results changes



 return (
 
 <div className='ResourceGroup-All' style={{  display: "flex", flexDirection: "column" ,height:"100%" }}>
  

  {PopUp_For__Nuclei__response__show &&
  <PopUp_For__Nuclei__response
  popUp_show={PopUp_For__Nuclei__response__show}
  set_popUp_show={set_PopUp_For__Nuclei__response__show}
  HeadLine={"Response"}
  logoAddress_1_ForSrc={""}
  buttonTitle={"Close"}
  json_file_info={json_file_info}
  json_file_data={json_file_data}
  /> 
  }




{PopUp_velociraptor_response__show&&
<PopUp_For_velociraptor_response
 popUp_show={PopUp_velociraptor_response__show}
 set_popUp_show={set_PopUp_velociraptor_response__show}
 HeadLine={"Response"}
 logoAddress_1_ForSrc={""}
 buttonTitle={"Close"}
 json_file_info={json_file_info}
 json_file_data={json_file_data}
/>
}

{/* PopUp_Request_info__show */}

{PopUp_Request_info__show &&
 <PopUp_Request_info
 popUp_show={PopUp_Request_info__show}
 set_popUp_show={set_PopUp_Request_info__show}
 HeadLine={PopUp_Request_info__txt.HeadLine}
 paragraph={PopUp_Request_info__txt.paragraph} 
buttonTitle={PopUp_Request_info__txt.buttonTitle}
 /> 
 }


{PopUp_All_Good__show &&
 <PopUp_All_Good
 popUp_show={PopUp_All_Good__show}
 set_popUp_show={set_PopUp_All_Good__show}
 HeadLine={PopUp_All_Good__txt.HeadLine}
 paragraph={PopUp_All_Good__txt.paragraph} 
buttonTitle={PopUp_All_Good__txt.buttonTitle}
 /> 
 }
 




<div className='resource-group-list-headline mb-c ' >

<div className='resource-group-list-headline-left ' ><IconBIG/> <p className='font-type-h4   Color-White ml-b'>Results List</p></div>

 <ResourceGroup_Action_btns
  items_for_search={Preview_this_Results}
  set_items_for_search={set_Preview_this_Results}
 />
 
</div>

 

{loader ? (<>
{/* /// its the loader when axios working */}
<div className='  loader-type-a' >  <img  src={LMloader} className="" alt="Loading Resources"/></div>
</>):(


  <>
<div className='resource-group-list-keyNames mb-a  '  >

<div className='resource-group-list-item list-item-big  ml-a '  ><p className='font-type-menu  make-underline Color-Grey1 ml-a '>Artifact Name</p></div>
<div className='resource-group-list-item   list-item-big '
//  style={{width:"60%" , maxWidth:"60%"}}
 ><p className='font-type-menu  make-underline Color-Grey1 '>Arguments</p></div>
<div className='resource-group-list-item list-item-small'><p className='font-type-menu  make-underline Color-Grey1 '>Start Date</p></div>
<div className='resource-group-list-item list-item-small'><p className='font-type-menu  make-underline Color-Grey1 '>Last Interval</p></div>
<div className='resource-group-list-item list-item-small'><p className='font-type-menu  make-underline Color-Grey1 '>Expire Date</p></div>


<div className='resource-group-list-item list-item-small'><p className='font-type-menu  make-underline Color-Grey1 '>Status</p></div>
<div className='resource-group-list-item list-item-big  ' style={{marginRight:"18px" ,width:status_bar_width}}><p className='font-type-menu  make-underline Color-Grey1  '>Status Display</p></div>
 
</div>

<div className='resource-group-list-box mb-c' >




  {Array.isArray(Preview_this_Results) && Preview_this_Results?.map((Info, index) => {
    
 

    return (
<div className='resource-group-list-line' key={index} onClick={()=>handle_click_json(Info)}>
 

<div className='ml-a  resource-group-list-item display-flex  list-item-big' >



{  Info?.ModuleName  === ""   &&    Info?.SubModule  === ""  &&<p className='ml-b   font-type-txt   Color-Red   '> Undefined  </p> }



{Info?.ModuleName && Info?.SubModule && 
(<>
  <p className="ml-a  font-type-txt   Color-Blue-Glow tagit_type1">Velociraptor</p>
<p className="ml-a font-type-very-sml-txt   Color-Grey1  ">+</p>
 <p className="ml-a  font-type-txt   Color-Blue-Glow tagit_type1">{Info?.SubModule}</p>

 </>)

}


{Info?.ModuleName && !Info?.SubModule && (<><p className="ml-a  font-type-txt   Color-Blue-Glow tagit_type1">{Info?.ModuleName}</p></>)}



</div>


 <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-big   '
//  style={{width:"60%" , maxWidth:"60%" , marginRight:"15px"}}
 >{ JSON.stringify(Info?.Arguments) }</p> 





<p className='resource-group-list-item  font-type-txt  Color-Grey1  list-item-small'>{ Info?.StartDate &&  format_date_type_c(Info?.StartDate)}</p> 
<p className='resource-group-list-item  font-type-txt  Color-Grey1  list-item-small'>{ Info?.StartDate &&  format_date_type_c(Info?.LastIntervalDate)}</p> 
<p className='resource-group-list-item  font-type-txt  Color-Grey1  list-item-small'>{ Info?.ExpireDate &&  format_date_type_c(Info?.StartDate)}</p> 
<p className='resource-group-list-item  font-type-txt  Color-Grey1  list-item-small'>{ Info?.Status}</p> 

<div className="status-bar-and-time" style={{width:status_bar_width}}>  
<div className="status-bar">
            {/* <div className={`status-bar-fill `}/> */}
            <div className={`status-bar-fill ${Info?.Status}`}/>
          </div>
          <div className={`font-type-txt   time-general  ${Info?.TimeNote != "In Time" ?  'not-in-time' : 'in-time'}  `}>{Info?.TimeNote === "In Time" ? null : Info?.TimeNote}</div>
</div>
</div>
 
//  </div>


    );
  })}

</div>
{/* <p className='resource-group-list-item    font-type-txt   Color-Grey1   list-item-big '>{Info?.Status}    {Info?.TimeNote}   </p>  */}

<ResourceGroup_buttomLine/>
</>
)}

 


</div>
 


    );
  }
  
  export default Results_All;

