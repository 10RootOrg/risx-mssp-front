import React, { useState, useEffect, useContext } from "react";
import {
  // PreviewBox_type3_bar,
  // PreviewBox_type1_number_no_filters,
  // PreviewBox_type6_list_box,
  // PreviewBox_type2_pie,
  // PreviewBox_type7_wide_bar,
  // PreviewBox_respo_widebar_type7,
  PreviewBox_respo_list_type6,
  PreviewBox_respo_chart,
} from "../PreviewBoxes.js";

import axios from "axios";
import GeneralContext from "../../Context.js";
import { format_date_type_a } from "../Features/DateFormat.js";

function Dashboard_Forensics({
  show_SideBar,
  set_show_SideBar,
  set_visblePage,
}) {
  set_visblePage("dashboard-forensics");

  const { backEndURL } = useContext(GeneralContext);
  // const [filter_Resource, set_filter_Resource] = useState({type_ids:[],tool_ids:[]});
  const [display_data_type, set_display_data_type] = useState("");
  const [DashBoardData, setDashBoardData] = useState({});
  const [TimeOfHostCheck, setTimeOfHostCheck] = useState("N/A");

  const [forensics_list_no_tag, set_forensics_list_no_tag] = useState([]);
  const [forensics_list_tag, set_forensics_list_tag] = useState([]);

  const gap = getComputedStyle(document.documentElement).getPropertyValue('--space-b')
  const box_height = 800;
  const box_height_2of3 = box_height * (3/5);
  const box_height_1of3 = box_height * (2/5)   ;





  const get_config = async () => {
    if (backEndURL === undefined) {
      return;
    }
    try {
      const res = await axios.get(`${backEndURL}/config`);
      if (res) {
        console.log("iiiiiiiiii", res.data);
      }

      setTimeOfHostCheck(
        res.data?.General?.IntervalConfigurations?.MispConfiguration
          ?.RecentHostTimeMispInHours
      );
    } catch (err) {
      console.log("errrrrrrrrrrrrrrrrrrrrr", err);
    }
  };
  async function GetData() {
    try {
      const res = await axios.get(backEndURL + "/dashboard/Forensics");
      console.log(
        "ssssssssssssaaaaaaaaaaaaaaaaaawwwwwwwwwwwwwwwwwwwwwwwwww",
        res.data
      );
      res?.data?.Velociraptor?.RecentHosts.forEach((x) => {
        console.log(
          "format_date_type_a(x.LastSeen)",
          format_date_type_a(x.LastSeen),
          "ssssssssssss",
          x.LastSeen
        );
        x.LastSeen = format_date_type_a(x.LastSeen);
      });
      res?.data?.Velociraptor?.NewUsers.forEach((x) => {
        console.log(
          "format_date_type_a(x.FirstSeen)",
          format_date_type_a(x.FirstSeen),
          "FirstSeen",
          x.FirstSeen
        );
        x.FirstSeen = format_date_type_a(x.FirstSeen);
      });
      setDashBoardData(res.data);
    } catch (error) {
      console.log("Error in Get Data OF dashboard");
    }
  }

  // dont show sidebar in this page
  useEffect(() => {
    if (show_SideBar === false) {
      set_show_SideBar(true);
    }
  }, []);

  useEffect(() => {
    if (backEndURL) {
      get_config();
      GetData();
    }
  }, [backEndURL]);


  useEffect(() => {


set_forensics_list_no_tag([
{
mainKey:"Overall Clients",
module:"Velociraptor",
mainValue: DashBoardData?.Velociraptor?.NumberOfClients !== undefined ? DashBoardData?.Velociraptor?.NumberOfClients : "NA",
}
,
{
mainKey:"Connected Clients",
module:"Velociraptor",
mainValue:DashBoardData?.Velociraptor?.NumberOfConnectedClients !== undefined? DashBoardData?.Velociraptor?.NumberOfConnectedClients: "NA",
} 
,
{
mainKey:"Completed Hunts",
module:"Velociraptor",
mainValue: DashBoardData?.Velociraptor?.FinishedHunts !== undefined? DashBoardData.Velociraptor.FinishedHunts:"NA",
}  
,
{
mainKey:"Uncompleted Hunts",
module:"Velociraptor",
mainValue:  DashBoardData?.Velociraptor?.UnfinishedHunts!== undefined ?  DashBoardData?.Velociraptor?.UnfinishedHunts : "NA",
}  
,
{
mainKey:"Number of Sketches",
module:"Timesketch",
mainValue:  DashBoardData?.TimeSketch?.number_of_sketches !== undefined ? DashBoardData?.TimeSketch?.number_of_sketches: "NA",
}  
    ]);


 set_forensics_list_tag([
      {
      mainKey:"Tag: Persistence",
      module:"Timesketch",
      mainValue: DashBoardData?.TimeSketch?.tag_counts?.Persistence !== undefined ? DashBoardData?.TimeSketch?.tag_counts?.Persistence: "NA",
      }  
      ,
      {
      mainKey:"Tag: Phishy-Domain",
      module:"Timesketch",
      mainValue:   DashBoardData?.TimeSketch?.tag_counts?.["phishy-domain"] !== undefined ? DashBoardData?.TimeSketch?.tag_counts?.["phishy-domain"] : "NA"
      }  
      ,
      {
      mainKey:"Tag: High",
      module:"Timesketch",
      mainValue: DashBoardData?.TimeSketch?.tag_counts?.high !== undefined ? DashBoardData?.TimeSketch?.tag_counts?.high : "NA",
      }  
      ,
      {
      mainKey:"Tag: command and control",
      module:"Timesketch",
      mainValue:  DashBoardData?.TimeSketch?.tag_counts?.["command and control"] !== undefined ? DashBoardData?.TimeSketch?.tag_counts?.["command and control"] : "NA"
      }  
      
          ]);
      
    

  }, [DashBoardData ]);


  console.log("UnfinishedHunts", DashBoardData?.Velociraptor?.UnfinishedHunts);
 

  return (
    <>
      <div className="app-main">
        <div className="top-of-page">
          <div className="top-of-page-left mb-b">
            <p className="font-type-menu">Dashboards:</p>
            <p className="font-type-h3">Forensics</p>
          </div>
          <div className="top-of-page-center">
            {/* placeholder for dropDown */}
          </div>
        </div>

        <div className="resource-group-top-boxes mb-c">

 

<div  className="PreviewBox-respo-container" >
<PreviewBox_respo_chart 
display_type={'pie'}  // pie , bar
display_y_axis={false} // for the bar
HeadLine={`Hunts Distribution`}
read_more_icon={''}
description_short={'Streamlined logistics and inventory management for efficient distribution solutions...'}
description_max_length={166}
read_more={'Hunts Distribution specializes in optimizing logistics and inventory management, providing comprehensive solutions for efficient product distribution. With a focus on streamlining operations, Hunts Distribution ensures timely deliveries and accurate inventory tracking. Their innovative approach integrates advanced technology to manage and distribute products effectively, enhancing supply chain performance. By leveraging cutting-edge tools and data-driven strategies, Hunts Distribution aims to meet the unique needs of each client, delivering reliable and cost-effective distribution services to improve overall operational efficiency.'}
bar_numbers={[
  DashBoardData?.Velociraptor?.FinishedHunts !== undefined &&
  DashBoardData?.Velociraptor?.FinishedHunts !== null
    ? DashBoardData?.Velociraptor?.FinishedHunts
    : "NA",
  DashBoardData?.Velociraptor?.UnfinishedHunts !== undefined &&
  DashBoardData?.Velociraptor?.UnfinishedHunts !== null
    ? DashBoardData?.Velociraptor?.UnfinishedHunts
    : "NA",
]}
bar_headlines={["Completed", "Uncompleted"]}
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
HeadLine={`Connected from Overall Clients`}
read_more_icon={''}
description_short={'Centralized hub for integrating client data and insights seamlessly...'}
description_max_length={166}
read_more={'Connected from Overall Clients offers a centralized platform for integrating and analyzing client data across various touchpoints. This system facilitates seamless communication and data sharing, providing a holistic view of client interactions and feedback. By centralizing client information, businesses can gain actionable insights, enhance customer relationships, and improve decision-making processes. The platform is designed to streamline data management, making it easier to track client engagement, address issues proactively, and tailor strategies to meet client needs effectively, ultimately fostering stronger, more productive client relationships.'}
bar_numbers={[
  DashBoardData?.Velociraptor?.NumberOfConnectedClients ?? "NA",
  DashBoardData?.Velociraptor?.FinishedHunts !== undefined &&
  DashBoardData?.Velociraptor?.FinishedHunts !== null &&
  DashBoardData?.Velociraptor?.NumberOfClients !== undefined &&
  DashBoardData?.Velociraptor?.NumberOfClients !== null
    ? `${
        DashBoardData?.Velociraptor?.NumberOfClients -
        DashBoardData?.Velociraptor?.NumberOfConnectedClients
      }`
    : "NA",
]}
bar_headlines={["Connected", "UnConnected"]}
enable_hover={false}
display_this_value={"prime_data"}
is_popup={false}
colors={"Basic"} // Basic , Alert
date={"Near Real-Time"} // "NA"
box_height={box_height}
/>


 
<PreviewBox_respo_list_type6
   HeadLine="Tag list"
   read_more_icon={''}
    description_max_length={122}
   read_more={'CTI all data from Velociraptor" consolidates all Cyber Threat Intelligence (CTI) data gathered from Velociraptor, providing a comprehensive repository of threat information. This aggregated data includes details on various cyber threats, vulnerabilities, and attack patterns collected by Velociraptors advanced monitoring tools. By centralizing this information, the feature enables security teams to analyze and correlate threat data more effectively, enhancing their ability to detect, respond to, and mitigate security risks. Access to complete and organized CTI data supports informed decision-making and strengthens overall cybersecurity posture..'}
   list_array_column1={{ key: "mainKey", previewName: "Category" }}
   list_array_column2={{ key: "mainValue", previewName: "#" }}
   list_array={forensics_list_tag}
   is_popup={false}
   is_tags={true}
   click_on_field={false}
   date={"Near Real-Time"} // "NA"
   box_height={box_height}
 
/>


<PreviewBox_respo_list_type6
   HeadLine="CTI list"
   read_more_icon={''}
   description_short={'Aggregates all CTI data sourced from Velociraptor for analysis...'}
   description_max_length={144}
   read_more={'CTI all data from Velociraptor" consolidates all Cyber Threat Intelligence (CTI) data gathered from Velociraptor, providing a comprehensive repository of threat information. This aggregated data includes details on various cyber threats, vulnerabilities, and attack patterns collected by Velociraptors advanced monitoring tools. By centralizing this information, the feature enables security teams to analyze and correlate threat data more effectively, enhancing their ability to detect, respond to, and mitigate security risks. Access to complete and organized CTI data supports informed decision-making and strengthens overall cybersecurity posture..'}
   list_array_column1={{ key: "mainKey", previewName: "Category" }}
   list_array_column2={{ key: "mainValue", previewName: "#" }}
   list_array={forensics_list_no_tag}
   is_popup={false}
   is_tags={false}
   click_on_field={true}
   date={"Near Real-Time"} // "NA"
   box_height={box_height }
/>


<div className="PreviewBox_for_2_tools" style={{ }} >

<PreviewBox_respo_list_type6
   HeadLine={`New Hosts last ${TimeOfHostCheck} Hr`}
   read_more_icon={''}
  //  description_short={'Tracks and lists hosts that were online in the past 24 hours...'}
   description_max_length={122}
   read_more={'The "Recent Online Hosts last 24 Hr" feature provides a detailed overview of all hosts that have been active within the past 24 hours. This tool helps in monitoring and analyzing network activity by listing hosts that have recently connected or been online. By offering insights into the recent activity of these hosts, it enables administrators to track and respond to changes in network dynamics, identify potential security issues, and ensure that systems are functioning as expected. This information is crucial for maintaining network integrity and performance.'}
   list_array_column1={{ key: "Hostname", previewName: "Name" }}
   list_array_column2={{ key: "FirstSeen", previewName: "Date" }}
   list_array={DashBoardData?.Velociraptor?.NewUsers  ? DashBoardData?.Velociraptor?.NewUsers : "NA"}
   is_popup={false}
   is_tags={false}
   click_on_field={false}
   date={"Near Real-Time"} // "NA"
   box_height={box_height_1of3 -20}
/>


<PreviewBox_respo_list_type6
   HeadLine={`Recent Online Hosts last ${TimeOfHostCheck} Hr`}
   read_more_icon={''}
  //  description_short={'Tracks and lists hosts that were online in the past 24 hours...'}
  description_max_length={144}
   read_more={'The "Recent Online Hosts last 24 Hr" feature provides a detailed overview of all hosts that have been active within the past 24 hours. This tool helps in monitoring and analyzing network activity by listing hosts that have recently connected or been online. By offering insights into the recent activity of these hosts, it enables administrators to track and respond to changes in network dynamics, identify potential security issues, and ensure that systems are functioning as expected. This information is crucial for maintaining network integrity and performance.'}
   list_array_column1={{ key: "Hostname", previewName: "Name" }}
   list_array_column2={{ key: "LastSeen", previewName: "Date" }}
   list_array={DashBoardData?.Velociraptor?.RecentHosts ? DashBoardData?.Velociraptor?.RecentHosts : "NA"}
   is_popup={false}
   is_tags={false}
   click_on_field={false}
   date={"Near Real-Time"} // "NA"
   box_height={box_height_2of3}
/>



</div>


</div>





{/* 


<PreviewBox_type1_number_no_filters
HeadLine="Overall Clients "
resource_type_id={null}
BigNumber={
DashBoardData?.Velociraptor?.NumberOfClients !== undefined
  ? DashBoardData?.Velociraptor?.NumberOfClients
  : "NA"
}
// SmallNumber={682 }
SmallNumberTxt={"Velociraptor"}
StatusColor={"blue"}
date={"NA"} // date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
display_this={display_data_type}
set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
/>

<PreviewBox_type1_number_no_filters
HeadLine="Connected Clients "
resource_type_id={null}
BigNumber={
DashBoardData?.Velociraptor?.NumberOfConnectedClients !==
undefined
  ? DashBoardData?.Velociraptor?.NumberOfConnectedClients
  : "NA"
}
SmallNumberTxt={"Velociraptor"}
StatusColor={"blue"}
date={"NA"} // date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
display_this={display_data_type}
set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
/>

<PreviewBox_type1_number_no_filters
HeadLine="Tag: High "
resource_type_id={null}
BigNumber={
DashBoardData?.TimeSketch?.tag_counts?.high !== undefined
  ? DashBoardData?.TimeSketch?.tag_counts?.high
  : "NA"
}
// SmallNumber={9}
SmallNumberTxt={"Timesketch"}
StatusColor={"High"}
date={"NA"} // date={format_date_type_a(last_updated?.Total) || "NA"}
is_popup={false}
display_this={display_data_type}
set_display_this={set_display_data_type}
display_this_value={"Overall Clients"}
txt_color={""}
/>



          <PreviewBox_type2_pie
            HeadLine="Hunts Distribution"
            // bar_numbers={["4","32","261","113" ]}
            bar_numbers={[
              DashBoardData?.Velociraptor?.FinishedHunts !== undefined &&
              DashBoardData?.Velociraptor?.FinishedHunts !== null
                ? DashBoardData?.Velociraptor?.FinishedHunts
                : "NA",
              DashBoardData?.Velociraptor?.UnfinishedHunts !== undefined &&
              DashBoardData?.Velociraptor?.UnfinishedHunts !== null
                ? DashBoardData?.Velociraptor?.UnfinishedHunts
                : "NA",
            ]}
            // {DashBoardData?.Velociraptor?.FinishedHunts  !== undefined &&  DashBoardData?.Velociraptor?.FinishedHunts  !== null  ?  DashBoardData?.Velociraptor?.FinishedHunts : "NA"}

            // bar_numbers={[
            //   DashBoardData?.Velociraptor?.FinishedHunts,
            //   DashBoardData?.Velociraptor?.UnfinishedHunts,
            //   ]}

            bar_headlines={["Completed", "Uncompleted"]}
            // bar_headlines = { misp_names?.slice(0, 5).map(item => item?.name ) }
            // bar_title_legend = {["total"]}
            is_popup={false}
            colors={"Basic"} // Basic , Alert
          />
          <PreviewBox_type1_number_no_filters
            HeadLine="Uncompleted Hunts "
            resource_type_id={null}
            BigNumber={DashBoardData?.Velociraptor?.UnfinishedHunts || "NA"} // BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
            // SmallNumber={21}
            SmallNumberTxt={"Velociraptor"}
            StatusColor={"blue"}
            date={"NA"} // date={format_date_type_a(last_updated?.Total) || "NA"}
            is_popup={false}
            display_this={display_data_type}
            set_display_this={set_display_data_type}
            display_this_value={"Overall Clients"}
            txt_color={""}
          />

          <PreviewBox_type1_number_no_filters
            HeadLine="Completed Hunts "
            resource_type_id={null}
            const
            BigNumber={
              DashBoardData?.Velociraptor?.FinishedHunts !== undefined
                ? DashBoardData.Velociraptor.FinishedHunts
                : "NA"
            }
            // SmallNumber={2}
            SmallNumberTxt={"Velociraptor"}
            StatusColor={"blue"}
            date={"NA"} // date={format_date_type_a(last_updated?.Total) || "NA"}
            is_popup={false}
            display_this={display_data_type}
            set_display_this={set_display_data_type}
            display_this_value={"Overall Clients"}
            txt_color={""}
          />
 


          <PreviewBox_type2_pie
            HeadLine="Connected from Overall Clients"
            // bar_numbers={["4","32","261","113" ]}
            bar_numbers={[
              DashBoardData?.Velociraptor?.NumberOfConnectedClients ?? "NA",
              DashBoardData?.Velociraptor?.FinishedHunts !== undefined &&
              DashBoardData?.Velociraptor?.FinishedHunts !== null &&
              DashBoardData?.Velociraptor?.NumberOfClients !== undefined &&
              DashBoardData?.Velociraptor?.NumberOfClients !== null
                ? `${
                    DashBoardData?.Velociraptor?.NumberOfClients -
                    DashBoardData?.Velociraptor?.NumberOfConnectedClients
                  }`
                : "NA",
            ]}
            bar_headlines={["Connected", "UnConnected"]}
            // bar_headlines = { misp_names?.slice(0, 5).map(item => item?.name ) }
            // bar_title_legend = {["total"]}
            is_popup={false}
            colors={"Basic"} // Basic , Alert
          />


          <PreviewBox_type6_list_box
            HeadLine={`New Hosts last ${TimeOfHostCheck} Hr`}
            list_array_column1={{ key: "Hostname", previewName: "Name" }}
            list_array_column2={{ key: "FirstSeen", previewName: "Date" }}
            list_array={DashBoardData?.Velociraptor?.NewUsers || []}
            is_popup={false}
          />

          <PreviewBox_type6_list_box
            HeadLine={`Recent Online Hosts last ${TimeOfHostCheck} Hr`}
            list_array_column1={{ key: "Hostname", previewName: "Name" }}
            list_array_column2={{ key: "LastSeen", previewName: "Date" }}
            list_array={DashBoardData?.Velociraptor?.RecentHosts || []}
            is_popup={false}
          />

          <PreviewBox_type1_number_no_filters
            HeadLine="Number of Sketches "
            resource_type_id={null}
            BigNumber={
              DashBoardData?.TimeSketch?.number_of_sketches !== undefined
                ? DashBoardData?.TimeSketch?.number_of_sketches
                : "NA"
            }
            // SmallNumber={9}
            SmallNumberTxt={"Timesketch"}
            StatusColor={"blue"}
            date={"NA"} // date={format_date_type_a(last_updated?.Total) || "NA"}
            is_popup={false}
            display_this={display_data_type}
            set_display_this={set_display_data_type}
            display_this_value={"Overall Clients"}
            txt_color={""}
          />

          <PreviewBox_type1_number_no_filters
            HeadLine="Tag: Persistence "
            resource_type_id={null}
            BigNumber={
              DashBoardData?.TimeSketch?.tag_counts?.Persistence !== undefined
                ? DashBoardData?.TimeSketch?.tag_counts?.Persistence
                : "NA"
            }
            // SmallNumber={9}
            SmallNumberTxt={"Timesketch"}
            StatusColor={"blue"}
            date={"NA"} // date={format_date_type_a(last_updated?.Total) || "NA"}
            is_popup={false}
            display_this={display_data_type}
            set_display_this={set_display_data_type}
            display_this_value={"Overall Clients"}
            txt_color={""}
          />

          <PreviewBox_type1_number_no_filters
            HeadLine="Tag: Phishy-Domain "
            resource_type_id={null}
            BigNumber={
              DashBoardData?.TimeSketch?.tag_counts?.["phishy-domain"] !==
              undefined
                ? DashBoardData?.TimeSketch?.tag_counts?.["phishy-domain"]
                : "NA"
            }
            // SmallNumber={9}
            SmallNumberTxt={"Timesketch"}
            StatusColor={"blue"}
            date={"NA"} // date={format_date_type_a(last_updated?.Total) || "NA"}
            is_popup={false}
            display_this={display_data_type}
            set_display_this={set_display_data_type}
            display_this_value={"Overall Clients"}
            txt_color={""}
          />

          <PreviewBox_type1_number_no_filters
            HeadLine="Tag: command and control "
            resource_type_id={null}
            BigNumber={
              DashBoardData?.TimeSketch?.tag_counts?.["command and control"] !==
              undefined
                ? DashBoardData?.TimeSketch?.tag_counts?.["command and control"]
                : "NA"
            }
            // SmallNumber={9}
            SmallNumberTxt={"Timesketch"}
            StatusColor={"blue"}
            date={"NA"} // date={format_date_type_a(last_updated?.Total) || "NA"}
            is_popup={false}
            display_this={display_data_type}
            set_display_this={set_display_data_type}
            display_this_value={"Overall Clients"}
            txt_color={""}
          /> */}
        </div>
        <div></div>
        <div className="resource-group-all-the-Lists"></div>
      </div>
    </>
  );
}

export default Dashboard_Forensics;
