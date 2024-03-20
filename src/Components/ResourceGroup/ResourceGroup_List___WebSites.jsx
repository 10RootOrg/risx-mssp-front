import React, { useState } from 'react'
 
import { ReactComponent as IconBIG } from '../icons/ico-websites.svg';
import { ReactComponent as IconSettings } from '../icons/ico-settings.svg';
 import ResourceGroup_Action_btns from './ResourceGroup_Action_btns';
 import ResourceGroup_buttomLine from './ResourceGroup_buttomLine';
 import jsonData from '../../tmpjsons/ResourceGroup-websites.json';
 
  // Adjust the path as needed based on your project structure
 
 import { Edit_Resource_Item } from "../Edit_Resource_Item";
function ResourceGroup_List___WebSites() {
  const [popUp_show, set_popUp_show] = useState(false);
  const [resourceItem , set_resourceItem] = useState({})

const EditTools = (Info) =>{

  console.log("EditTools",typeof Info);
  set_resourceItem(Info)
  set_popUp_show(true);
}

    return (
 
 
<div>
 
<Edit_Resource_Item

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
  {jsonData?.map((Info, index) => {
    // Determine the class based on StatusColor
    const StatusColorClass = Info?.StatusColor === 'red' ? 'Bg-Red' :
                             Info?.StatusColor === 'yellow' ? 'Bg-Yellow' :
                             Info?.StatusColor === 'green' ? 'Bg-Green' :
                              
                              'Bg-Grey2';
  
    return (
      <div className='resource-group-list-line' key={index} onClick={()=>EditTools(Info)}>
 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1   ml-a'>{Info?.Type}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-big'>{Info?.Name}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1  '>{Info?.IPAdress}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-small'>{Info?.Port}</p> 

<div className='resource-group-list-item display-flex list-item-big' >
<button className="btn-type1"><IconSettings className="icon-type1 " />  </button>

{Info.ActiveTools?.length === 0 ?  (<p className='ml-a    font-type-txt   Color-Red   '> Undefined  </p> ) : null  }

{Info.ActiveTools?.length === 1 ?  (<p className='ml-a  font-type-txt   Color-Blue-Glow tagit'>{Info?.ActiveTools}</p> ) : null  }

{Info.ActiveTools?.length === 2 ?  (<>
  <p className='ml-a  font-type-txt   Color-Blue-Glow tagit'>{Info?.ActiveTools[0]}</p><p className='ml-a  font-type-txt   Color-Blue-Glow tagit'>{Info?.ActiveTools[1]}</p> </>                       ) : null  }


  {Info.ActiveTools?.length > 2 ?  (<><p className='ml-a  font-type-txt   Color-Blue-Glow tagit'>{Info?.ActiveTools[0]}</p>  <p className=' ml-a font-type-txt   Color-Grey1  '>+{Info.ActiveTools?.length} More</p></>) : null  }


 
</div>
 

  <div className='resource-group-list-item list-item-small display-flex' >
  <label className="switch">
  <input type="checkbox" 
  //  checked={Info?.Monitor}
  defaultChecked={Math.random() < 0.7}
   />
  <span className="slider round"></span>
</label>
</div>

 

  <p className='resource-group-list-item    font-type-txt   Color-Grey1 list-item-small'>{Info?.Checked}</p> 
 
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

