import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// export const GeneralContext = createContext();
 const GeneralContext = createContext();
export function ContextProvider  ({ children }) {


const backEndURL = "http://localhost:5000"
const [all_Resource_Types, set_all_Resource_Types] = useState([]);
const [all_Tools, set_all_Tools] = useState([]);

const[items, set_items] = useState([]);
const addToCart = (name,price)=>{
  set_items((prevState)=>[...prevState,{name, price}])
}
 




// useEffect(() => {
//   const get_all_tools = async()=>{

//     console.log("1234 start get_all_tools");
     
//     try{
//         const res = await axios.get(`${backEndURL}/Tools`);
  
//         console.log("2222 start get_all_tools");
    
//         if (res){ set_all_Tools(res.data)}} catch(err){console.log(err);}
    
    
//                 }
  
//   console.log(" tttttttt      2222" );
  
  
//   get_all_tools();  }, []);



  useEffect(() => {
 
     const get_all_resource_types = async()=>{
 
      try{
          const res = await axios.get(`${backEndURL}/Resources/all-resource-type`);
          if (res){set_all_Resource_Types( res.data)
 
             }}
      catch(err){console.log(err);}
                  }
 
    get_all_resource_types(); 
  
  }, []);


// console.log("all_Tools",all_Tools);
// console.log("all_Resource_Types",all_Resource_Types);



  return (
    <GeneralContext.Provider  value={{
      backEndURL,
      all_Resource_Types,
      all_Tools,
      set_all_Tools,

      addToCart,
      items,
      set_items,


     
      }} >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;




//   useEffect(() => {
//     if (localStorage.getItem("userpreferences")) {
//     } else {
//       localStorage.setItem(
//         "userpreferences",
//         JSON.stringify({ withPINGCastle: true }),
//       );
//     }
//   }, []);

 
//   const [withPINGCastle, set_withPINGCastle] = useState(
//     JSON.parse(localStorage.getItem("userpreferences"))?.withPINGCastle || true,
//   );

//   const [visibleComponent, setVisibleComponent] = useState(
//     JSON.parse(sessionStorage.getItem("pageRefreshLocation"))?.page ||
//       "AD ASSESS",
//   );


  // useEffect(() => {
  //   if (endOfTime === null) {
  //     const FindEndOfTime = async () => {
  //       try {
  //         const res = await axios.get(
  //           `${backEndURL}/entities/beginningOfTime/`,
  //           { withCredentials: true },
  //         );

  //         const gotThis = res.data;
  //         const date = new Date(gotThis);
  //         set_endOfTime(date);
  //         setSelectedEndDate(date);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };

  //     FindEndOfTime();
  //   }
  // }, [endOfTime]);
//   const newDateTemp = new Date().setHours(23, 59, 59);
//   const CurrentDate = new Date(newDateTemp);
 
 
 

  // async function getCsvData() {
  //   try {
  //     // const res = await axios.get("http://localhost:8080/csv");
  //     const res = await axios.get(`${backEndURL}/csv`);
  //     console.log("TableData - from backend", res.data);
  //     setTableData(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

//   async function getCsvData() {
//     try {
//       const res = await axios.get(
//         `${backEndURL}/rules_manager/read-all-table-data`,
//       );
//       console.log("RULES MANAGER: ", res.data);
//       setTableData(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async function getAD_ASSESS_KerbshieldData() {
//     try {
//       const res = await axios.get(
//         `${backEndURL}/rules_manager/read_AD_ASSESS_table`,
//         {
//           params: { withPINGCastle: withPINGCastle },
//         },
//       );
//       const x = res.data?.map((item) => {
//         item.documantation = item?.documantation?.split(";!@") ?? [];
//         return item;
//       });
//       console.log("RULES MANAGER AD_ASSESS: ", x);
//       setAD_ASSESS_tableData(x);
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   const [RuleTypePingOrRecon, setRuleTypePingOrRecon] = useState(
//     JSON.parse(localStorage.getItem("userpreferences"))?.withPINGCastle || true,
//   );



// const s = "1001, 2001, 2002,2003";

// // Split the string into an array by commas, trim each element, and check if "2002" is included
// const contains2002 = s.split(',').map(num => num.trim()).includes('2002');

// console.log(contains2002); // Outputs: true if 2002 is found, false otherwise
