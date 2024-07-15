import React, { useState , useContext, useEffect } from 'react'
 
import { ReactComponent as IconBIG } from '../icons/ico-Resource-Group.svg';
import { ReactComponent as IconSettings } from '../icons/ico-settings.svg';
import { ReactComponent as IconAdd } from '../icons/ico-plus.svg';
import ResourceGroup_Action_btns from './ResourceGroup_Action_btns';
import ResourceGroup_buttomLine from './ResourceGroup_buttomLine';
import axios from 'axios'
import GeneralContext from '../../Context.js';

import ResourceGroup_List from './ResourceGroup_List.jsx'
  // Adjust the path as needed based on your project structure
 
 import { Add_Edit_Resource_Item } from "../Add_Edit_Resource_Item";
import {PopUp_All_Good ,PopUp_Are_You_Sure ,PopUp_Under_Construction} from '../PopUp_Smart'

 import LMloader from "../Features/LMloader.svg";
function ResourceGroup_All({
  Preview_this_Resource ,
  set_Preview_this_Resource,
   loader ,
    set_loader,
    filter_Resource,
    set_filter_Resource
  }) {









  const {backEndURL ,all_Resource_Types} = useContext(GeneralContext)

  const [popUp_Add_or_Edit__show, set_popUp_Add_or_Edit__show] = useState(false);
  const [popUp_Add_or_Edit__status, set_popUp_Add_or_Edit__status] = useState("edit");

  const [PopUp_All_Good__show, set_PopUp_All_Good__show] = useState(false);
  const [PopUp_All_Good__txt, set_PopUp_All_Good__txt] = useState({
    HeadLine:"Success",
    paragraph:"successfully",
    buttonTitle:"Close"
  });

  const [PopUp_Are_You_Sure__show, set_PopUp_Are_You_Sure__show] = useState(false);
  const [PopUp_Are_You_Sure__txt, set_PopUp_Are_You_Sure__txt] = useState({
    HeadLine:"Are You Sure?",
    paragraph:"The record will be deleted from the system",
    buttonTrue:"True",
    buttonFalse:"False"
  });
  
  
  const [resourceItem , set_resourceItem] = useState({})
  const [item_types_list, set_item_types_list] = useState([]);
  const [item_tool_list, set_item_tool_list] = useState([]);

  const [show_this_list, set_show_this_list] = useState("");

const alllist = [
  {title:"Computers",
  IconBIGpath:"./asset-icons/ico-computers.svg",
  Preview_this_Resource: Preview_this_Resource["2008"],
  asset_type_id:"2008",
 },
 {title:"Company Name",
  IconBIGpath:"./asset-icons/ico-email.svg",
  Preview_this_Resource: Preview_this_Resource["2007"],
  asset_type_id:"2007",
 },

 {title:"Email Adress",
  IconBIGpath:"./asset-icons/ico-email.svg",
  Preview_this_Resource: Preview_this_Resource["2006"],
  asset_type_id:"2006",
 }
 ,
 {title:"Full Name",
  IconBIGpath:"./asset-icons/ico-phonenumbers.svg",
  Preview_this_Resource: Preview_this_Resource["2005"],
  asset_type_id:"2005",
 }
 ,
 {title:"Phone Number",
  IconBIGpath:"./asset-icons/ico-phonenumbers.svg",
  Preview_this_Resource: Preview_this_Resource["2004"],
  asset_type_id:"2004",
 }
 , 
 {title:"Username (Social)",
  IconBIGpath:"./asset-icons/ico-ip.svg",
  Preview_this_Resource: Preview_this_Resource["2003"],
  asset_type_id:"2003",
 }
 , 
 {title:"IP Address",
  IconBIGpath:"./asset-icons/ico-ip.svg",
  Preview_this_Resource: Preview_this_Resource["2002"],
  asset_type_id:"2002",
 }
 ,
 {title:"Domain",
  IconBIGpath:"./asset-icons/ico-dns.svg",
  Preview_this_Resource: Preview_this_Resource["2001"],
  asset_type_id:"2001",
 }
]

 
 
 

 





const EditTools = (Info) =>{

console.log(Info?.type);

  set_resourceItem(Info)
  

  set_item_types_list( [Info?.type])
 
//  make array from item types
// const resource_arrary =[]
//   if(Info?.types)
//   {
//     for (let x of Info?.types) {
//       resource_arrary.push(x.resource_type_id)
//     }
//     set_item_types_list(resource_arrary)
   
//   }

 //make array from item tools

  const item_arrary =[]
  if(Info?.tools)
  {
    for (let x of Info?.tools) {
      item_arrary.push(x.Toolid)
    }
    set_item_tool_list(item_arrary)
   
  }
  set_popUp_Add_or_Edit__status("edit")
  set_popUp_Add_or_Edit__show(true);
}

const handle_Confirm_Delete = () => {

 const  delete_item = async() =>{
  console.log('Deleting item...', resourceItem.resource_id);
  try{
    const res = await axios.delete(`${backEndURL}/Resources/${resourceItem.resource_id}`);
    if (res){ 
      if(res.data === true){
       
        set_PopUp_Are_You_Sure__show(false);
        set_PopUp_All_Good__txt({
          HeadLine:"Deleted",
          paragraph:"The resources is deleted",
          buttonTitle:"Close"
        })
        set_PopUp_All_Good__show(true);
        set_filter_Resource({type_ids:[],tool_ids:[]})// for not have mistakealso will pull all list

      }
 




         }} catch(err){console.log(err);} 
   }

   delete_item();
  

};

const handle_Cancel_Delete = () => {
  console.log('CancelDelete item...');
   set_popUp_Add_or_Edit__show(true);
  set_PopUp_Are_You_Sure__show(false)
};

const  add_resource_item = (btn_add_single_value,btn_add_single_id) =>{
  console.log("add_resource_item 00",btn_add_single_value,btn_add_single_id);

  set_item_types_list([btn_add_single_id])
  set_item_tool_list([])

  set_popUp_Add_or_Edit__status("add")
  set_popUp_Add_or_Edit__show(true)
  }

const handle_show_list=(resource_type_id)=>{
  console.log("handle_show_list",resource_type_id);
if(resource_type_id === show_this_list){set_show_this_list("");return}
  set_show_this_list(resource_type_id)
}

console.log(typeof Preview_this_Resource  , Preview_this_Resource["2006"]);
     return (
 
      <div className='ResourceGroup-All' style={{  display: "flex", flexDirection: "column" ,height:"100%" }}>


{PopUp_Are_You_Sure__show &&
 <PopUp_Are_You_Sure
 popUp_show={PopUp_Are_You_Sure__show}
 set_popUp_show={set_PopUp_Are_You_Sure__show}
 HeadLine={PopUp_Are_You_Sure__txt.HeadLine}
 paragraph={PopUp_Are_You_Sure__txt.paragraph} 
 button_True_text={PopUp_Are_You_Sure__txt.buttonTrue}
 button_False_text={PopUp_Are_You_Sure__txt.buttonFalse}
True_action={handle_Confirm_Delete}
False_action={handle_Cancel_Delete}
 /> }
 

{PopUp_All_Good__show &&
 <PopUp_All_Good
 popUp_show={PopUp_All_Good__show}
 set_popUp_show={set_PopUp_All_Good__show}
 HeadLine={PopUp_All_Good__txt.HeadLine}
 paragraph={PopUp_All_Good__txt.paragraph} 
buttonTitle={PopUp_All_Good__txt.buttonTitle}
 /> }
 

 {popUp_Add_or_Edit__show && 
<Add_Edit_Resource_Item
popUp_show={popUp_Add_or_Edit__show}
set_popUp_show={set_popUp_Add_or_Edit__show}
popUp_Add_or_Edit__status={popUp_Add_or_Edit__status}
 
IconBIG={IconBIG}
resourceItem={resourceItem}
set_resourceItem={set_resourceItem}
item_types_list={item_types_list} 
set_item_types_list={set_item_types_list} 
item_tool_list={item_tool_list}
set_item_tool_list={set_item_tool_list}

Preview_this_Resource={Preview_this_Resource}
set_Preview_this_Resource={set_Preview_this_Resource}

set_filter_Resource={set_filter_Resource}

set_PopUp_All_Good__txt={set_PopUp_All_Good__txt}
set_PopUp_All_Good__show={set_PopUp_All_Good__show}

set_PopUp_Are_You_Sure__show={set_PopUp_Are_You_Sure__show}
set_PopUp_Are_You_Sure__txt={set_PopUp_Are_You_Sure__txt}
      />}
 


{/* <div className='resource-group-list-headline mb-c ' ></div> */}

{loader ? (<>
<div className='  loader-type-a' >  <img  src={LMloader} className="" alt="Loading Resources"/></div>
</>):(

  <>

<div style={{display:"flex" , flexDirection:"column" , gap:"var(--space-d)"}}>




 
{/* {Array.isArray(all_Resource_Types) &&  all_Resource_Types?.map((Info, index) => {
 

return (<>

<button value={Info?.resource_type_id}>{Info?.resource_type_name}</button>
 </>)})}
 */}





{Array.isArray(alllist) &&  alllist?.map((Info, index) => {
  const shouldShow = show_this_list === "" || Info?.asset_type_id === "1000";

 return (

<>


 {   true &&
 

<div key={index} className="" style={{}}>

<ResourceGroup_List
title={Info?.title}
asset_type_id={Info?.asset_type_id}
IconBIGpath={Info?.IconBIGpath} 

Preview_this_Resource={Preview_this_Resource[Info?.asset_type_id]}
set_Preview_this_Resource={set_Preview_this_Resource}

set_popUp_Add_or_Edit__status={set_popUp_Add_or_Edit__status}
set_popUp_Add_or_Edit__show={set_popUp_Add_or_Edit__show}
popUp_Add_or_Edit__show={popUp_Add_or_Edit__show}

add_resource_item={add_resource_item}
EditTools={EditTools}
handle_show_list={handle_show_list}
show_this_list={show_this_list}
  />



</div>
 }

</>

 );
})}










{/* 
 <ResourceGroup_List
title={"Computers"}
asset_type_id={"2008"}
IconBIGpath={"./asset-icons/ico-computers.svg"} 

Preview_this_Resource={Preview_this_Resource["2008"]}
set_Preview_this_Resource={set_Preview_this_Resource}

set_popUp_Add_or_Edit__status={set_popUp_Add_or_Edit__status}
set_popUp_Add_or_Edit__show={set_popUp_Add_or_Edit__show}
popUp_Add_or_Edit__show={popUp_Add_or_Edit__show}

add_resource_item={add_resource_item}
EditTools={EditTools}
handle_show_list={handle_show_list}
show_this_list={show_this_list}
  /> */}

{/* <ResourceGroup_List
title={"Email Adress"}
asset_type_id={"2006"}
IconBIGpath={"./asset-icons/ico-email.svg"} 
Preview_this_Resource={Preview_this_Resource["2006"]}
set_Preview_this_Resource={set_Preview_this_Resource}

set_popUp_Add_or_Edit__status={set_popUp_Add_or_Edit__status}
set_popUp_Add_or_Edit__show={set_popUp_Add_or_Edit__show}
popUp_Add_or_Edit__show={popUp_Add_or_Edit__show}
add_resource_item={add_resource_item}
EditTools={EditTools}
handle_show_list={handle_show_list}
show_this_list={show_this_list}
  />

<ResourceGroup_List
title={"Phone Number"}
asset_type_id={"2004"}
IconBIGpath={"./asset-icons/ico-phonenumbers.svg"} 
Preview_this_Resource={Preview_this_Resource["2004"]}
set_Preview_this_Resource={set_Preview_this_Resource}

set_popUp_Add_or_Edit__status={set_popUp_Add_or_Edit__status}
set_popUp_Add_or_Edit__show={set_popUp_Add_or_Edit__show}
popUp_Add_or_Edit__show={popUp_Add_or_Edit__show}

add_resource_item={add_resource_item}
EditTools={EditTools}
handle_show_list={handle_show_list}
show_this_list={show_this_list}
  />

<ResourceGroup_List
title={"Domain"}
asset_type_id={"2001"}
IconBIGpath={"./asset-icons/ico-no-icon.svg"} 
Preview_this_Resource={Preview_this_Resource["2001"]}
set_Preview_this_Resource={set_Preview_this_Resource}

set_popUp_Add_or_Edit__status={set_popUp_Add_or_Edit__status}
set_popUp_Add_or_Edit__show={set_popUp_Add_or_Edit__show}
popUp_Add_or_Edit__show={popUp_Add_or_Edit__show}

add_resource_item={add_resource_item}
EditTools={EditTools}
handle_show_list={handle_show_list}
show_this_list={show_this_list}
  /> */}


</div>
</>
)}
</div>
 );}
  
  export default ResourceGroup_All;

