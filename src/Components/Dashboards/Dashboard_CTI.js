import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_type3_bar, PreviewBox_type1_number_no_filters ,PreviewBox_type6_list_box} from '../PreviewBoxes.js'

import axios from 'axios';
import GeneralContext from '../../Context.js';


function Dashboard_CTI({show_SideBar,set_show_SideBar,set_visblePage}) {
  set_visblePage("dashboard-cti");

    // const {   backEndURL  } = useContext(GeneralContext);
    // const [filter_Resource, set_filter_Resource] = useState({type_ids:[],tool_ids:[]});
    const [display_data_type, set_display_data_type] = useState("");


  // dont show sidebar in this page
    useEffect(() => {  if (show_SideBar === false) {set_show_SideBar(true)}}, []);

    return (
<>
<div className='app-main' >
<div className='top-of-page'> 
<div className='top-of-page-left mb-b'>
<p  className="font-type-menu" >Dashboards:</p>
<p  className="font-type-h3" >CTI</p>
</div>  
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>



</div>

<div className='resource-group-top-boxes mb-c' >

 
{/* <PreviewBox_type3_bar
HeadLine="Hunts Distribution"
// bar_numbers = { counts?.map(item => Object.values(item) ) }
// bar_headlines = {  counts?.map(item => Object.keys(item) )  }
bar_numbers = {[ "8","32"]}
bar_headlines = {["Completed","Uncompleted"]}
// bar_title_legend = {"Velociraptor"}
is_popup = {false}
display_y_axis = {true}
colors={"Basic"}
/> */}


 

<PreviewBox_type1_number_no_filters
HeadLine="Number of Results (*)"
resource_type_id={null}
BigNumber={82}// BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
// SmallNumber={21}
SmallNumberTxt={"Dehashed/leakcheck"}
StatusColor={"blue"}
// date={"17-09-2024"}// date={format_date_type_a(last_updated?.Total) || "NA"}
date={"NA"}
 is_popup={false}
display_this={display_data_type}
set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
/>


 

{/* <PreviewBox_type6_list_box
HeadLine="leaked creds for chosen domain (*)"
list_array_column1={{key:"name" ,previewName:"Name"}}
list_array_column2={{key:"breach_date" ,previewName:"Breach Date"}}
list_array = {[
{name:"LBSG.net" , breach_date:"28-7-24"},
{name:"Wishbone.io" , breach_date:"28-7-24"},
{name:"bzu.edu.pk" , breach_date:"24-7-24"},
{name:"Bigbarn.co.uk" , breach_date:"23-7-24"},


]}
/>  */}

 
 </div>
     <div>

 

</div>
<div className='resource-group-all-the-Lists'>

 

</div>

</div>
 
</>


    );
  }
  
  export default Dashboard_CTI;

