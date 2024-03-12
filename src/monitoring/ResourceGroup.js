import React from 'react'
import { PreviewBox_type1, PreviewBox_type2 } from './PreviewBoxes.js'
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import { ReactComponent as IconWebsites } from '../icons/ico-websites.svg';
import { ReactComponent as IconPlus } from '../icons/ico-plus.svg';
import { ReactComponent as IconTrash } from '../icons/ico-trash.svg';
import { ReactComponent as IconSettings } from '../icons/ico-settings.svg';
import { ReactComponent as IconExpend } from '../icons/ico-expend.svg';
import { ReactComponent as IconLine } from '../icons/ico-line.svg';

import { ReactComponent as IconArrowRight } from '../icons/ico-arrowRight.svg';
import { ReactComponent as IconArrowLeft } from '../icons/ico-arrowLeft.svg';


 
import './ResourceGroup.css';

import jsonData from '../tmpjsons/ResourceGroup.json'; // Adjust the path as needed based on your project structure
import jsonDataWebsites from '../tmpjsons/ResourceGroup-websites.json'; // Adjust the path as needed based on your project structure
function ResourceGroup() {


      
    return (
 
<>

<div className='top-of-page'> 

<div className='top-of-page-left mb-b'>
<p  className="font-type-menu" >Resource Group:</p>
<p  className="font-type-h3" >TelAviv Office </p>
</div>
<div className='top-of-page-center'>center</div>


<div className='top-of-page-right'>
<input className="input-type1 mr-a" placeholder="Search" />
<button className="btn-type1 "><IconSearch className="icon-type1" />  </button>
</div>


</div>

<div className='resource-group-top-boxes mb-c' >

<PreviewBox_type2 HeadLine="קוביה גדולה"/> 

{jsonData?.map((Info, index) =>(
    <PreviewBox_type1 key={index}  HeadLine={Info?.headline} BigNumber={Info?.active} SmallNumber={Info?.UnActive} StatusColor={Info?.StatusColor} date={Info?.LastRun}/>))}
</div>
     
 <p className='font-type-menu   Color-Grey1 mb-c'>Resource Edit:</p>




<div className='resource-group-list-headline mb-c'>

  <div className='resource-group-list-headline-left ' >
<IconWebsites/> 
<p className='font-type-h4   Color-White ml-b'>WebSites</p>
</div>

<div className='resource-group-list-headline-left'>
<input className="input-type1 mr-a" placeholder="Search" />
<button className="btn-type1"><IconSearch className="icon-type1" />  </button>
<button className="btn-type1"><IconPlus className="icon-type1" />  </button>
<button className="btn-type1"><IconTrash className="icon-type1" />  </button>
<button className="btn-type1"><IconSettings className="icon-type1" />  </button>
<IconLine className="icon-type1" />
<button className="btn-type1"><IconExpend className="icon-type1" />  </button>



 </div>


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

<div className='resource-group-list-box mb-b' >
  {jsonDataWebsites?.map((Info, index) => {
    // Determine the class based on StatusColor
    const StatusColorClass = Info?.StatusColor === 'red' ? 'Bg-Red' :
                             Info?.StatusColor === 'yellow' ? 'Bg-Yellow' :
                             Info?.StatusColor === 'green' ? 'Bg-Green' :
                              
                              'Bg-Grey2';
  
    return (
      <div className='resource-group-list-line' key={index}>
 
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
 


  {/* <p className='resource-group-list-item    font-type-txt   Color-Grey1  '>{Info?.Monitor}</p>  */}
  <div className='resource-group-list-item list-item-small display-flex' >
  <label class="switch">
  <input type="checkbox" 
  //  checked={Info?.Monitor}
   />
  <span class="slider round"></span>
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

<div  className='resource-group-list-buttomLine   mt-b'>


<p className='font-type-menu  Color-Grey1  '>Records per page: 5</p>

<div className='display-flex'>
  <button className="btn-type1"><IconArrowLeft className="icon-type1 " />  </button>
  <p className='font-type-menu   Color-Grey1 mr-b ml-b'>Page 1 of 1</p>
  <button className="btn-type1"><IconArrowRight className="icon-type1 " />  </button>
  
  </div>
<div>{/*dont delete */}</div>

</div>





{/* {jsonDataWebsites?.map((Info, index) =>(




  <div className='resource-group-list-line '>
  <p className='resource-group-list-item    font-type-txt   Color-Grey1 ml-a'>{Info?.Type}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1'>{Info?.Name}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1'>{Info?.IPAdress}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1'>{Info?.Port}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1'>{Info?.ActiveTools}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1  '>{Info?.Monitor}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1'>{Info?.Checked}</p> 
  <p className='resource-group-list-item    font-type-txt   Color-Grey1  list-item-last '>{Info?.StatusColor}</p> 

  <div className={`${StatusColorClass}  light-bulb-type1`}/>
  
  </div>
  ))} */}
 
 
</>


    );
  }
  
  export default ResourceGroup;

