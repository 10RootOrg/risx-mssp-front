import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_type_module} from '../PreviewBoxes.js'
import { PreviewBox_velociraptor} from '../PreviewBox_main_velociraptor.js'
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import Search_comp from '../Features/Search_comp.jsx'
 
// import jsonData from '../../tmpjsons/previewBoxesTools.json';  
import GeneralContext from '../../Context.js';
import axios from 'axios';

import { ReactComponent as IcoModule } from '../icons/ico-module.svg';
import { ReactComponent as IcoLink } from '../icons/ico-link.svg';
import { ReactComponent as IcoResults } from '../icons/ico-menu-Results.svg';
import { useNavigate } from 'react-router-dom';


function Modules({show_SideBar,set_show_SideBar,notification_number,set_visblePage}) {
    set_visblePage("Modules");
    const { all_Tools ,  backEndURL , set_all_artifacts,moduleLinks,set_moduleLinks} = useContext(GeneralContext);
    const [show_only_this_tools, set_show_only_this_tools] = useState([]) 
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
               
                console.log("get_all_artifacts res.data:" , res.data);
          
         set_all_artifacts(res.data)
        }}
        catch(err){
            // set_loader(false)
            console.log(err);}
 
    }
     
    get_all_artifacts();  }, [backEndURL]);
    

  useEffect(() => { if (show_SideBar === false) {set_show_SideBar(true)}}, []);

  useEffect(() => {
    if(all_Tools.length === undefined   &&  typeof all_Tools === "string"){return}

    set_show_only_this_tools(all_Tools)}, [all_Tools]);


//      useEffect(() => {

 
//  console.log(typeof all_Tools , "all_Tools  " , all_Tools) 


      
    return (
 
<>
<div className='app-main' >
<div className='top-of-page'> 

<div className='top-of-page-left mb-b'>
<p  className="font-type-menu" >Monitoring:</p>
<p  className="font-type-h3" >Dashboard</p>
</div>
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>
 

 <div className='top-of-page-right'>
<Search_comp set_items_for_search={set_show_only_this_tools}    items_for_search={show_only_this_tools} />
{/* <input className="input-type1 mr-a" placeholder="Search" />
<button className="btn-type1 "><IconSearch className="icon-type1" />  </button> */}
</div>


</div>

 


<div className="display-flex mb-b mt-b"><IcoModule style={{  }}/><p  className="font-type-menu Color-White ml-a " >Artifact collectors</p></div>


{/* <div className='PreviewBox PreviewBoxLine   ' style={{marginBottom:"var(--space-c)"}} > 
<div className="display-flex"><IcoModule style={{  }}/><p  className="font-type-menu Color-White ml-a " >Modules</p></div>
</div> */}




<div className='resource-group-top-boxes mb-c' >




<PreviewBox_velociraptor />
 
  {/* modules */}
{show_only_this_tools.length != undefined   &&  typeof show_only_this_tools != "string" && ( <>
    {Array.isArray(show_only_this_tools) && show_only_this_tools?.map((Info, index) =>(
<>
{Info?.toolType === "module"   &&  Info?.tool_id != "2000000" &&  Info?.ShowInUi &&     
 
<PreviewBox_type_module
 Info={Info}
iconAddress={Info?.iconAddress}
tool_id={Info?.tool_id}
HeadLine={Info?.headline}
description={Info?.description_short}
Toolname={Info?.Tool_name}
StatusColor={Info?.Status}
date={"14-04-2024"}
logoAddress_1={Info?.logoAddress_1}
logoAddress_2={Info?.logoAddress_2}
readMoreText={Info?.description_long}
buttonTitle={Info?.buttonTitle}
toolURL={Info?.toolURL}

all_Tools={all_Tools}
 
 backEndURL={backEndURL}
 notification_number={notification_number}
            />   }
 
     </>   ))}
</>)}

 












 
</div>


{show_only_this_tools?.map((Info) => (Info.toolType === "link"))?.length != 0 && 
<div className="display-flex mb-b  "><IcoLink style={{ }}/><p  className="font-type-menu ml-a" >Modules</p></div>
}

<div className='resource-group-top-boxes mb-c' >


 



 {/* Tools_a */}
{show_only_this_tools.length != undefined   &&  typeof show_only_this_tools != "string" && ( <>
    {Array.isArray(show_only_this_tools) && show_only_this_tools?.map((Info, index) =>(
<>
{Info?.toolType === "link" && Info?.BoxType === "Tools_a"  &&  Info?.ShowInUi &&     
  
<PreviewBox_type_module
 Info={Info}
iconAddress={Info?.iconAddress}
tool_id={Info?.tool_id}
HeadLine={Info?.headline}
description={Info?.description_short}
Toolname={Info?.Tool_name}
StatusColor={Info?.Status}
date={"14-04-2024"}
logoAddress_1={Info?.logoAddress_1}
logoAddress_2={Info?.logoAddress_2}
readMoreText={Info?.description_long}
buttonTitle={Info?.buttonTitle}
toolURL={Info?.toolURL}
all_Tools={all_Tools}
 backEndURL={backEndURL}
            />   }
 
     </>   ))}
</>)}


{/* Tools_b */}
{show_only_this_tools.length != undefined   &&  typeof show_only_this_tools != "string" && ( <>
    {Array.isArray(show_only_this_tools) && show_only_this_tools?.map((Info, index) =>(
<>
{Info?.toolType === "link" && Info?.BoxType === "Tools_b"  &&  Info?.ShowInUi &&        
  
<PreviewBox_type_module
// show_tool_PreviewBoxs_type_a_b={show_tool_PreviewBoxs_type_a_b}
tool_id={Info?.tool_id}
Info={Info}
 
HeadLine={Info?.headline}
description={Info?.description_short}
Toolname={Info?.Tool_name}
StatusColor={Info?.Status}
date={ "12/04/24"}
 
logoAddress_1={Info?.logoAddress_1}
logoAddress_2={Info?.logoAddress_2}
 
readMoreText={Info?.description_long}
buttonTitle={Info?.buttonTitle}
toolURL={Info?.toolURL}

all_Tools={all_Tools}

 
 backEndURL={backEndURL}
 notification_number={notification_number}
            />   }

     </>      

           
           ))}   
</>)}













 
</div>


 {show_only_this_tools?.length > 4    &&   
<button className="btn-type4 mb-a"  onClick={()=>  navigate(`/${"results"}`)}><p className='font-type-menu ' >Watch Results</p><IcoResults className="icon-type1 " />  </button>
 }
</div>

 
</>


    );
  }
  
  export default Modules;

