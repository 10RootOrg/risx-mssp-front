import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_type1_number, PreviewBox_type3_bar, PreviewBox_type1_number_no_filters } from '../PreviewBoxes.js'

import axios from 'axios';
import GeneralContext from '../../Context.js';


function Dashboard_Forensics({show_SideBar,set_show_SideBar,set_visblePage}) {
  set_visblePage("dashboard-forensics");

    const {   backEndURL  } = useContext(GeneralContext);
    const [filter_Resource, set_filter_Resource] = useState({type_ids:[],tool_ids:[]});
    const [display_data_type, set_display_data_type] = useState("");



  // dont show sidebar in this page
    useEffect(() => {  if (show_SideBar === false) {set_show_SideBar(true)}}, []);

    return (
<>
<div className='app-main' >
<div className='top-of-page'> 

<div className='top-of-page-left mb-b'>
<p  className="font-type-menu" >Dashboards:</p>
<p  className="font-type-h3" >Forensics</p>
</div>  
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>



</div>

<div className='resource-group-top-boxes mb-c' >

 
<PreviewBox_type3_bar
HeadLine="Hunts Distribution"
// bar_numbers = { counts?.map(item => Object.values(item) ) }
// bar_headlines = {  counts?.map(item => Object.keys(item) )  }
bar_numbers = {[ "8","32"]}
bar_headlines = {["Completed","Uncompleted"]}
bar_title_legend = {"Count"}
is_popup = {false}
display_y_axis = {true}
colors={"Basic"}
/>



<PreviewBox_type1_number_no_filters
HeadLine="Overall Clients"
resource_type_id={null}
BigNumber={234}// BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
SmallNumber={682 }
SmallNumberTxt={"Total"}
StatusColor={"blue"}
date={"17-09-2024"}// date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
display_this={display_data_type}
set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
/>


<PreviewBox_type1_number_no_filters
HeadLine="Connected Clients"
resource_type_id={null}
BigNumber={43}// BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
SmallNumber={234 }
SmallNumberTxt={"Total"}
StatusColor={"blue"}
date={"17-09-2024"}// date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
display_this={display_data_type}
set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
/>


<PreviewBox_type1_number_no_filters
HeadLine="Uncompleted Hunts"
resource_type_id={null}
BigNumber={40}// BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
SmallNumber={21}
SmallNumberTxt={"Total"}
StatusColor={"blue"}
date={"17-09-2024"}// date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
display_this={display_data_type}
set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
/>


<PreviewBox_type1_number_no_filters
HeadLine="Completed Hunts"
resource_type_id={null}
BigNumber={28}// BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
SmallNumber={2}
SmallNumberTxt={"Total"}
StatusColor={"blue"}
  date={"NA"}// date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
display_this={display_data_type}
set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
/>







 

 </div>
     <div>

 

</div>
<div className='resource-group-all-the-Lists'>

 

</div>

</div>
 
</>


    );
  }
  
  export default Dashboard_Forensics;

