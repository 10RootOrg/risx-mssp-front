import React, { useState , useContext ,useEffect} from 'react'
 
import { ReactComponent as IconBIG } from '../icons/ico-Results.svg';
import { ReactComponent as IconSettings } from '../icons/ico-settings.svg';
import { ReactComponent as Loader } from '../icons/loader_typea.svg';


 import ResourceGroup_Action_btns from '../ResourceGroup/ResourceGroup_Action_btns';
 import ResourceGroup_buttomLine from '../ResourceGroup/ResourceGroup_buttomLine';
 import axios from 'axios';
 import GeneralContext from '../../Context.js';
 import { format_date_type_a ,format_date_type_c} from '../Features/DateFormat';
 import '../StatusDisplay.css'; 

  // Adjust the path as needed based on your project structure
 
 
import {PopUp_All_Good ,PopUp_Request_info,PopUp_loader } from '../PopUp_Smart'



import {PopUp_For_velociraptor_response  , PopUp_For__Nuclei__response} from '../PopUp_response_modules'
 import LMloader from "../Features/LMloader.svg";
 import './Results_all.css'
function Results_All({
  Preview_this_Results ,
  set_Preview_this_Results,
  loader,set_loader,
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
  const [PopUp_loader__show, set_PopUp_loader__show] = useState(false);
  


  const  get_Json_single_response = async(Info)=>{

    try{
     console.log(Info);
     if (Info?.ResponsePath === undefined ){ console.log("Info?.ResponsePath" ,  Info?.ResponsePath );return;}
    const params = {file_name : Info?.ResponsePath }
    
    console.log(params);


    set_PopUp_loader__show(true);
     const res = await axios.get(`${backEndURL}/results/velociraptor-single-result`,{ params: params});
     


     if (typeof res.data === "string") {
      set_PopUp_loader__show(false);
     if(res.data === 'No data collected.'){ console.log(res.data ,Info);
      set_PopUp_loader__show(false);
      set_PopUp_Request_info__txt({
         HeadLine: Info?.Status === "Hunting" ? "No Data Collected yet" :
                   Info?.Status === "Complete" ? "No Data Collected"   : "No Data Collected"   , 
         
         paragraph:  Info?.Status === "Hunting" ? "The process is not complete keep Hunting.." :    
                    Info?.Status === "Complete" ? "the hunt is over, No data collected." :    "No data collected."
         
         , buttonTitle:"Close"
        
        })
      set_PopUp_Request_info__show(true)
     }

    else{

      set_PopUp_Request_info__txt({ HeadLine:"No results", paragraph: "Looks like no results file been created yet"   , buttonTitle:"Close" })
      set_PopUp_loader__show(false);
      set_PopUp_Request_info__show(true)
    }

   
    
 
        // "status": "Complete",
 
// if (  Info.Status  == "Hunting"   && Info.Error  == "No data collected."){
// set_PopUp_Request_info__txt({ HeadLine:"No Data Collected", paragraph:"the hunt is over,No data collected.", buttonTitle:"Close" })
// set_PopUp_Request_info__show(true)
// return}




 
    return
     }
    
    
    
    if (res){
     
       console.log("   Info    ",Info);
     if (Info?.ModuleName === "Velociraptor") {
      set_json_file_data(Info)
      set_json_file_info(res.data)
      set_PopUp_loader__show(false);
      set_PopUp_velociraptor_response__show(true)
     }
    else if (Info?.ModuleName === "Nuclei") {
         const tool = all_Tools?.filter((tool) =>  tool?.Tool_name === Info?.ModuleName)
         console.log("tool" ,tool);
        let updatedInfo = { ...Info, logoAddress_1: tool[0]?.logoAddress_1};
        console.log("updatedInfo" ,updatedInfo);
        set_json_file_data(updatedInfo);
        set_json_file_info(res.data);
        set_PopUp_loader__show(false);
        set_PopUp_For__Nuclei__response__show(true);
    }

      ;}
    }
    
    catch(err){console.log(err);}
    
    }


const handle_click_result = (Info) =>{
console.log("-------handle_click_result-------------",Info);
if (Info.status  == "Failed"   ){
  set_PopUp_Request_info__txt({ HeadLine:"Failed", paragraph:"The process stopped for an unknown reason", buttonTitle:"Close" })
  set_PopUp_Request_info__show(true)
  return}

 

switch (Info?.ModuleName) {



case 'Nuclei': ////////////////////////// Nuclei //////////////////////////
if(Info.Status  === "Failed"   ){
  set_PopUp_Request_info__txt({ HeadLine:"Failed", paragraph:"process failed", buttonTitle:"Close" })
  set_PopUp_Request_info__show(true)
  return}

else if( Info.Status   == null || Info.Status  == "" ||    Info.Status   == undefined ){
set_PopUp_Request_info__txt({ HeadLine:"Status undefined", paragraph:"When the mission status will be clear, we can refer to the results", buttonTitle:"Close" })
set_PopUp_Request_info__show(true)
return}

if (Info.Status  === "Complete"){  get_Json_single_response(Info);  return}
else{ return;  }



case "Velociraptor": ////////////////////////// Velociraptor //////////////////////////
if (Info.Status  === "Failed" || Info.Status   == null || Info.Status    == "" ||    Info.Status   == undefined      ){
  set_PopUp_Request_info__txt({ HeadLine:"Failed", paragraph:`Error Note: ", ${Info?.Error}`, buttonTitle:"Close" })
  set_PopUp_Request_info__show(true)
  return}
else{ get_Json_single_response(Info);   return;}



case "TimeSketch": ////////////////////////// TimeSketch //////////////////////////
if (all_Tools=== undefined){console.log( "cant make TimeSketch, all_Tools is ",all_Tools);   return }
if (all_Tools.length === 0){console.log( "cant make TimeSketch, all_Tools.length is ",all_Tools.length);   return }
const TimeSketch = all_Tools.filter(item => item?.tool_id === "2001002" );
if (TimeSketch=== undefined){console.log( "cant make TimeSketch, all_Tools TimeSketch is",TimeSketch);   return }
const link = TimeSketch[0]?.toolURL
if (link=== undefined){console.log( "cant make TimeSketch link its",link);   return }
window.open(  link   , '_blank');

break;


default:
console.log("default");
}





  // if (Info.Status  != "Complete" || Info.Status   == null || Info.Status    == "" ||    Info.Status   == undefined      ){
  //   set_PopUp_Request_info__txt({ HeadLine:"In process", paragraph:"The request has been sent", buttonTitle:"Close" })
  //   set_PopUp_Request_info__show(true)
  //   return}





 

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
  


{PopUp_loader__show && <PopUp_loader popUp_show={PopUp_loader__show} /> }
 


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

<div className='resource-group-list-headline-left ' ><IconBIG/> <p className='font-type-h4   Color-White ml-b'>Results list</p></div>

 <ResourceGroup_Action_btns
  items_for_search={Preview_this_Results}
  set_items_for_search={set_Preview_this_Results}
  show_btn_add={false}
 />
 
</div>

 

{loader ? (<>
{/* /// its the loader when axios working */}
<div className='  loader-type-a' >
  <Loader/> 
 {/* <img  src={LMloader} className="" alt="Loading Resources"/> */}


</div>
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
<div className='resource-group-list-line' key={index} onClick={()=>handle_click_result(Info)}>
 

<div className='ml-a  resource-group-list-item display-flex  list-item-big' >



{  Info?.ModuleName  === ""   &&    Info?.SubModuleName  === ""  &&<p className='ml-b   font-type-txt   Color-Red   '> Undefined  </p> }



{Info?.ModuleName && Info?.SubModuleName && 
(<>
  <p className="ml-a  font-type-txt   Color-Blue-Glow tagit_type1">Velociraptor</p>
<p className="ml-a font-type-very-sml-txt   Color-Grey1  ">+</p>
 <p className="ml-a  font-type-txt   Color-Blue-Glow tagit_type1">{Info?.SubModuleName}</p>

 </>)

}


{Info?.ModuleName && !Info?.SubModuleName && (<><p className="ml-a  font-type-txt   Color-Blue-Glow tagit_type1">{Info?.ModuleName}</p></>)}



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

<ResourceGroup_buttomLine records_number={Preview_this_Results?.length || 0}/>
</>
)}

 


</div>
 


    );
  }
  
  export default Results_All;

