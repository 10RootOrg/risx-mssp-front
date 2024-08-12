import React, { useState, useEffect, useContext } from "react";
import {
  PreviewBox_type3_bar,
  PreviewBox_type1_number_no_filters,
  PreviewBox_type6_list_box,
  PreviewBox_type7_wide_bar,
  PreviewBox_type2_pie,

  PreviewBox_respo_list_type6,
  PreviewBox_respo_chart,
  PreviewBox_respo_widebar_type7,
  PreviewBox_respo_type1_number_no_filters
} from "../PreviewBoxes.js";

import axios from "axios";
import GeneralContext from "../../Context.js";
import CTI_list from "./CTI_list.jsx";

function Dashboard_CTI({ show_SideBar, set_show_SideBar, set_visblePage }) {
  set_visblePage("dashboard-cti");
  // const {   backEndURL  } = useContext(GeneralContext);
  // const [filter_Resource, set_filter_Resource] = useState({type_ids:[],tool_ids:[]});
  const { backEndURL } = useContext(GeneralContext);
  const [MISPData, setMISPData] = useState({});

  const [display_data_type, set_display_data_type] = useState("");
  const [loader, set_loader] = useState(false);
  const [LeakData, set_LeakData] = useState([]);

  const box_height = 800;
  const box_height_half =  400;

  const box_height_2of3 = box_height * (3/5);
  const box_height_1of3 = box_height * (2/5)   ;

  const Trending_Tags = [
    { name: "\tBlackMatter", count: 75 },
    { name: "\tDiskWriter", count: 65 },
    { name: "tmalware_Botnet", count: 44 },
    { name: "\tAresLoader", count: 45 },
    { name: "\tGandCrab", count: 23 },
    { name: "\tYellowCockatoo", count: 23 },
    { name: "AgentTesla", count: 10 },
    { name: "Multi-factor-Authentication", count: 9 },
    { name: "C2", count: 2 },
    { name: "ClipBanker", count: 1 },
  ];

  console.log("LeakData" , LeakData);
// console.log("rrrrrrrrrrrrrr",LeakData?.reduce( (accumulator, x) => accumulator + x?.Response?.found, 0 ));

  // Don't show sidebar in this page

  async function GetData() {
    try {
      const res = await axios.get(backEndURL + "/dashboard/CTI");
      console.log("CTI Data 111111111111", res.data);

      setMISPData(res.data?.Misp);
      set_LeakData(res.data?.LeakCheck);
    } catch (error) {
      console.log("Error in Get Data OF dashboard");
    }
  }

  useEffect(() => {
    if (backEndURL) {
      GetData();
    }
  }, [backEndURL]);

  useEffect(() => {
    if (show_SideBar === false) {
      set_show_SideBar(true);
    }
  }, []);

  return (
    <>
      <div className="app-main">
        <div className="top-of-page">
          <div className="top-of-page-left mb-b">
            <p className="font-type-menu">Dashboards:</p>
            <p className="font-type-h3">CTI</p>
          </div>
          {/* <div className='top-of-page-center'>"""placeholder for dropDown"""</div> */}
        </div>




        <div  className="PreviewBox-respo-container   mb-c" >
<PreviewBox_respo_chart 
allow_wide={false}
display_type={'bar'}  // pie , bar
display_y_axis={false} // for the bar
HeadLine="MISP Attributes Top 5 Tags"
read_more_icon={''}
description_short={'Streamlined logistics and inventory management for efficient distribution solutions...'}
description_max_length={166}
read_more={'Highlights the most frequently used tags within the MISP (Malware Information Sharing Platform) ecosystem. Tags are metadata elements that categorize and classify attributes associated with threat indicators, such as IP addresses, domain names, or file hashes. By focusing on the top five tags, users can quickly identify the most relevant or recurring themes in their threat data. This information is essential for prioritizing security efforts, understanding prevalent threat vectors, and ensuring that key threats are effectively monitored and addressed.'}
bar_numbers={
  MISPData?.Response?.top_10_tags
    ?.sort((a, b) => b.Count - a.Count)
    ?.slice(0, 5)
    ?.map((item) => item?.Count) || ["NA"]
}
bar_headlines={
  MISPData?.Response?.top_10_tags
    ?.sort((a, b) => b?.Count - a?.Count)
    ?.slice(0, 5)
    ?.map((item) => item?.Name) || ["NA"]
}
// bar_numbers = {[ "11","22","41","5"]}
// bar_headlines = {["URL","IP Address","User Name","Phone Number"]}
 is_popup = {false}
enable_hover={false}
display_this_value={"prime_data"}
colors={"Basic"} // Basic , Alert
date={"Near Real-Time"} // "NA"
box_height={box_height}
/>



<PreviewBox_respo_chart 

display_type={'pie'}  // pie , bar
display_y_axis={false} // for the bar
allow_wide={false}
HeadLine="MISP Attributes Top 5 Types"
read_more_icon={''}
description_short={'Streamlined logistics and inventory management for efficient distribution solutions...'}
description_max_length={166}
read_more={'The "MISP Attributes Top 5 Types" section presents a summary of the five most common attribute types observed within the MISP platform. Attribute types include various data categories such as URLs, email addresses, or malware hashes. Understanding which attribute types are most frequently encountered helps security analysts focus their attention on the most relevant data points and refine their threat detection strategies. This insight is crucial for optimizing threat intelligence workflows and ensuring that high-priority threats are promptly investigated and mitigate'}

bar_numbers={
  MISPData?.Response?.top_10_attribute_types
    ?.sort((a, b) => b.Count - a.Count)
    ?.slice(0, 5)
    ?.map((item) => item?.Count) || ["NA"]
}
bar_headlines={
  MISPData?.Response?.top_10_attribute_types
    ?.sort((a, b) => b.Count - a.Count)
    ?.slice(0, 5)
    ?.map((item) => item?.Name) || ["NA"]
}
// bar_numbers = {[ "11","22","41","5"]}
// bar_headlines = {["URL","IP Address","User Name","Phone Number"]}
 is_popup = {false}
enable_hover={false}
display_this_value={"prime_data"}
colors={"Basic"} // Basic , Alert
date={"Near Real-Time"} // "NA"
box_height={box_height}
/>
 
<div className="PreviewBox_for_2_tools" style={{ }} >

<PreviewBox_respo_list_type6
   HeadLine="MISP Attributes Top10 Tags"
   read_more_icon={''}
    description_max_length={88}
    read_more_view= {true}
   read_more={'Provides a broader view of the top ten tags used across MISP attributes. Tags facilitate the organization and categorization of threat data, making it easier to filter and analyze information. By identifying the ten most prevalent tags, users can gain insights into emerging threat trends, prioritize areas of concern, and enhance their incident response strategies. This comprehensive tag analysis supports more effective threat intelligence sharing and collaboration within the security community.'}
   list_array_column1={{ key: "Name", previewName: "Tag Name" }}
   list_array_column2={{ key: "Count", previewName: "#" }}
   list_array={
    MISPData?.Response?.top_10_tags?.sort(
      (a, b) => b?.Count - a?.Count
    ) || ["NA"]
  }
   is_popup={false}
   is_tags={true}
   click_on_field={false}
   date={"Near Real-Time"} // "NA"
   box_height={box_height_1of3 -20  }
/>

<PreviewBox_respo_list_type6
   HeadLine="MISP - Trending Tags (work in progress)"
   read_more_icon={''}
  //  description_short={'Aggregates all CTI data sourced from Velociraptor for analysis...'}
   description_max_length={88}
   read_more_view= {true}
   read_more={'The "MISP - Trending Tags" feature identifies tags that are experiencing an increase in usage over a specified period. Trending tags reflect the evolving landscape of threats and can indicate emerging threats or shifts in attack patterns. Monitoring these tags allows security professionals to stay ahead of new developments and adapt their threat intelligence strategies accordingly. By focusing on trending tags, organizations can improve their threat detection capabilities and respond proactively to emerging risks in the cybersecurity environment.'}
   list_array_column1={{ key: "name", previewName: "Tag Name" }}
   list_array_column2={{ key: "count", previewName: "#" }}
   list_array={Trending_Tags}
   is_popup={false}
   is_tags={true}
   click_on_field={true}
   date={"Near Real-Time"} // "NA"
   box_height={box_height_2of3 }
/>

</div>
 


 
<div className="PreviewBox_for_2_tools" style={{ }} >

<PreviewBox_respo_type1_number_no_filters
HeadLine="Leaked Credentials"
resource_type_id={null}
read_more_icon={''}
description_max_length={40}
read_more={'Metric tracks the total count of credentials exposed in data breaches or leaks, as reported by platforms like DeHashed and LeakCheck. This figure encompasses compromised usernames, passwords, and other authentication details that have been publicly or semi-publicly disclosed. Monitoring the number of leaked credentials is critical for assessing the scale of credential-based attacks and understanding the potential impact on security posture. High numbers of leaked credentials often indicate significant breaches that require immediate action, such as initiating password resets and enhancing authentication mechanisms. By keeping track of this metric, organizations can proactively mitigate risks associated with credential theft, fortify their security defenses, and prevent unauthorized access stemming from compromised credentials.'}
BigNumber = {
  LeakData !== undefined && LeakData.length !== 0      ? LeakData.reduce((accumulator, x) => accumulator + (x?.Response?.found || 0), 0)
: "NA"}

 
SmallNumberTxt={"DeHashed/LeakCheck"}
StatusColor={"blue"}
// date={"17-09-2024"}// date={format_date_type_a(last_updated?.Total) || "NA"}
date={"Near Real-Time"} // "NA"
is_popup={false}
display_this={display_data_type}
set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
 
box_height={box_height_1of3 -20 }
/>



<PreviewBox_respo_list_type6
  HeadLine="MISP Attributes Top10 Types"
   read_more_icon={''}
    description_max_length={88}
    read_more_view= {true}
   read_more={'The list outlines the ten most prevalent attribute types within the MISP platform. Attribute types encompass various forms of data such as file hashes, domain names, and IP addresses, each providing crucial information for threat analysis. By examining the top ten types, analysts can better understand the focus of recent threat intelligence, tailor their detection mechanisms to address the most common attribute types, and enhance their overall security posture through targeted analysis and response strategies.'}
   list_array_column1={{ key: "Name", previewName: "Name" }}
   list_array_column2={{ key: "Count", previewName: "#" }}
   list_array={
     MISPData?.Response?.top_10_attribute_types?.sort(
       (a, b) => b.Count - a.Count
     ) || []
   }
 
   is_popup={false}
   is_tags={false}
   click_on_field={true}
   date={"Near Real-Time"} // "NA"
   box_height={box_height_2of3}
/>

</div>


<div className="PreviewBox_for_2_tools" style={{ }} >


<PreviewBox_respo_type1_number_no_filters
      HeadLine="Total Indicators"
resource_type_id={null}
read_more_icon={''}
description_max_length={40}
read_more={'Aggregate number of threat indicators recorded within the platform. These indicators include various types of threat data such as IP addresses, domain names, file hashes, and URLs that are used to detect and analyze potential security threats. The total count of indicators provides a comprehensive overview of the volume of threat intelligence available for analysis. By evaluating this number, security teams can gauge the breadth of their threat data repository, prioritize their threat-hunting activities, and ensure they have a robust dataset to identify and mitigate emerging threats effectively.'}
BigNumber={MISPData?.Response?.total_attributes   !== undefined    ?  MISPData?.Response?.total_attributes : "NA" } // BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
SmallNumberTxt={"MISP"}
StatusColor={"blue"}
// date={"17-09-2024"}// date={format_date_type_a(last_updated?.Total) || "NA"}
date={"Near Real-Time"} // "NA"
is_popup={false}
display_this={display_data_type}
set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
box_height={box_height_1of3 -20 }
/>

<PreviewBox_respo_widebar_type7
  HeadLine="MISP Attributes Top10 Category's"
   read_more_icon={''}
    description_max_length={144}
   read_more={'Attributes into ten primary categories based on their nature and usage in threat intelligence. Categories might include network-related data, file-related data, or behavioral indicators. Understanding these top ten categories helps security professionals prioritize their investigations and focus on the most relevant aspects of threat data. This structured approach aids in organizing and interpreting threat intelligence, ultimately improving the effectiveness of threat detection, analysis, and response activities.'}
   list_array_column1={{ key: "Name", previewName: "Category" }}
   list_array_column2={{ key: "Count", previewName: "#" }}
   list_array={
     MISPData?.Response?.top_10_attribute_categories?.sort(
       (a, b) => b.Count - a.Count
     ) || []
   }
   is_popup={false}
   is_tags={false}
   click_on_field={true}
   date={"Near Real-Time"} // "NA"
   box_height={box_height_2of3  }
/>


</div>


</div>









        {/* <div className="resource-group-top-boxes mb-c">
          <PreviewBox_type3_bar
            HeadLine="MISP Attributes Top 5 Tags"
            bar_numbers={
              MISPData?.Response?.top_10_tags
                ?.sort((a, b) => b.Count - a.Count)
                ?.slice(0, 5)
                ?.map((item) => item?.Count) || ["NA"]
            }
            bar_headlines={
              MISPData?.Response?.top_10_tags
                ?.sort((a, b) => b?.Count - a?.Count)
                ?.slice(0, 5)
                ?.map((item) => item?.Name) || ["NA"]
            }
            // bar_numbers = {[ "11","22","41","5"]}
            // bar_headlines = {["URL","IP Address","User Name","Phone Number"]}
            bar_title_legend={"Count"}
            is_popup={false}
            display_y_axis={false}
            colors={"Basic"}
          />

          <PreviewBox_type6_list_box
            HeadLine="MISP Attributes Top10 Tags"
            list_array_column1={{ key: "Name", previewName: "Tag Name" }}
            list_array_column2={{ key: "Count", previewName: "#" }}
            list_array={
              MISPData?.Response?.top_10_tags?.sort(
                (a, b) => b?.Count - a?.Count
              ) || ["NA"]
            }
            is_popup={false}
            is_tags={true}
          />

          <PreviewBox_type6_list_box
            HeadLine="MISP - Trending Tags (work in progress)"
            list_array_column1={{ key: "name", previewName: "Tag Name" }}
            list_array_column2={{ key: "count", previewName: "#" }}
            list_array={Trending_Tags}
            is_popup={false}
            is_tags={true}
          />

          <PreviewBox_type1_number_no_filters
            HeadLine="Leaked Credentials"
            resource_type_id={null}
 
            BigNumber = {
                                LeakData?.reduce( (accumulator, x) => accumulator + x?.Response?.found, 0 )
                !== undefined ? LeakData?.reduce( (accumulator, x) => accumulator + x?.Response?.found, 0 ) 
                 : "NA"}

            // SmallNumber={21}
            SmallNumberTxt={"DeHashed/LeakCheck"}
            StatusColor={"blue"}
            // date={"17-09-2024"}// date={format_date_type_a(last_updated?.Total) || "NA"}
            date={"NA"}
            is_popup={false}
            display_this={display_data_type}
            set_display_this={set_display_data_type}
            display_this_value={"Overall Clients"}
            txt_color={""}
          />

          <PreviewBox_type1_number_no_filters
            HeadLine="Total Indicators"
            resource_type_id={null}
            BigNumber={MISPData?.Response?.total_attributes   !== undefined    ?  MISPData?.Response?.total_attributes : "NA" } // BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
            // SmallNumber={21}
            SmallNumberTxt={"MISP"}
            StatusColor={"blue"}
            // date={"17-09-2024"}// date={format_date_type_a(last_updated?.Total) || "NA"}
            date={"NA"}
            is_popup={false}
            display_this={display_data_type}
            set_display_this={set_display_data_type}
            display_this_value={"Overall Clients"}
            txt_color={""}
          />

          <PreviewBox_type7_wide_bar
            HeadLine="MISP Attributes Top10 Category's"
            list_array_column1={{ key: "Name", previewName: "Category" }}
            list_array_column2={{ key: "Count", previewName: "#" }}
            list_array={
              MISPData?.Response?.top_10_attribute_categories?.sort(
                (a, b) => b.Count - a.Count
              ) || []
            }
            is_popup={false}
            is_tags={false}
          />

          <PreviewBox_type2_pie
            HeadLine="MISP Attributes Top 5 Types"
            // bar_numbers={["4","32","261","113" ]}
            bar_numbers={
              MISPData?.Response?.top_10_attribute_types
                ?.sort((a, b) => b.Count - a.Count)
                ?.slice(0, 5)
                ?.map((item) => item?.Count) || ["NA"]
            }
            bar_headlines={
              MISPData?.Response?.top_10_attribute_types
                ?.sort((a, b) => b.Count - a.Count)
                ?.slice(0, 5)
                ?.map((item) => item?.Name) || ["NA"]
            }
            bar_title_legend={["total"]}
            is_popup={false}
            colors={"Basic"} // Basic , Alert
          />


 




          <PreviewBox_type6_list_box
            HeadLine="MISP Attributes Top10 Types"
            list_array_column1={{ key: "Name", previewName: "Name" }}
            list_array_column2={{ key: "Count", previewName: "#" }}
            list_array={
              MISPData?.Response?.top_10_attribute_types?.sort(
                (a, b) => b.Count - a.Count
              ) || []
            }
            is_popup={false}
            is_tags={false}
          />
        </div> */}

     
        <div className="resource-group-all-the-Lists">
          <CTI_list
            Preview_this_Results={LeakData}
            set_Preview_this_Results={set_LeakData}
            loader={loader}
            set_loader={set_loader}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard_CTI;
