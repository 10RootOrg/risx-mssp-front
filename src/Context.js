import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
 // export const GeneralContext = createContext();
 const GeneralContext = createContext();
export function ContextProvider  ({ children }) {
  const [backEndURL, set_backEndURL] = useState("");
  const [moduleLinks, set_moduleLinks] = useState();
  const [examInnterval_minutes, set_examInnterval_minutes] = useState(2);

//for local
// const backEndURL = "http://localhost:5000"
//for riskDev
// const [backEndURL, set_backEndURL] = useState("http://risxserverdev.westeurope.cloudapp.azure.com:5000");
//for hyperview 85.64.194.88

useEffect(() => {
  const fetchConfig = async () => {
    try {
      const response = await fetch('/mssp_config.json');
      const config = await response.json();
 
   
   if (  config.backendUrl !== undefined ) {

 
// console.log("config", config);
   set_examInnterval_minutes(config.examInnterval_minutes);
   set_moduleLinks(config.moduleLinks);
    // set_moduleLinks(config.moduleLinks);
    set_backEndURL(config.backendUrl);
    get_all_resource_types();
  } else {
    console.error('Configuration is null.');
  }


    } catch (error) {
      console.error('Error fetching mssp_config.json:', error);
    }
  };

  fetchConfig();
}, []);

 


const [all_Resource_Types, set_all_Resource_Types] = useState([]);
const [all_Tools, set_all_Tools] = useState([]);
const [all_artifacts, set_all_artifacts] = useState([]);

const[items, set_items] = useState([]);
const user_id = "mssp-00003d31f6w";
const addToCart = (name,price)=>{
  set_items((prevState)=>[...prevState,{name, price}])
}
 


 

const get_all_resource_types = async()=>{
 if(backEndURL === null ||backEndURL === undefined ||backEndURL == ""){return}
  try{

    console.log("config_mssp.json -backEndURL-" , backEndURL);
      const res = await axios.get(`${backEndURL}/Resources/count-same-type`);
      if (res){set_all_Resource_Types( res.data)

         }}
  catch(err){console.log(err);}
              }

useEffect(() => {get_all_resource_types() }, [backEndURL]);


  return (
    <GeneralContext.Provider  value={{
      backEndURL,
      all_Resource_Types,
      all_Tools, set_all_Tools,
      all_artifacts, set_all_artifacts,
      addToCart,
      items,  set_items,

      user_id,
      get_all_resource_types,
      moduleLinks,
      examInnterval_minutes
      }} >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

 