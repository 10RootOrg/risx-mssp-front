import React , {useState , useEffect , useContext} from 'react';
import { ReactComponent as IconLastRun } from './icons/ico-lastrun.svg';
import { ReactComponent as IconReadMore } from './icons/ico-readmore.svg';
import { ReactComponent as IcoKey } from './icons/ico-eye.svg';
import { ReactComponent as IcoModule } from './icons/ico-module-nonedge-blue.svg';
import { ReactComponent as IcoLink } from './icons/ico-link-nonedge-blue.svg';

import { PopUp_For_Read_More ,} from "./PopUp_Smart.js";

import {  fix_path} from "../Components/Dashboards/functions_for_dashboards";

import { format_date_type_a } from '../Components/Features/DateFormat';
import GeneralContext from '../Context';

import axios from 'axios';
import './PreviewBoxes.css';
 
const time = new Date()
const format_date = format_date_type_a(time);
 
 
 

const handle_Main_Btn =async (tool_id,toolURL,backEndURL,front_IP,front_URL)=>{



  // if ( link.includes("${FRONT_IP}")){ const realURl = link.replace("${FRONT_IP}", front_IP);
  //   window.open(  realURl , '_blank');
  //  ;   return }
  
  //  else if ( link.includes("${FRONT_URL}")){ const realURl = link.replace("${FRONT_URL}", front_URL);
  //   window.open(  realURl , '_blank');
  //  ;   return }
  
  
  //  else  { window.open(  link   , '_blank');;   return } 
  


console.log("handle_Main_Btn toolURL" , toolURL);


const fixed_path = fix_path(toolURL, front_IP, front_URL);

if (fixed_path && tool_id !== "2001009") {
  window.open(fixed_path, "_blank");
} else {
  // Get leakCheck api data
  // Work in progress 

  const data = await axios.get(`${backEndURL}/config/GetAllLeakAsset`);
  console.log("LeakCheck url ", toolURL + data.data.join(","));
  // const res = await axios.get(`${backEndURL}/config`);
  // console.log(
  //   res?.data?.ClientData?.API?.LeakCheck,
  //   "44444444444444444444444444444444"
  // );

  // console.log("gggggggggggggggg",LeakJson);
}





// if(  toolURL.includes("${FRONT_IP}")){
//   const realURl = toolURL.replace("${FRONT_IP}", front_IP);  openInNewTab(realURl)
// }

// else if(  toolURL.includes("${FRONT_URL}")){
//   const realURl = toolURL.replace("${FRONT_URL}", front_URL);  openInNewTab(realURl)
// }



// else{
 
//   openInNewTab(toolURL)
// }



    // console.log("moduleLinks" , moduleLinks);




    // if (tool_id === '2001005') {
        // set_Show_PopUp_before_active_module_id(tool_id)
      // Handle_active_module(tool_id,backEndURL)
    // }
  //  else if (tool_id ===  '2001009') { set_Show_PopUp_tool___Dehashed(true)  }
    // else { }
    


    
     
  }

 
function PreviewBox_main_modules({ Info,  HeadLine,description,  logoAddress_1,logoAddress_2,  readMoreText,buttonTitle,iconAddress,toolURL , tool_id ,all_Tools , backEndURL ,width}) {    
  const {  set_all_Tools  ,front_IP , front_URL} = useContext(GeneralContext);
 
  const [logoAddress_1_ForSrc, set_logoAddress_1_ForSrc] = useState("")
  const [logoAddress_2_ForSrc, set_logoAddress_2_ForSrc] = useState("")
  const [IconAddressForSrc, set_IconAddressForSrc] = useState("")
  const [popUp_show, set_popUp_show] = useState(false);
  const [last_response, set_last_response] = useState(0)
  const [disabled, set_disabled] = useState(false)
  const [StatusColorClass, set_StatusColorClass] = useState("Bg-Grey2")
 
 
  const handleReadMore = () =>{
    set_popUp_show(true);
  }

 
async function  ShowInUi (Info){

  try{
    // set_disable_ShowInUi_btn(true);
    const res = await
    axios.put(`${backEndURL}/tools/show-in-ui`,  {
      params: {
       module_id: tool_id ,
       set_ShowInUi_to: !Info?.ShowInUi,
      }
    });
    if(res.data){
      // set_disable_ShowInUi_btn(false);
    const index = all_Tools.findIndex(tool => tool.tool_id === tool_id);
    if (index !== -1) {
      // Create a new copy of the all_Tools array
      const updatedTools = [...all_Tools];
      // Update the specific tool
      updatedTools[index] = { ...updatedTools[index], tool_id: tool_id, ShowInUi: !Info?.ShowInUi };
      // Set the state with the updated array
      set_all_Tools(updatedTools);
   
    }
  
   
  
    }
  
       }catch(err){
        // set_disable_ShowInUi_btn(false);
        console.log(err);}
   }
 
   async function  enable_disable_module(Info){
    console.log("enable_disable_module", !Info?.isActive);
     
    
    try{
      set_disabled(true);
      const res = await
      axios.put(`${backEndURL}/tools/enable-disable-module`, {
        params: {
         module_id: tool_id ,
         set_enable_disable_to: !Info?.isActive,
        }
      });
    
    
      if(res.data){
      const index = all_Tools.findIndex(tool => tool.tool_id === tool_id);
      if (index !== -1) {
        // Create a new copy of the all_Tools array
        const updatedTools = [...all_Tools];
        // Update the specific tool
        updatedTools[index] = { ...updatedTools[index], tool_id: tool_id, isActive: !Info?.isActive };
        // Set the state with the updated array
        set_all_Tools(updatedTools);
        set_disabled(false);
      }
    
     
    
      }
    
         }catch(err){set_disabled(false);console.log(err);}
 
    
     }


  useEffect(() => {
    if (logoAddress_1 !== "" &&  logoAddress_1 !== null &&  logoAddress_1 !== undefined ) {
 
     const  Src = require( `${logoAddress_1}`)
      set_logoAddress_1_ForSrc(Src)
    }
    if (logoAddress_2 !== "" &&  logoAddress_2 !== null &&  logoAddress_2 !== undefined ) {
   
     const  Src = require( `${logoAddress_2}`)
      set_logoAddress_2_ForSrc(Src)
    }
    if (iconAddress !== "" &&  iconAddress !== null &&  iconAddress !== undefined ) {
   
     const  Src = require( `${iconAddress}`)
     set_IconAddressForSrc(Src)
    }

    }, []);


 
  return (

<>

<PopUp_For_Read_More
        HeadLine={HeadLine}
        readMoreText={readMoreText}
        logoAddress_1_ForSrc={logoAddress_1_ForSrc}
        toolURL={toolURL}
        buttonTitle={buttonTitle}
        set_popUp_show={set_popUp_show}
        popUp_show={popUp_show}
        IconAddressForSrc={IconAddressForSrc}
      />
{/* ////////////////////////////////////////////////////////////////////////////////////////// */}
    <div className='PreviewBox PreviewBox-of-tools  '
    style={{
      flexGrow:1,
      width:width,
     }}
    > 

    <div className='PreviewBox_HeadLine' >
{Info?.toolType === "module" ?  
    <label className="switch"><input type="checkbox" 
checked={Info?.isActive}
disabled={disabled}
 onClick={() => enable_disable_module(Info)} 
//  onChange={console.log(Info) }
 /> <span className="slider round"></span></label> 
 
 : <div></div>
}



{Info.BoxType === "Tools_a" &&  <>




 {/* ///////////// 1 or 2 logos /////////////// */}


 {logoAddress_2_ForSrc !== "" ? (
     <div className='display-flex     mr-a ml-a' style={{  }}>
 
     <img src={logoAddress_1_ForSrc} alt="logo"   className='responsive-logos-type_a'  />
     <p  className="font-type-very-sml-txt   Color-Grey1 mr-a ml-a" >&</p>
     <img src={logoAddress_2_ForSrc} alt="logo"     className='responsive-logos-type_a'  />
     </div>
    ):(

      
      <div className='display-flex '
       style={{marginRight:Info?.toolType === "module" ? "14px" : "-12px"}}
       >
        
      <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
      <img src={logoAddress_1_ForSrc} alt="logo" maxwidth="140" height="20"  />
      </div>
    )  }

</>}

  <div className={`${StatusColorClass}  light-bulb-type1`}/></div>







    <div className='display-flex justify-content-center align-items-center flex-direction-column'  > 
  {Info.BoxType === "Tools_a" ? (
    <>
    <img src={IconAddressForSrc} alt="Icon" width="70" height="70" className='mb-a' />
    <p className='text-center     font-type-h4 Color-White mb-a'  style={{maxwidth:"350px"}} >{HeadLine}</p>
    <p className='text-center   font-type-txt Color-White  mb-a '    style={{maxwidth:"250px"}}>{description}</p>
   </>


  ):(
<>
<div className='display-flex justify-content-center align-items-center flex-direction-column'  > 

<p className='text-center     font-type-h4 Color-White  '  style={{maxwidth:"350px"}} >{HeadLine}</p>
  <p className='text-center   font-type-txt Color-White  mb-a cutLongParagraph'    style={{maxwidth:"250px"}}>{description}</p>

{logoAddress_2_ForSrc !== "" ? (
   <div className='display-flex mb-b' style={{  }}>
    
   {/* <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p> */}
   <img src={logoAddress_1_ForSrc} alt="logo"   className='responsive-logos-type_b'  />
   <p  className="font-type-very-sml-txt   Color-Grey1 mr-a ml-a" >&</p>
   <img src={logoAddress_2_ForSrc} alt="logo"     className='responsive-logos-type_b'  />
   </div>
  ):(
    <div className='display-flex mb-b' style={{marginRight:"5px"  }}>
    <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
    <img src={logoAddress_1_ForSrc} alt="logo" maxwidth="140px" height="30"  />
    </div>
  )  }


</div>

</>
  )}     




{/* IcoLink IcoModule */}

    <button className="btn-type3 mb-c" onClick={()=>handleReadMore()}><p className=' font-type-txt'>Read More</p><IconReadMore className="icon-type1 "  />  </button>


   { tool_id !="2001005" &&
    <button className="btn-type2" onClick={()=>handle_Main_Btn(tool_id,toolURL,backEndURL,front_IP,front_URL )}
    
     style={{
      paddingRight: Info?.toolType !== undefined && 
      Info?.toolType !== "" && 
      Info?.toolType !== null 
        ? "calc(var(--space-d) - 5px)"
      : undefined 
     }}
     
     
     >
    <div style={{display:"flex", alignItems:"center"  }}>

   
    <p className='font-type-menu'>{buttonTitle}</p>


    {/* { Info?.toolType === "link" && <IcoLink     style={{height:"var(--space-c)" ,width:"var(--space-c)" ,marginLeft:"3px"}}/>} */}

 
{ Info?.toolType === "link" && <IcoLink     style={{height:"var(--space-c)" ,width:"var(--space-c)" ,marginLeft:"4px"  }}/>}
{ Info?.toolType === "module" && <IcoModule style={{height:"var(--space-c)" ,width:"var(--space-c)"  ,marginLeft:"3px"}} />}
  
 
    </div>  
    </button> 
}
   
    </div>




    <div className='PreviewBox_ButtomLine' >
     <IconLastRun />
     <div className='font-type-very-sml-txt Color-Grey1' style={{marginRight:"auto"}}>{last_response == 0 ? (format_date):(format_date_type_a(last_response))}   </div>
     <button className="btn-type4"   tool_id={Info?.tool_id}      onClick={() => ShowInUi(Info)} ><p className=' font-type-txt'></p><IcoKey className="icon-type1"/></button>



   </div> {/*dont delete */}
     
    </div>
</>


  )
}




 
export { PreviewBox_main_modules  };