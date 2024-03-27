import React, { useState } from 'react'
 
import { ReactComponent as IconBIG } from '../icons/ico-websites.svg';
import { ReactComponent as IconSettings } from '../icons/ico-settings.svg';
 import ResourceGroup_Action_btns from './ResourceGroup_Action_btns';
 import ResourceGroup_buttomLine from './ResourceGroup_buttomLine';
 import jsonData from '../../tmpjsons/ResourceGroup-websites.json';
 
  // Adjust the path as needed based on your project structure
 
 import { Edit_Resource_Item } from "../Edit_Resource_Item";
function ResourceGroup_List___WebSites({allData}) {
  const [popUp_show, set_popUp_show] = useState(false);
  const [resourceItem , set_resourceItem] = useState({})


  console.log("allData",allData);
const EditTools = (Info) =>{

  console.log("EditTools",typeof Info);
  set_resourceItem(Info)
  set_popUp_show(true);
}

    return (
 
 
<div>
 
<Edit_Resource_Item

// site_id={site_id}


        IconBIG={IconBIG}
        resourceItem={resourceItem}

HeadLine={"Edit Tools"}
readMoreText={"readMoreText"}
        logoAddress_1_ForSrc={"logoAddress_1_ForSrc"}
        toolURL={"toolURL"}
        buttonTitle={"Save"}
        set_popUp_show={set_popUp_show}
        popUp_show={popUp_show}
        IconAddressForSrc={"IconAddressForSrc"}
        


      />
 


<div className='resource-group-list-headline mb-c '>

<div className='resource-group-list-headline-left ' ><IconBIG/> <p className='font-type-h4   Color-White ml-b'>WebSites</p></div>

 <ResourceGroup_Action_btns/>
 
</div>


<div className='resource-group-list-keyNames mb-a' >

<div className='resource-group-list-item  ml-a'>
<p className='font-type-menu  make-underline Color-Grey1 '>Type</p>
</div>
<div className='resource-group-list-item list-item-big  '>
<p className='font-type-menu  make-underline Color-Grey1 '>Name</p>
</div>
<div className='resource-group-list-item   '>
<p className='font-type-menu  make-underline Color-Grey1 '>IP Adress</p>
</div>
<div className='resource-group-list-item list-item-small  '>
<p className='font-type-menu  make-underline Color-Grey1 '>Port</p>
</div>
<div className='resource-group-list-item list-item-big  '>
<p className='font-type-menu  make-underline Color-Grey1 '>Active Tools</p>
</div>
<div className='resource-group-list-item list-item-small  '>
<p className='font-type-menu  make-underline Color-Grey1 '>Monitor</p>
</div>
<div className='resource-group-list-item list-item-small  '>
<p className='font-type-menu  make-underline Color-Grey1 '>Checked</p>
</div>
<div className='resource-group-list-item list-item-small  list-item-last  '>
<p className='font-type-menu  make-underline Color-Grey1 '>Status</p>
</div>
 
 <div className='its-only-space-for-the-scroller    mr-c'/> 
</div>

<div className='resource-group-list-box mb-c' >
  {allData?.map((Info, index) => {


 
 

//custom sort order
const sortOrder = {
  'red': 1,
  'yellow': 2,
  'green': 3
};

allData.sort((a, b) => {
  // Default sort order for items not found in sortOrder
  const defaultOrder = 999;

  // Get the order for each status, or use defaultOrder if not found
  const orderA = sortOrder[a.website_status] || defaultOrder;
  const orderB = sortOrder[b.website_status] || defaultOrder;

  // Compare the two orders
  return orderA - orderB;
});



// console.log("ssss", Info?.tools?.length);
// console.log(Info?.tools[0]?.Toolid === null);
// const aaaa = Info?.tools
// const tools_array = aaaa.split(', ');
 
 

    // Determine the class based on StatusColor
    const StatusColorClass = Info?.website_status === 'red' ? 'Bg-Red' :
                             Info?.website_status === 'yellow' ? 'Bg-Yellow' :
                             Info?.website_status === 'green' ? 'Bg-Green' :
                              
                              'Bg-Grey2';
  
    return (
      <div className='resource-group-list-line' key={index} onClick={()=>EditTools(Info)}>
 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1  ml-a  '>{Info?.type}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-big'>{Info?.name_address}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1  '>{Info?.ip_address}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-small'>{Info?.port}</p> 

<div className='resource-group-list-item display-flex list-item-big' >
<button className="btn-type1"><IconSettings className="icon-type1 " />  </button>

{/* {tools_array?.length === 0  ?  (<p className='ml-a    font-type-txt   Color-Red   '> Undefined  </p> ) : null  } */}
{/* {tools_array?.length === 1  &&  tools_array[0] === "" ? (<p className='ml-a    font-type-txt   Color-Red   '> Undefined  </p> ) : null  } */}


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

 

  <p className='resource-group-list-item    font-type-txt   Color-Grey1 list-item-small'>{Info?.checked}</p> 
 
  <div className='resource-group-list-item    list-item-last   list-item-small   '>
  <div className={`    ${StatusColorClass}  light-bulb-type1`}/>
  </div>

      </div>
    );
  })}

</div>


<ResourceGroup_buttomLine/>

 


</div>
 


    );
  }
  
  export default ResourceGroup_List___WebSites;

