import React, { useState , useContext, useEffect } from 'react'
 
import { ReactComponent as IconBIG } from '../icons/ico-Resource-Group.svg';
import { ReactComponent as IconSettings } from '../icons/ico-settings.svg';
import { ReactComponent as IconAdd } from '../icons/ico-plus.svg';
 import ResourceGroup_Action_btns from './ResourceGroup_Action_btns';
 import ResourceGroup_buttomLine from './ResourceGroup_buttomLine';
import axios from 'axios'
 import GeneralContext from '../../Context.js';
  // Adjust the path as needed based on your project structure
 
 import { Add_Edit_Resource_Item } from "../Add_Edit_Resource_Item";
import {PopUp_All_Good ,PopUp_Are_You_Sure} from '../PopUp_Smart'

 import LMloader from "../Features/LMloader.svg";
function ResourceGroup_All({
  Preview_this_Resource ,
  set_Preview_this_Resource,
   loader ,
    set_loader,
    filter_Resource,
    set_filter_Resource
  }) {

  const {backEndURL} = useContext(GeneralContext)

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
  
  

console.log("backEndURL",backEndURL);



  const [resourceItem , set_resourceItem] = useState({})
  const [item_types_list, set_item_types_list] = useState([]);
  const [item_tool_list, set_item_tool_list] = useState([]);




const EditTools = (Info) =>{

console.log(Info);

  set_resourceItem(Info)
  
//  make array from item types
const resource_arrary =[]
  if(Info?.types)
  {
    for (let x of Info?.types) {
      resource_arrary.push(x.resource_type_id)
    }
    set_item_types_list(resource_arrary)
   
  }

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

 

useEffect(() => {
const sorted = Preview_this_Resource.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
set_Preview_this_Resource(sorted);

}, [Preview_this_Resource])
console.log(typeof Preview_this_Resource == "object");
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
 


<div className='resource-group-list-headline mb-c ' >

<div className='resource-group-list-headline-left ' >
  <IconBIG/> <p className='font-type-h4   Color-White ml-b'>Resource List</p>
 
                  </div>

 <ResourceGroup_Action_btns
 
   set_item_types_list={set_item_types_list}
   set_item_tool_list={set_item_tool_list}
 set_popUp_Add_or_Edit__show={set_popUp_Add_or_Edit__show}
 popUp_Add_or_Edit__show={popUp_Add_or_Edit__show}
 set_popUp_Add_or_Edit__status={set_popUp_Add_or_Edit__status}

 items_for_search={Preview_this_Resource}
 set_items_for_search={set_Preview_this_Resource}



 />
 
</div>

 

{loader ? (<>

<div className='  loader-type-a' >  <img  src={LMloader} className="" alt="Loading Resources"/></div>
</>):(


  <>
<div className='resource-group-list-keyNames mb-a  '  >

<div className='resource-group-list-item list-item-big   '>
<p className='font-type-menu  make-underline Color-Grey1 '>Type</p>
</div>
<div className='resource-group-list-item list-item-big    '>
<p className='font-type-menu  make-underline Color-Grey1 '>String</p>
</div>
<div className='resource-group-list-item   list-item-big '>
<p className='font-type-menu  make-underline Color-Grey1 '>Description</p>
</div>
 
<div className='resource-group-list-item list-item-big  '>
<p className='font-type-menu  make-underline Color-Grey1 '>Active Tools</p>
</div>
<div className='resource-group-list-item list-item-small  '>
<p className='font-type-menu  make-underline Color-Grey1 '>Monitor</p>
</div>
<div className='resource-group-list-item    '>
<p className='font-type-menu  make-underline Color-Grey1 '>Checked</p>
</div>
<div className='resource-group-list-item   list-item-small  '>
<p className='font-type-menu  make-underline Color-Grey1  '>Status</p>
</div>
 
 <div className='its-only-space-for-the-scroller    '/> 
</div>

<div className='resource-group-list-box mb-c' >

{Preview_this_Resource?.length === 0 &&  

<div style={{  height:"100%" ,display:"flex",justifyContent:"center", alignItems:"center"}}>

{/* <p className='  font-type-txt   Color-Grey1   ' style={{   display:"flex" , alignItems:"center"}}>
 It is recommended to fill in all available resources to get the most features,
Look for the icon 
</p> 
<span  style={{  marginTop:"2px"}}> <IconAdd/></span>
<p className='  font-type-txt   Color-Grey1   ' style={{   display:"flex" , alignItems:"center"}}>
in the button bar
</p> 
</div> */}


<p className='  font-type-txt   Color-Grey1 '   >
It is recommended to fill in all available resources to get the most features. Look for the icon '
<span style={{ display: 'inline-flex',  verticalAlign:"middle"}}>
  <IconAdd  style={{    margin:"0" , padding:"0"}} />
</span>
' in the button bar.
</p>


</div>



}

 


  {Array.isArray(Preview_this_Resource) && Preview_this_Resource?.map((Info, index) => {


// Preview_this_Resource.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

const dateString = Info?.checked;
let formattedDate = "Never"; // Default value

if (dateString) {
  const date = new Date(dateString);
  formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

 
    // Determine the class based on StatusColor
    const StatusColorClass = Info?.resource_status
    === 'red' ? 'Bg-Red' :
                             Info?.resource_status
                             === 'yellow' ? 'Bg-Yellow' :
                             Info?.resource_status
                             === 'green' ? 'Bg-Green' :
                              
                              'Bg-Grey2';
  
    return (
      <div className='resource-group-list-line' key={index} onClick={()=>EditTools(Info)}>

  <div className='resource-group-list-item display-flex  list-item-big' >


{  Info?.types  === null   ||  Info?.types  === undefined   ||    Info?.types  === ""  ?
  (<p className='ml-a    font-type-txt   Color-Red   '> Undefined  </p> ) : null  }

{/* if there is only one type */}
{Info?.types?.length === 1
  &&  Info?.types[0]?.resource_type_id !== null &&  Info?.types[0]?.resource_type_id !== "" &&  Info?.types[0]?.resource_type_id !== undefined
  ? (<p className='ml-a  font-type-txt   Color-Grey1 tagit_type1 tagit_type2'>{Info?.types[0]?.resource_type_name}</p> ) : null  }


{/* 2 types */}
{Info?.types?.length === 2
  &&  Info?.types[0]?.resource_type_id !== null &&  Info?.types[0]?.resource_type_id !== "" &&  Info?.types[0]?.resource_type_id !== undefined
  ? (<>
  <p className='ml-a  font-type-txt    Color-Grey1 tagit_type1 tagit_type2'>{Info?.types[0]?.resource_type_name}</p>
  <p className='ml-a  font-type-txt    Color-Grey1 tagit_type1 tagit_type2'>{Info?.types[1]?.resource_type_name}</p>
  </> ) : null  }

{/* > 2 types */}
{Info?.types?.length > 2
  &&  Info?.types[0]?.resource_type_id !== null &&  Info?.types[0]?.resource_type_id !== "" &&  Info?.types[0]?.resource_type_id !== undefined
  ? (<><p className='ml-a  font-type-txt    Color-Grey1 tagit_type1 tagit_type2'>{Info?.types[0]?.resource_type_name}</p>  <p className=' ml-a font-type-txt   Color-Grey1  '>+{Info?.types?.length -1} More</p></>) : null  }

 

 
</div>


 

  <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-big'>{Info?.resource_string}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-big'>{Info?.description}</p> 

<div className='resource-group-list-item display-flex list-item-big' >
<button className="btn-type1"><IconSettings className="icon-type1 " />  </button>
 
{/* no tools */}
{Info?.tools?.length === 1
  &&  Info?.tools[0]?.Toolid === null ||  Info?.tools[0]?.Toolid === "" ||  Info?.tools[0]?.Toolid === undefined
  ? (<p className='ml-a    font-type-txt   Color-Red   '> Undefined  </p> ) : null  }


{/* if there is only one tool */}
{Info?.tools?.length === 1
  &&  Info?.tools[0]?.Toolid !== null &&  Info?.tools[0]?.Toolid !== "" &&  Info?.tools[0]?.Toolid !== undefined
  ? (<p className='ml-a  font-type-txt   Color-Blue-Glow tagit_type1'>{Info?.tools[0]?.toolname}</p> ) : null  }


{/* 2 tools */}
{Info?.tools?.length === 2
  &&  Info?.tools[0]?.Toolid !== null &&  Info?.tools[0]?.Toolid !== "" &&  Info?.tools[0]?.Toolid !== undefined
  ? (<><p className='ml-a  font-type-txt   Color-Blue-Glow tagit_type1'>{Info?.tools[0]?.toolname}</p><p className='ml-a  font-type-txt   Color-Blue-Glow tagit_type1'>{Info?.tools[1]?.toolname}</p></> ) : null  }

{/* > 2 tools */}
{Info?.tools?.length > 2
  &&  Info?.tools[0]?.Toolid !== null &&  Info?.tools[0]?.Toolid !== "" &&  Info?.tools[0]?.Toolid !== undefined
  ? (<><p className='ml-a  font-type-txt   Color-Blue-Glow tagit_type1'>{Info?.tools[0]?.toolname}</p>  <p className=' ml-a font-type-txt   Color-Grey1  '>+{Info?.tools?.length -1} More</p></>) : null  }


</div>


  <div className='resource-group-list-item list-item-small display-flex' >
  <label className="switch">
  <input type="checkbox" 
 checked={Info?.monitoring}
 onChange={()=>(console.log("fixit"))}
  // defaultChecked={Math.random() < 0.7}
   />
  <span className="slider round"></span>
</label>
</div>

 


  <p className='resource-group-list-item    font-type-txt   Color-Grey1  '>{formattedDate}</p> 
  <div className='resource-group-list-item    list-item-last   list-item-small   '>
  <div className={`    ${StatusColorClass}  light-bulb-type1`}/>
  </div>

      </div>
    );
  })}

</div>




<ResourceGroup_buttomLine records_number={Preview_this_Resource.length || 0}/>
</>
)}


</div>
 


    );
  }
  
  export default ResourceGroup_All;

