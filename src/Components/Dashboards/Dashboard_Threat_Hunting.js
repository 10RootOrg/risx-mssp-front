import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_type1_number_no_filters, PreviewBox_type3_bar ,PreviewBox_type4_legend2} from '../PreviewBoxes.js'
import Results_list from './Results_list.jsx'
  

import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import axios from 'axios';
import './../ResourceGroup/ResourceGroup.css';
import GeneralContext from '../../Context.js';

import { format_date_type_a,format_date_type_c } from '../Features/DateFormat.js';


function Dashboard_Threat_Hunting({show_SideBar,set_show_SideBar,set_notification_number,set_visblePage}) {
  set_visblePage("dashboard-threat-hunting");
  
    const {   backEndURL  ,all_Resource_Types ,all_artifacts,user_id} = useContext(GeneralContext);
    const [Preview_this_Results, set_Preview_this_Results] = useState([]);
    const [filter_Resource, set_filter_Resource] = useState({type_ids:[],tool_ids:[]});
    const [loader , set_loader] = useState(false)
    const [last_updated , set_last_updated] = useState({default:0})
    const [Status_Legend , set_Status_Legend] = useState({})
    const [counts, setCounts] = useState([]);

  // dont show sidebar in this page
    useEffect(() => {  if (show_SideBar === false) {set_show_SideBar(true)}}, []);
 
    return (
<>
<div className='app-main' >
<div className='top-of-page'> 

<div className='top-of-page-left mb-b'>
<p  className="font-type-menu" >Dashboards:</p>
<p  className="font-type-h3" >Threat Hunting</p>
</div>
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>

{/* <div className='top-of-page-right'>
<input className="input-type1 mr-a" placeholder="Search" />
<button className="btn-type1 "><IconSearch className="icon-type1" />  </button>
</div> */}


</div>

<div className='resource-group-top-boxes mb-c' >

  
 <PreviewBox_type1_number_no_filters
HeadLine="Tag: High (*)"
resource_type_id={null}
BigNumber={3}// BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
// SmallNumber={9}
SmallNumberTxt={"Hayabusa"}
StatusColor={"high"}
  date={"NA"}// date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
// display_this={display_data_type}
// set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
/>

<PreviewBox_type1_number_no_filters
HeadLine="Tag: Critical (*)"
resource_type_id={null}
BigNumber={1}// BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
// SmallNumber={9}
SmallNumberTxt={"Hayabusa"}
StatusColor={"critical"}
  date={"NA"}// date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
// display_this={display_data_type}
// set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
/>
 

<PreviewBox_type1_number_no_filters
HeadLine="Tag: High (*)"
resource_type_id={null}
BigNumber={11}// BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
// SmallNumber={9}
SmallNumberTxt={"Kitty"}
StatusColor={"high"}
  date={"NA"}// date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
// display_this={display_data_type}
// set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
/>

<PreviewBox_type1_number_no_filters
HeadLine="Tag: Critical (*)"
resource_type_id={null}
BigNumber={8}// BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
// SmallNumber={9}
SmallNumberTxt={"Kitty"}
StatusColor={"critical"}
  date={"NA"}// date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
// display_this={display_data_type}
// set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
/>
 
<PreviewBox_type1_number_no_filters
HeadLine="Number of results (*)"
resource_type_id={null}
BigNumber={37}// BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
// SmallNumber={9}
SmallNumberTxt={"Persistence"}
StatusColor={"blue"}
  date={"NA"}// date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
// display_this={display_data_type}
// set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
/>

 


 </div>

<div className='resource-group-all-the-Lists'>
 {/* <Results_list Preview_this_Results={Preview_this_Results} set_Preview_this_Results={set_Preview_this_Results} filter_Resource={filter_Resource} set_filter_Resource={set_filter_Resource} loader={loader}   set_loader={set_loader} /> */}
</div>

</div>
 
</>


    );
  }
  
  export default Dashboard_Threat_Hunting;
