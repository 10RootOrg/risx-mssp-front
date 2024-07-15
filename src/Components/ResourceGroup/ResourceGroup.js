import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_type1_number, PreviewBox_type2_pie } from '../PreviewBoxes.js'
import ResourceGroup_All from './ResourceGroup_All.jsx'
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import axios from 'axios';
import './../ResourceGroup/ResourceGroup.css';
// import jsonData from '../../tmpjsons/ResourceGroup.json'; // Adjust the path as needed based on your project structure
import GeneralContext from '../../Context.js';

function ResourceGroup({show_SideBar,set_show_SideBar,set_visblePage}) {



    set_visblePage("assets");

    const { backEndURL  ,all_Resource_Types,moduleLinks} = useContext(GeneralContext);
    const [Preview_this_Resource, set_Preview_this_Resource] = useState([]);
    const [filter_Resource, set_filter_Resource] = useState({type_ids:[],tool_ids:[]});
    const [loader , set_loader] = useState(true)
    const [All_Resource_count , set_All_Resource_count] = useState(0)
    // const [clear_all_btns_filter_preview , set_clear_all_btns_filter_preview] = useState(false)

 
    // console.log("Preview_this_Resource",Preview_this_Resource);


  // dont show sidebar in this page
    useEffect(() => {
        if (show_SideBar === false) {set_show_SideBar(true)}
        }, []);


useEffect(() => { 
   console.log("dddddddddddddddddddddddddddddddddddddddddd1"); 

    const get_all_resources = async()=>{ 
      
 
if (backEndURL === undefined){return};
if( filter_Resource?.type_ids.length === 0 &&  filter_Resource?.tool_ids.length ===0 ){
 
    try{

        set_loader(true)
        const res = await axios.get(`${backEndURL}/Resources`);

     
        if (res){
            console.log("get_all_resources" , res.data);
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
 
    get_all_resources();  }, [filter_Resource,backEndURL]);

 


// function  clear_all_btns_filter_preview()=>{()}
 


    return (
 
<>
<div className='app-main' >
<div className='top-of-page'> 

<div className='top-of-page-left mb-b'>
{/* <p  className="font-type-menu" >Resource Group:</p> */}
<p  className="font-type-h3" >Assets</p>
</div>
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>

<div className='top-of-page-right'>
<input className="input-type1 mr-a" placeholder="Search" />
<button className="btn-type1 "><IconSearch className="icon-type1" />  </button>
</div>


</div>

<div className='resource-group-top-boxes mb-c' >

 
<PreviewBox_type2_pie
HeadLine="Result Distribution"
bar_numbers = {all_Resource_Types.map(item => item.count)}
bar_headlines = {all_Resource_Types.map(item => item.resource_type_name)}
bar_title_legend = {["total"]}
is_popup = {false}
/>

 



{/* domain */}
<PreviewBox_type1_number
HeadLine={all_Resource_Types[0]?.resource_type_name}
resource_type_id={all_Resource_Types[0]?.resource_type_id}
description_short={all_Resource_Types[0]?.description_short}
BigNumber={all_Resource_Types[0]?.count} 
SmallNumber={All_Resource_count} 
SmallNumberTxt={"Total"}
StatusColor={"blue"}
date={"16/6/2024"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
txt_color={""}
 

 
 />
{/* ip */}
<PreviewBox_type1_number
HeadLine={all_Resource_Types[1]?.resource_type_name}
resource_type_id={all_Resource_Types[1]?.resource_type_id}
description_short={all_Resource_Types[1]?.description_short}
BigNumber={all_Resource_Types[1]?.count} 
SmallNumber={All_Resource_count} 
SmallNumberTxt={"Total"}
StatusColor={"blue"}
date={"17/6/2024"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
txt_color={""}
/>
{/* social */}
<PreviewBox_type1_number
HeadLine={all_Resource_Types[2]?.resource_type_name}
resource_type_id={all_Resource_Types[2]?.resource_type_id}
description_short={all_Resource_Types[2]?.description_short}
BigNumber={all_Resource_Types[2]?.count} 
SmallNumber={All_Resource_count} 
SmallNumberTxt={"Total"}
StatusColor={"blue"}
date={"16/6/2024"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
txt_color={""}
/>

<PreviewBox_type1_number
HeadLine={all_Resource_Types[3]?.resource_type_name}
resource_type_id={all_Resource_Types[3]?.resource_type_id}
description_short={all_Resource_Types[3]?.description_short}
BigNumber={all_Resource_Types[3]?.count} 
SmallNumber={All_Resource_count} 
SmallNumberTxt={"Total"}
StatusColor={"blue"}
date={"16/6/2024"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
txt_color={""}
/>
{/* All Resource */}
<PreviewBox_type1_number
HeadLine="All Assets"
resource_type_id={null}
description_short="All Assets"
BigNumber={All_Resource_count} 
SmallNumber={All_Resource_count} 
SmallNumberTxt={"Total"}
StatusColor={"blue"}
date={"14/6/2024"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
txt_color={""}
/>

 </div>
     <div>
 {/* <p className='font-type-menu   Color-Grey1 mb-c'>Resource Edit:</p> */}


</div>
<div className='resource-group-all-the-Lists'>

<ResourceGroup_All Preview_this_Resource={Preview_this_Resource} set_Preview_this_Resource={set_Preview_this_Resource} filter_Resource={filter_Resource} set_filter_Resource={set_filter_Resource}/>



</div>

</div>
 
</>


    );
  }
  
  export default ResourceGroup;

