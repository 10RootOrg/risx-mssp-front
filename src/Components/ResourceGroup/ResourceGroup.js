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
    const [loader , set_loader] = useState(true)
    const [All_Resource_count , set_All_Resource_count] = useState(0)
    // const [clear_all_btns_filter_preview , set_clear_all_btns_filter_preview] = useState(false)

 

    // get all tool if this list is empty
    useEffect(() => {
        if(all_Tools.length  === undefined || all_Tools.length === 0 )
     {
         const get_all_tools = async()=>{
             try{
                 const res = await axios.get(`${backEndURL}/tools`);
                 if (res){  set_all_Tools(res.data)   }} catch(err){console.log(err);}  }
       get_all_tools();      
                     
     }  }, []);
  // dont show sidebar in this page
    useEffect(() => {
        if (show_SideBar === false) {set_show_SideBar(true)}
        }, []);

  // count times same resource type in sql

// useEffect(() => {


//     const Count_From_Same_Type = async()=>{
//          console.log("Count_From_Same_Type  1"  );
//         try{
//             const res = await axios.get(`${backEndURL}/Resources/count-same-type`);
//             if (res){ 

//                 console.log("Count_From_Same_Type  2" , res.data);
//                 //  set_all_Tools(res.data)  
//                  }} catch(err){console.log(err);}  }
//             Count_From_Same_Type();      


// },[]);

  // get all_resource
useEffect(() => { 
    

    const get_all_resources = async()=>{ 
        console.log("get_ resources");

    // if no filter take all resources
if( filter_Resource?.type_ids.length === 0 &&  filter_Resource?.tool_ids.length ===0 ){
    console.log("bring all resources");
    try{

        set_loader(true)
        const res = await axios.get(`${backEndURL}/Resources`);
        if (res){
            console.log("ssss", res.data);
            set_Preview_this_Resource(res.data)
            set_All_Resource_count(res.data.length)
            set_loader(false)
    }}
    catch(err){
        set_loader(false)
        console.log(err);}
                }


else{

    console.log("lets filtered");

    try{

        set_loader(true)
        const res = await axios.get(`${backEndURL}/Resources/all-resource-filtered`,{ params: filter_Resource});
        if (res){
            console.log("fffff", res.data);
            set_Preview_this_Resource(res.data)
            // set_All_Resource_count(res.data.length)
            set_loader(false)
    }}
    catch(err){
        set_loader(false)
        console.log(err);}
             

}



}
 
    get_all_resources();  }, [filter_Resource]);

 


// function  clear_all_btns_filter_preview()=>{()}




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

<PreviewBox_type2 HeadLine="Group Distribution" all_Resource_Types={all_Resource_Types }/> 

<PreviewBox_type1
HeadLine={all_Resource_Types[0]?.resource_type_name}
resource_type_id={all_Resource_Types[0]?.resource_type_id}
description_short={all_Resource_Types[0]?.description_short}
BigNumber={all_Resource_Types[0]?.count} SmallNumber={3}
StatusColor={"blue"}
date={"16/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
 
 />

<PreviewBox_type1
HeadLine={all_Resource_Types[1]?.resource_type_name}
resource_type_id={all_Resource_Types[1]?.resource_type_id}
description_short={all_Resource_Types[1]?.description_short}
BigNumber={all_Resource_Types[1]?.count} SmallNumber={3}
StatusColor={"blue"}
date={"17/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
 
/>

<PreviewBox_type1
HeadLine={all_Resource_Types[2]?.resource_type_name}
resource_type_id={all_Resource_Types[2]?.resource_type_id}
description_short={all_Resource_Types[2]?.description_short}
BigNumber={all_Resource_Types[2]?.count} SmallNumber={0}
StatusColor={"blue"}
date={"16/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
 
/>

<PreviewBox_type1
HeadLine={all_Resource_Types[3]?.resource_type_name}
resource_type_id={all_Resource_Types[3]?.resource_type_id}
description_short={all_Resource_Types[3]?.description_short}
BigNumber={all_Resource_Types[3]?.count} SmallNumber={1}
StatusColor={"blue"}
date={"16/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
 
/>

<PreviewBox_type1
HeadLine="All Resource"
resource_type_id={null}
description_short="All Resource"
BigNumber={All_Resource_count} SmallNumber={6}
StatusColor={"blue"}
date={"14/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
 
/>

{/* {jsonData?.map((Info, index) =>(
    <PreviewBox_type1 key={index}  HeadLine={Info?.headline} BigNumber={Info?.active} SmallNumber={Info?.UnActive} StatusColor={Info?.StatusColor} date={Info?.LastRun}/>))} */}
</div>
     <div>
 <p className='font-type-menu   Color-Grey1 mb-c'>Resource Edit:</p>


</div>
<div className='resource-group-all-the-Lists'>

<ResourceGroup_All Preview_this_Resource={Preview_this_Resource} filter_Resource={filter_Resource}/>

 

</div>

</div>
 
</>


    );
  }
  
  export default ResourceGroup;

