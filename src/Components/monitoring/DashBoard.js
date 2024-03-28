import React , {useState , useEffect ,useContext} from 'react';
import {  PreviewBox_type_tools_a,PreviewBox_type_tools_b, PreviewBox_Not_active_tools} from '../PreviewBoxes.js'
import { PreviewBox_velociraptor} from '../PreviewBox_main_velociraptor.js'
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import jsonData from '../../tmpjsons/previewBoxesTools.json';  
import GeneralContext from '../../Context.js';
import axios from 'axios';


function DashBoard({show_SideBar,set_show_SideBar}) {

    const { all_Tools ,set_all_Tools , backEndURL ,all_Resource_Types} = useContext(GeneralContext);
    const [show_tool_PreviewBoxs_type_a_b, set_show_tool_PreviewBoxs_type_a_b] = useState(true)


    const [show_only_this_tools, set_show_only_this_tools] = useState([]) 
    const [dont_show_this_tools2, set_dont_show_this_tools2] = useState([]) 
 


    // const [show_only_this_tools, set_show_only_this_tools] = useState({  all_tool_ids_array }) 
    // console.log("show_only_this_tools", show_only_this_tools);

// console.log("dont_show_this_tools__#$%$#%$#", dont_show_this_tools);

useEffect(() => {
   if(all_Tools.length  === undefined || all_Tools.length === 0 )
{
    const get_all_tools = async()=>{
        try{
            const res = await axios.get(`${backEndURL}/Tools`);
            if (res){  set_all_Tools(res.data)   }} catch(err){console.log(err);}  }
  get_all_tools();      
                
}  }, []);




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

<PreviewBox_velociraptor/>
 
 
{all_Tools.length !== undefined   &&  ( <>

    {all_Tools?.map((Info, index) =>(

<>
{Info?.BoxType === "Tools_a"   &&
   show_only_this_tools.includes(Info?.tool_id)  ? 
   (  
<PreviewBox_type_tools_a
 
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

            />  ) : null }
 
     </>   ))}
</>)}



{all_Tools.length !== undefined   &&  ( <>

 {all_Tools?.map((Info, index) =>(

<>
{Info?.BoxType === "Tools_b"   &&
   show_only_this_tools.includes(Info?.tool_id)  ? 
   (  
<PreviewBox_type_tools_b
show_tool_PreviewBoxs_type_a_b={show_tool_PreviewBoxs_type_a_b}
tool_id={Info?.tool_id}
 
 
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



 
  {/* {jsonData?.map((Info, index) =>(

<>
{Info?.BoxType === "Tools_a" ? (  
<PreviewBox_type_tools_a
key={index}
iconAddress={Info?.iconAddress}
HeadLine={Info?.headline}
description={Info?.description}
Toolname={Info?.Toolname}
StatusColor={Info?.StatusColor}
date={Info?.LastRun}
isActive={Info?.isActive}
logoAddress_1={Info?.logoAddress_1}
logoAddress_2={Info?.logoAddress_2}
readMoreAddress={Info?.readMoreAddress}
readMoreText={Info?.readMoreText}
buttonTitle={Info?.buttonTitle}
toolURL={Info?.toolURL}
            />  ) : null }
 

     </>      

           
           ))}   */}



{/* {jsonData?.map((Info, index) =>(

<>
{Info?.BoxType === "Tools_b" ? (  
<PreviewBox_type_tools_b
indexNumber={index}
iconAddress={Info?.iconAddress}
HeadLine={Info?.headline}
description={Info?.description}
Toolname={Info?.Toolname}
StatusColor={Info?.StatusColor}
date={Info?.LastRun}
isActive={Info?.isActive}
logoAddress_1={Info?.logoAddress_1}
logoAddress_2={Info?.logoAddress_2}
readMoreAddress={Info?.readMoreAddress}
readMoreText={Info?.readMoreText}
buttonTitle={Info?.buttonTitle}
toolURL={Info?.toolURL}
            />  ) : null }

     </>      

           
           ))} */}




{/* {all_Tools.length === undefined   ?  ( <p>loading</p> ):(<p>not loading</p>)} */}
 
</div>
      
</div>
 
 
</>


    );
  }
  
  export default DashBoard;

