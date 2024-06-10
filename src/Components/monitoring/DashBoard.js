import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_Not_active_tools ,PreviewBox_type_module} from '../PreviewBoxes.js'
import { PreviewBox_velociraptor} from '../PreviewBox_main_velociraptor.js'
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
// import jsonData from '../../tmpjsons/previewBoxesTools.json';  
import GeneralContext from '../../Context.js';
import axios from 'axios';


function DashBoard({show_SideBar,set_show_SideBar,notification_number}) {

    const { all_Tools ,set_all_Tools , backEndURL , set_all_artifacts,moduleLinks} = useContext(GeneralContext);
    const [show_tool_PreviewBoxs_type_a_b, set_show_tool_PreviewBoxs_type_a_b] = useState(true)


    const [show_only_this_tools, set_show_only_this_tools] = useState([]) 
    const [dont_show_this_tools2, set_dont_show_this_tools2] = useState([]) 




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
    

useEffect(() => {
   if (backEndURL == null || backEndURL == undefined || backEndURL == ""){return}
   if(all_Tools.length  === undefined || all_Tools.length === 0  )
{
    const get_all_tools = async()=>{

  
        try{
            const res = await axios.get(`${backEndURL}/tools`);
            if (res){ 
                const all_tools_no_links =  res.data


                console.log("all_tools_no_links",all_tools_no_links);
                console.log("moduleLinks",moduleLinks);


all_tools_no_links.forEach(tool => {
for (let index = 0; index < moduleLinks.length; index++) {

    if ( moduleLinks[index]?.toolID === tool?.tool_id){

        tool.toolURL =  moduleLinks[index]?.toolURL
    }

    console.log("all_tools_no_links after add lionks" , all_tools_no_links);
}
});

                set_all_Tools(all_tools_no_links)   }}
            catch(err){console.log(err);}  }
  get_all_tools();      
                
}  }, [backEndURL]);




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
<p  className="font-type-h3" >DashBoard</p>
</div>
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>

 
<div className='top-of-page-right'>
<input className="input-type1 mr-a" placeholder="Search" />
<button className="btn-type1 "><IconSearch className="icon-type1" />  </button>
</div>


</div>

 
<div className='resource-group-top-boxes mb-c' >

<PreviewBox_velociraptor 
 
velociraptor_from_all_tools={all_Tools.filter(item => (item.tool_id === "2000000" ))}


/>
 
 
 {/* Tools_a */}
{all_Tools.length !== undefined   &&  typeof all_Tools !== "string" && ( <>
    {Array.isArray(all_Tools) && all_Tools?.map((Info, index) =>(
<>
{Info?.BoxType === "Tools_a"   &&  Info?.tool_id !== "2000000" &&  Info?.ShowInUi &&     
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


{/* Tools_b */}
{all_Tools.length !== undefined   &&  typeof all_Tools !== "string" &&( <>
 {Array.isArray(all_Tools) &&  all_Tools?.map((Info, index) =>(
<>
{Info?.BoxType === "Tools_b"   &&  Info?.tool_id !== "2000000" &&   Info?.ShowInUi &&         
   show_only_this_tools.includes(Info?.tool_id)  ? 
   (  
<PreviewBox_type_module
show_tool_PreviewBoxs_type_a_b={show_tool_PreviewBoxs_type_a_b}
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

show_only_this_tools={show_only_this_tools}
 set_show_only_this_tools={set_show_only_this_tools}

//  dont_show_this_tools={dont_show_this_tools}
//  set_dont_show_this_tools={set_dont_show_this_tools}

 dont_show_this_tools2={dont_show_this_tools2}
 set_dont_show_this_tools2={set_dont_show_this_tools2}
 backEndURL={backEndURL}
 notification_number={notification_number}
            />  ) : null }

     </>      

           
           ))}   
</>)}








{ show_only_this_tools.length  !=  all_Tools.length &&
<PreviewBox_Not_active_tools
all_Tools={all_Tools}
show_tool_PreviewBoxs_type_a_b={show_tool_PreviewBoxs_type_a_b}
 set_show_tool_PreviewBoxs_type_a_b={set_show_tool_PreviewBoxs_type_a_b}
 

 show_only_this_tools={show_only_this_tools}
 set_show_only_this_tools={set_show_only_this_tools}

//  dont_show_this_tools={dont_show_this_tools}
//  set_dont_show_this_tools={set_dont_show_this_tools}

 dont_show_this_tools2={dont_show_this_tools2}
 set_dont_show_this_tools2={set_dont_show_this_tools2}
/>}


 






 
</div>
      
</div>
 
 
</>


    );
  }
  
  export default DashBoard;

