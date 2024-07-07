import React , {useState , useEffect ,useContext} from 'react';
 


import axios from 'axios';
import './../Settings/Settings.css';
import './custom-json-view.css';
import GeneralContext from '../../Context.js';
import JsonView from '@uiw/react-json-view';
import {PopUp_All_Good ,PopUp_Are_You_Sure} from '../PopUp_Smart.js'

function Settings_section_edit_mssp_config_json({show_SideBar,set_show_SideBar,set_notification_number, }) {
 
 
    // const [loader , set_loader] = useState(true)
 const {   backEndURL  ,set_all_Tools,all_Tools ,moduleLinks} = useContext(GeneralContext);
 const [tmp_moduleLinks, set_tmp_moduleLinks] = useState(moduleLinks);
 const [save_btn, set_save_btn] = useState(false);



 const [PopUp_Are_You_Sure__show, set_PopUp_Are_You_Sure__show] = useState(false);
 const [PopUp_Are_You_Sure__txt, set_PopUp_Are_You_Sure__txt] = useState({
   HeadLine:"Are You Sure?",
   paragraph:"The record will be deleted from the system",
   buttonTrue:"True",
   buttonFalse:"False"
 });







 const handleInputChangeGenerator = (index) => (e) => {
  const newModuleLinks = [...moduleLinks];  // Create a copy of moduleLinks array
  newModuleLinks[index].toolURL = e.target.value;  // Update the toolURL of the specific element
 set_tmp_moduleLinks(newModuleLinks);  // Update state with the new array
 set_save_btn(true);

};


// useEffect(() => {  


//   if(tmp_moduleLinks != moduleLinks){
//     console.log("fucing change!!!!!!!!!!");
//     set_save_btn(true);
//   }


// }, [tmp_moduleLinks]);


 console.log("moduleLinks",moduleLinks);

const Handele_are_you_sure =( ) =>{
 
set_PopUp_Are_You_Sure__txt({
            HeadLine:"Change config?",
            paragraph:"Are you sure you want to change config?",
            buttonTrue:"Yes",
            buttonFalse:"No"
          });
          
          set_PopUp_Are_You_Sure__show(true)
        }
        
const handle_Save_config = () => {
  handleClose();};
         
const handle_Cancel_Save_config = () => {
  handleClose();
};


function handleClose() {
  set_PopUp_Are_You_Sure__show(false);

}


useEffect(() => {  if (show_SideBar === false) {set_show_SideBar(true)}}, []);



 

  
 



    return (
 <>
 {PopUp_Are_You_Sure__show &&
 <PopUp_Are_You_Sure
 popUp_show={PopUp_Are_You_Sure__show}
 set_popUp_show={set_PopUp_Are_You_Sure__show}

 HeadLine={PopUp_Are_You_Sure__txt.HeadLine}
 paragraph={PopUp_Are_You_Sure__txt.paragraph} 

 button_True_text={PopUp_Are_You_Sure__txt.buttonTrue}
 button_False_text={PopUp_Are_You_Sure__txt.buttonFalse}

True_action={handle_Save_config}
False_action={handle_Cancel_Save_config}
 /> 
 }
 
 <div>
<p className='font-type-h4 Color-White mb-c'>Edit Links</p>
<table className='setting_table  ' style={{lineHeight:"100%"}}>
                     
                     <tbody  className="tbody_setting">  
                                    <tr >
                                    <td className="setting_descriptions setting_descriptions" >
                                    <p className='font-type-menu Color-White  mb-a'  >mssp_config.json</p>
                                    <p className='font-type-txt Color-Grey1 '>Edit link paths</p>
                                    </td>
                                    {/* moduleLinks */}

                                    {Array.isArray(tmp_moduleLinks) && tmp_moduleLinks?.map((Info, index) => {
  const handleInputChange = handleInputChangeGenerator(index);  // Generate handleInputChange function for each index

  return (
    <tr className='' key={index} style={{ height: "50px" }}>
      <td className="" style={{ width: "auto", paddingRight: "16px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        <p className='font-type-txt Color-White'>{Info?.toolName}</p>
      </td>
      <td className="" style={{ width: "100%" }}>
        <input  className="input-type4"  placeholder={Info?.toolURL}  value={Info?.toolURL}  onChange={handleInputChange}  />
      </td>
    </tr>
  );
})}
 
                  
                                </tr>
                    
                     
                                </tbody> 
                    </table>
{save_btn && 
 <div  style={{ marginBottom:"var(--space-d)" ,marginTop:"var(--space-a)" , display:'flex' ,justifyContent:"end", gap:"var(--space-b)"}}>
 <button className="btn-type2" style={{ }}   ><p className='font-type-menu '>Save</p></button> 
</div>


}




</div>
 
 
 </>


 

    );
  }
  
  export default Settings_section_edit_mssp_config_json;
