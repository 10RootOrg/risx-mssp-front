import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import "./../Settings/Settings.css";
import "./custom-json-view.css";
import GeneralContext from "../../Context.js";
import { Search_comp, Search_comp_for_logs } from "../Features/Search_comp.jsx";
// import JsonView from '@uiw/react-json-view';
// import {PopUp_All_Good ,PopUp_Are_You_Sure} from '../PopUp_Smart'

function Settings_section_logs({
  show_SideBar,
  set_show_SideBar,
  usethis,
  fileName,
  headline,
  subline,
}) {
  const { backEndURL, fetchConfig } = useContext(GeneralContext);
  const [log_data, set_log_data] = useState("loading..");
  const [preview_data, set_preview_data] = useState("loading..");

  const maxHeight = "800px";
  const lineHeight = "160%";

  // console.log("log_data" , log_data);

  const [filter_string, set_filter_string] = useState("");
  //  const [loadig, set_loading] = useState(false);

  useEffect(() => {
    if (show_SideBar === false) {
      set_show_SideBar(true);
    }
  }, []);

  const fetchLog = async (logName, set_log_data) => {
    try {
      set_log_data("loading..");
      const res = await axios.get(`${backEndURL}/logs/get-log`, {
        params: { logName: logName, fileName: fileName },
      });

      if (res) {
        if (res?.data?.status === 200 || res?.data?.content != undefined) {
          console.log(res?.data?.content);
          set_log_data(res?.data?.content);
          set_preview_data(res?.data?.content);
        }
      }
    } catch (err) {
      console.log(err);

      set_log_data(`Error fetchLog ${logName}. message: ${err}`);
      set_preview_data(`Error fetchLog ${logName}. message: ${err}`);
    }
  };

  useEffect(() => {
    // fetchLog("log_mssp_backend",set_log_data);
    if (backEndURL) {
      fetchLog(usethis, set_log_data);
    }
    // fetchLog("log_python_main",set_log_data);
  }, [backEndURL]);

  return (
    <div style={{ maxWidth: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {/* <p className="font-type-h4 Color-White mb-a">{headline}</p> */}
          <p
            className="font-type-h4 Color-White  "
            style={{
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              marginRight: "20px",
            }}
          >
            {headline}
          </p>
          <p className="font-type-txt Color-Grey1 mb-b">{fileName}</p>
        </div>
        <Search_comp_for_logs
          set_log_data={set_log_data}
          log_data={log_data}
          set_preview_data={set_preview_data}
          preview_data={preview_data}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-c)",
          maxHeight: "68vh",
          overflowX: "hidden",
          height: "auto",
        }}
      >
        <table
          className="setting_table  "
          style={{ width: "100%", tableLayout: "fixed" }}
        >
          <tbody className="tbody_setting">
            <tr>
              <td
                className="  "
                style={{
                  height: "auto",
                  maxHeight: maxHeight,
                  // overflowY: "auto",
                  // overflowX: "auto",
                  whiteSpace: "pre",
                  width: "100%",
                }}
              >
                <pre
                  className="font-type-txt Color-White log-text"
                  style={{ lineHeight: lineHeight, margin: 0 }}
                >
                  {preview_data}
                </pre>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Settings_section_logs;
