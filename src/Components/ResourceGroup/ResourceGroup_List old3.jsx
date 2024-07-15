import React, { useState , useContext, useEffect } from 'react'
 
// import { ReactComponent as IconBIG } from '../icons/ico-Resource-Group.svg';
import { ReactComponent as IconSettings } from '../icons/ico-settings.svg';
import { ReactComponent as IconAdd } from '../icons/ico-plus.svg';




import { ReactComponent as IconComputer } from './asset-icons/ico-computers.svg';
import { ReactComponent as IconEmail } from './asset-icons/ico-email.svg';
import { ReactComponent as IconNoIcon } from './asset-icons/ico-no-icon.svg';
import { ReactComponent as IconDns } from './asset-icons/ico-dns.svg';
import { ReactComponent as IconIp } from './asset-icons/ico-ip.svg';
import { ReactComponent as IconPhonenumber } from './asset-icons/ico-phonenumbers.svg';

 import ResourceGroup_Action_btns from './ResourceGroup_Action_btns';
 import ResourceGroup_buttomLine from './ResourceGroup_buttomLine';

 import { ReactSVG } from "react-svg";


import axios from 'axios'
 import GeneralContext from '../../Context.js';
  // Adjust the path as needed based on your project structure
 
 import { Add_Edit_Resource_Item } from "../Add_Edit_Resource_Item";
import {PopUp_All_Good ,PopUp_Are_You_Sure ,PopUp_Under_Construction} from '../PopUp_Smart'

 import LMloader from "../Features/LMloader.svg";
function ResourceGroup_List({
  Preview_this_Resource ,
  set_Preview_this_Resource,
   loader ,
    set_popUp_Add_or_Edit__status,
    set_popUp_Add_or_Edit__show,
    popUp_Add_or_Edit__show, 
    add_resource_item,
    title,
    IconBIGpath,
    EditTools,
    asset_type_id,

    handle_show_list ,
    show_this_list
  }) {


  // const IconBIG =  require(IconBIGpath)
  const {backEndURL} = useContext(GeneralContext)
  const [resourceItem , set_resourceItem] = useState({})
  const [item_types_list, set_item_types_list] = useState([]);
  const [item_tool_list, set_item_tool_list] = useState([]);
  const [Icon_BIG_path, set_Icon_BIG_path] = useState('');

  const [Icon_Path, set_Icon_Path] = useState('');






  useEffect(() => {
console.log("454444444444444444444444");
    if(   Preview_this_Resource?.length != 0 &&          (show_this_list == "" ||   show_this_list == asset_type_id)){
      console.log("showme");
    }
 else{
  console.log("hideme");
 }

  }, [])








  
  const renderIcon = () => {


    console.log("asset_type_id",typeof asset_type_id ,asset_type_id);
    if (asset_type_id === "2008") {
      return <IconComputer />;

    } else if (asset_type_id === "2001") {
      return <IconDns />;

    } else if (asset_type_id === "2002") {
      return <IconIp />;

    } else if (asset_type_id === "2004") {
      return <IconPhonenumber />;

    } else if (asset_type_id === "2006") {
      return <IconEmail />;



    } else {
      // Default case, render SettingsIcon or handle other cases
      return <IconNoIcon />;
    }
  };

   {/* <img src={Icon_BIG_path} alt={Icon_BIG_path}  />  */}
 

useEffect(() => {
  if (IconBIGpath) {
 
    try {

      // console.log("src0",IconBIGpath);
      const src1 = require(`${IconBIGpath}`);
      //  console.log("src1",src1);
      // const src2 = require(IconBIGpath);
      // console.log("src2",src2);

      // set_Icon_BIG_path(IconBIGpath);
      set_Icon_BIG_path(src1);

 
    } catch (error) {
      console.error('Error loading the SVG file:', error);
    }
  }
}, [IconBIGpath]);
 

console.log(typeof Preview_this_Resource == "object");
     return (
 
<>


{/* {Preview_this_Resource?.length != 0 &&          (show_this_list == "" ||   show_this_list == asset_type_id) &&
 
 } */}

<div className='ResourceGroup-All' style={{  display: "flex", flexDirection: "column" ,height:"100%" }}>

<button className='resource-group-list-headline mb-b   btn-menu'  onClick={()=>{handle_show_list(asset_type_id)}}>

<div className='resource-group-list-headline-left '>  

<div className='resource-group-icon'>{renderIcon()}</div>   <p className={ `  ${show_this_list === asset_type_id ?    "font-type-h4" : "font-type-menu"   }       font-type-menu   Color-White ml-a`}>{title}</p>

</div>


{Preview_this_Resource?.length === 0 &&  
<div style={{  height:"100%" ,display:"flex",justifyContent:"center", alignItems:"center"}}>
<p className='  font-type-txt   Color-Grey1 '   >
No Records of {title}s.  Use the '
<span style={{ display: 'inline-flex',  verticalAlign:"middle"}}>
  <IconAdd  style={{    margin:"0" , padding:"0"}} />
</span>
' icon to to add assets.
</p>
</div>
}


<ResourceGroup_Action_btns set_item_types_list={set_item_types_list}
 set_item_tool_list={set_item_tool_list}
set_popUp_Add_or_Edit__show={set_popUp_Add_or_Edit__show}
popUp_Add_or_Edit__show={popUp_Add_or_Edit__show}

set_popUp_Add_or_Edit__status={set_popUp_Add_or_Edit__status}

items_for_search={Preview_this_Resource}
set_items_for_search={set_Preview_this_Resource}

btn_add_single_show={true}
btn_add_single_action={add_resource_item}
btn_add_single_value={"add"}
btn_add_single_id={asset_type_id}


btn_add_many_show={true} 
btn_add_many_action={add_resource_item}
 />

</button>



     {Preview_this_Resource?.length != 0 && show_this_list === asset_type_id && <>







{loader ? (<>

<div className='  loader-type-a' >  <img  src={LMloader} className="" alt="Loading Resources"/></div>
</>):(


  <>

<div className='resource-group-list-keyNames mb-a  mt-c '  >

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
<div className='resource-group-list-item   list-item-small  ' style={{textAlign:"center"}}>
<p className='font-type-menu  make-underline Color-Grey1  ' >Status</p>
</div>
 
 <div className='its-only-space-for-the-scroller    '/> 
</div>

<div className='resource-group-list-box  mb-a' >




{Array.isArray(Preview_this_Resource) && Preview_this_Resource?.map((Info, index) => {

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
      <div className='resource-group-list-line' key={index}
       onClick={()=>EditTools(Info)}
       >

  <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-big'>{Info?.resource_string}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-big'>{Info?.description}</p> 

<div className='resource-group-list-item display-flex list-item-big' >
<button className="btn-type1"><IconSettings className="icon-type1 " />  </button>
 
{Info?.tools?.length === 1
  &&  Info?.tools[0]?.Toolid === null ||  Info?.tools[0]?.Toolid === "" ||  Info?.tools[0]?.Toolid === undefined
  ? (<p className='ml-a    font-type-txt   Color-Red   '> Undefined  </p> ) : null  }


{Info?.tools?.length === 1
  &&  Info?.tools[0]?.Toolid !== null &&  Info?.tools[0]?.Toolid !== "" &&  Info?.tools[0]?.Toolid !== undefined
  ? (<p className='ml-a  font-type-txt   Color-Blue-Glow tagit_type1'>{Info?.tools[0]?.toolname}</p> ) : null  }

{Info?.tools?.length === 2
  &&  Info?.tools[0]?.Toolid !== null &&  Info?.tools[0]?.Toolid !== "" &&  Info?.tools[0]?.Toolid !== undefined
  ? (<><p className='ml-a  font-type-txt   Color-Blue-Glow tagit_type1'>{Info?.tools[0]?.toolname}</p><p className='ml-a  font-type-txt   Color-Blue-Glow tagit_type1'>{Info?.tools[1]?.toolname}</p></> ) : null  }

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
<ResourceGroup_buttomLine  records_number={Preview_this_Resource?.length || 0}/>
 
</>
)}

</> }
</div>


</>
    );
  }
  
  export default ResourceGroup_List;

