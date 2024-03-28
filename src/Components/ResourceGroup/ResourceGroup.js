import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_type1, PreviewBox_type2 } from '../PreviewBoxes.js'
import ResourceGroup_All from './ResourceGroup_All.jsx'
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import axios from 'axios';
import './../ResourceGroup/ResourceGroup.css';
import jsonData from '../../tmpjsons/ResourceGroup.json'; // Adjust the path as needed based on your project structure
import GeneralContext from '../../Context.js';

function ResourceGroup({show_SideBar,set_show_SideBar}) {


    const { all_Tools ,set_all_Tools , backEndURL  ,all_Resource_Types} = useContext(GeneralContext);
    const [Preview_this_Resource, set_Preview_this_Resource] = useState([]);
    const [filter_Resource, set_filter_Resource] = useState({type_ids:[],tool_ids:[]});
 
    console.log("filter_Resource" , filter_Resource);


    // get all tool if this list is empty
    useEffect(() => {
        if(all_Tools.length  === undefined || all_Tools.length === 0 )
     {
         const get_all_tools = async()=>{
             try{
                 const res = await axios.get(`${backEndURL}/Tools`);
                 if (res){  set_all_Tools(res.data)   }} catch(err){console.log(err);}  }
       get_all_tools();      
                     
     }  }, []);
  // dont show sidebar in this page
    useEffect(() => {
        if (show_SideBar === false) {set_show_SideBar(true)}
        }, []);


  // get all_resource

useEffect(() => { 
    
    const get_all_resources = async()=>{ 
        try{
            const res = await axios.get(`${backEndURL}/Resources`);
            if (res){
                console.log("ssss", res.data);
                set_Preview_this_Resource(res.data)
        
        }}
        catch(err){console.log(err);}
                    }
        
        

    
    get_all_resources();  }, []);

  
 

    return (
 
<>
<div className='app-main' >
<div className='top-of-page'> 

<div className='top-of-page-left mb-b'>
<p  className="font-type-menu" >Resource Group:</p>
<p  className="font-type-h3" >General</p>
</div>
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>

<div className='top-of-page-right'>
<input className="input-type1 mr-a" placeholder="Search" />
<button className="btn-type1 "><IconSearch className="icon-type1" />  </button>
</div>


</div>

<div className='resource-group-top-boxes mb-c' >

<PreviewBox_type2 HeadLine="Group Distribution"/> 

<PreviewBox_type1
HeadLine={all_Resource_Types[0]?.resource_type_name}
resource_type_id={all_Resource_Types[0]?.resource_type_id}
description_short={all_Resource_Types[0]?.description_short}
BigNumber={22} SmallNumber={3}
StatusColor={"blue"}
date={"16/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
/>

<PreviewBox_type1
HeadLine={all_Resource_Types[1]?.resource_type_name}
resource_type_id={all_Resource_Types[1]?.resource_type_id}
description_short={all_Resource_Types[1]?.description_short}
BigNumber={35} SmallNumber={3}
StatusColor={"blue"}
date={"17/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
/>

<PreviewBox_type1
HeadLine={all_Resource_Types[2]?.resource_type_name}
resource_type_id={all_Resource_Types[2]?.resource_type_id}
description_short={all_Resource_Types[2]?.description_short}
BigNumber={7} SmallNumber={0}
StatusColor={"blue"}
date={"16/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
/>

<PreviewBox_type1
HeadLine={all_Resource_Types[3]?.resource_type_name}
resource_type_id={all_Resource_Types[3]?.resource_type_id}
description_short={all_Resource_Types[3]?.description_short}
BigNumber={72} SmallNumber={1}
StatusColor={"blue"}
date={"16/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
/>

<PreviewBox_type1
HeadLine="All Resource"
resource_type_id={null}
description_short="All Resource"
BigNumber={132} SmallNumber={6}
StatusColor={"blue"}
date={"14/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
/>

{/* {jsonData?.map((Info, index) =>(
    <PreviewBox_type1 key={index}  HeadLine={Info?.headline} BigNumber={Info?.active} SmallNumber={Info?.UnActive} StatusColor={Info?.StatusColor} date={Info?.LastRun}/>))} */}
</div>
     
 <p className='font-type-menu   Color-Grey1 mb-c'>Resource Edit:</p>

<div className='resource-group-all-the-Lists'>

<ResourceGroup_All Preview_this_Resource={Preview_this_Resource}/>
 {/* <ResourceGroup_List___WebSites allData={all_Resource_WebSites}/> */}
{/*<ResourceGroup_List___PhoneNumbers allData={all_Resource_PhoneNumbers}/>
<ResourceGroup_List___HasPrivileges/> */}

</div>

</div>
 
</>


    );
  }
  
  export default ResourceGroup;

