import React, { useState , useContext } from 'react'
 
import { ReactComponent as IconBIG } from '../icons/ico-Resource-Group.svg';
import { ReactComponent as IconSettings } from '../icons/ico-settings.svg';
 import ResourceGroup_Action_btns from './ResourceGroup_Action_btns';
 import ResourceGroup_buttomLine from './ResourceGroup_buttomLine';

 import GeneralContext from '../../Context.js';
  // Adjust the path as needed based on your project structure
 
 import { Add_Edit_Resource_Item } from "../Add_Edit_Resource_Item";
 import LMloader from "../Features/LMloader.svg";
function ResourceGroup_All({Preview_this_Resource ,loader , set_loader ,filter_Resource}) {

  const [popUp_Add_or_Edit__show, set_popUp_Add_or_Edit__show] = useState(false);
  const [popUp_Add_or_Edit__status, set_popUp_Add_or_Edit__status] = useState("edit");

  const [resourceItem , set_resourceItem] = useState({})
  const { backEndURL } = useContext(GeneralContext);
  const [item_types_list, set_item_types_list] = useState([]);
  const [item_tool_list, set_item_tool_list] = useState([]);



  // const [formattedDate , set_formattedDate] = useState('')
  

  // console.log("allData",allData);
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

    return (
 
 
      <div className='ResourceGroup-All' style={{  display: "flex", flexDirection: "column" ,height:"100%" }}>
 
<Add_Edit_Resource_Item
item_types_list={item_types_list} 
set_item_types_list={set_item_types_list} 

 item_tool_list={item_tool_list}
 set_item_tool_list={set_item_tool_list}

        IconBIG={IconBIG}
        resourceItem={resourceItem}

        set_resourceItem={set_resourceItem}
        buttonTitle={"Save"}

      
        set_popUp_show={set_popUp_Add_or_Edit__show}
        popUp_show={popUp_Add_or_Edit__show}
        popUp_Add_or_Edit__status={popUp_Add_or_Edit__status}
      />
 


<div className='resource-group-list-headline mb-c ' >

<div className='resource-group-list-headline-left ' >
  <IconBIG/> <p className='font-type-h4   Color-White ml-b'>Resource List</p>
 
                  </div>

 <ResourceGroup_Action_btns
 
 set_popUp_Add_or_Edit__show={set_popUp_Add_or_Edit__show}
 popUp_Add_or_Edit__show={popUp_Add_or_Edit__show}
 set_popUp_Add_or_Edit__status={set_popUp_Add_or_Edit__status}
 
 />
 
</div>

 

{loader ? (<>
{/* /// its the loader when axios working */}
<div className='  loader-type-a' >  <img  src={LMloader} className="" alt="Loading Resources"/></div>
</>):(


  <>
<div className='resource-group-list-keyNames mb-a  ' style={{marginRight:"14px"}}>

<div className='resource-group-list-item list-item-big  ml-a'>
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
<div className='resource-group-list-item list-item-last list-item-small  '>
<p className='font-type-menu  make-underline Color-Grey1  '>Status</p>
</div>
 
 {/* <div className='its-only-space-for-the-scroller    '/>  */}
</div>

<div className='resource-group-list-box mb-c' >
  {Preview_this_Resource?.map((Info, index) => {


//custom sort order
// const sortOrder = {
//   'red': 1,
//   'yellow': 2,
//   'green': 3
// };

// Preview_this_Resource.sort((a, b) => {
//   const defaultOrder = 999;


//   const orderA = sortOrder[a.resource_status
//   ] || defaultOrder;
//   const orderB = sortOrder[b.resource_status
//   ] || defaultOrder;

//   return orderA - orderB;
// });


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
 
  {/* <p className='resource-group-list-item    font-type-txt   Color-Grey1  ml-a   '>{Info?.type}</p>  */}

  <div className='resource-group-list-item display-flex  list-item-big' >
 

{/* no types */}

{  Info?.types  === null   ||  Info?.types  === undefined   ||    Info?.types  === ""  ?
  (<p className='ml-a    font-type-txt   Color-Red   '> Undefined  </p> ) : null  }

{/* {  Info?.types  === null        &&   Info?.types?.length === 1  
  &&  Info?.types[0]?.resource_type_id === null ||  Info?.types[0]?.resource_type_id === "" ||  Info?.types[0]?.resource_type_id === undefined
  ? (<p className='ml-a    font-type-txt   Color-Red   '> Undefined  </p> ) : null  } */}


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
  {/* <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-small'>{Info?.port}</p>  */}

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


{/* {tools_array?.length === 2 ?  (<>
  <p className='ml-a  font-type-txt   Color-Blue-Glow tagit_type1'>{tools_array[0]}</p><p className='ml-a  font-type-txt   Color-Blue-Glow tagit_type1'>{tools_array[1]}</p> </>                       ) : null  } */}


  {/* {tools_array?.length > 2 ?  (<><p className='ml-a  font-type-txt   Color-Blue-Glow tagit_type1'>{tools_array[0]}</p>  <p className=' ml-a font-type-txt   Color-Grey1  '>+{tools_array?.length} More</p></>) : null  } */}


 
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

<ResourceGroup_buttomLine/>
</>
)}

 


</div>
 


    );
  }
  
  export default ResourceGroup_All;

