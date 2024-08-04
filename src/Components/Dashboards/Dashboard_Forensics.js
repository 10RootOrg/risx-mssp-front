import React, { useState, useEffect, useContext } from "react";
import {
  PreviewBox_type3_bar,
  PreviewBox_type1_number_no_filters,
  PreviewBox_type6_list_box,
  PreviewBox_type2_pie,
  PreviewBox_respo_pie
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
  // console.log("DashBoardData",DashBoardData);
  // console.log("DashBoardData?.Velociraptor",DashBoardData?.Velociraptor);
  // console.log("DashBoardData?.Velociraptor?.FinishedHunts",DashBoardData?.TimeSketch?.tag_counts);
  console.log("UnfinishedHunts", DashBoardData?.Velociraptor?.UnfinishedHunts);

  console.log("FinishedHunts", DashBoardData?.Velociraptor?.FinishedHunts);

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




<div style={{display:"inline-flex", gap:"var(--space-c)"  , flexWrap:"wrap"}}>
<PreviewBox_respo_pie 
HeadLine={`PreviewBox_respo_pie2`}
description_short={'Multiple SMTP servers are vulnerable to spoofing attacks that allow...'}
bar_numbers = {        [ "1", "1", '6', "5"]                        }
bar_headlines = {['critical','high','medium','low'] }
is_popup = {false}
enable_hover={false}
 
display_this_value={"prime_data"}
colors={"Alert"} // Basic , Alert
box_height="700px"
/>

<PreviewBox_respo_pie 
HeadLine={`PreviewBox_respo_pie2`}
description_short={'Multiple SMTP servers are vulnerable to spoofing attacks that allow...'}
bar_numbers = {        [ "1", "1", '6', "5"]                        }
bar_headlines = {['critical','high','medium','low'] }
is_popup = {false}
enable_hover={false}
 
display_this_value={"prime_data"}
colors={"Alert"} // Basic , Alert
box_height="700px"
/>





</div>

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

          {/* <PreviewBox_type3_bar
            HeadLine="Hunts Distribution"
            // bar_numbers = { counts?.map(item => Object.values(item) ) }
            // bar_headlines = {  counts?.map(item => Object.keys(item) )  }
            bar_numbers={[
              DashBoardData?.Velociraptor?.FinishedHunts,
              DashBoardData?.Velociraptor?.UnfinishedHunts,
            ]}
            bar_headlines={["Completed", "Uncompleted"]}
            // bar_title_legend = {"Velociraptor"}
            is_popup={false}
            display_y_axis={true}
            colors={"Basic"}
          /> */}

          {/* all = 10
connected =3 */}

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

          {/* DashBoardData?.Velociraptor?.FinishedHunts  !== undefined &&  DashBoardData?.Velociraptor?.FinishedHunts  !== null  ?  DashBoardData?.Velociraptor?.FinishedHunts : "NA", */}

  

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
          />
        </div>
        <div></div>
        <div className="resource-group-all-the-Lists"></div>
      </div>
    </>
  );
}

export default Dashboard_Forensics;
