import React, { useEffect, useState, useContext } from "react";
import GeneralContext from "../Context.js";
import "./PopUp.css"; // import CSS file for modal styling
import {
  PreviewBox_type0_static,
  PreviewBox_type3_bar,
  PreviewBox_type2_pie,
  PreviewBox_type5_hunt_data_tabla,
  PreviewBox_type1_number_no_filters,
} from "./PreviewBoxes.js";
import { ReactComponent as CloseButton } from "../Components/icons/ico-Close_type1.svg";
import { ReactComponent as DownloadIconButton } from "../Components/icons/ico-menu-download.svg";
import { ReactComponent as SuccessIcon } from "../Components/icons/General-icons-success.svg";
import { format_date_type_c } from "./Features/DateFormat";
import axios from "axios";

import { PopUp_All_Good } from "../Components/PopUp_Smart.js";

async function download_Json(
  ResponsePath,
  backEndURL,
  DownloadProgressBar,
  setDownloadProgressBar,
  setDownloadList
) {
  try {
    console.log("downloadJson(file)", ResponsePath);
    const fileName2 = ResponsePath?.split("/")?.pop();
    // Make the GET request to download the JSON file
    const response = await axios.get(
      `${backEndURL}/results/download-json-file`,
      {
        params: { ResponsePath: ResponsePath },
        responseType: "blob", // Specify responseType as 'blob' for binary data
        onDownloadProgress: (prog) => {
          const value = Math.round((prog.loaded / (prog.total || 1)) * 100);
          try {
            if (!DownloadProgressBar[fileName2]) {
              // console.log("empty");
              // const copy = DownloadList.map((x) => x);
              // copy.push(fileName);
              // console.log(
              //   "DownloadListDownloadListDownloadListDownloadListDownloadListDownloadListDownloadListDownloadListDownloadList",
              //   DownloadList
              // );
              // setDownloadList(copy);
              DownloadProgressBar[fileName2] = {
                progress: value,
                fileName: fileName2,
              };
            }
            if (value > 101) {
              DownloadProgressBar[fileName2] = {
                progress: "In Progress",
                fileName: fileName2,
              };
              // console.log(value);

              setDownloadProgressBar(DownloadProgressBar);
              setDownloadList(Math.random());
            }

            if (
              (DownloadProgressBar[fileName2].progress + 5 < value &&
                value < 101) ||
              (value == 100 && DownloadProgressBar[fileName2].progress != 100)
            ) {
              console.log("Download Prog ", value, DownloadProgressBar);
              DownloadProgressBar[fileName2] = {
                progress: value,
                fileName: fileName2,
              };
              // console.log(value);

              setDownloadProgressBar(DownloadProgressBar);
              setDownloadList(Math.random());
            }
          } catch (error) {
            console.log("Error In Download", error);
          }
        },
      }
    );
    console.log("response", response);
    // Create a Blob object from the binary data received
    const blob = new Blob([response.data], { type: "application/json" });

    // Create a temporary URL for the Blob data
    const url = window.URL.createObjectURL(blob);

    // Create a link element and click it to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName2); // Specify the file name here
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    console.log("File downloaded successfully");
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}

const handle_download_Json_File = (
  file,
  backEndURL,
  DownloadProgressBar,
  setDownloadProgressBar,
  setDownloadList
) => {
  if (file?.fileSize === "Too big") {

    console.log("Too big  going to download from server", file);
    const ResponsePath = file?.ResponsePath;
    download_Json(
      ResponsePath,
      backEndURL,
      DownloadProgressBar,
      setDownloadProgressBar,
      setDownloadList
    );
  } else {
    // download the preview file
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(file));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
};

export const PopUp_For_velociraptor_response = (props) => {
  const {
    HeadLine,
    popUp_show,
    set_popUp_show,
    set_PopUp_All_Good__show,
    set_PopUp_All_Good__txt,
    toolURL,
    buttonTitle,
    IconAddressForSrc,
    json_file_info,
    json_file_data,
  } = props;
  const {
    all_artifacts,
    backEndURL,
    DownloadProgressBar,
    setDownloadProgressBar,
    setDownloadList,
    DownloadList,
  } = useContext(GeneralContext);
  const [artifact_logo, set_artifact_logo] = useState("");
  const [aggregate_macro_data, set_aggregate_macro_data] = useState({});
  const [display_data_type, set_display_data_type] = useState("prime_data");

  // const [PopUp_All_Good__show, set_PopUp_All_Good__show] = useState(false);
  // const [PopUp_All_Good__txt, set_PopUp_All_Good__txt] = useState({ HeadLine:"Success",paragraph:"successfully",buttonTitle:"Close"});

  const handle_click_download = (file, backEndURL) => {
    console.log("handle_click_download", file);
    if (file?.fileSize === "Too big") {
      console.log("handle_click_download  - Too big ");
      handle_download_Json_File(
        file,
        backEndURL,
        DownloadProgressBar,
        setDownloadProgressBar,
        setDownloadList
      );
      set_PopUp_All_Good__txt({
        HeadLine: "Download Start",
        paragraph:
          "This download can take a few minutes. The file will appear in your download folder once the process is complete.",
        buttonTitle: "Close",
      });
      set_PopUp_All_Good__show(true);
      set_popUp_show(false);
    } else {
      handle_download_Json_File(
        file,
        backEndURL,
        DownloadProgressBar,
        setDownloadProgressBar,
        setDownloadList
      );
    }
  };

  useEffect(() => {
    if (
      json_file_data === undefined ||
      json_file_data === "" ||
      json_file_data === null
    ) {
      return;
    }
    if (
      all_artifacts === undefined ||
      all_artifacts === "" ||
      all_artifacts === null
    ) {
      return;
    }
    if (json_file_data.length == 0 || all_artifacts.length == 0) {
      return;
    }
    console.log(all_artifacts);

    if (
      json_file_data?.SubModulesCollection != "" &&
      typeof json_file_data?.SubModulesCollection === "string"
    ) {
      const pathTOPic = all_artifacts?.filter(
        (word) => word?.Toolname === json_file_data?.SubModulesCollection
      );
      if (
        pathTOPic === undefined ||
        pathTOPic === "" ||
        pathTOPic.length === 0
      ) {
        console.log("artifact id problem");
        return;
      }
      const logoAddress_1 = pathTOPic[0]?.logoAddress_1;
      const bbb = require(`${logoAddress_1}`);
      set_artifact_logo(bbb);
    } else {
      const pathTOPic = all_artifacts?.filter(
        (word) => word?.Toolname === json_file_data?.SubModuleName
      );
      if (
        pathTOPic === undefined ||
        pathTOPic === "" ||
        pathTOPic.length === 0
      ) {
        console.log("artifact id problem");
        return;
      }
      const logoAddress_1 = pathTOPic[0]?.logoAddress_1;
      const bbb = require(`${logoAddress_1}`);
      set_artifact_logo(bbb);
    }
  }, [json_file_data]);

  useEffect(() => {
    set_popUp_show(popUp_show);
  }, [popUp_show]);

  function handleClickOutside(e) {
    if (e.target.className === "PopUp-background") {
      set_popUp_show(false);
    }
  }

  function handleClose() {
    set_popUp_show(false);
  }

  const [cell_width, set_cell_width] = useState(() => {
    if (json_file_info?.table[0]) {
      const totalKeys = Object.keys(json_file_info.table[0]).length;
      const width1 = 190 / totalKeys;

      if (width1 > 30) {
        return `30vh`;
      } else {
        return `${width1}vh`;
      }
    } else {
      return "100px"; // Default width if json_file_info?.table[0] is undefined or has no keys
    }
  });

  useEffect(() => {
    const SubModuleName = json_file_data?.SubModuleName;
    const ResponsePath = json_file_data?.ResponsePath;
    if (SubModuleName === undefined) {
      return;
    }
    if (ResponsePath === undefined) {
      return;
    }
    switch (SubModuleName) {
      case "HardeningKitty":
        get_aggregate_macro_data(SubModuleName, ResponsePath);
        break;

      default:
        console.log("dont have macro Aggregate to this artifact");
    }
  }, [popUp_show, json_file_data]);

  async function get_aggregate_macro_data(SubModuleName, ResponsePath) {
    // console.log("get_aggregate_macro_data", SubModuleName, ResponsePath);
    if (SubModuleName === undefined) {
      console.log("SubModuleName undefined");
      return;
    }
    if (ResponsePath === undefined) {
      console.log("ResponsePath undefined");
      return;
    }
    try {
      const res = await axios.get(
        `${backEndURL}/results/velociraptor-aggregate-macro`,
        {
          params: {
            SubModuleName: SubModuleName,
            ResponseFile: ResponsePath,
          },
        }
      );

      if (res) {
        console.log("get_aggregate_macro_data res", res);
      }

      if (res.data.success === false) {
        console.log("aggregate_macro_data_from false", res.data);
      }

      if (res.data.success === true) {
        set_aggregate_macro_data(res?.data?.data);
        console.log("aggregate_macro_data_from  true", res.data.data);
      }
    } catch (err) {
      console.log("----------", err);
      console.log(err.response?.data?.message || "An error occurred");
    }
  }

  // console.log(json_file_info?.table );
  // console.log(json_file_info?.SubModuleName);
  // console.log("json_file_info props" ,props );
  // console.log("json_file_data 1111111111111" , json_file_data);
  // console.log("aggregate_macro_data" , aggregate_macro_data["List of computers with High"]);

  return (
    <>
      {/* {PopUp_All_Good__show &&
 <PopUp_All_Good
 popUp_show={PopUp_All_Good__show}
 set_popUp_show={set_PopUp_All_Good__show}
 HeadLine={PopUp_All_Good__txt.HeadLine}
 paragraph={PopUp_All_Good__txt.paragraph} 
buttonTitle={PopUp_All_Good__txt.buttonTitle}
 /> 
 }
  */}

      {popUp_show && (
        <div className={`PopUp-background`} onClick={handleClickOutside}>
          <div
            className={`PopUp-content`}
            style={{
              width: json_file_info?.fileSize == "Too big" ? "auto" : "80%",
            }}
          >
            <div
              className="display-flex justify-content-end  "
              style={{ marginRight: "-40px" }}
            >
              <button className="PopUp-Close-btn" onClick={handleClose}>
                <CloseButton className="PopUp-Close-btn-img" />{" "}
              </button>
            </div>

            {/* <div>
    <p className="font-type-h4 Color-White mb-a">{HeadLine} </p>
    <p  className="font-type-txt  reading-height Color-Grey1  mb-b"  >Response Results</p> 
    </div> */}

            <div className="velociraptor_response_all_top mb-c">
              <div className="velociraptor_response_top_texts  "> </div>

              <div className="pop-up-top-boxes-macro PreviewBox-of-pop-up-all">
                {Object.keys(aggregate_macro_data).length != 0 ? (
                  <>
                    <PreviewBox_type5_hunt_data_tabla
                      HeadLine="Response Data"
                      artifact_or_module={"Artifact"}
                      is_popup={true}
                      display_y_axis={false}
                      Artifact={json_file_data?.SubModuleName}
                      HuntID={json_file_info?.huntid}
                      Status={json_file_info?.status}
                      StartDate={
                        json_file_data?.StartDate
                          ? format_date_type_c(json_file_data?.StartDate)
                          : "NA"
                      }
                      Error={
                        json_file_data?.Error === "" ? (
                          <>None</>
                        ) : (
                          <>{json_file_data?.Error}</>
                        )
                      }
                    />

                    <PreviewBox_type2_pie
                      HeadLine={`Tests (${aggregate_macro_data?.Failed_Test_Number_of_tests[1]})`}
                      bar_numbers={[
                        aggregate_macro_data?.Failed_Test_Number_of_tests[0],
                        aggregate_macro_data?.Failed_Test_Number_of_tests[1] -
                          aggregate_macro_data?.Failed_Test_Number_of_tests[0],
                      ]}
                      bar_headlines={["Failed", "Pass"]}
                      // bar_title_legend = {["Tests"]}
                      is_popup={true}
                      enable_hover={true}
                      display_this={display_data_type}
                      set_display_this={set_display_data_type}
                      display_this_value={"prime_data"}
                      colors={"Basic"} // Basic , Alert
                    />

                    <PreviewBox_type3_bar
                      HeadLine="Vulnerabilities"
                      bar_numbers={
                        aggregate_macro_data?.severity_Counts
                          ? aggregate_macro_data?.severity_Counts
                          : [0, 0, 0, 0]
                      }
                      bar_headlines={
                        aggregate_macro_data?.severity_Order
                          ? aggregate_macro_data?.severity_Order
                          : ["Critical", "High", "Medium", "Low"]
                      }
                      bar_title_legend={"Vulnerabilities"}
                      is_popup={true}
                      display_y_axis={false}
                      colors={"Alert"}
                      enable_hover={true}
                      display_this={display_data_type}
                      set_display_this={set_display_data_type}
                      display_this_value={"prime_data"}
                    />

                    <PreviewBox_type1_number_no_filters
                      HeadLine="High"
                      resource_type_id={null}
                      BigNumber={
                        aggregate_macro_data?.["Count of High"] !== undefined
                          ? aggregate_macro_data["Count of High"]
                          : "NA"
                      }
                      SmallNumberTxt={"Total"}
                      SmallNumber={`${aggregate_macro_data?.Failed_Test_Number_of_tests[1]}`}
                      // SmallNumber={ aggregate_macro_data?.severity_Counts  &&  aggregate_macro_data?.severity_Counts.length > 0 &&  aggregate_macro_data?.severity_Counts.reduce((a, b) => a + b, 0) || "NA"     }
                      StatusColor="High"
                      date={"NA"}
                      // filter_Resource={display_data_type }
                      // set_filter_Resource={set_display_data_type}
                      is_popup={true}
                      // txt_color={"var(--color-Orange-Red)"}
                      txt_color={""}
                      display_this={display_data_type}
                      set_display_this={set_display_data_type}
                      display_this_value={"High"}
                    />

                    <PreviewBox_type1_number_no_filters
                      HeadLine="Critical"
                      resource_type_id={null}
                      BigNumber={
                        aggregate_macro_data?.["Count of Critical"] !==
                        undefined
                          ? aggregate_macro_data["Count of Critical"]
                          : "NA"
                      }
                      SmallNumberTxt={"Total"}
                      SmallNumber={`${aggregate_macro_data?.Failed_Test_Number_of_tests[1]}`}
                      // SmallNumber={ aggregate_macro_data?.severity_Counts  &&  aggregate_macro_data?.severity_Counts.length > 0 &&  aggregate_macro_data?.severity_Counts.reduce((a, b) => a + b, 0) || "NA"     }
                      StatusColor="Critical"
                      date={"NA"}
                      // filter_Resource={display_data_type }
                      // set_filter_Resource={set_display_data_type}
                      is_popup={true}
                      // txt_color={"var(--color-Red)"}
                      txt_color={""}
                      display_this={display_data_type}
                      set_display_this={set_display_data_type}
                      display_this_value={"Critical"}
                    />
                  </>
                ) : (
                  <>
                    <div style={{ marginRight: "auto" }}>
                      <PreviewBox_type5_hunt_data_tabla
                        HeadLine="Hunt Data"
                        artifact_or_module={"Artifact"}
                        is_popup={true}
                        StartDate={
                          json_file_data?.StartDate
                            ? format_date_type_c(json_file_data?.StartDate)
                            : "NA"
                        }
                        display_y_axis={false}
                        Artifact={json_file_data?.SubModuleName}
                        HuntID={json_file_info?.huntid}
                        Status={json_file_info?.status}
                        Error={
                          json_file_data?.Error === "" ? (
                            <>None</>
                          ) : (
                            <>{json_file_data?.Error}</>
                          )
                        }
                      />

                      {/* too big file note */}
                      {json_file_info?.fileSize === "Too big" && (
                        <div
                          className="mt-c "
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                          }}
                        >
                          <div>
                            <p className="  font-type-txt   Color-Grey1 mt-c ">
                              Data file is too big. <br />
                              You can download it as a JSON file.
                            </p>
                            <button
                              className="btn-type3 mb-d"
                              style={{ marginRight: "auto" }}
                            >
                              <p
                                className="font-type-menu  "
                                onClick={() =>
                                  handle_click_download(
                                    json_file_info,
                                    backEndURL
                                  )
                                }
                              >
                                Download JSON
                              </p>
                              <DownloadIconButton className="icon-type1 " />{" "}
                            </button>
                          </div>

                          <div
                            className=""
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {artifact_logo === "" ? null : (
                              <>
                                <p className="font-type-very-sml-txt   Color-Grey1 mr-a">
                                  By:
                                </p>{" "}
                                <img
                                  src={artifact_logo}
                                  alt="logo"
                                  maxwidth="140px"
                                  height="30"
                                />
                              </>
                            )}
                            <button
                              className="btn-type2 "
                              style={{ marginLeft: "auto" }}
                              onClick={handleClose}
                            >
                              <p className="font-type-menu ">{buttonTitle}</p>{" "}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {json_file_info?.fileSize != "Too big" && (
                      <PreviewBox_type1_number_no_filters
                        HeadLine="Object Find"
                        resource_type_id={null}
                        BigNumber={
                          json_file_info?.table?.length === undefined
                            ? 0
                            : json_file_info?.table?.length
                        }
                        SmallNumberTxt={""}
                        SmallNumber={``}
                        StatusColor=""
                        date={"NA"}
                        is_popup={true}
                        txt_color={""}
                        display_this={display_data_type}
                        set_display_this={set_display_data_type}
                        display_this_value={"prime_data"}
                      />
                    )}
                  </>
                )}
              </div>
            </div>

            <div
              style={{
                height: "auto",
                maxHeight: "300px",
                overflowY: "auto",
                margin: 0,
                padding: 0,
              }}
            >
              {json_file_data?.artifact_id === "1000105" ? (
                <>
                  <div className="table_smart">
                    <div
                      className="parent-container"
                      onClick={() => set_cell_width("500px")}
                    >
                      <p
                        className="table_smart_col font-type-menu Color-White"
                        style={{ width: cell_width }}
                      >
                        ClientId
                      </p>
                    </div>

                    <div
                      className="parent-container"
                      onClick={() => set_cell_width("500px")}
                    >
                      <p
                        className="table_smart_col font-type-menu Color-White"
                        style={{ width: cell_width }}
                      >
                        FlowId
                      </p>
                    </div>

                    <div
                      className="parent-container"
                      onClick={() => set_cell_width("500px")}
                    >
                      <p
                        className="table_smart_col font-type-menu Color-White"
                        style={{ width: cell_width }}
                      >
                        Fqdn
                      </p>
                    </div>
                  </div>

                  <div className="table_smart">
                    <div className="parent-container">
                      <p
                        className="table_smart_col font-type-txt  Color-Grey1"
                        style={{ width: cell_width }}
                      >
                        {json_file_info?.table[0]?.ClientId}
                      </p>
                    </div>
                    <div className="parent-container">
                      <p
                        className="table_smart_col font-type-txt  Color-Grey1"
                        style={{ width: cell_width }}
                      >
                        {json_file_info?.table[0]?.FlowId}
                      </p>
                    </div>
                    <div className="parent-container">
                      <p
                        className="table_smart_col font-type-txt  Color-Grey1"
                        style={{ width: cell_width }}
                      >
                        {json_file_info?.table[0]?.Fqdn}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {aggregate_macro_data &&
                    aggregate_macro_data["List of computers with High"] &&
                    display_data_type === "High" && (
                      <>
                        <div
                          className="mb-b"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div
                            className={`Bg-Orange-Red  light-bulb-type1 mr-a `}
                          />
                          <p className="font-type-menu Color-White">
                            List of computers with High (
                            {
                              aggregate_macro_data[
                                "List of computers with High"
                              ]?.length
                            }
                            )
                          </p>
                        </div>
                        {aggregate_macro_data[
                          "List of computers with High"
                        ]?.map((item, index) => (
                          <>
                            <div key={index} className="List_of_computers_line">
                              <p className="font-type-txt  Color-Grey1">
                                {item}
                              </p>
                            </div>
                          </>
                        ))}
                        {aggregate_macro_data["List of computers with High"]
                          ?.length === 0 && (
                          <p className="font-type-txt  Color-Grey1">
                            No High record
                          </p>
                        )}
                      </>
                    )}

                  {aggregate_macro_data &&
                    aggregate_macro_data["List of computers with Critical"] &&
                    display_data_type === "Critical" && (
                      <>
                        <div
                          className="mb-b"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div className={`Bg-Red  light-bulb-type1 mr-a `} />
                          <p className="font-type-menu Color-White">
                            List of computers with Critical (
                            {
                              aggregate_macro_data[
                                "List of computers with Critical"
                              ]?.length
                            }
                            )
                          </p>
                        </div>
                        {aggregate_macro_data[
                          "List of computers with Critical"
                        ]?.map((item, index) => (
                          <>
                            <div key={index} className="List_of_computers_line">
                              <p className="font-type-txt  Color-Grey1">
                                {item}
                              </p>
                            </div>
                          </>
                        ))}
                        {aggregate_macro_data["List of computers with Critical"]
                          ?.length === 0 && (
                          <p className="font-type-txt  Color-Grey1">
                            No Critical record
                          </p>
                        )}
                      </>
                    )}

                  {/* //// the big list */}
                  {display_data_type === "prime_data" && (
                    <>
                      {json_file_info?.table?.length !== 0 ? (
                        <>
                          <div className="table_smart">
                            {Object.keys(json_file_info?.table[0]).map(
                              (key) => (
                                <div
                                  className="parent-container"
                                  onClick={() => set_cell_width("500px")}
                                  key={key}
                                  style={{ width: cell_width }}
                                >
                                  <p className="table_smart_col font-type-menu Color-White">
                                    {key}
                                  </p>
                                </div>
                              )
                            )}
                          </div>

                          {json_file_info?.table.map((item, index) => (
                            <div key={index} className="table_smart">
                              {Object.keys(item).map((key, idx) => {
                                const value = item[key];
                                return (
                                  <div
                                    className="parent-container"
                                    key={idx}
                                    style={{ width: cell_width }}
                                  >
                                    <div className="table_smart_col">
                                      {/* {
                typeof value === 'string' && value.toLowerCase() === 'high' ? (
                  <span className="tagit_type1">
                    {value}
                  </span>
                ) : ( */}

                                      {typeof value != "object" && (
                                        <span
                                          className="cell-content font-type-txt  "
                                          style={{
                                            color: (() => {
                                              if (typeof value === "string") {
                                                const lowerValue =
                                                  value.toLowerCase();
                                                if (lowerValue === "critical")
                                                  return "var(--color-Red)";
                                                if (lowerValue === "high")
                                                  return "var(--color-Orange-Red)";
                                              }
                                              return "var(--color-Grey1)"; // Default color
                                            })(),
                                          }}
                                        >
                                          {typeof value === "object"
                                            ? JSON.stringify(value)
                                            : value}
                                        </span>
                                      )}

                                      {/*      )}*/}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </>
                      ) : null}
                    </>
                  )}
                </>
              )}
            </div>

            {json_file_info?.fileSize != "Too big" && (
              <div className="display-flex  mt-a" style={{}}>
                {artifact_logo === "" ? null : (
                  <>
                    <p className="font-type-very-sml-txt   Color-Grey1 mr-a">
                      By:
                    </p>{" "}
                    <img
                      src={artifact_logo}
                      alt="logo"
                      maxwidth="140px"
                      height="30"
                    />
                  </>
                )}{" "}
                <div />
                <div
                  className="mt-c"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                    marginLeft: "auto",
                  }}
                >
                  <button
                    className="btn-type3"
                    onClick={() =>
                      handle_click_download(json_file_info, backEndURL)
                    }
                  >
                    <p className="font-type-menu ">Download Data</p>
                    <DownloadIconButton className="icon-type1 " />{" "}
                  </button>
                  <button className="btn-type2   " onClick={handleClose}>
                    <p className="font-type-menu ">{buttonTitle}</p>{" "}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const PopUp_For__Nuclei__response = (props) => {
  const {
    popUp_show,
    set_popUp_show,
    buttonTitle,
    json_file_info,
    json_file_data,
    set_PopUp_All_Good__show,
    set_PopUp_All_Good__txt,
  } = props;
  const {
    all_Tools,
    backEndURL,
    DownloadProgressBar,
    setDownloadProgressBar,
    setDownloadList,
  } = useContext(GeneralContext);
  const [module_logo, set_module_logo] = useState("");
  const [display_data_type, set_display_data_type] = useState("prime_data");

  console.log("json_file_info", json_file_info);
  console.log("json_file_data", json_file_data);

  const handle_click_download = (file, backEndURL) => {
    console.log("handle_click_download");
    if (file?.fileSize === "Too big") {
      console.log("handle_click_download  - Too big ");
      handle_download_Json_File(
        file,
        backEndURL,
        DownloadProgressBar,
        setDownloadProgressBar,
        setDownloadList
      );
      set_PopUp_All_Good__txt({
        HeadLine: "Download Start",
        paragraph:
          "This download can take a few minutes. The file will appear in your download folder once the process is complete.",
        buttonTitle: "Close",
      });
      set_PopUp_All_Good__show(true);
      set_popUp_show(false);
    } else {
      handle_download_Json_File(file, backEndURL);
    }
  };

  useEffect(() => {
    if (
      json_file_data === undefined ||
      json_file_data === "" ||
      json_file_data === null
    ) {
      return;
    }
    if (all_Tools === undefined || all_Tools === "" || all_Tools === null) {
      return;
    }
    if (json_file_data.length == 0 || all_Tools.length == 0) {
      return;
    }

    const Nuclei_tool_info = all_Tools?.filter(
      (word) => word?.tool_id === "2001005"
    );
    const logoAddress_1 = Nuclei_tool_info[0]?.logoAddress_1;
    if (logoAddress_1 === undefined) {
      return;
    }
    const bbb = require(`${logoAddress_1}`);
    set_module_logo(bbb);
  }, [json_file_data]);

  useEffect(() => {
    set_popUp_show(popUp_show);
  }, [popUp_show]);

  function handleClickOutside(e) {
    if (e.target.className === "PopUp-background") {
      set_popUp_show(false);
    }
  }

  function handleClose() {
    set_popUp_show(false);
  }

  console.log("PopUp_For__Nuclei__response_tmp  333");

  return (
    <>
      {popUp_show && (
        <div className={`PopUp-background`} onClick={handleClickOutside}>
          <div
            className={`PopUp-content`}
            style={{
              width: json_file_info?.fileSize == "Too big" ? "auto" : "80%",
            }}
          >
            <div
              className="display-flex justify-content-end  "
              style={{ marginRight: "-40px" }}
            >
              <button className="PopUp-Close-btn" onClick={handleClose}>
                <CloseButton className="PopUp-Close-btn-img" />{" "}
              </button>
            </div>

            <div className="velociraptor_response_all_top mb-d">
              <div
                className="velociraptor_response_top_texts mb-c"
                style={{
                  display: "flex",
                  justifyContent: "stretch",
                  alignItems: "stretch",
                }}
              >
                <div>
                  {/* <div>
        <p className="font-type-h4 Color-White mb-a">{HeadLine} </p>
        <p  className="font-type-txt  reading-height Color-Grey1  mb-b"  >Response Results</p> 
        </div> */}

                  <PreviewBox_type5_hunt_data_tabla
                    HeadLine="Hunt Data"
                    is_popup={true}
                    artifact_or_module={"Module"}
                    display_y_axis={false}
                    Artifact={json_file_data?.ModuleName}
                    StartDate={
                      json_file_data?.StartDate
                        ? format_date_type_c(json_file_data?.StartDate)
                        : "NA"
                    }
                    HuntID={
                      json_file_info?.UniqueID ? json_file_info?.UniqueID : "NA"
                    }
                    Status={json_file_data?.Status}
                    Error={
                      json_file_data?.Error === "" ? (
                        <>None</>
                      ) : (
                        <>{json_file_data?.Error}</>
                      )
                    }
                  />
                </div>
              </div>

              <div style={{ marginLeft: "auto" }}>
                <PreviewBox_type1_number_no_filters
                  HeadLine="Object Find"
                  resource_type_id={null}
                  BigNumber={json_file_info?.length}
                  SmallNumberTxt={""}
                  SmallNumber={``}
                  StatusColor=""
                  date={"NA"}
                  is_popup={true}
                  txt_color={""}
                  display_this={display_data_type}
                  set_display_this={set_display_data_type}
                  display_this_value={"prime_data"}
                />
              </div>

              <div></div>
            </div>

            <div className="response_table_all_lists">
              {Array.isArray(json_file_info) &&
                json_file_info?.map((Info, index) => {
                  return (
                    <div key={index}>
                      <table className="response_table">
                        <p
                          className=" font-type-txt   Color-Blue-Glow  tagit_type1   mb-b"
                          style={{ width: "fit-content" }}
                        >
                          Object No {index + 1}
                        </p>
                        {/* <p className='  font-type-menu   Color-White mb-b'>Object No {index+1}</p>    */}
                        <tr>
                          <th className="response_table_short_row">
                            <p className="  font-type-menu   Color-Grey1">
                              Host
                            </p>
                          </th>
                          <th className="response_table_long_row">
                            <p className=" font-type-txt  Color-Grey1">
                              {Info?.host}
                            </p>
                          </th>
                        </tr>
                        <tr>
                          <th className="response_table_short_row">
                            <p className="  font-type-menu   Color-Grey1">
                              Severity
                            </p>
                          </th>
                          <th className="response_table_long_row">
                            <p className=" font-type-txt  Color-Grey1">
                              {Info?.info?.severity}
                            </p>
                          </th>
                        </tr>
                        <tr>
                          <th className="response_table_short_row">
                            <p className="  font-type-menu   Color-Grey1">
                              Type
                            </p>
                          </th>
                          <th className="response_table_long_row">
                            <p className=" font-type-txt  Color-Grey1">
                              {Info?.type}
                            </p>
                          </th>
                        </tr>
                        <tr>
                          <th className="response_table_short_row">
                            <p className="  font-type-menu   Color-Grey1">
                              matcher-status
                            </p>
                          </th>
                          <th className="response_table_long_row">
                            <p className=" font-type-txt  Color-Grey1">
                              {Info
                                ? Info["matcher-status"]
                                  ? "True"
                                  : "False"
                                : "not defined"}
                            </p>
                          </th>
                        </tr>
                        <tr>
                          <th className="response_table_short_row">
                            <p className="  font-type-menu   Color-Grey1">
                              template-id
                            </p>
                          </th>
                          <th className="response_table_long_row">
                            <p className=" font-type-txt  Color-Grey1">
                              {Info ? Info["template-id"] : "not defined"}
                            </p>
                          </th>
                        </tr>
                        <tr>
                          <th className="response_table_short_row">
                            <p className="  font-type-menu   Color-Grey1">
                              type
                            </p>
                          </th>
                          <th className="response_table_long_row">
                            <p className=" font-type-txt  Color-Grey1">
                              {Info?.type}
                            </p>
                          </th>
                        </tr>
                        <tr>
                          <th className="response_table_short_row">
                            <p className="  font-type-menu   Color-Grey1">
                              name
                            </p>
                          </th>
                          <th className="response_table_long_row">
                            <p className=" font-type-txt  Color-Grey1">
                              {Info?.info?.name}
                            </p>
                          </th>
                        </tr>
                      </table>
                    </div>
                  );
                })}
            </div>

            <div className="display-flex mt-c" style={{}}>
              <p className="font-type-very-sml-txt   Color-Grey1 mr-a">By:</p>
              <img
                src={module_logo}
                alt="logo"
                maxwidth="140px"
                height="30"
                style={{ marginRight: "auto" }}
              />

              <div />

              <div
                style={{ display: "flex", justifyContent: "end", gap: "10px" }}
              >
                <button className="btn-type3">
                  <p
                    className="font-type-menu "
                    onClick={() =>
                      handle_click_download(json_file_info, backEndURL)
                    }
                  >
                    Download JSON
                  </p>
                  <DownloadIconButton className="icon-type1 " />{" "}
                </button>

                {/* <button className="btn-type2    " onClick={()=>handle_download_Json_File(json_file_info)} ><p className='font-type-menu'>Download JSON</p>  </button>  */}
                <button className="btn-type2   " onClick={handleClose}>
                  <p className="font-type-menu ">{buttonTitle}</p>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export const PopUp_For_Shodan_response = (props) => {
  const {
    popUp_show,
    set_popUp_show,
    set_PopUp_All_Good__show,
    set_PopUp_All_Good__txt,
    buttonTitle,
    json_file_info,
    json_file_data,
  } = props;
  const {
    all_artifacts,
    backEndURL,
    DownloadProgressBar,
    setDownloadProgressBar,
    setDownloadList,
  } = useContext(GeneralContext);
  
  const [artifact_logo, set_artifact_logo] = useState("");
  const [aggregate_macro_data, set_aggregate_macro_data] = useState({});
  const [display_data_type, set_display_data_type] = useState("prime_data");


  console.log("PopUp_For_Shodan_response");


  const handle_click_download = (file, backEndURL) => {
    console.log("handle_click_download", file);
    if (file?.fileSize === "Too big") {
      console.log("handle_click_download  - Too big ");
      handle_download_Json_File(
        file,
        backEndURL,
        DownloadProgressBar,
        setDownloadProgressBar,
        setDownloadList
      );
      set_PopUp_All_Good__txt({
        HeadLine: "Download Start",
        paragraph:
          "This download can take a few minutes. The file will appear in your download folder once the process is complete.",
        buttonTitle: "Close",
      });
      set_PopUp_All_Good__show(true);
      set_popUp_show(false);
    } else {
      handle_download_Json_File(
        file,
        backEndURL,
        DownloadProgressBar,
        setDownloadProgressBar,
        setDownloadList
      );
    }
  };

  // useEffect(() => {
  //   if (
  //     json_file_data === undefined ||
  //     json_file_data === "" ||
  //     json_file_data === null
  //   ) {
  //     return;
  //   }
  //   if (
  //     all_artifacts === undefined ||
  //     all_artifacts === "" ||
  //     all_artifacts === null
  //   ) {
  //     return;
  //   }
  //   if (json_file_data.length == 0 || all_artifacts.length == 0) {
  //     return;
  //   }
  //   console.log(all_artifacts);

  //   if (
  //     json_file_data?.SubModulesCollection != "" &&
  //     typeof json_file_data?.SubModulesCollection === "string"
  //   ) {
  //     const pathTOPic = all_artifacts?.filter(
  //       (word) => word?.Toolname === json_file_data?.SubModulesCollection
  //     );
  //     if (
  //       pathTOPic === undefined ||
  //       pathTOPic === "" ||
  //       pathTOPic.length === 0
  //     ) {
  //       console.log("artifact id problem");
  //       return;
  //     }
  //     const logoAddress_1 = pathTOPic[0]?.logoAddress_1;
  //     const bbb = require(`${logoAddress_1}`);
      
  //     set_artifact_logo(bbb);
  //   } else {
  //     const pathTOPic = all_artifacts?.filter(
  //       (word) => word?.Toolname === json_file_data?.SubModuleName
  //     );
  //     if (
  //       pathTOPic === undefined ||
  //       pathTOPic === "" ||
  //       pathTOPic.length === 0
  //     ) {
  //       console.log("artifact id problem");
  //       return;
  //     }
  //     const logoAddress_1 = pathTOPic[0]?.logoAddress_1;
  //     const bbb = require(`${logoAddress_1}`);
  //     set_artifact_logo(bbb);
  //   }
  // }, [json_file_data]);

  useEffect(() => {
    set_popUp_show(popUp_show);
  }, [popUp_show]);

  function handleClickOutside(e) {
    if (e.target.className === "PopUp-background") {
      set_popUp_show(false);
    }
  }

  function handleClose() {
    set_popUp_show(false);
  }

  // const [cell_width, set_cell_width] = useState(() => {
  //   if (json_file_info?.table[0]) {
  //     const totalKeys = Object.keys(json_file_info.table[0]).length;
  //     const width1 = 190 / totalKeys;

  //     if (width1 > 30) {
  //       return `30vh`;
  //     } else {
  //       return `${width1}vh`;
  //     }
  //   } else {
  //     return "100px"; // Default width if json_file_info?.table[0] is undefined or has no keys
  //   }
  // });

  // useEffect(() => {
  //   const SubModuleName = json_file_data?.SubModuleName;
  //   const ResponsePath = json_file_data?.ResponsePath;
  //   if (SubModuleName === undefined) {
  //     return;
  //   }
  //   if (ResponsePath === undefined) {
  //     return;
  //   }
  //   switch (SubModuleName) {
  //     case "HardeningKitty":
  //       get_aggregate_macro_data(SubModuleName, ResponsePath);
  //       break;

  //     default:
  //       console.log("dont have macro Aggregate to this artifact");
  //   }
  // }, [popUp_show, json_file_data]);

  // async function get_aggregate_macro_data(SubModuleName, ResponsePath) {
  //   // console.log("get_aggregate_macro_data", SubModuleName, ResponsePath);
  //   if (SubModuleName === undefined) {
  //     console.log("SubModuleName undefined");
  //     return;
  //   }
  //   if (ResponsePath === undefined) {
  //     console.log("ResponsePath undefined");
  //     return;
  //   }
  //   try {
  //     const res = await axios.get(
  //       `${backEndURL}/results/velociraptor-aggregate-macro`,
  //       {
  //         params: {
  //           SubModuleName: SubModuleName,
  //           ResponseFile: ResponsePath,
  //         },
  //       }
  //     );

  //     if (res) {
  //       console.log("get_aggregate_macro_data res", res);
  //     }

  //     if (res.data.success === false) {
  //       console.log("aggregate_macro_data_from false", res.data);
  //     }

  //     if (res.data.success === true) {
  //       set_aggregate_macro_data(res?.data?.data);
  //       console.log("aggregate_macro_data_from  true", res.data.data);
  //     }
  //   } catch (err) {
  //     console.log("----------", err);
  //     console.log(err.response?.data?.message || "An error occurred");
  //   }
  // }

  // console.log(json_file_info?.table );
  // console.log(json_file_info?.SubModuleName);
  // console.log("json_file_info props" ,props );
  // console.log("json_file_data 1111111111111" , json_file_data);
  // console.log("aggregate_macro_data" , aggregate_macro_data["List of computers with High"]);

  return (
    <>
      {/* {PopUp_All_Good__show &&
 <PopUp_All_Good
 popUp_show={PopUp_All_Good__show}
 set_popUp_show={set_PopUp_All_Good__show}
 HeadLine={PopUp_All_Good__txt.HeadLine}
 paragraph={PopUp_All_Good__txt.paragraph} 
buttonTitle={PopUp_All_Good__txt.buttonTitle}
 /> 
 }
  */}

      {popUp_show && (
        <div className={`PopUp-background`} onClick={handleClickOutside}>
          <div
            className={`PopUp-content`}
            style={{
              width: json_file_info?.fileSize == "Too big" ? "auto" : "80%",
            }}
          >
            <div
              className="display-flex justify-content-end  "
              style={{ marginRight: "-40px" }}
            >
              <button className="PopUp-Close-btn" onClick={handleClose}>
                <CloseButton className="PopUp-Close-btn-img" />{" "}
              </button>
            </div>

 

            <div className="velociraptor_response_all_top mb-c">
              <div className="velociraptor_response_top_texts  "> </div>

              <div className="pop-up-top-boxes-macro PreviewBox-of-pop-up-all">
                {Object.keys(aggregate_macro_data).length != 0 ? (
                  <>
                    {/* <PreviewBox_type5_hunt_data_tabla
                      HeadLine="Response Data"
                      artifact_or_module={"Artifact"}
                      is_popup={true}
                      display_y_axis={false}
                      Artifact={json_file_data?.SubModuleName}
                      HuntID={json_file_info?.huntid}
                      Status={json_file_info?.status}
                      StartDate={
                        json_file_data?.StartDate
                          ? format_date_type_c(json_file_data?.StartDate)
                          : "NA"
                      }
                      Error={
                        json_file_data?.Error === "" ? (
                          <>None</>
                        ) : (
                          <>{json_file_data?.Error}</>
                        )
                      }
                    />

                    <PreviewBox_type2_pie
                      HeadLine={`Tests (${aggregate_macro_data?.Failed_Test_Number_of_tests[1]})`}
                      bar_numbers={[
                        aggregate_macro_data?.Failed_Test_Number_of_tests[0],
                        aggregate_macro_data?.Failed_Test_Number_of_tests[1] -
                          aggregate_macro_data?.Failed_Test_Number_of_tests[0],
                      ]}
                      bar_headlines={["Failed", "Pass"]}
             
                      is_popup={true}
                      enable_hover={true}
                      display_this={display_data_type}
                      set_display_this={set_display_data_type}
                      display_this_value={"prime_data"}
                      colors={"Basic"} // Basic , Alert
                    />

                    <PreviewBox_type3_bar
                      HeadLine="Vulnerabilities"
                      bar_numbers={
                        aggregate_macro_data?.severity_Counts
                          ? aggregate_macro_data?.severity_Counts
                          : [0, 0, 0, 0]
                      }
                      bar_headlines={
                        aggregate_macro_data?.severity_Order
                          ? aggregate_macro_data?.severity_Order
                          : ["Critical", "High", "Medium", "Low"]
                      }
                      bar_title_legend={"Vulnerabilities"}
                      is_popup={true}
                      display_y_axis={false}
                      colors={"Alert"}
                      enable_hover={true}
                      display_this={display_data_type}
                      set_display_this={set_display_data_type}
                      display_this_value={"prime_data"}
                    />

                    <PreviewBox_type1_number_no_filters
                      HeadLine="High"
                      resource_type_id={null}
                      BigNumber={
                        aggregate_macro_data?.["Count of High"] !== undefined
                          ? aggregate_macro_data["Count of High"]
                          : "NA"
                      }
                      SmallNumberTxt={"Total"}
                      SmallNumber={`${aggregate_macro_data?.Failed_Test_Number_of_tests[1]}`}
                      StatusColor="High"
                      date={"NA"}
                      is_popup={true}
                      txt_color={""}
                      display_this={display_data_type}
                      set_display_this={set_display_data_type}
                      display_this_value={"High"}
                    />

                    <PreviewBox_type1_number_no_filters
                      HeadLine="Critical"
                      resource_type_id={null}
                      BigNumber={
                        aggregate_macro_data?.["Count of Critical"] !==
                        undefined
                          ? aggregate_macro_data["Count of Critical"]
                          : "NA"
                      }
                      SmallNumberTxt={"Total"}
                      SmallNumber={`${aggregate_macro_data?.Failed_Test_Number_of_tests[1]}`}
                      StatusColor="Critical"
                      date={"NA"}
                      is_popup={true}
                      txt_color={""}
                      display_this={display_data_type}
                      set_display_this={set_display_data_type}
                      display_this_value={"Critical"}
                    /> */}
                  </>
                ) : (
                  <>
                    <div style={{ marginRight: "auto" }}>
                      <PreviewBox_type5_hunt_data_tabla
                        HeadLine="Hunt Data"
                        artifact_or_module={"Module"}
                        is_popup={true}
                        StartDate={
                          json_file_data?.StartDate
                            ? format_date_type_c(json_file_data?.StartDate)
                            : "NA"
                        }
                        // display_y_axis={false}
                        Artifact={json_file_data?.ModuleName}
                        HuntID={json_file_info?.huntid || "NA"}
                        Status={json_file_data?.Status || "NA"}
                        Error={
                          json_file_data?.Error === "" ? (
                            <>None</>
                          ) : (
                            <>{json_file_data?.Error}</>
                          )
                        }
                      />

                      {/* too big file note */}
                      {json_file_info?.fileSize === "Too big" && (
                        <div
                          className="mt-c "
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                          }}
                        >
                          <div>
                            <p className="  font-type-txt   Color-Grey1 mt-c ">
                              Data file is too big. <br />
                              You can download it as a JSON file.
                            </p>
                            <button
                              className="btn-type3 mb-d"
                              style={{ marginRight: "auto" }}
                            >
                              <p
                                className="font-type-menu  "
                                onClick={() =>
                                  handle_click_download(
                                    json_file_info,
                                    backEndURL
                                  )
                                }
                              >
                                Download JSON
                              </p>
                              <DownloadIconButton className="icon-type1 " />{" "}
                            </button>
                          </div>

                          <div
                            className=""
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {/* {artifact_logo === "" ? null : (
                              <>
                                <p className="font-type-very-sml-txt   Color-Grey1 mr-a">
                                  By:
                                </p>{" "}
                                <img
                                  src={artifact_logo}
                                  alt="logo"
                                  maxwidth="140px"
                                  height="30"
                                />
                              </>
                            )} */}
                            <button
                              className="btn-type2 "
                              style={{ marginLeft: "auto" }}
                              onClick={handleClose}
                            >
                              <p className="font-type-menu ">{buttonTitle}</p>{" "}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* {json_file_info?.fileSize != "Too big" && (
                      <PreviewBox_type1_number_no_filters
                        HeadLine="Object Find"
                        resource_type_id={null}
                        BigNumber={123 }
                        SmallNumberTxt={""}
                        SmallNumber={``}
                        StatusColor=""
                        date={"NA"}
                        is_popup={true}
                        txt_color={""}
                        display_this={display_data_type}
                        set_display_this={set_display_data_type}
                        display_this_value={"prime_data"}
                      />
                    )} */}
                  </>
                )}
              </div>


            </div>

            <div
              style={{
                height: "auto",
                maxHeight: "300px",
                overflowY: "auto",
                margin: 0,
                padding: 0,
              }}
            >
       
                <>
                  {aggregate_macro_data &&
                    aggregate_macro_data["List of computers with High"] &&
                    display_data_type === "High" && (
                      <>
                        <div
                          className="mb-b"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div
                            className={`Bg-Orange-Red  light-bulb-type1 mr-a `}
                          />
                          <p className="font-type-menu Color-White">
                            List of computers with High (
                            {
                              aggregate_macro_data[
                                "List of computers with High"
                              ]?.length
                            }
                            )
                          </p>
                        </div>
                        {aggregate_macro_data[
                          "List of computers with High"
                        ]?.map((item, index) => (
                          <>
                            <div key={index} className="List_of_computers_line">
                              <p className="font-type-txt  Color-Grey1">
                                {item}
                              </p>
                            </div>
                          </>
                        ))}
                        {aggregate_macro_data["List of computers with High"]
                          ?.length === 0 && (
                          <p className="font-type-txt  Color-Grey1">
                            No High record
                          </p>
                        )}
                      </>
                    )}

                  {aggregate_macro_data &&
                    aggregate_macro_data["List of computers with Critical"] &&
                    display_data_type === "Critical" && (
                      <>
                        {/* <div
                          className="mb-b"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div className={`Bg-Red  light-bulb-type1 mr-a `} />
                          <p className="font-type-menu Color-White">
                            List of computers with Critical (
                            {
                              aggregate_macro_data[
                                "List of computers with Critical"
                              ]?.length
                            }
                            )
                          </p>
                        </div> */}
                        {/* {aggregate_macro_data[
                          "List of computers with Critical"
                        ]?.map((item, index) => (
                          <>
                            <div key={index} className="List_of_computers_line">
                              <p className="font-type-txt  Color-Grey1">
                                {item}
                              </p>
                            </div>
                          </>
                        ))} */}


                        {/* {aggregate_macro_data["List of computers with Critical"]
                          ?.length === 0 && (
                          <p className="font-type-txt  Color-Grey1">
                            No Critical record
                          </p>
                        )} */}
                      </>
                    )}

                  {/* //// the big list */}
                  {display_data_type === "prime_data" && (
                    <>
                      {json_file_info?.table?.length !== 0 ? (
                        <>
                          <div className="table_smart">
                            {/* {Object.keys(json_file_info?.table[0]).map(
                              (key) => (
                                <div
                                  className="parent-container"
                                  onClick={() => set_cell_width("500px")}
                                  key={key}
                                  style={{ width: cell_width }}
                                >
                                  <p className="table_smart_col font-type-menu Color-White">
                                    {key}
                                  </p>
                                </div>
                              )
                            )} */}
                          </div>

                          {/* {json_file_info?.table.map((item, index) => (
                            <div key={index} className="table_smart">
                              {Object.keys(item).map((key, idx) => {
                                const value = item[key];
                                return (
                                  <div
                                    className="parent-container"
                                    key={idx}
                                    style={{ width: cell_width }}
                                  >
                                    <div className="table_smart_col">


                                      {typeof value != "object" && (
                                        <span
                                          className="cell-content font-type-txt  "
                                          style={{
                                            color: (() => {
                                              if (typeof value === "string") {
                                                const lowerValue =
                                                  value.toLowerCase();
                                                if (lowerValue === "critical")
                                                  return "var(--color-Red)";
                                                if (lowerValue === "high")
                                                  return "var(--color-Orange-Red)";
                                              }
                                              return "var(--color-Grey1)";  
                                            })(),
                                          }}
                                        >
                                          {typeof value === "object"
                                            ? JSON.stringify(value)
                                            : value}
                                        </span>
                                      )}

                               
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ))} */}


                        </>
                      ) : null}
                    </>
                  )}
                </>
         
            </div>

            {json_file_info?.fileSize != "Too big" && (
              <div className="display-flex  mt-a" style={{}}>
                {/* {artifact_logo === "" ? null : (
                  <>
                    <p className="font-type-very-sml-txt   Color-Grey1 mr-a">
                      By:
                    </p>{" "}
                    <img
                      src={artifact_logo}
                      alt="logo"
                      maxwidth="140px"
                      height="30"
                    />
                  </>
                )}  */}
                <div />
                <div
                  className="mt-c"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                    marginLeft: "auto",
                  }}
                >
                  <button
                    className="btn-type3"
                    onClick={() =>
                      handle_click_download(json_file_info, backEndURL)
                    }
                  >
                    <p className="font-type-menu ">Download Data</p>
                    <DownloadIconButton className="icon-type1 " />{" "}
                  </button>
                  <button className="btn-type2   " onClick={handleClose}>
                    <p className="font-type-menu ">{buttonTitle}</p>{" "}
                  </button>
                </div>
              </div>
            )}

            
          </div>
        </div>
      )}
    </>
  );
};