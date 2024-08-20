import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_type_module} from '../PreviewBoxes.js'
import { PreviewBox_velociraptor} from '../PreviewBox_main_velociraptor.js'
import { PreviewBox_velociraptor2,PreviewBoxes_main_modules2} from '../PreviewBox_main_velociraptor2.js'
import { ReactComponent as IcoACtiveBlue } from "../icons/ico-menu-active-blue.svg";



import Search_comp from '../Features/Search_comp.jsx'
 
// import jsonData from '../../tmpjsons/previewBoxesTools.json';  
import GeneralContext from '../../Context.js';
import axios from 'axios';

import { ReactComponent as IcoModule } from '../icons/ico-module.svg';
import { ReactComponent as IcoLink } from '../icons/ico-link.svg';
import { ReactComponent as IcoResults } from '../icons/ico-menu-Results.svg';
import { useNavigate } from 'react-router-dom';


function Modules({show_SideBar,set_show_SideBar,unseen_alert_number,set_visblePage}) {
    set_visblePage("Modules");
    const { all_Tools ,set_all_Tools,  backEndURL , set_all_artifacts   ,all_artifacts,moduleLinks,set_moduleLinks} = useContext(GeneralContext);
    const [all_artifacts_and_modules, set_all_artifacts_and_modules] = useState([]) 
    const [filter_string , set_filter_string] = useState("");
 



 



    const navigate = useNavigate();


  

    // get_all_artifacts
    useEffect(() => { 
        if (backEndURL == null || backEndURL == undefined || backEndURL == ""){return}
        const get_all_artifacts = async()=>{ 
        try{
    console.log( "backEndURL:::" , backEndURL);
            // set_loader(true)
            const res = await axios.get(`${backEndURL}/tools/all-velociraptor_artifacts`);
            if (res){
               
                // console.log("get_all_artifacts res.data:" , res.data);
          
         set_all_artifacts(res.data)
        }}
        catch(err){
            // set_loader(false)
            console.log(err);}
 
    }
     
    get_all_artifacts();  }, [backEndURL]);
    

  useEffect(() => { if (show_SideBar === false) {set_show_SideBar(true)}}, []);




//   useEffect(() => {
//     if(all_Tools.length === undefined   &&  typeof all_Tools === "string"){return}

//     set_all_artifacts_and_modules(all_Tools)}, [all_Tools]);


useEffect(() => {
    // Check if all_Tools is a valid array and all_artifacts is also valid
    if (Array.isArray(all_Tools) && all_Tools.length > 0 && Array.isArray(all_artifacts)  && all_artifacts.length > 0) {
// console.log("all_artifacts sssssssssssssssssssss",all_artifacts,all_Tools);

      set_all_artifacts_and_modules([...all_Tools, ...all_artifacts]);
    }
  }, [all_Tools, all_artifacts]);  // Include both as dependencies

 
//  console.log( "preview_list={all_artifacts_and_modules}" , all_artifacts_and_modules) 


      
    return (
 
<>
<div className='app-main' >
<div className='top-of-page'> 

{/* <div className='top-of-page-left mb-b'>
<p  className="font-type-menu" >Mssp:</p>
<p  className="font-type-h3" >Modules</p>
</div> */}
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>
 

 {/* <div className='top-of-page-right'>
<Search_comp set_items_for_search={set_all_artifacts_and_modules}    items_for_search={all_artifacts_and_modules} />
 </div> */}


</div>

 


<div className="display-flex mb-b mt-b"><IcoModule style={{  }}/>
<p  className="font-type-menu Color-White ml-a " style={{marginRight:"auto"}} >Artifact Collectors & Modules</p>
 
<Search_comp set_items_for_search={set_all_artifacts_and_modules}    items_for_search={all_artifacts_and_modules}  filter_string={filter_string}  set_filter_string={set_filter_string} />
 
</div>

{/* <div className='PreviewBox PreviewBoxLine   ' style={{marginBottom:"var(--space-c)"}} > 
<div className="display-flex"><IcoModule style={{  }}/><p  className="font-type-menu Color-White ml-a " >Modules</p></div>
</div> */}

<div className=' mb-c' style={{ display:"flex" , flexDirection:"column" , gap:"var(--space-c)"}}>

{ all_artifacts   && all_artifacts.length != undefined   &&  typeof all_artifacts != "string" && Array.isArray(all_artifacts) && 

<PreviewBoxes_main_modules2 
// preview_list={all_artifacts}
preview_list={all_artifacts_and_modules.filter(tool => (tool?.tool_id != "2000000"  &&   tool?.parent_id  === "2000000"   && tool?.ShowInUi === 1  )) }

 box_type={"velociraptor"}
 main_headline= "Endpoints Modules"
 main_subtitle="Select tools from the list and execute artifacts on endpoints"
main_read_more= "At the press of a (few) buttons, perform targeted collection of digital forensic evidence simultaneously across your endpoints, with speed and precision. Continuously collect endpoint events such as event logs, file modifications and process execution. Centrally store events indefinitely for historical review and analysis. Don't wait until an event occurs. Actively search for suspicious activities using our library of forensic artifacts, then customize to your specific threat hunting needs."
logoAddress="./Logos/Velociraptor.svg"
iconAddress="./icons/General-icons-g.svg"
lastrun="17/03/2024"
is_filtering={filter_string != ""}
all_artifacts_and_modules={all_artifacts_and_modules}
set_all_artifacts_and_modules={set_all_artifacts_and_modules}
 />
}

{ all_artifacts_and_modules   && all_artifacts_and_modules.length != undefined   &&  typeof all_artifacts_and_modules != "string" && Array.isArray(all_artifacts_and_modules) && 
<>
 
<PreviewBoxes_main_modules2
preview_list={all_artifacts_and_modules.filter(tool => (tool?.tool_id != "2000000"  &&    tool?.parent_id  != "2000000"  && tool?.toolType === "module"  && tool?.ShowInUi === 1  )) }
box_type={"modules"}
main_headline= "Additional Artifacts"
main_subtitle="Forensic timelines, vulnerability scans, device mapping & credential management"
main_read_more= "At the press of a (few) buttons, perform targeted collection of digital forensic evidence simultaneously across your endpoints, with speed and precision. Continuously collect endpoint events such as event logs, file modifications and process execution. Centrally store events indefinitely for historical review and analysis. Don't wait until an event occurs. Actively search for suspicious activities using our library of forensic artifacts, then customize to your specific threat hunting needs."
logoAddress="./Logos/Velociraptor.svg"
iconAddress="./icons/General-icons-k.svg"
lastrun="17/03/2024"
is_filtering={filter_string != ""}
all_artifacts_and_modules={all_artifacts_and_modules}
set_all_artifacts_and_modules={set_all_artifacts_and_modules}
/>
 
{/* {all_artifacts_and_modules?.map((Info) => (Info.toolType === "link"))?.length != 0 && 
<div className="display-flex mb-b  "><IcoLink style={{ }}/><p  className="font-type-menu ml-a" >Modules</p></div>
} */}
 
<PreviewBoxes_main_modules2
preview_list={all_artifacts_and_modules.filter(tool => (tool?.tool_id != "2000000"  &&    tool?.parent_id  != "2000000"   &&    tool?.toolType === "link"  && tool?.ShowInUi === 1  )) }
box_type={"modules"} 
main_headline= "Additional Modules"
main_subtitle="This suite offers AD security, artifact analysis, threat intelligence, OSINT, sandboxing, hash management, darknet monitoring, credential leak detection, and incident response capabilities"
main_read_more= "At the press of a (few) buttons, perform targeted collection of digital forensic evidence simultaneously across your endpoints, with speed and precision. Continuously collect endpoint events such as event logs, file modifications and process execution. Centrally store events indefinitely for historical review and analysis. Don't wait until an event occurs. Actively search for suspicious activities using our library of forensic artifacts, then customize to your specific threat hunting needs."
logoAddress="./Logos/Velociraptor.svg"
iconAddress="./icons/General-icons-j.svg"
lastrun="17/03/2024"
is_filtering={filter_string != ""}
all_artifacts_and_modules={all_artifacts_and_modules}
set_all_artifacts_and_modules={set_all_artifacts_and_modules}

/>
 
</>
}
 

</div>

 
 



{/* <button className="btn-type2 "
//  onClick={handle_active_manual_process}
    style={{
        marginLeft:"auto",
        marginBottom:"var(--space-a)"

    }}
    
    
    >
   <div style={{display:"flex", alignItems:"center"   }}> <IcoACtiveBlue     style={{}}/>
   <p className='font-type-menu'>Run Selected Jobs</p>
   </div>  
   </button>  */}


 {/* {all_artifacts_and_modules?.length > 4    &&   
<button className="btn-type4 mb-a"  onClick={()=>  navigate(`/${"dashboard-general"}`)}><p className='font-type-menu ' >Watch Results</p><IcoResults className="icon-type1 " />  </button>
 } */}
</div>

 
</>


    );
  }
  
  export default Modules;

