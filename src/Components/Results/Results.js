import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_type1_number, PreviewBox_type3_bar ,PreviewBox_type2_pie,PreviewBox_type4_legend2} from '../PreviewBoxes.js'
import Results_all from '../Results/Results_all.jsx'


import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import axios from 'axios';
import './../ResourceGroup/ResourceGroup.css';
import GeneralContext from '../../Context.js';

import { format_date_type_a,format_date_type_c } from '../Features/DateFormat';


function Results({show_SideBar,set_show_SideBar,set_notification_number}) {


    const { all_Tools ,set_all_Tools , backEndURL  ,all_Resource_Types ,all_artifacts,user_id} = useContext(GeneralContext);
    const [Preview_this_Results, set_Preview_this_Results] = useState([]);
    const [filter_Resource, set_filter_Resource] = useState({type_ids:[],tool_ids:[]});
    const [loader , set_loader] = useState(true)
    const [last_updated , set_last_updated] = useState({default:0})
    const [Status_Legend , set_Status_Legend] = useState({})
    const [counts, setCounts] = useState([]);

    // const [clear_all_btns_filter_preview , set_clear_all_btns_filter_preview] = useState(false)

    useEffect(() => {
        if(all_Tools.length  === undefined || all_Tools.length === 0 )
     {
         const get_all_tools = async()=>{
             try{
                 const res = await axios.get(`${backEndURL}/tools`);
                 if (res){  set_all_Tools(res.data)   }} catch(err){console.log(err);}  
                
                
                
                
                }
       get_all_tools();      
                     
     }  }, []);
  // dont show sidebar in this page
    useEffect(() => {  if (show_SideBar === false) {set_show_SideBar(true)}}, []);





useEffect(() => { 

    const get_all_Results = async()=>{ 
    try{
        set_loader(true)
        const res = await axios.get(`${backEndURL}/results/get_all_requests_table`);
        if (res){
          console.log("new_res",res.data);
          console.log("typeof",typeof res.data);

            if (res.data === undefined) { console.log("no files ..............,"  ); return}
            if (res.data.length == 0) { console.log("no files ..............,"  ); }
      
          localStorage.setItem(user_id + '_seeResults', res.data.length);
          set_notification_number(0)

       
          // const sortedResults = [...Results].sort((a, b) => {
          //   const dateA = new Date(a.response);
          //   const dateB = new Date(b.response);
          //   return dateB - dateA;  
          // });

            console.log("Results ------------------ Results" , res.data.data);
            
 
            set_Preview_this_Results(res.data)

    
            // format_date_type_a
     
            // set_All_Resource_count(res.data.length)
            set_loader(false)
    }}
    catch(err){
        set_loader(false)
        console.log(err);}
                // }





}
    get_all_Results();  }, [filter_Resource]);



 

// make statistics to ---  Status Legend
    useEffect(() => {
      const countOccurrences = () => {
        // console.log("Preview_this_Results" , Preview_this_Results);
        const countsMap = Preview_this_Results?.reduce((acc, { SubModuleName, ModuleName }) => {
          const key = SubModuleName || ModuleName;
          acc[key] = acc[key] ? acc[key] + 1 : 1;
          return acc;
        }, {});
  
   // Convert the countsMap object to an array, sort it, and then format it
   const countsArray = Object.entries(countsMap)
   .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
   .map(([name, count]) => ({ [name]: count }));

  setCounts(countsArray);
 
  // const count__Velo = Preview_this_Results?.filter(item => item?.Module_ID == "2000000").length;
//  const completed  = Preview_this_Results?.filter(item => item?.Status == "Complete");

const completed_InTime_Count =     (Preview_this_Results || []).length > 0 ? (Preview_this_Results || []).filter(item => item?.Status === "Complete" && item?.TimeNote === "In Time").length : "NA";
const completed_not_InTime_Count = (Preview_this_Results || []).length > 0 ? (Preview_this_Results || []).filter(item => item?.Status === "Complete" && item?.TimeNote  != "In Time").length : "NA";
const hunt_InTime_Count =          (Preview_this_Results || []).length > 0 ? (Preview_this_Results || []).filter(item => item?.Status === "Hunting"     && item?.TimeNote === "In Time").length : "NA";
const hunt_not_InTime_Count =      (Preview_this_Results || []).length > 0 ? (Preview_this_Results || []).filter(item => item?.Status === "Hunting"     && item?.TimeNote  != "In Time").length : "NA";
const Failed_Count =               (Preview_this_Results || []).length > 0 ? (Preview_this_Results || []).filter(item => item?.Status === "Failed" ).length : "NA";


for (let index = 0; index < Preview_this_Results.length; index++) {
 
  console.log(Preview_this_Results[index]?.LastIntervalDate);
 
  
}


 console.log("completed_not_InTime_Count",completed_not_InTime_Count);
set_Status_Legend({completed_InTime_Count: completed_InTime_Count,completed_not_InTime_Count:completed_not_InTime_Count,hunt_InTime_Count:hunt_InTime_Count,hunt_not_InTime_Count:hunt_not_InTime_Count,Failed_Count:Failed_Count })
  // console.log("completed" ,completed);
  console.log(Status_Legend);
  // set_Status_Legend

  // set_count_complete(count_complete)
//  set_count_veloci(count__Velo)



      };
  
      countOccurrences();
    }, [Preview_this_Results]);

 
// make dates to ---  big numbers
    useEffect(() => {
 
      const get_all_latest_results_dates = async()=>{ 
        try{
            const res = await axios.get(`${backEndURL}/results/get_all_latest_results_dates`,{params:{results:Preview_this_Results}});
            if (res){
              set_last_updated(res.data);
              console.log("get_all_Results_dates",res.data);
        }}
        catch(err){
            console.log(err);}
    }
    get_all_latest_results_dates();

    }, [Preview_this_Results]);




    return (
 
<>
<div className='app-main' >
<div className='top-of-page'> 

<div className='top-of-page-left mb-b'>
<p  className="font-type-menu" >User Request:</p>
<p  className="font-type-h3" >Results</p>
</div>
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>

<div className='top-of-page-right'>
<input className="input-type1 mr-a" placeholder="Search" />
<button className="btn-type1 "><IconSearch className="icon-type1" />  </button>
</div>


</div>

<div className='resource-group-top-boxes mb-c' >

 


{/* <PreviewBox_type2_pie
HeadLine="Result Distribution"
bar_numbers = { counts?.map(item => Object.values(item) ) }
bar_headlines = {  counts?.map(item => Object.keys(item) )  }
// bar_numbers = {[ "11","22","41","5"]}
// bar_headlines = {["URL","IP Address","User Name","Phone Number"]}
bar_title_legend = {"Count"}
/> */}

 




<PreviewBox_type3_bar
HeadLine="Result Distribution"
bar_numbers = { counts?.map(item => Object.values(item) ) }
bar_headlines = {  counts?.map(item => Object.keys(item) )  }
// bar_numbers = {[ "11","22","41","5"]}
// bar_headlines = {["URL","IP Address","User Name","Phone Number"]}
bar_title_legend = {"Count"}
/>

 

 <PreviewBox_type1_number
HeadLine="Hunting"
resource_type_id={null}
BigNumber={Preview_this_Results?.filter(item => item?.Status == "Hunting").length ? (Preview_this_Results?.filter(item => item?.Status == "Hunting").length):(0) }
SmallNumber={0}
StatusColor={"blue"}
date={format_date_type_a(last_updated?.Hunting) || "NA"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
/>



<PreviewBox_type1_number
HeadLine="ALL Requests"
resource_type_id={null}
BigNumber={Preview_this_Results.length ? (Preview_this_Results.length):(0) }
SmallNumber={0}
StatusColor={"blue"}
date={format_date_type_a(last_updated?.Total) || "NA"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
/>

<PreviewBox_type1_number
HeadLine="Complete"
resource_type_id={null}
BigNumber={Preview_this_Results?.filter(item => item?.Status == "Complete").length? (Preview_this_Results?.filter(item => item?.Status == "Complete").length):(0) }
SmallNumber={0}
StatusColor={"blue"}
date={format_date_type_a(last_updated?.Complete) || "NA"}
filter_Resource={filter_Resource}
set_filter_Resource={set_filter_Resource}
/> 

 

<PreviewBox_type4_legend2
HeadLine="Status Legend "
 
// Count_Failed={Preview_this_Results?.filter(item => item?.Status == "Failed").length? (Preview_this_Results?.filter(item => item?.Status == "Failed").length):(0) }
Status_Legend={Status_Legend}
// Count_Failed={Status_Legend?.Failed_Count === undefined ? "NA" : (Status_Legend?.Failed_Count) }


// bar_numbers = {[ "11","22","41","5"]}
// bar_headlines = {["URL","IP Address","User Name","Phone Number"]}
bar_title_legend = {"Count"}
/>



 </div>
     <div>
 <p className='font-type-menu   Color-Grey1 mb-c'>Results Edit:</p>


</div>
<div className='resource-group-all-the-Lists'>

{/*  */}
 <Results_all Preview_this_Results={Preview_this_Results} set_Preview_this_Results={set_Preview_this_Results} filter_Resource={filter_Resource} set_filter_Resource={set_filter_Resource}/>

 

</div>

</div>
 
</>


    );
  }
  
  export default Results;

