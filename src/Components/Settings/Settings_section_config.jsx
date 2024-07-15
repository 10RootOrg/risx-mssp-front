import React, { useState, useEffect, useContext, useRef } from "react";

import axios from "axios";
import "./../Settings/Settings.css";
import "./custom-json-view.css";
import GeneralContext from "../../Context.js";
import JsonView from "@uiw/react-json-view";
import { PopUp_All_Good, PopUp_Are_You_Sure } from "../PopUp_Smart";
import CodeMirror from "@uiw/react-codemirror";
import { json, jsonLanguage, jsonParseLinter } from "@codemirror/lang-json";
import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

function Settings_section_config({
  show_SideBar,
  set_show_SideBar,
  set_notification_number,
}) {
  const [preview_or_edit, set_preview_or_edit] = useState(true);
  const [config_save_btn, set_config_save_btn] = useState(false);
  // const [loader , set_loader] = useState(true)
  const { backEndURL } = useContext(GeneralContext);
  const textAreaRef = useRef(null);
  const [PopUp_Are_You_Sure__show, set_PopUp_Are_You_Sure__show] =
    useState(false);
  const [PopUp_Are_You_Sure__txt, set_PopUp_Are_You_Sure__txt] = useState({
    HeadLine: "Are You Sure?",
    paragraph: "The record will be deleted from the system",
    buttonTrue: "True",
    buttonFalse: "False",
  });

  const initialObject = { loading: "..." };

  const myTheme = createTheme({
    theme: "dark",
    settings: {
      background: "#030208",
      backgroundImage: "",
      foreground: "#9CFF7E",
      caret: "#5d00ff",
      selection: "#036dd626",
      selectionMatch: "#036dd626",
      lineHighlight: "#8a91991a",
      gutterBackground: "#14085A",
      gutterForeground: "#8a919966",
    },
    styles: [
      { tag: t.comment, color: "#ffffff" },
      { tag: t.variableName, color: "#ffffff" },
      { tag: [t.string, t.special(t.brace)], color: "#DC1B1B" },
      { tag: t.number, color: "#F853E2" },
      { tag: t.bool, color: "#5c6166" },
      { tag: t.null, color: "#5c6166" },
      { tag: t.keyword, color: "#5c6166" },
      { tag: t.operator, color: "#5c6166" },
      { tag: t.className, color: "#5c6166" },
      { tag: t.definition(t.typeName), color: "#5c6166" },
      { tag: t.typeName, color: "#5c6166" },
      { tag: t.angleBracket, color: "#5c6166" },
      { tag: t.tagName, color: "#9CFF7E" },
      { tag: t.attributeName, color: "#5c6166" },
    ],
  });

  const [object, setObject] = useState(initialObject);
  const [ErrString, setErrString] = useState("");

  console.log("object", object);
  const Handele_are_you_sure = () => {
    set_PopUp_Are_You_Sure__txt({
      HeadLine: "Change config?",
      paragraph: "Are you sure you want to change config?",
      buttonTrue: "Yes",
      buttonFalse: "No",
    });

    set_PopUp_Are_You_Sure__show(true);
  };

  const HandleResetConfig = async () => {
    console.log("Reset Click!!");
    try {
      const res = await axios.get(`${backEndURL}/config/ResetConfigToBasic`);
      if (res.data == "Updated successfully") {
        console.log("Updated successfully The Config");
        get_config();
      }
    } catch (error) {
      console.log("Error in Reset Config", error);
    }
  };

  const handle_Save_config = () => {
    handleClose();
    // handleTextAreaChange();
    set_config_save_btn(false);
    set_preview_or_edit(true);
    const save_config = async () => {
      console.log("save_config..");
      try {
        const res = await axios.put(`${backEndURL}/config`, { config: object });

        if (res)
          if (res.data?.error === "failed saving config") {
            console.log("error save", res.data?.error);
            return;
          } else if (res.status === 500) {
            console.log("error save", res.data?.error);
          } else if (res.status === 200) {
            console.log("back from backend 200:", res.data);
          }

        // setObject(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    save_config();
  };

  const handle_Cancel_Save_config = () => {
    handleClose();
  };

  function handleClose() {
    set_PopUp_Are_You_Sure__show(false);
  }

  useEffect(() => {
    if (show_SideBar === false) {
      set_show_SideBar(true);
    }
  }, []);

  const handle_view_or_edit = () => {
    set_config_save_btn(false);
    set_preview_or_edit(!preview_or_edit);
    get_config();
  };

  const handleTextAreaChange = (event) => {
    console.log(" textAreaRef.current", textAreaRef.current);
    console.log(
      " textAreaRef.current.scrollTop",
      textAreaRef.current.scrollTop
    );
    const scrollTop = textAreaRef.current.scrollTop; // Save the scroll position
    set_config_save_btn(true);
    try {
      const value = JSON.parse(event.target.value);
      setObject(value);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    setTimeout(() => {
      textAreaRef.current.scrollTop = scrollTop; // Restore the scroll position
    }, 0);
  };

  const customTheme = {
    "--w-rjv-font-family": "roboto",

    "--w-rjv-background-color": "",
    "--w-rjv-line-color": "var(--color-Grey3)",
    "--w-rjv-arrow-color": "var(--w-rjv-color)",
    "--w-rjv-edit-color": "var(--color-Grey1)",
    "--w-rjv-add-color": "var(--color-Grey1)",
    "--w-rjv-delete-color": "var(--color-Grey1)",
    "--w-rjv-info-color": "red",
    "--w-rjv-update-color": "var(--color-Grey1)",
    "--w-rjv-copied-color": "var(--color-Grey1)",
    "--w-rjv-copied-success-color": "var(--color-Grey1)",

    "--w-rjv-curlybraces-color": "var(--color-Grey1)",
    "--w-rjv-colon-color": "var(--color-Grey1)",
    "--w-rjv-brackets-color": "var(--color-Grey1)",

    "--w-rjv-type-int-color": "var(--color-DB-Blue-Active)",
    "--w-rjv-type-float-color": "var(--color-DB-Blue-Active)",
    "--w-rjv-type-bigint-color": "var(--color-DB-Blue-Active)",
    "--w-rjv-type-boolean-color": "var(--color-DB-Blue-Active)",
    "--w-rjv-type-date-color": "var(--color-DB-Blue-Active)",
    "--w-rjv-type-url-color": "var(--color-DB-Blue-Active)",
    "--w-rjv-type-null-color": "var(--color-DB-Blue-Active)",
    "--w-rjv-type-nan-color": "var(--color-DB-Blue-Active)",
    "--w-rjv-type-undefined-color": "var(--color-DB-Blue-Active)",
    "--w-rjv-type-string-color": "var(--color-DB-Blue-Active)",
    "--w-rjv-type": "var(--color-DB-Blue-Active)",

    "--w-rjv-object-key": "var(--color-Grey1)",
    "--w-rjv-key-string": "var(--color-Grey1)",

    "--w-rjv-color": "var(--color-Orange)",

    "--w-rjv-quotes-color": "var(--color-Grey1)",
  };

  const get_config = async () => {
    if (backEndURL === undefined) {
      return;
    }
    try {
      const res = await axios.get(`${backEndURL}/config`);

      if (res) {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa", res.data);
      }
      setObject(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    {
      get_config();
    }
  }, [backEndURL]);

  return (
    <>
      {PopUp_Are_You_Sure__show && (
        <PopUp_Are_You_Sure
          popUp_show={PopUp_Are_You_Sure__show}
          set_popUp_show={set_PopUp_Are_You_Sure__show}
          HeadLine={PopUp_Are_You_Sure__txt.HeadLine}
          paragraph={PopUp_Are_You_Sure__txt.paragraph}
          button_True_text={PopUp_Are_You_Sure__txt.buttonTrue}
          button_False_text={PopUp_Are_You_Sure__txt.buttonFalse}
          True_action={handle_Save_config}
          False_action={handle_Cancel_Save_config}
        />
      )}

      <div>
        <p className="font-type-h4 Color-White mb-c">Config Files</p>
        <table className="setting_table  " style={{ lineHeight: "100%" }}>
          <tbody>
            <tr>
              <td className="setting_descriptions">
                <p className="font-type-menu Color-White mb-a">config.json</p>
                <p className="font-type-txt Color-Grey1 mb-b">
                  This is the place to update the general config file.
                </p>
                <p className="font-type-txt Color-Orange">
                  {" "}
                  Caution: Incorrect input may damage the functionality of the
                  software.
                </p>
                <button
                  className="btn-type2"
                  style={{ marginTop: 10 }}
                  onClick={HandleResetConfig}
                >
                  <p className="font-type-menu ">Reset</p>
                </button>
              </td>

              <td
                className="setting_element PreviewBox"
                style={{ height: "auto" }}
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
                    // <textarea
                    //   className="input-type3_settings reading-height  setting_element"
                    //   style={{ width: "100%" }}
                    //   value={JSON.stringify(object, null, 2)} // Convert object to string for textarea value
                    //   ref={textAreaRef}
                    //   onChange={handleTextAreaChange} // Update object state when textarea content changes
                    //   placeholder={"Description"}
                    // ></textarea>
                    <>
                      {ErrString && (
                        <div
                          style={{
                            width: "auto",
                            backgroundColor: "#AA1E1E",
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
                        width="900px"
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
                        // theme={myTheme} // Custom Style For The Editor
                        theme={vscodeDark} // Pre made style for the editor
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
    </>
  );
}

export default Settings_section_config;
