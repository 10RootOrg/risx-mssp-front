import React, { useState , useContext ,useEffect} from 'react'
 
import { ReactComponent as IconBIG } from '../icons/ico-menu-alert.svg';
 import { ReactComponent as Loader } from '../icons/loader_typea.svg';

 import ResourceGroup_Action_btns from '../ResourceGroup/ResourceGroup_Action_btns.jsx';
 import ResourceGroup_buttomLine from '../ResourceGroup/ResourceGroup_buttomLine.jsx';
 import axios from 'axios';
 import GeneralContext from '../../Context.js';
 import { format_date_type_a ,format_date_type_c} from '../Features/DateFormat.js';
 import '../StatusDisplay.css'; 

  // Adjust the path as needed based on your project structure
 
 
import {PopUp_All_Good ,PopUp_Alert_info,PopUp_loader } from '../PopUp_Smart.js'

 import LMloader from "../Features/LMloader.svg";
//  import './Dashboard_Results_all.css'
function Alert_list({
  Preview_this_Results ,
  set_Preview_this_Results,
  loader
  }) {
    const {  backEndURL ,all_Tools ,front_IP} = useContext(GeneralContext);
    const [is_search, set_is_search] = useState(false);

console.log("Preview_this_Results",Preview_this_Results);


  const [PopUp_Alert_info__show, set_PopUp_Alert_info__show] = useState(false);
  const [PopUp_Alert_info__txt, set_PopUp_Alert_info__txt] = useState({
    HeadLine:"Alert",
    description:"",
    time:"",
    severity:"",
    buttonTitle:"Close"
  });



  


  const [PopUp_loader__show, set_PopUp_loader__show] = useState(false);
  const [sort_by, set_sort_by] = useState("StartDate");
  const [firstTimeData,setfirstTimeData]=useState(true); // usewith useeffect to now the first load and to sort

 

const handle_click_result = (Info) =>{
console.log("-------handle_click_result-------------",Info);

 set_PopUp_Alert_info__txt ({
  HeadLine:"Alert Name",
  description:Info?.description,
  time:"14:22 23.7.2024",
  severity:Info?.severity,
  buttonTitle:"Close"
});

set_PopUp_Alert_info__show(true)
}

 



const do_sort = (column) => {
console.log("sort this column: " , column);
  if (!column) {
    console.log("Can't sort ", column);
    return;
  }

  if (column === sort_by) {
    console.log("It's already sorted like this, reversing the order");
    const sorted = [...Preview_this_Results].sort((a, b) => {console.log("b[column]", b[column]);
      if (b[column] < a[column]) return -1;
      if (b[column] > a[column]) return 1;
      return 0;
    });
    console.log("Sorted descending:", sorted);
    set_Preview_this_Results(sorted);
    set_sort_by(""); // Reset sort_by to allow toggling between asc and desc

  } else {
    set_sort_by(column);
    const sorted = [...Preview_this_Results].sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    console.log("Sorted ascending:", sorted);
    set_Preview_this_Results(sorted);
  }
};


// for first load  =>  sorting the list
useEffect(() => {
if (Preview_this_Results?.length >=2&&firstTimeData ) {
  do_sort("StartDate");
  setfirstTimeData(false)
}
  
}, [Preview_this_Results])


 return (
 
 <div className='ResourceGroup-All' style={{  display: "flex", flexDirection: "column" ,height:"100%" }}>
  


{PopUp_loader__show && <PopUp_loader popUp_show={PopUp_loader__show} /> }
 


{PopUp_Alert_info__show &&
 <PopUp_Alert_info
 popUp_show={PopUp_Alert_info__show}
 set_popUp_show={set_PopUp_Alert_info__show}

 HeadLine={PopUp_Alert_info__txt.HeadLine}
 description={PopUp_Alert_info__txt.description} 
 severity={PopUp_Alert_info__txt.severity}
 time={PopUp_Alert_info__txt.time} 
 
buttonTitle={PopUp_Alert_info__txt.buttonTitle}
 /> }



<div className='resource-group-list-headline mb-c ' >

<div className='resource-group-list-headline-left ' ><IconBIG/> <p className='font-type-h4   Color-White ml-b'>Alert list</p></div>

 <ResourceGroup_Action_btns
  items_for_search={Preview_this_Results}
  set_items_for_search={set_Preview_this_Results}
  set_is_search={set_is_search}
  btn_add_single_show={false}
  // btn_add_single_action={add_resource_item}
  // btn_add_single_value={"add"}
  btn_add_many_show={false}
  // btn_add_many_action={}


 />
 
</div>

 

{loader ? (<>
{/* /// its the loader when axios working */}
<div className='  loader-type-a' >
  <Loader/> 

</div>
</>):(
  <>
<div className='resource-group-list-keyNames mb-a  '  >

             <div className='resource-group-list-item   list-item-big ml-b' onClick={() => do_sort("description")}>     <p className='font-type-menu  make-underline Color-Grey1 '>Description</p></div>
             {/* <div className='resource-group-list-item list-item-biggest' onClick={() => do_sort("StartDate")}>                    <p className='font-type-menu  no-underline Color-Grey1'>Start Date</p></div> */}
             <div className='resource-group-list-item list-item-small' onClick={() => do_sort("severity")}>             <p className='font-type-menu  make-underline Color-Grey1 '>Severity</p></div>
             {/* <div className='resource-group-list-item list-item-small' onClick={() => do_sort("ExpireDate")} >                  <p className='font-type-menu  make-underline Color-Grey1 '>Quota</p></div> */}

             

             <div className='resource-group-list-item list-item-status-color' onClick={() => do_sort("severity")}  style={{textAlign:"center" }}> <p className='font-type-menu  make-underline Color-Grey1 ' >Color</p></div>

             <div className='resource-group-list-item list-item-small ' onClick={() => do_sort("date")}  style={{ marginRight: "25px"}}>   <p className='font-type-menu  make-underline Color-Grey1 '>Date</p></div>
</div>

<div className='resource-group-list-box mb-c' >

  {Array.isArray(Preview_this_Results) && Preview_this_Results?.map((Info, index) => {
    console.log("Info?.Response?.success ", Info?.Response?.success);




    // const AlertColors = [
    //   getComputedStyle(document.documentElement).getPropertyValue('--alert-color-critical'),
    //   getComputedStyle(document.documentElement).getPropertyValue('--alert-color-high'),
    //       getComputedStyle(document.documentElement).getPropertyValue('--alert-color-medium'),
    //       getComputedStyle(document.documentElement).getPropertyValue('--alert-color-low')
    //     ];  
      





 const AlertColors =

Info?.severity?.toLowerCase()
=== 'critical' ? 'alert-bg-color-critical' :

Info?.severity?.toLowerCase()
=== 'high' ? 'alert-bg-color-high' :

Info?.severity?.toLowerCase()
=== 'medium' ? 'alert-bg-color-medium' :

Info?.severity?.toLowerCase()
=== 'low' ? 'alert-bg-color-low' :

Info?.severity?.toLowerCase()
=== 'all-good' ? 'alert-bg-color-no-alert' :

'alert-bg-color-none';


// .alert-bg-color-low{background-color:var(--alert-color-low)}
// .alert-bg-color-medium{background-color:var(--alert-color-medium)}
// .alert-bg-color-high{background-color:var(--alert-color-high)}
// .alert-bg-color-critical{background-color:var(--alert-color-critical)}

// .alert-bg-color-none{background-color:var(--alert-color-no-alert)}
// .alert-bg-color-no-alert{background-color:var(--alert-color-none)}


    return (



      
<div className='resource-group-list-line' key={index} onClick={()=>handle_click_result(Info)}>

{/* <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-big   '>{ JSON.stringify(Info?.Arguments) }</p>  */}


 <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-big  ml-b '>{ Info?.description }</p> 
{/* <p className='resource-group-list-item  font-type-txt  Color-Grey1 list-item-biggest'>{ JSON.stringify(Info?.Response?.result) }</p>  */}
<p className='resource-group-list-item  font-type-txt  Color-Grey1  list-item-small'>{Info?.severity ? Info?.severity : <span className="alert-color-medium">No Description</span>} </p> 

<div className='resource-group-list-item   list-item-status-color '> <div className={`${AlertColors}  light-bulb-type1`} style={{marginLeft:"auto", marginRight:"auto"}}/></div>

{/* <p className='resource-group-list-item  font-type-txt  Color-Grey1  list-item-small'>{Info?.Response?.quota}</p>  */}
<p className='resource-group-list-item  font-type-txt  Color-Grey1  list-item-small'>{Info?.date}</p>
 {/* list-item-last  */}

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
  
  export default Alert_list;

