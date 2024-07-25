import React, { useState, useEffect, useContext } from "react";
import {
  PreviewBox_type3_bar,
  PreviewBox_type1_number_no_filters,
  PreviewBox_type6_list_box,
  PreviewBox_type7_wide_bar,
  PreviewBox_type2_pie,
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

  const Tags = [
    { name: "Fishing", count: 213 },
    { name: "globalC", count: 67 },
    { name: "Botnet", count: 8 },
    { name: "ClipBanker", count: 45 },
    { name: "Risx_BP", count: 23 },
    { name: "gsa-474", count: 23 },
    { name: "spacex", count: 10 },
    { name: "fdr", count: 9 },
    { name: "mezo-nz", count: 9 },
    { name: "Csr", count: 2 },
  ];

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

        <div className="resource-group-top-boxes mb-c">
          <PreviewBox_type3_bar
            HeadLine="MISP Attributes Top 5 Tags"
            bar_numbers={
              MISPData?.Response?.top_10_tags
                .sort((a, b) => b.Count - a.Count)
                ?.slice(0, 5)
                ?.map((item) => item?.Count) || ["NA"]
            }
            bar_headlines={
              MISPData?.Response?.top_10_tags
                .sort((a, b) => b.Count - a.Count)
                ?.slice(0, 5)
                ?.map((item) => item?.Name) || ["NA"]
            }
            // bar_numbers = {[ "11","22","41","5"]}
            // bar_headlines = {["URL","IP Address","User Name","Phone Number"]}
            bar_title_legend={"Count"}
            is_popup={false}
            display_y_axis={true}
            colors={"Basic"}
          />

          <PreviewBox_type6_list_box
            HeadLine="MISP Attributes Top10 Tags"
            list_array_column1={{ key: "Name", previewName: "Tag Name" }}
            list_array_column2={{ key: "Count", previewName: "#" }}
            list_array={
              MISPData?.Response?.top_10_tags.sort(
                (a, b) => b.Count - a.Count
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
            BigNumber={
              LeakData?.reduce(
                (accumulator, x) => accumulator + x.Response.found,
                0
              ) || "NA"
            } // BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
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
            BigNumber={MISPData?.Response?.total_attributes} // BigNumber={Preview_this_Results?.length ? (Preview_this_Results.length):(0) }
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
              MISPData?.Response?.top_10_attribute_categories.sort(
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
                .sort((a, b) => b.Count - a.Count)
                ?.slice(0, 5)
                ?.map((item) => item?.Count) || ["NA"]
            }
            bar_headlines={
              MISPData?.Response?.top_10_attribute_types
                .sort((a, b) => b.Count - a.Count)
                ?.slice(0, 5)
                ?.map((item) => item?.Name) || ["NA"]
            }
            bar_title_legend={["total"]}
            is_popup={false}
            colors={"Basic"} // Basic , Alert
          />


{/* <PreviewBox_type2_pie
HeadLine="Hunts Distribution"
// bar_numbers={["4","32","261","113" ]}
bar_numbers={[
  DashBoardData?.Velociraptor?.FinishedHunts  !== undefined &&  DashBoardData?.Velociraptor?.FinishedHunts  !== null  ?  DashBoardData?.Velociraptor?.FinishedHunts : "NA",
  DashBoardData?.Velociraptor?.UnfinishedHunts  !== undefined &&  DashBoardData?.Velociraptor?.UnfinishedHunts  !== null  ?  DashBoardData?.Velociraptor?.UnfinishedHunts : "NA",
]}
 */}






          <PreviewBox_type6_list_box
            HeadLine="MISP Attributes Top10 Types"
            list_array_column1={{ key: "Name", previewName: "Name" }}
            list_array_column2={{ key: "Count", previewName: "#" }}
            list_array={
              MISPData?.Response?.top_10_attribute_types.sort(
                (a, b) => b.Count - a.Count
              ) || []
            }
            is_popup={false}
            is_tags={false}
          />
        </div>

        <div></div>
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
