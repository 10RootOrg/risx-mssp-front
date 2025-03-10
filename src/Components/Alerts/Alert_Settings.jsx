import React, { useState, useContext, useEffect } from "react";

import { ReactComponent as IconBIG } from "../icons/ico-menu-alert.svg";
import { ReactComponent as Loader } from "../icons/loader_typea.svg";

import ResourceGroup_Action_btns from "../ResourceGroup/ResourceGroup_Action_btns.jsx";
import ResourceGroup_buttomLine from "../ResourceGroup/ResourceGroup_buttomLine.jsx";
import axios from "axios";
import GeneralContext from "../../Context.js";

import "../StatusDisplay.css";

// Adjust the path as needed based on your project structure

import {
  PopUp_All_Good,
  PopUp_Alert_info,
  PopUp_loader,
  PopUp_Error,
} from "../PopUp_Smart.js";

import LMloader from "../Features/LMloader.svg";
import { AlertsMenu } from "./Alerts_Menu.jsx";
//  import './Dashboard_Results_all.css'
export function AlertsSettings({
  show_SideBar,
  set_show_SideBar,
  set_visblePage,
}) {
  set_visblePage("alertsSettings");

  const { backEndURL, all_Tools, front_IP } = useContext(GeneralContext);

  const [Preview_This_in_menu, set_Preview_This_in_menu] = useState("");
  const [SubMenuOptionsList, setSubMenuOptionsList] = useState([
    { value: "One", preview_name: "One" },
    { value: "Two", preview_name: "Two" },
    { value: "Three", preview_name: "Three" },
  ]);
  const [config_save_btn, set_config_save_btn] = useState(false);
  const [ActiveAlertConfig, setActiveAlertConfig] = useState({});

  const [PopUp_Error____show, set_PopUp_Error____show] = useState(false);
  const [PopUp_Error____txt, set_PopUp_Error____txt] = useState({
    HeadLine: "",
    paragraph: "",
    buttonTitle: "",
  });
  const [PopUp_All_Good__show, set_PopUp_All_Good__show] = useState(false);
  const [PopUp_All_Good__txt, set_PopUp_All_Good__txt] = useState({
    HeadLine: "Success",
    paragraph: "successfully",
    buttonTitle: "Close",
  });

  useEffect(() => {
    if (show_SideBar === false) {
      set_show_SideBar(true);
    }
  }, []);
  useEffect(() => {
    if (backEndURL) {
      GetAlertsConfig("");
    }
  }, [backEndURL]);

  const GetAlertsConfig = async (id) => {
    try {
      const res = await axios.post(backEndURL + "/Alerts/GetAlertsConfig", {
        id,
      });

      set_Preview_This_in_menu(res?.data?.AlertConfig?.clientid);
      setSubMenuOptionsList(res?.data?.Menu);
      console.log(
        "rrrrrrrrr22222222222222222222222222222",
        res.data,
        res?.data?.AlertConfig?.clientid
      );
      setActiveAlertConfig(res?.data?.AlertConfig);
    } catch (error) {
      console.log("Error In GetAlertsConfig :", error);
    }
  };

  const HandleMenuSwitch = async (name) => {
    try {
      console.log("flip", name);
      set_config_save_btn(false);

      set_Preview_This_in_menu(name);
    } catch (error) {
      console.log("this is error in HandleMenuSwitch");
      set_PopUp_Error____show(true);
      set_PopUp_Error____txt({
        HeadLine: "Error",
        paragraph: "Error Happened While Switching Configs",
        buttonTitle: "Close",
      });
    }
  };
  return (
    <div
      className="app-main"
      style={
        {
          // flexDirection:"row"
        }
      }
    >
      {PopUp_All_Good__show && (
        <PopUp_All_Good
          popUp_show={PopUp_All_Good__show}
          set_popUp_show={set_PopUp_All_Good__show}
          HeadLine={PopUp_All_Good__txt.HeadLine}
          paragraph={PopUp_All_Good__txt.paragraph}
          buttonTitle={PopUp_All_Good__txt.buttonTitle}
        />
      )}
      {PopUp_Error____show && (
        <PopUp_Error
          popUp_show={PopUp_Error____show}
          set_popUp_show={set_PopUp_Error____show}
          HeadLine={PopUp_Error____txt.HeadLine}
          paragraph={PopUp_Error____txt.paragraph}
          buttonTitle={PopUp_Error____txt.buttonTitle}
        />
      )}
      <div className="top-of-page">
        <div className="top-of-page-left mb-b">
          {/* <p  className="font-type-menu" >Dashboards:</p> */}
          <p className="font-type-h3">Alerts</p>
        </div>
        <div className="top-of-page-center">
          {/* placeholder for dropDown */}
        </div>
      </div>{" "}
      <div className="resource-group-top-boxes mb-c"></div>
      <AlertsMenu
        Preview_This_in_menu={Preview_This_in_menu}
        handle_Click_Btn={HandleMenuSwitch}
        sub_menu_options={SubMenuOptionsList}
      />
      <div>
        <table className="setting_table  " style={{ lineHeight: "100%" }}>
          <tbody>
            <tr>
              <td className="setting_descriptions">
                <p className="font-type-h4 Color-White mb-c">Main Config</p>
                <p className="font-type-menu Color-White mb-a">config.json</p>
                <p className="font-type-txt Color-Grey1 mb-b">
                  To view and edit the general configuration, click 'EDIT' to
                  modify tool options, assets, and more.
                </p>
                <p className="font-type-txt Color-Orange">
                  {" "}
                  Caution: Incorrect input may damage the functionality of the
                  software.
                </p>
              </td>

              <td
                className="setting_element PreviewBox"
                style={{ height: "auto", width: "68.5vw" }}
              >
                <div className=" ">
                  {preview_or_edit ? (
                    <div
                      className="setting_element"
                      style={{ overflowY: "scroll" }}
                    >
                      <JsonView
                        value={object}
                        keyName="root"
                        style={customTheme}
                        displayDataTypes={false}
                        enableClipboard={false}
                        name={false}
                      />{" "}
                    </div>
                  ) : (
                    <>
                      {ErrString && (
                        <div
                          style={{
                            // width: "auto",
                            backgroundColor: "var(--color-Orange)",
                            color: "#FFFFFF",
                            opacity: 0.7,
                            position: "absolute",
                            zIndex: 5555555,
                            padding: 10,
                          }}
                        >
                          {ErrString}
                        </div>
                      )}

                      <CodeMirror
                        value={JSON.stringify(object, null, 2)}
                        height="600px"
                        // width="100%"
                        // maxWidth="auto"

                        onChange={async (x) => {
                          try {
                            console.log("flip", JSON.parse(x));
                            set_config_save_btn(true);
                            setObject(JSON.parse(x));
                            setErrString("");
                          } catch (error) {
                            set_config_save_btn(false);
                            setErrString(error.toString());
                            console.log("Json Error", error.toString());
                          }
                        }}
                        extensions={[json()]}
                        theme={myTheme} // Custom Style For The Editor
                        // theme={vscodeDark} // Pre made style for the editor
                        highlightActiveLine={true}
                      />
                    </>
                  )}
                </div>
              </td>
              <div
                style={{
                  // marginTop:"18px",
                  marginBottom: "var(--space-d)",
                  marginTop: "var(--space-b)",
                  display: "flex",
                  justifyContent: "end",
                  gap: "var(--space-b)",
                  width: "70vw",
                }}
              >
                <button
                  className="btn-type2"
                  style={{}}
                  onClick={handle_view_or_edit}
                >
                  <p className="font-type-menu ">
                    {preview_or_edit ? "Edit" : "View"}
                  </p>
                </button>
                {config_save_btn && (
                  <button
                    className="btn-type2"
                    style={{}}
                    onClick={Handele_are_you_sure}
                  >
                    <p className="font-type-menu ">Save</p>
                  </button>
                )}
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
