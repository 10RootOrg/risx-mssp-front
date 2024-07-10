import React , {useState , useEffect ,useContext} from 'react';
 
import axios from 'axios';
import './../Settings/Settings.css';
import './custom-json-view.css';
import GeneralContext from '../../Context.js';
// import JsonView from '@uiw/react-json-view';
// import {PopUp_All_Good ,PopUp_Are_You_Sure} from '../PopUp_Smart'

function Settings_section_logs({show_SideBar,set_show_SideBar,  usethis, fileName,  headline,  subline  }) {

 const {   backEndURL   } = useContext(GeneralContext);
 const [log_data, set_log_data] = useState('loading..');
 const maxHeight = "800px"
 const lineHeight = "160%"

//  const [loadig, set_loading] = useState(false);

 useEffect(() => {  if (show_SideBar === false) {set_show_SideBar(true)}}, []);


 const fetchLog = async(logName,set_log_data) =>{
  try{
    set_log_data("loading..");
    const res = await axios.get(`${backEndURL}/logs/get-log`,{params:{logName:logName ,fileName:fileName}});
 
if(res){

if(res?.data?.status === 200  || res?.data?.content != undefined){

console.log(res?.data?.content);
set_log_data(res?.data?.content);
}

}
    
 

  }
  catch(err){console.log(err);
    set_log_data(`Error fetchLog ${logName}. message: ${err}`);


  }
    
};




 useEffect(() => {
  // fetchLog("log_mssp_backend",set_log_data);
  fetchLog(usethis,set_log_data );
  // fetchLog("log_python_main",set_log_data);
 }, []);  



    return (
 
    <div style={{ maxWidth: '100%', overflowX: 'hidden' }}
      >
      {/* <p className="font-type-h4 Color-White mb-a">Logs</p> */}
      <p className="font-type-menu Color-White mb-a">{headline}</p>
      <p className="font-type-txt Color-Grey1 mb-b">{fileName}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-c)" }} >
        <table className="setting_table  " style={{ width: '100%', tableLayout: 'fixed' }}>
          <tbody className="tbody_setting   ">
            <tr >
              {/* <td className="setting_descriptions  ">
                <p className="font-type-menu Color-White mb-a">Backend</p>
                <p className="font-type-txt Color-Grey1 mb-b">mssp-back.log</p>
              </td> */}
              <td
                className="PreviewBox  "
                style={{
                  height: "auto",
                  maxHeight: maxHeight,
                  overflowY: "auto",
                  overflowX: "auto", 
                  whiteSpace: "pre", 
                  width: '100%', 
                }}
              >
                <pre 
                  className="font-type-txt Color-White log-text"
                  style={{ lineHeight: lineHeight, margin: 0 }}
                >
                  {log_data}
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

  // <div style={{ maxWidth: '100%', overflowX: 'hidden' }}
  //     >
  //     <p className="font-type-h4 Color-White mb-a">Logs</p>
  //     <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-c)" }} >
  //       <table className="setting_table PreviewBox_for_cut_right" style={{ width: '100%', tableLayout: 'fixed' }}>
  //         <tbody className="tbody_setting  PreviewBox_for_cut_right">
  //           <tr >
  //             <td className="setting_descriptions PreviewBox_for_cut_right">
  //               <p className="font-type-menu Color-White mb-a">Backend</p>
  //               <p className="font-type-txt Color-Grey1 mb-b">mssp-back.log</p>
  //             </td>
  //             <td
  //               className="PreviewBox  "
  //               style={{
  //                 height: "auto",
  //                 maxHeight: maxHeight,
  //                 overflowY: "auto",
  //                 overflowX: "auto", 
  //                 whiteSpace: "pre", 
  //                 width: '100%', 
  //               }}
  //             >
  //               <pre 
  //                 className="font-type-txt Color-White log-text"
  //                 style={{ lineHeight: lineHeight, margin: 0 }}
  //               >
  //                 {log_data}
  //               </pre>
  //             </td>
  //           </tr>
  //         </tbody>
  //       </table>
  //     </div>

  


  //   </div>