import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_type1_number, PreviewBox_type2_pie ,PreviewBox_type3_bar} from '../PreviewBoxes.js'
import ResourceGroup_All from './ResourceGroup_All.jsx'
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import axios from 'axios';
import './../ResourceGroup/ResourceGroup.css';
// import jsonData from '../../tmpjsons/ResourceGroup.json'; // Adjust the path as needed based on your project structure
import GeneralContext from '../../Context.js';

function ResourceGroup({show_SideBar,set_show_SideBar}) {


    const { all_Tools ,set_all_Tools , backEndURL  ,all_Resource_Types,moduleLinks} = useContext(GeneralContext);
    const [Preview_this_Resource, set_Preview_this_Resource] = useState([]);
    const [filter_Resource, set_filter_Resource] = useState({type_ids:[],tool_ids:[]});
    const [loader , set_loader] = useState(true)
    const [All_Resource_count , set_All_Resource_count] = useState(0)
    // const [clear_all_btns_filter_preview , set_clear_all_btns_filter_preview] = useState(false)

 

    // get all tool if this list is empty
    useEffect(() => {
        if (backEndURL == null || backEndURL == undefined || backEndURL == ""){return}
        if(all_Tools.length  === undefined || all_Tools.length === 0  )
     {
        const get_all_tools = async()=>{

  
            try{
                const res = await axios.get(`${backEndURL}/tools`);
                if (res){ 
                    const all_tools_no_links =  res.data
    
    
                    console.log("all_tools_no_links",all_tools_no_links);
    
    
    
    all_tools_no_links.forEach(tool => {
    for (let index = 0; index < moduleLinks.length; index++) {
        if ( moduleLinks[index]?.toolID === tool?.tool_id){
            tool.toolURL =  moduleLinks[index]?.toolURL
        }
    }
    });
    
                    set_all_Tools(all_tools_no_links)   }}
                catch(err){console.log(err);}  }
      get_all_tools();   
     }  }, [backEndURL]);




  // dont show sidebar in this page
    useEffect(() => {
        if (show_SideBar === false) {set_show_SideBar(true)}
        }, []);


useEffect(() => { 
    

    const get_all_resources = async()=>{ 
      
        console.log("get_all_resources               backEndURL" , backEndURL);
    // if no filter take all resources
if( filter_Resource?.type_ids.length === 0 &&  filter_Resource?.tool_ids.length ===0 ){
 
    try{

        set_loader(true)
        const res = await axios.get(`${backEndURL}/Resources`);

     
        if (res){
            console.log("res.data66666666666666666666666666666666666666666" , res.data);
            set_Preview_this_Resource(res.data)
            set_All_Resource_count(res.data.length)
            set_loader(false)
    }}
    catch(err){
        set_loader(false)
        console.log(err);}
                }


else{

   
    try{
        console.log("lets filtered", filter_Resource);

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

{/* <PreviewBox_type2
 HeadLine="Group Distribution"
  all_Resource_Types={all_Resource_Types }
  />  */}
{/* <PreviewBox_type2_pie
HeadLine="Group Distribution"
bar_numbers = {[ "11","22","41","5"]}
bar_headlines = {["URL","IP Address","User Name","Phone Number"]}
bar_title_legend = {["bar_title_legend"]}
/> */}
<PreviewBox_type2_pie
HeadLine="Result Distribution"
bar_numbers = {all_Resource_Types.map(item => item.count)}
bar_headlines = {all_Resource_Types.map(item => item.resource_type_name)}
bar_title_legend = {["total"]}
/>

 




<PreviewBox_type1_number
HeadLine={all_Resource_Types[0]?.resource_type_name}
resource_type_id={all_Resource_Types[0]?.resource_type_id}
description_short={all_Resource_Types[0]?.description_short}
BigNumber={all_Resource_Types[0]?.count} SmallNumber={3}
StatusColor={"blue"}
date={"16/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
 
 />

<PreviewBox_type1_number
HeadLine={all_Resource_Types[1]?.resource_type_name}
resource_type_id={all_Resource_Types[1]?.resource_type_id}
description_short={all_Resource_Types[1]?.description_short}
BigNumber={all_Resource_Types[1]?.count} SmallNumber={3}
StatusColor={"blue"}
date={"17/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
 
/>

<PreviewBox_type1_number
HeadLine={all_Resource_Types[2]?.resource_type_name}
resource_type_id={all_Resource_Types[2]?.resource_type_id}
description_short={all_Resource_Types[2]?.description_short}
BigNumber={all_Resource_Types[2]?.count} SmallNumber={0}
StatusColor={"blue"}
date={"16/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
 
/>

<PreviewBox_type1_number
HeadLine={all_Resource_Types[3]?.resource_type_name}
resource_type_id={all_Resource_Types[3]?.resource_type_id}
description_short={all_Resource_Types[3]?.description_short}
BigNumber={all_Resource_Types[3]?.count} SmallNumber={1}
StatusColor={"blue"}
date={"16/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
 
/>

<PreviewBox_type1_number
HeadLine="All Resource"
resource_type_id={null}
description_short="All Resource"
BigNumber={All_Resource_count} SmallNumber={6}
StatusColor={"blue"}
date={"14/5/20224"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
 
/>

 </div>
     <div>
 <p className='font-type-menu   Color-Grey1 mb-c'>Resource Edit:</p>


</div>
<div className='resource-group-all-the-Lists'>

<ResourceGroup_All Preview_this_Resource={Preview_this_Resource} set_Preview_this_Resource={set_Preview_this_Resource} filter_Resource={filter_Resource} set_filter_Resource={set_filter_Resource}/>



</div>

</div>
 
</>


    );
  }
  
  export default ResourceGroup;

