import React, { useState , useContext, useEffect } from 'react'
import { ReactComponent as IconMain } from '../icons/ico-Resource-Group.svg';
 import { ReactComponent as IconSettings } from '../icons/ico-settings.svg';
import { ReactComponent as IconAdd } from '../icons/ico-plus.svg';

import { ReactComponent as IconComputer } from './asset-icons/ico-computers.svg';
import { ReactComponent as IconEmail } from './asset-icons/ico-email.svg';
import { ReactComponent as IconNoIcon } from './asset-icons/ico-no-icon.svg';
import { ReactComponent as IconDns } from './asset-icons/ico-dns.svg';
import { ReactComponent as IconIp } from './asset-icons/ico-ip.svg';
import { ReactComponent as IconPhonenumber } from './asset-icons/ico-phonenumbers.svg';
import { ReactComponent as IconUserNameSocial } from './asset-icons/ico-username.svg';
import { ReactComponent as IconFullName } from './asset-icons/ico-fullname.svg';
import { ReactComponent as IconCompany } from './asset-icons/ico-company.svg';

 import ResourceGroup_Action_btns from './ResourceGroup_Action_btns';
 import ResourceGroup_buttomLine from './ResourceGroup_buttomLine';
 import { ReactComponent as IcoResults } from '../icons/ico-menu-Results.svg';
 
import axios from 'axios'
 import GeneralContext from '../../Context.js';

//  import { Add_Edit_Resource_Item } from "../Add_Edit_Resource_Item";
// import {PopUp_All_Good ,PopUp_Are_You_Sure ,PopUp_Under_Construction} from '../PopUp_Smart'

 import LMloader from "../Features/LMloader.svg";
function ResourceGroup_List({

   loader ,
    set_popUp_Add_or_Edit__status,
    set_popUp_Add_or_Edit__show,
    popUp_Add_or_Edit__show, 
    add_resource_item,
    title,
    EditTools,
    Add_Many,
    asset_type_id,
    handle_back,
 
    assets_list_from_db,
    set_assets_list_from_db,

 

  }) {


  const {backEndURL} = useContext(GeneralContext);

  const [item_types_list, set_item_types_list] = useState([]);
  const [item_tool_list, set_item_tool_list] = useState([]);
  // const [assets_list_from_db, set_assets_list_from_db] = useState([]);
  const [is_search, set_is_search] = useState(false);

  const renderIcon = (resource_type_id) => {

    if (resource_type_id === "2001") {
return <IconDns />;

} else if (resource_type_id === "2002") {
return <IconIp />;

} else if (resource_type_id === "2003") {
return <IconUserNameSocial />;

} else if (resource_type_id === "2004") {
return <IconPhonenumber />;

} else if (resource_type_id === "2005") {
return <IconFullName />;

} else if (resource_type_id === "2006") {
return <IconEmail />;

} else if (resource_type_id === "2007") {
return <IconCompany />;

} else if (resource_type_id === "2008") {
return <IconComputer />;

} else {
return <IconNoIcon />;
}
};


// console.log("assets_list_from_db", assets_list_from_db);



useEffect(() => { 
   const get_resources_from_same_type = async()=>{ 
if (backEndURL === undefined){return};


const data = {
  asset_type_id:asset_type_id
}

   try{
      //  set_loader(true)
       const res = await axios.get(`${backEndURL}/Resources/same-type`,{ params: data});
       if (res){
           console.log("get_resources_from_same_type" , res.data);
           set_assets_list_from_db(res.data);
          //  set_loader(false)
   }}
   catch(err){
      //  set_loader(false)
       console.log(err);}
              
}

   get_resources_from_same_type();  }, [  backEndURL]);








      return (
 
<>

 

<div className='ResourceGroup-All' style={{  display: "flex", flexDirection: "column" ,height:"100%" }}>

<div className='resource-group-list-headline mb-b    ' 
//  onClick={()=>{handle_show_list(asset_type_id)}}
 >

<div className='resource-group-list-headline-left '>  

<div className='resource-group-icon'>{renderIcon(asset_type_id)}</div>   <p className={ ` font-type-h4  Color-White ml-b`}>{title}</p>
 
</div>





<ResourceGroup_Action_btns set_item_types_list={set_item_types_list}
 set_item_tool_list={set_item_tool_list}
set_popUp_Add_or_Edit__show={set_popUp_Add_or_Edit__show}
popUp_Add_or_Edit__show={popUp_Add_or_Edit__show}

set_popUp_Add_or_Edit__status={set_popUp_Add_or_Edit__status}

items_for_search={assets_list_from_db}
set_items_for_search={set_assets_list_from_db}
set_is_search={set_is_search}


btn_add_single_show={true}
btn_add_single_action={add_resource_item}
btn_add_single_value={"add"}
btn_add_single_id={asset_type_id}


btn_add_many_show={true} 
btn_add_many_action={Add_Many}
btn_add_many_id={asset_type_id}

btn_collapse_show={true}
btn_collapse_action={handle_back}



 />

</div>




{loader ? (<>

<div className='  loader-type-a' >  <img  src={LMloader} className="" alt="Loading Resources"/></div>
</>):(


  <>

<div className='resource-group-list-keyNames mb-a  mt-c '  >

<div className='resource-group-list-item list-item-big   ml-b '>
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

<div className='resource-group-list-box  mb-c' >




{Array.isArray(assets_list_from_db) && assets_list_from_db?.map((Info, index) => {

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

  <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-big ml-b'>{Info?.resource_string}</p> 
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




{assets_list_from_db?.length === 0 &&   is_search === false &&
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

{assets_list_from_db?.length === 0 &&   is_search === true &&
<div style={{  height:"100%" ,display:"flex",justifyContent:"center", alignItems:"center"}}>
<p className='  font-type-txt   Color-Grey1 '   >
No Records of {title}s for this search.
</p>
</div>
}

{assets_list_from_db?.length != 0 && is_search === false&&   <ResourceGroup_buttomLine  records_number={assets_list_from_db?.length || 0}/>  }


 
</>
)}


{/* </>} */}
</div>
<button className="btn-type4 mb-a"  onClick={handle_back}><p className='font-type-menu mr-a' >Back to Assets Type</p><div style={{ transform: "scale(0.9)" }}><IconMain className="icon-type1 "/></div>  </button>


</>
    );
  }
  
  export default ResourceGroup_List;
