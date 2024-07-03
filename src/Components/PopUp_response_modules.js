
import React, { useEffect, useState ,useContext} from "react";
import GeneralContext from '../Context.js';
import './PopUp.css'; // import CSS file for modal styling
import { PreviewBox_type0_static  ,PreviewBox_type3_bar ,PreviewBox_type2_pie ,PreviewBox_type5_table,PreviewBox_type1_number} from './PreviewBoxes.js'
import { ReactComponent as CloseButton } from '../Components/icons/ico-Close_type1.svg';
import {ReactComponent as SuccessIcon} from '../Components/icons/General-icons-success.svg';
import {   format_date_type_c } from './Features/DateFormat';
import axios from 'axios';



const downloadJsonFile = (file) => {
    console.log(file);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(file));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  


export const PopUp_For_velociraptor_response = (props) => {

const { HeadLine,  popUp_show, set_popUp_show ,logoAddress_1_ForSrc    ,toolURL,buttonTitle  ,IconAddressForSrc,  json_file_info , json_file_data} = props;
const {  all_artifacts, backEndURL} = useContext(GeneralContext);
const [artifact_logo, set_artifact_logo]= useState("")
const [aggregate_macro_data, set_aggregate_macro_data]= useState({})
const [show_data, set_show_data]= useState("all")

    // Artifact_ID



    

    useEffect(() => {
if(json_file_data === undefined || json_file_data === "" || json_file_data === null ){return}
 if(all_artifacts === undefined || all_artifacts === "" || all_artifacts === null ){return}
 if(json_file_data.length == 0 || all_artifacts.length == 0 ){return}
console.log(all_artifacts);

const pathTOPic = all_artifacts?.filter((word) => word?.Toolname === json_file_data?.SubModuleName);
 if (pathTOPic === undefined || pathTOPic === "" || pathTOPic.length === 0){console.log("artifact id problem");return}
  
    const logoAddress_1 = pathTOPic[0]?.logoAddress_1
    const bbb = require(`${logoAddress_1}`)
     set_artifact_logo(bbb);
    }, [json_file_data]);
 

        useEffect(() => { set_popUp_show(popUp_show)}, [popUp_show]);

        function handleClickOutside(e) {  if (e.target.className === 'PopUp-background') {  set_popUp_show(false);}}
      
        function handleClose() {  set_popUp_show(false);}

    

        const [cell_width, set_cell_width] = useState(() => {
          if (json_file_info?.table[0]) {
            const totalKeys = Object.keys(json_file_info.table[0]).length;
       const width1 = 190/totalKeys
     

       if (width1 > 30){return `30vh`}
       else { return `${width1}vh`;}
           
          } 
          
          else {
            return "100px"; // Default width if json_file_info?.table[0] is undefined or has no keys
          }
        });




        useEffect(() => {  
          const SubModuleName = json_file_data?.SubModuleName
          const ResponsePath = json_file_data?.ResponsePath
          if(SubModuleName === undefined){return}
          if(ResponsePath === undefined){return}
          switch(SubModuleName) {
            case "HardeningKitty":   
           get_aggregate_macro_data(SubModuleName,ResponsePath);
           break;
            
           default:
            console.log("dont have macro Aggregate to this artifact");


              }




        }, [popUp_show ,json_file_data]);




 


async function get_aggregate_macro_data(SubModuleName,ResponsePath){
// console.log("get_aggregate_macro_data", SubModuleName, ResponsePath);
          if(SubModuleName === undefined){console.log("SubModuleName undefined"); return}
          if(ResponsePath === undefined){console.log("ResponsePath undefined"); return}
          
                  try{ 
                                        const res = await axios.get(`${backEndURL}/results/velociraptor-aggregate-macro`, {
                          params: {
                              SubModuleName: SubModuleName,
                              ResponseFile: ResponsePath
                          }
                      });
          
                      if (res  ) {
                          console.log("get_aggregate_macro_data res",  res);
                      }
          
                      if (res.data.success === false ) {
                          console.log("aggregate_macro_data_from false",  res.data);
                      }
                      
          
                      if (res.data.success === true) {
                        set_aggregate_macro_data(res?.data?.data);
                          console.log("aggregate_macro_data_from  true",  res.data.data );
                      
                      
                      }
                      
          
                  } catch (err) {
                      console.log(   '----------', err);
                      console.log(err.response?.data?.message || 'An error occurred');
                     }
                  }
                       


      
    
    
 
      console.log(json_file_info?.table );
      console.log(json_file_info?.SubModuleName);
      console.log("json_file_info props" ,props );
      console.log("json_file_data 1111111111111" , json_file_data);
      // console.log("json_file_data?.Arguments" ,json_file_data?.Arguments);
      // console.log("json_file_data?.Arguments" , JSON.stringify(json_file_data.Arguments));
    

 



        return (
          <>
       
 
    
     {popUp_show && (
              <div className={`PopUp-background`} onClick={handleClickOutside} >
    
                <div className={`PopUp-content`} style={{width:"80%" }}>
      {/* <img src={require("./Logos/Zircolite.svg") } alt="logo" maxwidth="140px" height="30"  />  */}
                  {/* {artifact_logo && <img src={artifact_logo} alt="Artifact Logo" />} */}
    
    <div className="display-flex justify-content-end  " style={{marginRight:"-40px"}}>
    <button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
    </div>
 


    <div>
    <p className="font-type-h4 Color-White mb-a">{HeadLine} </p>
    <p  className="font-type-txt  reading-height Color-Grey1  mb-b"  >Response Results</p> 
    </div>


    
    {/* <div  className='velociraptor_response_top_table'  >

<div  className='velociraptor_response_top_row' >
<p  className="velociraptor_response_top_table_item   font-type-menu   Color-Grey1"  >Artifact</p> 
<p  className="velociraptor_response_top_table_item   font-type-menu   Color-Grey1"  >Hunt ID</p> 
<p  className="velociraptor_response_top_table_item   font-type-menu   Color-Grey1"  >Status</p> 
<p  className="velociraptor_response_top_table_item  font-type-menu   Color-Grey1"  >Error</p> 
</div>

<div className='velociraptor_response_top_row'>
<p  className="velociraptor_response_top_table_item  font-type-txt  Color-Grey1"  >{json_file_data?.SubModuleName}</p> 
<p  className="velociraptor_response_top_table_item  font-type-txt  Color-Grey1"  >{json_file_info?.huntid}</p> 
<p  className="velociraptor_response_top_table_item  font-type-txt  Color-Grey1"  >{json_file_info?.status}</p> 
<p  className="velociraptor_response_top_table_item  font-type-txt  Color-Grey1"  >{json_file_data?.Error === "" ? (<>None</>):(<>{json_file_data?.Error}</>)}</p> 
</div>

</div>   */}



    <div className="velociraptor_response_all_top mb-d">


    <div className='velociraptor_response_top_texts  ' >
    
    {/* <div>
    <p className="font-type-h4 Color-White mb-a">{HeadLine} </p>
    <p  className="font-type-txt  reading-height Color-Grey1  mb-b"  >Response Results</p> 
    </div> */}


    </div>


<div className="pop-up-top-boxes-macro PreviewBox-of-pop-up-all">



{Object.keys(aggregate_macro_data).length != 0 ? 
<>




{/* <div  className='velociraptor_response_top_table'  >

<div  className='velociraptor_response_top_row' >
<p  className="velociraptor_response_top_table_item   font-type-menu   Color-Grey1"  >Artifact</p> 
<p  className="velociraptor_response_top_table_item   font-type-menu   Color-Grey1"  >Hunt ID</p> 
<p  className="velociraptor_response_top_table_item   font-type-menu   Color-Grey1"  >Status</p> 
<p  className="velociraptor_response_top_table_item  font-type-menu   Color-Grey1"  >Error</p> 
</div>

<div className='velociraptor_response_top_row'>
<p  className="velociraptor_response_top_table_item  font-type-txt  Color-Grey1"  >{json_file_data?.SubModuleName}</p> 
<p  className="velociraptor_response_top_table_item  font-type-txt  Color-Grey1"  >{json_file_info?.huntid}</p> 
<p  className="velociraptor_response_top_table_item  font-type-txt  Color-Grey1"  >{json_file_info?.status}</p> 
<p  className="velociraptor_response_top_table_item  font-type-txt  Color-Grey1"  >{json_file_data?.Error === "" ? (<>None</>):(<>{json_file_data?.Error}</>)}</p> 
</div>

</div>   */}





<PreviewBox_type5_table 
HeadLine="Response Data"
bar_numbers = { aggregate_macro_data?.severity_Counts ?  aggregate_macro_data?.severity_Counts : [0,0,0,0]  }
bar_headlines = {  aggregate_macro_data?.severity_Order  ? aggregate_macro_data?.severity_Order   : ['Critical', 'High', 'Medium', 'Low'] }
bar_title_legend = {"Vulnerabilities"}
is_popup = {true}
display_y_axis = {false}
Artifact={json_file_data?.SubModuleName}
HuntID={json_file_info?.huntid}
Status={json_file_info?.status}
Error={json_file_data?.Error === "" ? (<>None</>):(<>{json_file_data?.Error}</>)}
/>


<PreviewBox_type2_pie 
HeadLine={`Tests (${aggregate_macro_data?.Failed_Test_Number_of_tests[1]})`}
bar_numbers = {        [ aggregate_macro_data?.Failed_Test_Number_of_tests[0] , aggregate_macro_data?.Failed_Test_Number_of_tests[1] - aggregate_macro_data?.Failed_Test_Number_of_tests[0]]                        }
bar_headlines = {['Failed','Pass'] }
// bar_title_legend = {["Tests"]}
is_popup = {true}
/>

<PreviewBox_type3_bar 
HeadLine="Vulnerabilities"
bar_numbers = { aggregate_macro_data?.severity_Counts ?  aggregate_macro_data?.severity_Counts : [0,0,0,0]  }
bar_headlines = {  aggregate_macro_data?.severity_Order  ? aggregate_macro_data?.severity_Order   : ['Critical', 'High', 'Medium', 'Low'] }
bar_title_legend = {"Vulnerabilities"}
is_popup = {true}
display_y_axis = {false}
colors={"Alert"}
/>



<PreviewBox_type1_number
HeadLine="High"
resource_type_id={null}
BigNumber={   aggregate_macro_data?.["Count of High"] !== undefined ? aggregate_macro_data["Count of High"] : "NA" }
SmallNumberTxt={"Total"}
SmallNumber={`${aggregate_macro_data?.Failed_Test_Number_of_tests[1]}`}
// SmallNumber={ aggregate_macro_data?.severity_Counts  &&  aggregate_macro_data?.severity_Counts.length > 0 &&  aggregate_macro_data?.severity_Counts.reduce((a, b) => a + b, 0) || "NA"     }
StatusColor={"blue"}
date={  "NA"}
filter_Resource={show_data }
set_filter_Resource={set_show_data}
is_popup = {true} 
txt_color={"var(--color-Orange-Red)"}
/> 

{/* getComputedStyle(document.documentElement).getPropertyValue('--color-Orange-Red'),          txt_color={"var(--color-Orange)"}
*/}


<PreviewBox_type1_number
HeadLine="Critical"
resource_type_id={null}
BigNumber={   aggregate_macro_data?.["Count of Critical"] !== undefined ? aggregate_macro_data["Count of Critical"] : "NA" }
SmallNumberTxt={"Total"}
SmallNumber={`${aggregate_macro_data?.Failed_Test_Number_of_tests[1]}`}
// SmallNumber={ aggregate_macro_data?.severity_Counts  &&  aggregate_macro_data?.severity_Counts.length > 0 &&  aggregate_macro_data?.severity_Counts.reduce((a, b) => a + b, 0) || "NA"     }
StatusColor={"blue"}
date={  "NA"}
filter_Resource={show_data }
set_filter_Resource={set_show_data}
is_popup = {true} 
txt_color={"var(--color-Red)"}
/> 


</>


:

<>
<div style={{marginRight:'auto'}}>
<PreviewBox_type5_table 
HeadLine="Hunt Data"
bar_numbers = { aggregate_macro_data?.severity_Counts ?  aggregate_macro_data?.severity_Counts : [0,0,0,0]  }
bar_headlines = {  aggregate_macro_data?.severity_Order  ? aggregate_macro_data?.severity_Order   : ['Critical', 'High', 'Medium', 'Low'] }
bar_title_legend = {"Vulnerabilities"}
is_popup = {true}
display_y_axis = {false}
Artifact={json_file_data?.SubModuleName}
HuntID={json_file_info?.huntid}
Status={json_file_info?.status}
Error={json_file_data?.Error === "" ? (<>None</>):(<>{json_file_data?.Error}</>)}
/>
</div>

 
<PreviewBox_type0_static 
BigNumber={json_file_info?.table?.length === undefined ? 0 : json_file_info?.table?.length}
text_under_big_number={"Object Find"}
/>
 

</>





}




</div>



    </div>
    
    


    
    



    <div style={{   height:"auto" ,        maxHeight:"300px"    , overflowY:"auto" ,margin:0 , padding:0}}>
    
    {json_file_data?.artifact_id === '1000105' ? (<>
      <div className="table_smart"   >
    
      <div className="parent-container"  onClick={()=>set_cell_width("500px")}  > 
    <p  className="table_smart_col font-type-menu Color-White" style={{width:cell_width}}>ClientId</p>
    </div> 
    
    <div className="parent-container"  onClick={()=>set_cell_width("500px")}  > 
    <p  className="table_smart_col font-type-menu Color-White" style={{width:cell_width}}>FlowId</p>
    </div> 
    
    <div className="parent-container"  onClick={()=>set_cell_width("500px")}  > 
    <p  className="table_smart_col font-type-menu Color-White" style={{width:cell_width}}>Fqdn</p>
    
    </div> 
    </div> 
    
    
    <div className="table_smart"   >
    
    <div className="parent-container"   >
    <p className="table_smart_col font-type-txt  Color-Grey1" style={{width:cell_width}}>{json_file_info?.table[0]?.ClientId}</p>
    </div>
    <div className="parent-container"   >
    <p className="table_smart_col font-type-txt  Color-Grey1" style={{width:cell_width}}>{json_file_info?.table[0]?.FlowId}</p>
    </div>
    <div className="parent-container"   >
    <p className="table_smart_col font-type-txt  Color-Grey1" style={{width:cell_width}}>{json_file_info?.table[0]?.Fqdn}</p>
    </div>
     
    </div>
    
    </>):(
    
    
    <>
    
    {json_file_info?.table?.length !== 0 ? (<>
    
    
    <div className="table_smart"   >
      {Object.keys(json_file_info?.table[0]).map((key) => ( 
    <div className="parent-container"  onClick={()=>set_cell_width("500px")} key={key}> 
    <p  className="table_smart_col font-type-menu Color-White" style={{width:cell_width}}>{key}</p></div>))}
    </div>
    
    {json_file_info?.table.map((item, index) => (<div key={index}  className="table_smart" >
 

    {/* {Object.values(item).map((value, idx) => (
    <div className="parent-container"  key={idx}>
    <p className="table_smart_col font-type-txt  Color-Grey1" style={{width:cell_width}}>{value}</p>
    </div>
        ))} */}



   

        {Object.values(item).map((value, idx) => (
  <div className="parent-container" key={idx} >


    <p   className={`font-type-txt table_smart_col
   
  `
}
    style={{
       width: cell_width,
      //  verticalAlign:"middle",
       color: (() => {
        if (typeof value === 'string') {
          const lowerValue = value.toLowerCase();
          if (lowerValue === 'critical') return "var(--color-Red)";
          if (lowerValue === 'high') return "var(--color-Orange-Red)";
        }
        return 'var(--color-Grey1)';  // Default color
      })()
      //  
       
       
       }}> {typeof value === 'object' ? JSON.stringify(value) : value}</p>
  </div>
))}
        
      </div>
    ))}
    

    </>):null}
    
    </>
    
    
    )}
    

    
    <div className='display-flex   align-items-center' style={{width:cell_width  }}>
     
     </div>
    
    </div>

       <div className='display-flex mt-c' style={{  }}>

{artifact_logo === ""  ? null :(<>
<p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
          <img src={artifact_logo} alt="logo" maxwidth="140px" height="30" 
          //  style={{marginRight:"auto"}} 
           />
</>)


}
        
    

          <div/>
          
          <div style={{ display:"flex", justifyContent:"end" , gap:"10px", marginLeft:"auto"}}>
      <button className="btn-type2    " onClick={()=>downloadJsonFile(json_file_info)} ><p className='font-type-menu'>Download JSON</p>  </button> 
        <button className="btn-type2   " onClick={handleClose} ><p className='font-type-menu ' >{buttonTitle}</p>  </button> 

      </div>

          </div>
    

                </div>
              </div>)}
        
          </>
        );
      }
      

  export const PopUp_For__Nuclei__response = (props) => {
        const { HeadLine,  popUp_show, set_popUp_show    ,buttonTitle  ,  json_file_info , json_file_data} = props;
        const {all_Tools} = useContext(GeneralContext);
        const [module_logo, set_module_logo]= useState("")
 
        console.log("json_file_info",json_file_info  );
        console.log("json_file_data",json_file_data  );
 

    useEffect(() => {


      if(json_file_data === undefined || json_file_data === "" || json_file_data === null ){return}
       if(all_Tools === undefined || all_Tools === "" || all_Tools === null ){return}
       if(json_file_data.length == 0 || all_Tools.length == 0 ){return}


          const Nuclei_tool_info = all_Tools?.filter((word) => word?.tool_id === "2001005");
          const logoAddress_1 = Nuclei_tool_info[0]?.logoAddress_1;
          if (logoAddress_1 === undefined ){return}
          const bbb = require(`${logoAddress_1}`)
          set_module_logo(bbb);
          }, [json_file_data]);

    
        useEffect(() => { set_popUp_show(popUp_show)}, [popUp_show]);

        
            function handleClickOutside(e) {
              if (e.target.className === 'PopUp-background') {  set_popUp_show(false);}}
          
            function handleClose() {  set_popUp_show(false);}
    
   
            console.log("PopUp_For__Nuclei__response_tmp  333"  );
          
            return (
              <>
           
        
        
         {popUp_show && (
                  <div className={`PopUp-background`} onClick={handleClickOutside} >
        
                    <div className={`PopUp-content`} style={{width:"80%" }}>
 
        
        <div className="display-flex justify-content-end  " style={{marginRight:"-40px"}}>
        <button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
        </div>
     
        <div className="velociraptor_response_all_top mb-d">
        <div className='velociraptor_response_top_texts mb-c' >
        
        <div>
        <p className="font-type-h4 Color-White mb-a">{HeadLine} </p>
        <p  className="font-type-txt  reading-height Color-Grey1  mb-b"  >Response Results</p> 
        </div>
    
        <div  className='velociraptor_response_top_table' >
         <div  className='response_short_row' >
        <p  className="velociraptor_response_top_table_item   font-type-menu   Color-Grey1"  >Module</p> 
        <p  className="velociraptor_response_top_table_item   font-type-menu   Color-Grey1"  >Start Date</p> 
        <p  className="velociraptor_response_top_table_item   font-type-menu   Color-Grey1"  >Status</p> 
         </div>
        
        <div className='velociraptor_response_top_row'>
        <p  className="velociraptor_response_top_table_item  font-type-txt  Color-Grey1"  >{json_file_data?.ModuleName}</p>
        <p  className="velociraptor_response_top_table_item  font-type-txt  Color-Grey1"  >{json_file_data?.StartDate ? format_date_type_c(json_file_data?.StartDate) :"NA" }</p> 
        <p  className="velociraptor_response_top_table_item  font-type-txt  Color-Grey1"  > {json_file_data?.Status}</p> 
         </div>
        </div>
        
        </div>
        
        <PreviewBox_type0_static   BigNumber={json_file_info?.length} text_under_big_number={"Object Find"}
        // StatusColor={"blue"}
        // date={"14/5/20224"}
         
        />
         
        </div>
      

    <div  className='response_table_all_lists'>
    {Array.isArray(json_file_info) && json_file_info?.map((Info, index) => {return (
        
        <div  key={index}  >

 <table  className='response_table' >
 <p className=' font-type-txt   Color-Blue-Glow  tagit_type1   mb-b'style={{width:"fit-content"}}>Object No {index+1}</p>
 {/* <p className='  font-type-menu   Color-White mb-b'>Object No {index+1}</p>    */}
  <tr>
    <th className='response_table_short_row'><p className='  font-type-menu   Color-Grey1'>host</p></th>
    <th className='response_table_long_row'><p className=' font-type-txt  Color-Grey1'>{Info?.host}</p></th>
  </tr>
  <tr>
    <th className='response_table_short_row'><p className='  font-type-menu   Color-Grey1'>Request</p></th>
    <th className='response_table_long_row'><p className=' font-type-txt  Color-Grey1'>{Info?.request}</p></th>
  </tr>
  <tr> 
    <th className='response_table_short_row'><p className='  font-type-menu   Color-Grey1'>matcher-status</p></th>
    <th className='response_table_long_row'><p className=' font-type-txt  Color-Grey1'>{Info ? (Info["matcher-status"] ? "True" : "False") : "not defined"}</p></th>
  </tr>
  <tr>
    <th className='response_table_short_row'><p className='  font-type-menu   Color-Grey1'>template-id</p></th>
    <th className='response_table_long_row'><p className=' font-type-txt  Color-Grey1'>{Info ? (Info["template-id"]  ) : "not defined" }</p></th>
  </tr>
  <tr>
    <th className='response_table_short_row'><p className='  font-type-menu   Color-Grey1'>type</p></th>
    <th className='response_table_long_row'><p className=' font-type-txt  Color-Grey1'>{Info?.type}</p></th>
  </tr>
  <tr>
    <th className='response_table_short_row'><p className='  font-type-menu   Color-Grey1'>name</p></th>
    <th className='response_table_long_row'><p className=' font-type-txt  Color-Grey1'>{Info?.info?.name }</p></th>
  </tr>
 
</table>

       </div> 
       
    )})}
</div>



<div className='display-flex mt-c' style={{  }}>
          <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
          <img src={module_logo} alt="logo" maxwidth="140px" height="30"  style={{marginRight:"auto"}} />
    
          <div/>
          
          <div style={{ display:"flex", justifyContent:"end" , gap:"10px"}}>
      <button className="btn-type2    " onClick={()=>downloadJsonFile(json_file_info)} ><p className='font-type-menu'>Download JSON</p>  </button> 
        <button className="btn-type2   " onClick={handleClose} ><p className='font-type-menu ' >{buttonTitle}</p>  </button> 

      </div>

          </div>



      {/* <div style={{ display:"flex", justifyContent:"end" , gap:"10px"}}>
      <button className="btn-type2    " onClick={()=>downloadJsonFile(json_file_info)} ><p className='font-type-menu'>Download JSON</p>  </button> 
        <button className="btn-type2   " onClick={handleClose} ><p className='font-type-menu ' >{buttonTitle}</p>  </button> 

      </div>
     */}
        
    
                    </div>
                  </div>)}
            
              </>
            );
          }
          