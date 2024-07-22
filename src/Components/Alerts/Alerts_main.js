import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_type1_number_no_filters, PreviewBox_type3_bar ,PreviewBox_type2_pie,PreviewBox_type8_time} from '../PreviewBoxes.js'
import { format_date_type_a,format_date_type_c ,format_date_type_a_only_hours,format_date_type_a_only_date} from '../Features/DateFormat.js';
import axios from 'axios';
import GeneralContext from '../../Context.js';
import Alert_list from './Alerts_list.jsx'

function Alerts_main({show_SideBar,set_show_SideBar,set_visblePage}) {
  set_visblePage("alerts");

    const {   backEndURL  } = useContext(GeneralContext);


    const tmp_data = [
      { 
        description: "Unauthorized Access Attempt", 
        severity: "High", 
        date: "Mon Jul 22 2024 17:14:50 GMT+0300 (Israel Daylight Time)" 
      },
      { 
        description: "Malware Detected", 
        severity: "Critical", 
        date: "Tue Aug 13 2024 09:42:18 GMT+0300 (Israel Daylight Time)" 
      },
      { 
        description: "Phishing Email Reported", 
        severity: "Medium", 
        date: "Wed Sep 04 2024 15:27:03 GMT+0300 (Israel Daylight Time)" 
      },
      { 
        description: "Data Exfiltration Detected", 
        severity: "High", 
        date: "Fri Oct 18 2024 11:55:29 GMT+0300 (Israel Daylight Time)" 
      },
      { 
        description: "System Vulnerability Exploited", 
        severity: "Critical", 
        date: "Mon Nov 25 2024 18:06:14 GMT+0300 (Israel Daylight Time)" 
      }
    ];

    const [ Preview_this_Results, set_Preview_this_Results] = useState(tmp_data);
    const [display_this, set_display_this] = useState("");


    const dateA = new Date();
console.log(dateA);
  // dont show sidebar in this page
    useEffect(() => {  if (show_SideBar === false) {set_show_SideBar(true)}}, []);

    return (
<>
<div className='app-main' >
<div className='top-of-page'> 

<div className='top-of-page-left mb-b'>
{/* <p  className="font-type-menu" >Dashboards:</p> */}
<p  className="font-type-h3" >Alerts</p>
</div>  
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>





</div>
<div className='resource-group-top-boxes mb-c' >

 
<PreviewBox_type2_pie
HeadLine="Alert Distribution (*)"
bar_numbers={["14","2","4","23" ]}
bar_headlines = { ['Critical', 'High', 'Medium', 'Low'] }
bar_title_legend = {["total"]}
is_popup = {false}
colors={"Alert"} // Basic , Alert
/>



<PreviewBox_type1_number_no_filters
HeadLine="Last Hour (*)"
resource_type_id={null}
BigNumber={0}// BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
// SmallNumber={9}
SmallNumberTxt={"Total"}
StatusColor={"blue"}
  date={"NA"}// date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
display_this={display_this}
set_display_this={set_display_this}
display_this_value={""}
txt_color={""}
/>

<PreviewBox_type1_number_no_filters
HeadLine="This Day (*)"
resource_type_id={null}
BigNumber={2}// BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
// SmallNumber={9}
SmallNumberTxt={"Total"}
StatusColor={"blue"}
  date={"NA"}// date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
display_this={display_this}
set_display_this={set_display_this}
display_this_value={""}
txt_color={""}
/>


<PreviewBox_type1_number_no_filters
HeadLine="This Week (*)"
resource_type_id={null}
BigNumber={2}// BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
// SmallNumber={9}
SmallNumberTxt={"Total"}
StatusColor={"blue"}
  date={"NA"}// date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
display_this={display_this}
set_display_this={set_display_this}
display_this_value={""}
txt_color={""}
/>


 

<PreviewBox_type8_time
HeadLine="Latest Alert (*)"
resource_type_id={null}
BigNumber={format_date_type_a_only_hours(dateA)}// BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
 SmallNumber={format_date_type_a_only_date(dateA)}
 
StatusColor={"blue"}
  date={"NA"}// date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
display_this={display_this}
set_display_this={set_display_this}
display_this_value={""}
txt_color={""}
/>



 </div>
 
     <div>

 

</div>
<div className='resource-group-all-the-Lists'>
  {/* <p  className="font-type-menu" >this page is under development</p>   */}
 
  <Alert_list Preview_this_Results={Preview_this_Results}  set_Preview_this_Results={set_Preview_this_Results}/>
</div>

</div>
 
</>


    );
  }
  
  export default Alerts_main;

