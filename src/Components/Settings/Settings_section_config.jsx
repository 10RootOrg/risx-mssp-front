import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_type1_number, PreviewBox_type3_bar ,PreviewBox_type2_pie,PreviewBox_type4_legend2} from '../PreviewBoxes.js'


import axios from 'axios';
import './../Settings/Settings.css';
import './custom-json-view.css';
import GeneralContext from '../../Context.js';
import JsonView from '@uiw/react-json-view';
import {PopUp_All_Good ,PopUp_Are_You_Sure} from '../PopUp_Smart'

function Settings_section_config({show_SideBar,set_show_SideBar,set_notification_number}) {

    const [preview_or_edit, set_preview_or_edit] = useState(true);
    const [config_save_btn, set_config_save_btn] = useState(false);
    // const [loader , set_loader] = useState(true)
 const {   backEndURL  } = useContext(GeneralContext);
 
 const [PopUp_Are_You_Sure__show, set_PopUp_Are_You_Sure__show] = useState(false);
 const [PopUp_Are_You_Sure__txt, set_PopUp_Are_You_Sure__txt] = useState({
   HeadLine:"Are You Sure?",
   paragraph:"The record will be deleted from the system",
   buttonTrue:"True",
   buttonFalse:"False"
 });

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

const handle_view_or_edit = ()=>{
  set_preview_or_edit(!preview_or_edit)
}

  const initialObject = {loading: '...',}
  const [object, setObject] = useState(initialObject);
  const handleTextAreaChange = (event) => {
    set_config_save_btn(true)
    try {
      const value = JSON.parse(event.target.value);
      setObject(value);
    } catch (error) {
      // Handle parsing error, e.g., display a message to the user
      console.error('Error parsing JSON:', error);
    }
  };

  const customTheme = {
    '--w-rjv-font-family': 'roboto',

    '--w-rjv-background-color': '',
    '--w-rjv-line-color': 'var(--color-Grey3)',
    '--w-rjv-arrow-color': 'var(--w-rjv-color)',
    '--w-rjv-edit-color': 'var(--color-Grey1)',
    '--w-rjv-add-color': 'var(--color-Grey1)',
    '--w-rjv-delete-color': 'var(--color-Grey1)',
    '--w-rjv-info-color': 'red',
    '--w-rjv-update-color': 'var(--color-Grey1)',
    '--w-rjv-copied-color': 'var(--color-Grey1)',
    '--w-rjv-copied-success-color': 'var(--color-Grey1)',
  
    '--w-rjv-curlybraces-color': 'var(--color-Grey1)',
    '--w-rjv-colon-color': 'var(--color-Grey1)',
    '--w-rjv-brackets-color': 'var(--color-Grey1)',
  
    
    '--w-rjv-type-int-color':  'var(--color-DB-Blue-Active)',
    '--w-rjv-type-float-color':  'var(--color-DB-Blue-Active)',
    '--w-rjv-type-bigint-color':  'var(--color-DB-Blue-Active)',
    '--w-rjv-type-boolean-color': 'var(--color-DB-Blue-Active)',
    '--w-rjv-type-date-color':  'var(--color-DB-Blue-Active)',
    '--w-rjv-type-url-color':  'var(--color-DB-Blue-Active)',
    '--w-rjv-type-null-color':  'var(--color-DB-Blue-Active)',
    '--w-rjv-type-nan-color':   'var(--color-DB-Blue-Active)',
    '--w-rjv-type-undefined-color':  'var(--color-DB-Blue-Active)',
    '--w-rjv-type-string-color': 'var(--color-DB-Blue-Active)',
    '--w-rjv-type': 'var(--color-DB-Blue-Active)',


    '--w-rjv-object-key': 'var(--color-Grey1)',
    '--w-rjv-key-string': 'var(--color-Grey1)',
  
    '--w-rjv-color': 'var(--color-Orange)',
 
 

    '--w-rjv-quotes-color': 'var(--color-Grey1)',
     
  };


 


  const get_config = async() =>{
    console.log('get_config..');
    try{
      const res = await axios.get(`${backEndURL}/config`);

      if (res){console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa",res.data);}
      setObject(res.data)
    }
    catch(err){console.log(err);}
        } 
useEffect(() => {  {get_config()}}, []);






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
<p className='font-type-h4 Color-White mb-c'>Config Files</p>
 <table className='setting_table  ' style={{lineHeight:"100%"}}>
                   
 <tbody>  
            <tr >
                <td className="setting_descriptions">
                <p className='font-type-menu Color-White mb-a'>config.json</p>
                <p className='font-type-txt Color-Grey1 mb-b'>This is the place to update the general config file.</p>
                <p className='font-type-txt Color-Orange'> Caution: Incorrect input may damage the functionality of the software.</p>
                </td>

                 <td className="setting_element PreviewBox" style={{height:"auto"}}>
                  <div className=' '>
                    {preview_or_edit ? ( 
                      <div className="setting_element" style={{overflowY:"scroll"}}>
                      <JsonView value={object}
                   keyName="root"
                    style={customTheme} 
                    displayDataTypes={false}
                     enableClipboard={false}
                     name={false}
                     /> </div>):(

                       <textarea  className="input-type3_settings reading-height  setting_element"   style={{width:"100%"  }} 
                      value={JSON.stringify(object, null, 2)} // Convert object to string for textarea value
                      onChange={handleTextAreaChange} // Update object state when textarea content changes
                        placeholder={ 'Description'}></textarea>
 
                     )}



                   </div>











               </td>
<div  style={{ 
  // marginTop:"18px", 
  marginBottom:"var(--space-d)" ,marginTop:"var(--space-b)" , display:'flex' ,justifyContent:"end", gap:"var(--space-b)"}}>
    <button className="btn-type2" style={{ }} onClick={handle_view_or_edit} ><p className='font-type-menu '>{preview_or_edit ? "Edit" : "View"}</p></button> 
   {config_save_btn && <button className="btn-type2" style={{ }} onClick={Handele_are_you_sure}  ><p className='font-type-menu '>Save</p></button> } 

</div>

            </tr>

       

            </tbody> 
</table>

</div>
 
 
 </>


 

    );
  }
  
  export default Settings_section_config;

