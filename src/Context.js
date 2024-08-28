import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// export const GeneralContext = createContext();
const GeneralContext = createContext();
export function ContextProvider({ children }) {
  const [backEndURL, set_backEndURL] = useState("");
  const [mssp_config_json, set_mssp_config_json] = useState({});
  const [front_IP, set_front_IP] = useState("");
  const [front_URL, set_front_URL] = useState("");

  const [moduleLinks, set_moduleLinks] = useState();
  const [dashboardLinks, set_dashboardLinks] = useState();
  const [expiryDate, set_expiryDate] = useState("");
  const [Assets_Preview_List, set_Assets_Preview_List] = useState(false);
  const [examInnterval_minutes, set_examInnterval_minutes] = useState(2);

  const [DownloadProgressBar, setDownloadProgressBar] = useState({});
  const [DownloadList, setDownloadList] = useState([]);

  console.log("backEndURL", backEndURL);
  const fetchConfig = async () => {
    try {
      const response = await fetch("/mssp_config.json");
      const config = await response.json();

      if (config.backendUrl !== undefined) {
        // console.log("config", config);

        set_mssp_config_json(config);
        set_examInnterval_minutes(config.examInnterval_minutes);
        set_moduleLinks(config.moduleLinks);
        set_dashboardLinks(config.dashboardLinks);
        set_expiryDate(config.expiryDate);
        set_backEndURL(config.backendUrl);

        get_all_resource_types();
      } else {
        console.error("Configuration is null.");
      }
    } catch (error) {
      console.error("Error fetching mssp_config.json:", error);
    }
  };
  useEffect(() => {
    fetchConfig();
  }, []);

  useEffect(() => {
    if (!backEndURL) return;
    const fetchFromENV = async () => {
      try {
        const res = await axios.get(`${backEndURL}/config/from_env`);
        if (res) {
          set_front_IP(res.data?.FRONT_IP);
          set_front_URL(res.data?.FRONT_URL);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchFromENV();
  }, [backEndURL]);

  const [all_Resource_Types, set_all_Resource_Types] = useState([]);
  const [all_Tools, set_all_Tools] = useState([]);
  const [all_artifacts, set_all_artifacts] = useState([]);

  const [items, set_items] = useState([]);
  const user_id = "mssp-00003d31f6w";
  const addToCart = (name, price) => {
    set_items((prevState) => [...prevState, { name, price }]);
  };

  const get_all_tools = async () => {
    if (moduleLinks === undefined) {
      return;
    }

    if (backEndURL == null || backEndURL == undefined || backEndURL == "") {
      return;
    }
    if (all_Tools.length === undefined || all_Tools.length === 0) {
      try {
        const res = await axios.get(`${backEndURL}/tools`);
        if (res) {
          const all_tools_no_links = res.data;
          // console.log("all_tools_no_links",all_tools_no_links);

          all_tools_no_links.forEach((tool) => {
            for (let index = 0; index < moduleLinks.length; index++) {
              if (moduleLinks[index]?.toolID === tool?.tool_id) {
                tool.toolURL = moduleLinks[index]?.toolURL;
              }
            }
          });

          console.log("set all moduleLinks", moduleLinks);

          set_all_Tools(all_tools_no_links);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const get_all_resource_types = async () => {
    if (backEndURL === null || backEndURL === undefined || backEndURL == "") {
      return;
    }
    try {
      console.log("config_mssp.json -backEndURL-", backEndURL);
      const res = await axios.get(`${backEndURL}/Resources/count-same-type`);
      if (res) {
        set_all_Resource_Types(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get_all_resource_types();
    get_all_tools();
  }, [backEndURL, moduleLinks]);

  return (
    <GeneralContext.Provider
      value={{
        DownloadList,
        setDownloadList,
        DownloadProgressBar,
        setDownloadProgressBar,
        backEndURL,
        fetchConfig,
        all_Resource_Types,
        all_Tools,
        set_all_Tools,
        all_artifacts,
        set_all_artifacts,
        addToCart,
        items,
        set_items,

        user_id,
        get_all_resource_types,
        moduleLinks,
        dashboardLinks,
        examInnterval_minutes,
        expiryDate,
        front_IP,
        front_URL,
        mssp_config_json,
        set_mssp_config_json,

        Assets_Preview_List, set_Assets_Preview_List
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export default GeneralContext;
