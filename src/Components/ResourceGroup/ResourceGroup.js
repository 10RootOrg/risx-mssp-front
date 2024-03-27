import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_type1, PreviewBox_type2 } from '../PreviewBoxes.js'
import ResourceGroup_All from './ResourceGroup_All.jsx'
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import axios from 'axios';
import './../ResourceGroup/ResourceGroup.css';
import jsonData from '../../tmpjsons/ResourceGroup.json'; // Adjust the path as needed based on your project structure
import GeneralContext from '../../Context.js';

function ResourceGroup({show_SideBar,set_show_SideBar}) {


    const { backEndURL } = useContext(GeneralContext);
    const [all_Resource, set_all_Resource] = useState([]);
 

 
    useEffect(() => {
        if (show_SideBar === false) {set_show_SideBar(true)}
        }, []);


 
 const get_all_resources = async()=>{
   
try{
    const res = await axios.get(`${backEndURL}/Resources`);
    if (res){
        console.log("sssssssssssssssssss", res.data);
        set_all_Resource(res.data)
        // set_all_Resource_PhoneNumbers(res.data?.phoneNumbers)
}}
catch(err){console.log(err);}


            }
useEffect(() => { get_all_resources();  }, []);

  
 

    return (
 
<>
<div className='app-main' >
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

<ResourceGroup_All allData={all_Resource}/>
 {/* <ResourceGroup_List___WebSites allData={all_Resource_WebSites}/> */}
{/*<ResourceGroup_List___PhoneNumbers allData={all_Resource_PhoneNumbers}/>
<ResourceGroup_List___HasPrivileges/> */}

</div>

</div>
 
</>


    );
  }
  
  export default ResourceGroup;

