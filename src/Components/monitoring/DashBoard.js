import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_type_module} from '../PreviewBoxes.js'
import { PreviewBox_velociraptor} from '../PreviewBox_main_velociraptor.js'
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
// import jsonData from '../../tmpjsons/previewBoxesTools.json';  
import GeneralContext from '../../Context.js';
import axios from 'axios';


import { ReactComponent as IcoModule } from '../icons/ico-module.svg';
import { ReactComponent as IcoLink } from '../icons/ico-link.svg';
import { ReactComponent as IcoResults } from '../icons/ico-menu-Results.svg';
import { useNavigate } from 'react-router-dom';

function DashBoard({show_SideBar,set_show_SideBar,notification_number,set_visblePage}) {
    set_visblePage("Dashboard");
    const { all_Tools ,  backEndURL , set_all_artifacts,moduleLinks,set_moduleLinks} = useContext(GeneralContext);
    const [show_tool_PreviewBoxs_type_a_b, set_show_tool_PreviewBoxs_type_a_b] = useState(true)


    const [show_only_this_tools, set_show_only_this_tools] = useState([]) 
    const [dont_show_this_tools2, set_dont_show_this_tools2] = useState([]) 
    const navigate = useNavigate();



    useEffect(() => { 
        if (backEndURL == null || backEndURL == undefined || backEndURL == ""){return}
        const get_all_artifacts = async()=>{ 
        try{
    console.log( "backEndURL:::" , backEndURL);
            // set_loader(true)
            const res = await axios.get(`${backEndURL}/tools/all-velociraptor_artifacts`);
            if (res){
               
                console.log("get_all_artifacts res.data:" , res.data);
                console.log("get_all_artifacts res :" , res );
         set_all_artifacts(res.data)
        }}
        catch(err){
            // set_loader(false)
            console.log(err);}
 
    }
     
    get_all_artifacts();  }, [backEndURL]);
    

 


  useEffect(() => { if (show_SideBar === false) {set_show_SideBar(true)}}, []);




     useEffect(() => {


////////////// make arry of tool ids////
const item_arrary =[]
if (all_Tools.length !== undefined){

    for (let x of all_Tools) {
        item_arrary.push(x.tool_id)
      }
//    set_all_tool_ids_array(item_arrary)
   set_show_only_this_tools(item_arrary)

}
            }, [all_Tools ]);
    

            console.log(typeof all_Tools , "all_Tools  " , all_Tools) 


      
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
<input className="input-type1 mr-a" placeholder="Search" />
<button className="btn-type1 "><IconSearch className="icon-type1" />  </button>
</div>


</div>

 


<div className="display-flex mb-b mt-b"><IcoModule style={{  }}/><p  className="font-type-menu Color-White ml-a " >Modules:</p></div>

<div className='resource-group-top-boxes mb-c' >




<PreviewBox_velociraptor />
 
  {/* modules */}
{all_Tools.length !== undefined   &&  typeof all_Tools !== "string" && ( <>
    {Array.isArray(all_Tools) && all_Tools?.map((Info, index) =>(
<>
{Info?.toolType === "module"   &&  Info?.tool_id !== "2000000" &&  Info?.ShowInUi &&     
   show_only_this_tools.includes(Info?.tool_id)  ? 
   (  
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

show_only_this_tools={show_only_this_tools}
 set_show_only_this_tools={set_show_only_this_tools}

//  dont_show_this_tools={dont_show_this_tools}
//  set_dont_show_this_tools={set_dont_show_this_tools}

 dont_show_this_tools2={dont_show_this_tools2}
 set_dont_show_this_tools2={set_dont_show_this_tools2}
 backEndURL={backEndURL}
 notification_number={notification_number}
            />  ) : null }
 
     </>   ))}
</>)}

 












 
</div>

<div className="display-flex mb-b  "><IcoLink style={{ }}/><p  className="font-type-menu ml-a" >Linkes:</p></div>
 
<div className='resource-group-top-boxes mb-c' >


 



 {/* Tools_a */}
{all_Tools.length !== undefined   &&  typeof all_Tools !== "string" && ( <>
    {Array.isArray(all_Tools) && all_Tools?.map((Info, index) =>(
<>
{Info?.toolType === "link" && Info?.BoxType === "Tools_a"   &&  Info?.tool_id !== "2000000" &&  Info?.ShowInUi &&     
   show_only_this_tools.includes(Info?.tool_id)  ? 
   (  
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
            />  ) : null }
 
     </>   ))}
</>)}


{/* Tools_b */}
{all_Tools.length !== undefined   &&  typeof all_Tools !== "string" &&( <>
 {Array.isArray(all_Tools) &&  all_Tools?.map((Info, index) =>(
<>
{Info?.toolType === "link" && Info?.BoxType === "Tools_b"   &&  Info?.tool_id !== "2000000" &&   Info?.ShowInUi &&         
   show_only_this_tools.includes(Info?.tool_id)  ? 
   (  
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

// show_only_this_tools={show_only_this_tools}
//  set_show_only_this_tools={set_show_only_this_tools}

//  dont_show_this_tools={dont_show_this_tools}
//  set_dont_show_this_tools={set_dont_show_this_tools}

//  dont_show_this_tools2={dont_show_this_tools2}
//  set_dont_show_this_tools2={set_dont_show_this_tools2}
 backEndURL={backEndURL}
 notification_number={notification_number}
            />  ) : null }

     </>      

           
           ))}   
</>)}













 
</div>



<button className="btn-type4 mb-a"  onClick={()=>  navigate(`/${"results"}`)}><p className='font-type-menu ' >Watch Results</p><IcoResults className="icon-type1 " />  </button>

</div>

 
</>


    );
  }
  
  export default DashBoard;

