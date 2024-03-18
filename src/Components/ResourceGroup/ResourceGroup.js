import React from 'react'
import { PreviewBox_type1, PreviewBox_type2 } from '../PreviewBoxes.js'
import ResourceGroup_List___WebSites     from './ResourceGroup_List___WebSites.jsx'
import ResourceGroup_List___PhoneNumbers from './ResourceGroup_List___PhoneNumbers.jsx'
import ResourceGroup_List___HasPrivileges from './ResourceGroup_List___HasPrivileges.jsx'

import { ReactComponent as IconSearch } from '../icons/ico-search.svg';


import './../ResourceGroup/ResourceGroup.css';

import jsonData from '../../tmpjsons/ResourceGroup.json'; // Adjust the path as needed based on your project structure
function ResourceGroup() {


    return (
 
<>

<div className='top-of-page'> 

<div className='top-of-page-left mb-b'>
<p  className="font-type-menu" >Resource Group:</p>
<p  className="font-type-h3" >TelAviv Office </p>
</div>
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>


<div className='top-of-page-right'>
<input className="input-type1 mr-a" placeholder="Search" />
<button className="btn-type1 "><IconSearch className="icon-type1" />  </button>
</div>


</div>

<div className='resource-group-top-boxes mb-c' >

<PreviewBox_type2 HeadLine="Group Distribution"/> 

{jsonData?.map((Info, index) =>(
    <PreviewBox_type1 key={index}  HeadLine={Info?.headline} BigNumber={Info?.active} SmallNumber={Info?.UnActive} StatusColor={Info?.StatusColor} date={Info?.LastRun}/>))}
</div>
     
 <p className='font-type-menu   Color-Grey1 mb-c'>Resource Edit:</p>

<div className='resource-group-all-the-Lists'>
<ResourceGroup_List___WebSites/>
<ResourceGroup_List___PhoneNumbers/>
<ResourceGroup_List___HasPrivileges/>

</div>


 
</>


    );
  }
  
  export default ResourceGroup;

