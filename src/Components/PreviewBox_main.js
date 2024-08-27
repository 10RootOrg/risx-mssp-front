import React , {useState , useEffect, useContext} from 'react';
 import { ReactComponent as IconLastRun } from './icons/ico-lastrun.svg';
//  import { ReactComponent as RisxMssp_logo_wide_small} from './Logos/RisxMssp_logo_wide_small.svg';
 import { ReactComponent as IconReadMore } from './icons/ico-readmore.svg';
 import { ReactComponent as IcoKey } from './icons/ico-eye.svg';
 import { PopUp_For_Read_More ,PopUp_All_Good} from "./PopUp_Smart.js";
 import { Make_url_from_id ,fix_path} from "../Components/Dashboards/functions_for_dashboards";
 import { ReactComponent as IcoModule } from './icons/ico-module-nonedge-blue.svg';
 import { ReactComponent as IcoLink } from './icons/ico-link-nonedge-blue.svg';
 
//  import jsonData from '../tmpjsons/previewBox-main-velociraptor.json'
 import axios from 'axios';
 import GeneralContext from '../Context.js';

import './PreviewBoxes.css';
import './all_tools.css';
 

// function PreviewBox_velociraptor2({ box_type, main_headline,main_read_more, artifacts_modules_list }) {
 
//   const StatusColor = "blue"

//   const StatusColorClass =
//   StatusColor === 'red' ? 'Bg-Red' :
//   StatusColor === 'blue' ?'Bg-Blue-Glow' : 
//   'Bg-Grey2';

//   const {  backEndURL ,all_artifacts,set_all_artifacts,all_Tools, set_all_Tools,front_IP,front_URL} = useContext(GeneralContext);
//   const [popUp_show, set_popUp_show] = useState(false);
//   const [popUp_headline, set_popUp_headline] = useState("");
//   const [popUp_ReadMoreText, set_popUp_ReadMoreText] = useState("");
//   const [popUp_btnTitle, set_popUp_btnTitle] = useState("");
//   const [popUp_logoAddress_1, set_popUp_logoAddress_1] = useState("");
//   const [popUp_iconAddress, set_popUp_iconAddress] = useState("");
//   const [popUp_iconSize, set_popUp_iconSize] = useState("Small");
  

//   const [popUp_all_good____show, set_popUp_all_good____show] = useState(false);
//   const [popUp_all_good____txt, set_popUp_all_good____txt] = useState({  HeadLine:"",paragraph:"" ,buttonTitle:""})
//   const [ toolURL, set_toolURL] = useState("https://docs.velociraptor.app");
 
//   const [disabled, set_disabled] = useState(false)

//   const [ checked_artifacts2, set_checked_artifacts2] = useState([]);
  
//   const handleReadMore = (headline,readMoreText,logoAddress_1,btnTitle,iconAddress,iconSize) =>{
//     console.log(iconAddress);
//     set_popUp_headline(headline);
//     set_popUp_ReadMoreText(readMoreText);
//      set_popUp_logoAddress_1( require(`${logoAddress_1}`));
//     set_popUp_btnTitle(btnTitle);
//     set_popUp_iconSize(iconSize)

//     if (iconAddress !== null && iconAddress !== undefined){    set_popUp_iconAddress( require(`${iconAddress}`));
//   }   else{set_popUp_iconAddress("")}

//     set_popUp_show(true);
//   }



//   const handle_Main_Btn =(toolURL)=>{
// console.log("handle_Main_Btn",toolURL);



// const  path = fix_path(toolURL,front_IP,front_URL)

// if (path) { 
//   console.log("Velo path: ", path);
//    window.open(  path , '_blank') ;
// }
 
// else{console.log("problem with velociraptor path, it is:", path); }

 
     
    
 
         
//       }



 
 
//   async function  ShowInUi (Info){
 
// if(Info.parent_id === "2000000"  ||  Info.parent_id === 2000000 ){

//  set_popUp_all_good____txt({ HeadLine:"Stays on",paragraph:"Velociraptor artifacts configured to always be visible." ,buttonTitle:"Close"})
//  set_popUp_all_good____show (true);
//  }


 
//      }
   
 
//   useEffect(() => { 
//     const all = all_artifacts.map(({ artifact_id, Toolname ,logoAddress_1 }) => ({ artifact_id, Toolname, logoAddress_1 }));
//     set_checked_artifacts2(all)
//    }, [all_artifacts ]);
 

 
 

//    async function  edit_checked_artifacts  (artifact_id ,isActive) {
// if (artifact_id === undefined ||isActive === undefined ){console.log("undefined cant change artifact");return} 


// try{
//   set_disabled(true);
//   const res = await  axios.put(`${backEndURL}/tools/enable-disable-artifact`, {
//     params: {
//      artifact_id: artifact_id ,
//      set_enable_disable_to: !isActive,
//     }
//   });



  
//   if(res.data){

//     console.log(res.data);
//     const index = all_artifacts.findIndex(art => art.artifact_id === artifact_id);
//     console.log(index);
//     if (index !== -1) {
 
//       const updatedARTS = [...all_artifacts];
//  console.log(updatedARTS);
//       updatedARTS[index] = { ...updatedARTS[index], artifact_id: artifact_id, isActive: !isActive };


//       // Set the state with the updated array
//       set_all_artifacts(updatedARTS);
//       set_disabled(false);
//     }
  
   
  
//     }

 
//      }catch(err){set_disabled(false);console.log(err);}

  
  
  
  
//   }
  


//   useEffect(() => {
//     set_popUp_show(popUp_show)
//   }, [popUp_show]);

//   const logoAddress="./Logos/Velociraptor.svg";
//   const iconAddress="./icons/General-icons-g.svg"
//   const lastrun="17/03/2024"
//   // const toolURL="https://velociraptor-10root.northeurope.cloudapp.azure.com:8889"
//   // const HeadLine= "Endpoints Modules"
//   // const ReadMore= "At the press of a (few) buttons, perform targeted collection of digital forensic evidence simultaneously across your endpoints, with speed and precision. Continuously collect endpoint events such as event logs, file modifications and process execution. Centrally store events indefinitely for historical review and analysis. Don't wait until an event occurs. Actively search for suspicious activities using our library of forensic artifacts, then customize to your specific threat hunting needs."




//   useEffect(() => {
//     const url =   all_Tools.filter(item => (item.tool_id === "2000000" ))[0]?.toolURL
// //  const url = velociraptor_from_all_tools[0]?.toolURL

// if (url === undefined){return}
// set_toolURL(url)

//   }, [ all_Tools]);
 

 
//   return (


//     <>
// <PopUp_All_Good

//    set_popUp_show={set_popUp_all_good____show}
//    popUp_show={popUp_all_good____show}
//    HeadLine={popUp_all_good____txt.HeadLine}
//    buttonTitle={popUp_all_good____txt.buttonTitle}
//    paragraph={popUp_all_good____txt.paragraph}
// />



// <PopUp_For_Read_More
//         HeadLine={popUp_headline}
//         readMoreText={popUp_ReadMoreText}
//         logoAddress_1_ForSrc={popUp_logoAddress_1}
//         // toolURL={toolURL}
//         buttonTitle={popUp_btnTitle}
//         IconAddressForSrc={popUp_iconAddress}
//         set_popUp_show={set_popUp_show}
//         popUp_show={popUp_show}
//         popUp_iconSize={popUp_iconSize}
//       />
 

//       <div className=' all-tools-main' > 
// {/* ---------------------left-box----------------------------- */}
// <div className='all-tools-left-side  '  >


// {/* top left / */}
// <div style={{ display:"flex",alignItems:"center", justifyContent:"center"}} >
// {box_type === "velociraptor" &&     <>
//  <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
//   <img src={ logoAddress ? require(`${ logoAddress}`) : undefined} alt="velociraptor" maxwidth="180" height="28" position='relative'    /> 
//   </>}
//  </div>


// {/*  center  */}
// <div className='display-flex flex-direction-column  ' >
// {/*  icon  */}
// <img src={ iconAddress ? require(`${ iconAddress}`) : undefined} alt="Icon" width="100%" height="80" className='mb-a'   /> 
   
// {/*  text  */}
//     <p className='text-center     font-type-h4 Color-White mb-a'  style={{maxWidth:"350px"}} >{main_headline}</p>
//     <p className='text-center   font-type-txt Color-White  mb-a'    style={{maxWidth:"250px"}}>Select tools from the list and execute artifacts on endpoints</p>
   
// {/*  read more  */}
//     <button className="btn-type3 " onClick={()=>handleReadMore(main_headline, main_read_more  , logoAddress ,"Close"  ,iconAddress ,"Big" )}><p className=' font-type-txt' >Read More</p><IconReadMore className="icon-type1 " />  </button>

//     </div>

// {/* /////////////// button //////////// */}
// <div className='PreviewBox_ButtomLine' ><IconLastRun /><div className='font-type-very-sml-txt Color-Grey1' >{lastrun}</div></div>
 
//     </div>


// {/* -----------------------right-box------------------------ */}
//   <div className='velociraptor-right-side display-flex  flex-direction-column' > 

//   <div className=' display-flex  justify-content-space-between' style={{width:"100%", height:"24px"}} >
//   <div style={{width:"1px" }}/> 
//   <div className={`${StatusColorClass}  light-bulb-type1`} />
// </div>

 
 
// {/* <div className='Bg-Grey2' style={{width:"100%", height:"2px" ,borderRadius:"5px"}}/> */}

// <div className='all-tools-right-side'  >

 



// <table className='all-tools-table'  style={{ margin:0 , padding:0, border:0}}       >
//                   {/* <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--color-Grey5)', zIndex: 1  }}>
//                     <tr  style={{ textAlign: 'left' ,height:"30px"}}>
//                       <th className='font-type-menu Color-Grey1' style={{}}>{list_array_column1?.previewName}</th>
//                       <th className='font-type-menu Color-Grey1'  style={{textAlign:"right" ,paddingRight:"5px"}}>{list_array_column2?.previewName}</th>
//                     </tr>
//                   </thead> */}
//                   <tbody      style={{ margin:0 , padding:0, border:0}}>
//                     {/* {list_array?.map((item, index) => (
//                       <tr key={index}>

//                         {is_tags ? (
//                          <td className='font-type-txt  font-type-txt   Color-Blue-Glow tagit_type1' style={{ }}>{item[list_array_column1?.key]}</td>
//                         ):(
//                        <td className='font-type-txt Color-Grey1 ' style={{ }}>{item[list_array_column1?.key]}</td>
//                        ) }
//                         <td className='font-type-txt Color-White ' style={{textAlign:"right" ,paddingRight:"5px"}}>{item[list_array_column2?.key]}</td>
//                       </tr> */}
            
 

         




// {Array.isArray(artifacts_modules_list) &&  artifacts_modules_list?.map((Info, index) =>(
 
  
// <>


// <tr key={index} className='all-tools-line'  >

 

// <td>
  
//   <label className="container" style={{marginTop:"-11px"}}> 
// <input type="checkbox" 

// checked={Info?.isActive}
// disabled={disabled}
// // defaultChecked
//  value={Info?.artifact_id}
//      onChange={()=> edit_checked_artifacts(Info?.artifact_id ,Info?.isActive) }


//     //  onChange={()=>set_checked_artifacts([ ...checked_artifacts,Info?.artifact_id])}
//      />
// <span className="checkmark"></span>
// </label></td>
// {/* description_long */}
 
// <td><p className='font-type-menu  Color-White  cutLongLine' >{Info?.headline}</p></td>
// <td> <p className='font-type-txt   Color-Grey1   cutLongLine'     style={{}}>{Info?.description}</p></td>
// <td className='' ><div style={{display:"flex", alignItems:"center " }}><p className='font-type-very-sml-txt   Color-Grey1 mr-a'>By:</p><img className='logo-cell  ' style={{ }} src={Info?.logoAddress_1 ? require(`${Info.logoAddress_1}`) : undefined}></img></div></td>
// <td><button  className="btn-type3" 

// onClick={() => {
  
//   let descriptionText;
//   if (box_type === "velociraptor") {
//     descriptionText = Info?.readMoreText;
//   } else if (box_type === "module" || box_type === "link") {
//     descriptionText = Info?.description_long;
//   } else {
//     descriptionText = Info?.description_long;
//   }
//   handleReadMore(


  
//    Info?.headline,
//    descriptionText   ,
 
//      Info?.logoAddress_1,
//        "Close",
//          null,
//             "Small"
//              )}}
//               ><p className='font-type-txt' style={{   whiteSpace: 'nowrap' }}>Read More</p><IconReadMore className="icon-type1" style={{ width: 20, height: 20    }} /></button></td> 
// <td className='' ><div style={{display:"flex", alignItems:"center", }}><IconLastRun /><p className='font-type-very-sml-txt Color-Grey1' >{lastrun}</p></div></td>
// <td
//   className=''
//   onClick={() => ShowInUi(Info)}
//   style={{ position: 'relative' }} // Optional: Ensures proper positioning
// >
//   <button
//     className="btn-type4"
//     tool_id={Info?.tool_id}
//     style={{
//       marginRight: 0,
//       paddingRight: 0,
//       backgroundColor: 'transparent', // Optional: Make button background transparent
//       border: 'none', // Optional: Remove button border
//       cursor: 'default', // Optional: Change cursor to default
//       position: 'absolute', // Optional: Position it absolutely within <td>
//       top: 0, // Adjust as needed
//       left: 0, // Adjust as needed
//       pointerEvents: 'none' // Ensure button does not handle pointer events
//     }}
//   >
//     {/* <IcoKey className="icon-type1" style={{ marginRight: 0, paddingRight: 0 }} /> */}
//   </button>

//   {/* Other content in <td> can go here */}
//   <IcoKey className="icon-type1 icon-type1-disable" />
// </td>



 







 

// </tr>   

// </>

//            ))}

//           </tbody>
//                 </table>


 

// </div>

 

// {/* buttom buttons */} 

// {box_type === "velociraptor" && 
//   <div className='display-flex justify-content-end mb-b' style={{ width:"100%"}}>

// {checked_artifacts2?.length === 0 ? (
//   <p className='ml-a font-type-txt  Color-Red mr-b'>Choose at least 1 Artifact</p>):
// (<>
 
//  <p className='ml-a font-type-txt  Color-Grey1 mr-b'><b> </b>Agent required</p></>
// )}

// <div className=' '>
// <button className="btn-type2" onClick={()=>handle_Main_Btn(toolURL)}>
//       <p className='font-type-menu'>Site</p>
//     </button>
//     </div>

//   {/* <button className="btn-type2 ml-b "
//   // disabled={checked_artifacts.length === 0}
  

//   onClick={()=>handle_click_velociraptor()}
//   disabled ={checked_artifacts2.length === 0}
//   >
//   <p className='font-type-menu ' >Run Artifacts</p>
//     </button>  */}
// </div>
// }

 
//    </div>

//     </div>  
    

 


//     </>

//   )
// }

function PreviewBoxes_main_modules({
   preview_list
    ,box_type ,
      main_headline,
      main_read_more,
      main_subtitle,
      logoAddress,
      iconAddress,
      lastrun,
      is_filtering,
      all_artifacts_and_modules,
      set_all_artifacts_and_modules 
    }) {
 
  const StatusColor = "blue"

  const StatusColorClass =
  StatusColor === 'red' ? 'Bg-Red' :
  StatusColor === 'blue' ?'Bg-Blue-Glow' : 
  'Bg-Grey2';
 
  const {  backEndURL ,all_artifacts,set_all_artifacts,all_Tools,set_all_Tools,front_IP,front_URL} = useContext(GeneralContext);
  const [popUp_show, set_popUp_show] = useState(false);
  const [popUp_headline, set_popUp_headline] = useState("");
  const [popUp_ReadMoreText, set_popUp_ReadMoreText] = useState("");
  const [popUp_btnTitle, set_popUp_btnTitle] = useState("");
  const [popUp_logoAddress_1, set_popUp_logoAddress_1] = useState("");
  const [popUp_iconAddress, set_popUp_iconAddress] = useState("");
  const [popUp_iconSize, set_popUp_iconSize] = useState("Small");
  const [popUp_all_good____show, set_popUp_all_good____show] = useState(false);
  const [popUp_all_good____txt, set_popUp_all_good____txt] = useState({  HeadLine:"",paragraph:"" ,buttonTitle:""})
  const [ toolURL, set_toolURL] = useState("https://docs.velociraptor.app");
 
  const [disabled, set_disabled] = useState(false)

  const [ checked_artifacts2, set_checked_artifacts2] = useState([]);
 
 

  const change_order = (info, operator) => {
    // console.log(info, operator);


    if (info?.artifact_id && !info?.tool_id) {
      console.log("change Artifact");


      const all_artifacts_and_modules___copy1 = [...all_artifacts_and_modules];

      const item_Local_Index = preview_list.findIndex(
        tool => tool?.artifact_id === info?.artifact_id
      );
      

      const local_item_id_to_jump_over = preview_list[item_Local_Index+operator]?.artifact_id ;
      //  console.log("local_item_id_to_jump_over", local_item_id_to_jump_over);

       const general_item_index_to_jump_over = all_artifacts_and_modules.findIndex(
        tool => tool?.artifact_id === local_item_id_to_jump_over
      );

      // console.log("general_item_index_to_jump_over", general_item_index_to_jump_over);

   
      const [item] = all_artifacts_and_modules___copy1.filter((item) => item?.artifact_id === info?.artifact_id);
      const all_list_without_the_item = all_artifacts_and_modules___copy1.filter((item) => item?.artifact_id != info?.artifact_id);

    //  console.log("item", item);
    //   console.log("item_General_Index", item_General_Index);
    //   console.log("item_Local_Index", item_Local_Index);


      const new_list = [
        ...all_list_without_the_item.slice(0, general_item_index_to_jump_over  ),
        item,
        ...all_list_without_the_item.slice(general_item_index_to_jump_over  )
    ];

    // console.log("old_list", all_artifacts_and_modules);
    // console.log("new_list", new_list);
    set_all_artifacts_and_modules(new_list);
 



    }

    if (!info?.artifact_id && info?.tool_id) {
      console.log("its MODULE");

   const all_artifacts_and_modules___copy1 = [...all_artifacts_and_modules];


      // const item_General_Index = all_artifacts_and_modules.findIndex(
      //   tool => tool?.tool_id === info?.tool_id
      // );

      const item_Local_Index = preview_list.findIndex(
        tool => tool?.tool_id === info?.tool_id
      );
      

      const local_item_id_to_jump_over = preview_list[item_Local_Index+operator]?.tool_id ;
      //  console.log("local_item_id_to_jump_over", local_item_id_to_jump_over);

       const general_item_index_to_jump_over = all_artifacts_and_modules.findIndex(
        tool => tool?.tool_id === local_item_id_to_jump_over
      );

      // console.log("general_item_index_to_jump_over", general_item_index_to_jump_over);

   
      const [item] = all_artifacts_and_modules___copy1.filter((item) => item?.tool_id === info?.tool_id);
      const all_list_without_the_item = all_artifacts_and_modules___copy1.filter((item) => item?.tool_id != info?.tool_id);

    //  console.log("item", item);
    //   console.log("item_General_Index", item_General_Index);
    //   console.log("item_Local_Index", item_Local_Index);


      const new_list = [
        ...all_list_without_the_item.slice(0, general_item_index_to_jump_over  ),
        item,
        ...all_list_without_the_item.slice(general_item_index_to_jump_over  )
    ];

    // console.log("old_list", all_artifacts_and_modules);
    // console.log("new_list", new_list);
    set_all_artifacts_and_modules(new_list);
 
 
    }
  };

  const handleReadMore = (headline,main_read_more,logoAddress_1,btnTitle,iconAddress,iconSize) =>{
    console.log(iconAddress);
    set_popUp_headline(headline);
    set_popUp_ReadMoreText(main_read_more);
    if (logoAddress_1) {
      set_popUp_logoAddress_1( require(`${logoAddress_1}`));
    }
    
    set_popUp_btnTitle(btnTitle);
    set_popUp_iconSize(iconSize)

    if (iconAddress !== null && iconAddress !== undefined){    set_popUp_iconAddress( require(`${iconAddress}`));
  }   else{set_popUp_iconAddress("")}

    set_popUp_show(true);
  }

const handle_Main_Btn =(toolURL)=>{
console.log("handle_Main_Btn",toolURL);
const  path = fix_path(toolURL,front_IP,front_URL)
if (path) { 
  console.log("Velo path: ", path);
   window.open(  path , '_blank') ;
}
 
else{console.log("problem with velociraptor path, it is:", path); }   
      }


async function  ShowInUi (Info){

  if(Info.parent_id === "2000000"  ||  Info.parent_id === 2000000 ){
    set_popUp_all_good____txt({ HeadLine:"Stays on",paragraph:"Velociraptor artifacts configured to always be visible." ,buttonTitle:"Close"})
    set_popUp_all_good____show (true);
    }


  try{
    const res = await
    axios.put(`${backEndURL}/tools/show-in-ui`,  {
      params: {
       module_id: Info?.tool_id  ,
       set_ShowInUi_to: !Info?.ShowInUi,
      }
    });
    if(res.data){
      // set_disable_ShowInUi_btn(false);
    const index = all_Tools.findIndex(tool => tool.tool_id === Info?.tool_id );


   
    if (index !== -1) {
      // Create a new copy of the all_Tools array
      const updatedTools = [...all_Tools];
      console.log("updatedTools",updatedTools);
      
      // Update the specific tool
      updatedTools[index] = { ...updatedTools[index], tool_id: Info?.tool_id, ShowInUi: !Info?.ShowInUi   ,isActive:!Info?.ShowInUi};
      // Set the state with the updated array
      set_all_Tools(updatedTools);
   
    }

  
    }
  
       }catch(err){
        // set_disable_ShowInUi_btn(false);
        console.log(err);}
   }
 
  useEffect(() => { 
    const all = all_artifacts.map(({ artifact_id, Toolname ,logoAddress_1 }) => ({ artifact_id, Toolname, logoAddress_1 }));
    set_checked_artifacts2(all)
   }, [all_artifacts ]);
 


async function  edit_checked_artifacts  ( Info) {

if ( Info.isActive === undefined ){console.log("isActive is undefined cant change");return} 

if(!Info?.artifact_id  && !Info?.tool_id ) {console.log("artifact_id & tool_id are undefined  ");return}

/// enable disable for artifact
if(Info?.artifact_id  && !Info?.tool_id ) {
  console.log("change Artifact")
try{
  set_disabled(true);
  const res = await  axios.put(`${backEndURL}/tools/enable-disable-artifact`, {
    params: {
     artifact_id: Info.artifact_id ,
     set_enable_disable_to: !Info.isActive,
    }
  });

  if(res.data){
    const index = all_artifacts.findIndex(art => art.artifact_id === Info.artifact_id);
    if (index !== -1) {
      const updatedARTS = [...all_artifacts];
      updatedARTS[index] = { ...updatedARTS[index], artifact_id: Info.artifact_id, isActive: !Info.isActive };
      // Set the state with the updated array
      set_all_artifacts(updatedARTS);
      set_disabled(false);
    }
  

    }

 
     }catch(err){set_disabled(false);console.log(err);}
    }

 /// enable disable for module 
 if(!Info?.artifact_id  && Info?.tool_id ) {
  console.log("its MODULE");
  try{
    set_disabled(true);
    const res = await
    axios.put(`${backEndURL}/tools/enable-disable-module`, {
      params: {
       module_id: Info?.tool_id  ,
       set_enable_disable_to: !Info?.isActive,
      }
    });
  
  
    if(res.data){
    const index = all_Tools.findIndex(tool => tool.tool_id === Info?.tool_id );
    if (index !== -1) {
      // Create a new copy of the all_Tools array
      const updatedTools = [...all_Tools];
      // Update the specific tool
      updatedTools[index] = { ...updatedTools[index], tool_id: Info?.tool_id , isActive: !Info?.isActive };
      // Set the state with the updated array
      set_all_Tools(updatedTools);
      set_disabled(false);
    }
  
   
  
    }
  
       }catch(err){set_disabled(false);console.log(err);}




}



    
  }
  
  useEffect(() => { set_popUp_show(popUp_show)}, [popUp_show]);

  useEffect(() => { const url =   all_Tools.filter(item => (item.tool_id === "2000000" ))[0]?.toolURL; if (url === undefined){return} set_toolURL(url)}, [ all_Tools]);


  return (

    <>
<PopUp_All_Good
    set_popUp_show={set_popUp_all_good____show}
    popUp_show={popUp_all_good____show}
    HeadLine={popUp_all_good____txt.HeadLine}
    buttonTitle={popUp_all_good____txt.buttonTitle}
    paragraph={popUp_all_good____txt.paragraph}
/>


<PopUp_For_Read_More
    HeadLine={popUp_headline}
    readMoreText={popUp_ReadMoreText}
    logoAddress_1_ForSrc={popUp_logoAddress_1}
    // toolURL={toolURL}
    buttonTitle={popUp_btnTitle}
    IconAddressForSrc={popUp_iconAddress}
    set_popUp_show={set_popUp_show}
    popUp_show={popUp_show}
    popUp_iconSize={popUp_iconSize}
/>
 

 <div className=' all-tools-main' > 
{/* ---------------------left-box----------------------------- */}
<div className='all-tools-left-side  ' style={{width:"440px"}}  >


{/* top left / */}
<div style={{ display:"flex",alignItems:"center", justifyContent:"center"}} >
{box_type === "velociraptor" &&     <>
<p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
<img src={ logoAddress ? require(`${ logoAddress}`) : undefined} alt="velociraptor" maxwidth="180" height="28" position='relative'    /> 
</>}
</div>


{/*  center  */}
<div className='display-flex flex-direction-column  ' >
{/*  icon  */}
<img src={ iconAddress ? require(`${ iconAddress}`) : undefined} alt="Icon" width="100%" height="80" className='mb-a'   /> 
   
{/*  text  */}
    <p className='text-center     font-type-h4 Color-White mb-a'  style={{maxWidth:"350px"}} >{main_headline}</p>
    <p className='text-center   font-type-txt Color-White  mb-a'    style={{maxWidth:"250px"}}>{main_subtitle}</p>
    <button className="btn-type3 "    onClick={()=>handleReadMore(main_headline, main_read_more  , logoAddress ,"Close"  ,iconAddress ,"Big" )} ><p className=' font-type-txt' >Read More</p><IconReadMore className="icon-type1 " />  </button>
 
    </div>

{/* /////////////// button //////////// */}
<div className='PreviewBox_ButtomLine' ><IconLastRun /><div className='font-type-very-sml-txt Color-Grey1' >{lastrun}</div></div>
 
    </div>


{/* -----------------------right-box------------------------ */}
  <div className='velociraptor-right-side display-flex  flex-direction-column' > 
  <div className=' display-flex  justify-content-space-between' style={{width:"100%", height:"24px"}} >
  <div style={{width:"1px" }}/> 
  <div className={`${StatusColorClass}  light-bulb-type1`} />
</div>

 
 
{/* <div className='Bg-Grey2' style={{width:"100%", height:"2px" ,borderRadius:"5px"}}/> */}

<div className='all-tools-right-side'  >
 
<table className='all-tools-table'  style={{ margin:0 , padding:0, border:0}}       >
                  {/* <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--color-Grey5)', zIndex: 1  }}>
                    <tr  style={{ textAlign: 'left' ,height:"30px"}}>
                      <th className='font-type-menu Color-Grey1' style={{}}>{list_array_column1?.previewName}</th>
                    </tr>
                  </thead> */}
                  <tbody      style={{ margin:0 , padding:0, border:0}}>
             
             

          {!is_filtering && preview_list.length === 0 && all_Tools.length > 0   && all_artifacts.length > 0 &&
  <div style={{textAlign:"center"}}>
  <p className='font-type-txt  Color-Grey1   cutLongLine'  >It seems that all Modules are hidden in the UI. To change:</p> 
  <p className='font-type-txt  Color-Grey1   cutLongLine'  >Click <span className='font-type-menu Color-White'>Settings</span> in the side menu</p> 
  <p className='font-type-txt  Color-Grey1   cutLongLine'  >Choose <span className='font-type-menu Color-White'>UI Stings</span> from the top menu</p> 
  <p className='font-type-txt  Color-Grey1   cutLongLine'  >Check the boxes to set UI display</p> 
</div>
 }

{is_filtering && preview_list.length === 0 && all_Tools.length > 0   && all_artifacts.length > 0 &&
  <div style={{textAlign:"center"}}>
 
  <p className='font-type-txt  Color-Grey1   cutLongLine'  >There are no results for this filter</p> 
 
</div>
 }





{Array.isArray(preview_list) &&  preview_list?.map((Info, index) =>(
 
<>

<tr key={index} className='all-tools-line'  >


<td style={{ visibility: Info?.toolType === "link" && "hidden"}}>
<label className={ `container   ${ Info?.toolType === "link" && "containeroff"}`} style={{marginTop:"-11px"}} >
<input type="checkbox" 
checked={Info?.isActive}
disabled={disabled || Info?.toolType === "link"}
 value={Info?.artifact_id}
 onChange={ ()=> edit_checked_artifacts( Info) }
  />
<span className="checkmark"></span>
</label>
</td>



{/* 
<td style={{ visibility: Info?.toolType === "link" && "hidden"}}>
<div style={{display:"flex"}}>
    <label className="switch"><input type="checkbox" 
checked={Info?.isActive}
disabled={disabled || Info?.toolType === "link"}
 onClick={() => edit_checked_artifacts(Info)} 
 /> <span className="slider round"></span></label> 
</div>

 </td> */}












<td className='' ><div style={{display:"flex", alignItems:"center" }}>{/* <p className='font-type-very-sml-txt   Color-Grey1 mr-a'>By:</p> */}<img className='logo-cell  ' style={{ width:"108px"   , height:"100%" , maxHeight:"40px" ,marginRight:"20px",marginLeft:"8px"}} src={Info?.logoAddress_1 ? require(`${Info.logoAddress_1}`) : undefined}></img></div></td>

<td  style={{width:"24%"}} ><p className='font-type-menu  Color-White  cutLongLine' >{Info?.headline}</p></td>
<td style={{width:"auto"}} > <p className='font-type-txt   Color-Grey1   cutLongLine'  >{box_type === "modules" && Info?.description_short}{box_type === "velociraptor" && Info?.description}</p></td>

<td>
  <button  className="btn-type3"  
onClick={() => {
  let descriptionText;
  if (box_type === "velociraptor") {
    descriptionText = Info?.readMoreText;
  } else if (box_type === "module" || box_type === "link") {
    descriptionText = Info?.description_long;
  } else {
    descriptionText = Info?.description_long;
  }
  handleReadMore( Info?.headline, descriptionText ,  Info?.logoAddress_1,"Close", null, "Small"  )}}
  ><p className='font-type-txt' style={{   whiteSpace: 'nowrap' }}>Read More</p><IconReadMore className="icon-type1" style={{ width: 20, height: 20    }} /></button>
  </td> 

<td  style={{visibility: box_type ==="velociraptor" && "hidden"}}>
 
    <button className={`btn-type2 ${ Info?.toolURL === ""  &&   "btn-type2-no_btn" }`}    
     onClick={()=>handle_Main_Btn( Info?.toolURL  )}
     style={{
      width:"100%",
      minWidth:"115px",
      paddingLeft:"var(--space-c)",
      paddingRight:"calc(var(--space-c) - 5px)",
      disabled:Info?.toolURL === ""
      // paddingRight: Info?.toolType !== undefined && 
      // Info?.toolType !== "" && 
      // Info?.toolType !== null 
      //   ? "calc(var(--space-d) - 5px)"
      // : undefined 
     }} 
     >

<div style={{display:"flex", alignItems:"center" ,  justifyContent:"center" }}>
 <p className='font-type-menu' style={{}}>{Info?.buttonTitle}</p>
{ Info?.toolType === "link" && <IcoLink     style={{height:"var(--space-c)" ,width:"var(--space-c)" ,marginLeft:"4px"  }}/>}
{ Info?.toolType === "module" && <IcoModule style={{height:"var(--space-c)" ,width:"var(--space-c)"  ,marginLeft:"3px"}} />}
</div>  
    </button> 
 
</td>


<td className='' ><div style={{display:"flex", alignItems:"center", }}>{/* <IconLastRun /> */}<p className='font-type-very-sml-txt Color-Grey1' >{lastrun}</p></div></td>





<td><button  className= { `${ box_type ===     "velociraptor"  ?   "btn-type5 btn-type5-no-hover"   :  'btn-type5'}`} 
// disabled={ box_type ===     "velociraptor" }
  onClick={() => ShowInUi(Info)}
  > <IcoKey className="icon-type1 " 
 /></button></td> 


<td >
  <div style={{display:"flex" , flexDirection:"column"  , alignItems:"center" , justifyContent:"center"  }}>
  <button  className="btn-type5" onClick={()=>change_order(Info,-1)}><p className='font-type-menu'  style={{height:"15px" }}>+</p> </button>
  <button  className="btn-type5" onClick={()=>change_order(Info,+1)}><p className='font-type-menu'  style={{ height:"15px"}}>-</p> </button>
  </div>
  </td> 


</tr>   

</>

           ))}

          </tbody>
                </table>

 

</div>


{/* <div className='Bg-Grey2' style={{width:"100%", height:"2px" ,borderRadius:"5px"}}/> */}
 



{/* buttom buttons */}
{box_type === "velociraptor" ? 
  <div className='display-flex justify-content-end mb-b' style={{ width:"100%"}}>

{checked_artifacts2?.length === 0 ? (
  <p className='ml-a font-type-txt  Color-Red mr-b'>Choose at least 1 Artifact</p>):
(<>
 
 <p className='ml-a font-type-txt  Color-Grey1 mr-b'><b> </b>Agent required</p></>
)}

<div className=' '>
<button className="btn-type2" onClick={()=>handle_Main_Btn(toolURL)}>
      <p className='font-type-menu'>Site</p>
    </button>
    </div>


</div>
:
<div   className='spacer_for_flex_box'/>  


}
 
   </div>

    </div>  
    

 


    </>

  )
}

export { 
  // PreviewBox_velociraptor2,
  PreviewBoxes_main_modules};



// const handle_click_velociraptor= async()=>{
// //  window.open( toolURL , '_blank');
//   try{
//       const res = await
//       axios.get(`${backEndURL}/tools/active-velociraptor-artifact`, {
//         params: {
//           checked_artifacts:  checked_artifacts2 ,
//           resource_list: JSON.stringify(['test_0000001', 'test_0000002' ])
//         }
//       });
  
//       set_popUp_all_good____txt({  HeadLine:"Beginning of data processing",paragraph:"This process may take several minutes. The information will be displayed on the 'Results' section." ,buttonTitle:"Ok"})
//       set_popUp_all_good____show(true)
//       if(res.data){
//         console.log("res.data 44444444444444", res.data);

//       }
  
//          }catch(err)
//          {console.log(err);}
//   }
