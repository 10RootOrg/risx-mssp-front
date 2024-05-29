import React, { useState , useContext ,useEffect} from 'react'
 
import { ReactComponent as IconBIG } from '../icons/ico-Results.svg';
import { ReactComponent as IconSettings } from '../icons/ico-settings.svg';
 import ResourceGroup_Action_btns from '../ResourceGroup/ResourceGroup_Action_btns';
 import ResourceGroup_buttomLine from '../ResourceGroup/ResourceGroup_buttomLine';
 import axios from 'axios';
 import GeneralContext from '../../Context.js';
 import { format_date_type_a ,format_date_type_c} from '../Features/DateFormat';
 
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



  const [PopUp_For__Nuclei__response__show, set_PopUp_For__Nuclei__response__show] = useState(false);




  const [json_file_info, set_json_file_info] = useState({})
  const [json_file_data, set_json_file_data] = useState({})


const handle_click_json = (Info) =>{
console.log(Info);

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
const params = {file_name : Info?.Response_Path }

 const res = await axios.get(`${backEndURL}/results/velociraptor-single-result`,{ params: params});
 
if (res){
   console.log(res.data);
 if (Info?.Module_ID === "2000000") {
  set_json_file_data(Info)
  set_json_file_info(res.data)
  set_PopUp_velociraptor_response__show(true)
 
 }

else{

  if (Info?.Module_ID === "2001005") { //nuclie

const tool = all_Tools?.filter((tool) =>  tool?.tool_id === Info?.Module_ID)
console.log("tool" ,tool);
    let updatedInfo = { ...Info, logoAddress_1: tool[0]?.logoAddress_1};
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
<div className='resource-group-list-item list-item-big   '><p className='font-type-menu  make-underline Color-Grey1 '>Start_Date</p></div>
<div className='resource-group-list-item list-item-big  ' style={{marginRight:"26px"}}><p className='font-type-menu  make-underline Color-Grey1  '>Status</p></div>
 
</div>

<div className='resource-group-list-box mb-c' >




  {Array.isArray(Preview_this_Results) && Preview_this_Results?.map((Info, index) => {
    
 

    return (
<div className='resource-group-list-line' key={index} onClick={()=>handle_click_json(Info)}>
 

<div className='ml-a  resource-group-list-item display-flex  list-item-big' >



{  Info?.Module_Name  === ""   &&    Info?.Sub_Module  === ""  &&<p className='ml-b   font-type-txt   Color-Red   '> Undefined  </p> }



{Info?.Module_Name && Info?.Sub_Module && 
(<>
  <p className="ml-a  font-type-txt   Color-Blue-Glow tagit_type1">Velociraptor</p>
<p className="ml-a font-type-very-sml-txt   Color-Grey1  ">+</p>
 <p className="ml-a  font-type-txt   Color-Blue-Glow tagit_type1">{Info?.Sub_Module}</p>

 </>)

}


{Info?.Module_Name && !Info?.Sub_Module && 
  (<>
  <p className="ml-a  font-type-txt   Color-Blue-Glow tagit_type1">{Info?.Module_Name}</p>
 
  </>)
}



</div>
 <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-big   '
//  style={{width:"60%" , maxWidth:"60%" , marginRight:"15px"}}
 >         {Info?.Arguments }      </p> 
<p className='resource-group-list-item    font-type-txt   Color-Grey1   list-item-big '>{ Info?.Start_Date &&            format_date_type_c(Info?.Start_Date)}</p> 
<p className='resource-group-list-item    font-type-txt   Color-Grey1   list-item-big '>{Info?.Status}</p> 
{/* <p className='resource-group-list-item    font-type-txt   Color-Grey1   list-item-big    ' style={{ }}>         {Info?.response_time ? format_date_type_a(Info?.response_time) : "Non Available" }      </p>  */}
{/* set_last_update(format_date_type_a(Info?.response)) */}
 </div>


    );
  })}

</div>

<ResourceGroup_buttomLine/>
</>
)}

 


</div>
 


    );
  }
  
  export default Results_All;

