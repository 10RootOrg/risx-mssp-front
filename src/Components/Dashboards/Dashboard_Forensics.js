import React, { useState, useEffect, useContext } from "react";
import {
  PreviewBox_type3_bar,
  PreviewBox_type1_number_no_filters,
  PreviewBox_type6_list_box,
  PreviewBox_type2_pie
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
        res.data?.General?.IntervalConfigurations?.GetDashboardsDataInHours
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

<PreviewBox_type2_pie
HeadLine="Hunts Distribution"
// bar_numbers={["4","32","261","113" ]}
bar_numbers={[
DashBoardData?.Velociraptor?.FinishedHunts,
DashBoardData?.Velociraptor?.UnfinishedHunts,
]}
bar_headlines={["Completed", "Uncompleted"]}
// bar_headlines = { misp_names?.slice(0, 5).map(item => item?.name ) }
// bar_title_legend = {["total"]}
is_popup = {false}
colors={"Basic"} // Basic , Alert

/>
<PreviewBox_type1_number_no_filters
            HeadLine="Uncompleted Hunts "
            resource_type_id={null}
            BigNumber={DashBoardData?.Velociraptor?.UnfinishedHunts} // BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
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
            BigNumber={DashBoardData?.Velociraptor?.FinishedHunts} // BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
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
  `${DashBoardData?.Velociraptor?.NumberOfConnectedClients}`,`${DashBoardData?.Velociraptor?.NumberOfClients - DashBoardData?.Velociraptor?.NumberOfConnectedClients}` 
]}
bar_headlines={["Connected", "UnConnected"]}
// bar_headlines = { misp_names?.slice(0, 5).map(item => item?.name ) }
// bar_title_legend = {["total"]}
is_popup = {false}
colors={"Basic"} // Basic , Alert

/>





          <PreviewBox_type1_number_no_filters
            HeadLine="Overall Clients "
            resource_type_id={null}
            BigNumber={DashBoardData?.Velociraptor?.NumberOfClients} // BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
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
            BigNumber={DashBoardData?.Velociraptor?.NumberOfConnectedClients} // BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
            // SmallNumber={234 }
            SmallNumberTxt={"Velociraptor"}
            StatusColor={"blue"}
            date={"NA"} // date={format_date_type_a(last_updated?.Total) || "NA"}
            is_popup={false}
            display_this={display_data_type}
            set_display_this={set_display_data_type}
            display_this_value={"Overall Clients"}
            txt_color={""}
          />

    
          <PreviewBox_type6_list_box
            HeadLine={`New Hosts last ${TimeOfHostCheck} Hr`}
            list_array_column1={{ key: "Hostname", previewName: "Name" }}
            list_array_column2={{ key: "FirstSeen", previewName: "Date" }}
            list_array={DashBoardData?.Velociraptor?.NewUsers}
            is_popup={false}
          />
          <PreviewBox_type6_list_box
            HeadLine={`Recent Online Hosts last ${TimeOfHostCheck} Hr`}
            list_array_column1={{ key: "Hostname", previewName: "Name" }}
            list_array_column2={{ key: "LastSeen", previewName: "Date" }}
            list_array={DashBoardData?.Velociraptor?.RecentHosts}
            is_popup={false}
          />

          <PreviewBox_type1_number_no_filters
            HeadLine="Number of Sketches "
            resource_type_id={null}
            BigNumber={DashBoardData?.TimeSketch?.number_of_sketches} // BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
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
            HeadLine="Tag: High "
            resource_type_id={null}
            BigNumber={DashBoardData?.TimeSketch?.tag_counts?.high} // BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
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
            BigNumber={DashBoardData?.TimeSketch?.tag_counts?.Persistence} // BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
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
            BigNumber={DashBoardData?.TimeSketch?.tag_counts?.["phishy-domain"]} // BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
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
              DashBoardData?.TimeSketch?.tag_counts?.["command and control"]
            } // BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
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
