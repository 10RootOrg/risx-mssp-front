import React , {useState , useEffect ,useContext} from 'react';
 
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import axios from 'axios';
import './../Settings/Settings.css';
import './../Settings/Settings_section_config.jsx';
import Settings_section_config from './Settings_section_config.jsx'
import Settings_section_ShowInUi from './Settings_section_ShowInUi.jsx'
import Settings_section_process from './Settings_section_process.jsx'
import Settings_section_edit_mssp_config_json from './Settings_section_edit_mssp_config_json.jsx'



import GeneralContext from '../../Context.js';


// const {   backEndURL  } = useContext(GeneralContext);
// const [filter_Resource, set_filter_Resource] = useState({type_ids:[],tool_ids:[]});
 
function Settings({show_SideBar,set_show_SideBar,set_notification_number,set_visblePage,isMainProcessWork,set_isMainProcessWork}) {

  set_visblePage("Settings");
  const { all_Tools    } = useContext(GeneralContext);






console.log("all_Tools",all_Tools);

 
 
//  show sidebar in this page
  useEffect(() => {  if (show_SideBar === false) {set_show_SideBar(true)}}, []);


    return (
 
<>
<div className='app-main' >
<div className='top-of-page'> 

<div className='top-of-page-left mb-b'>
<p  className="font-type-menu" >Settings:</p>
<p  className="font-type-h3" >General Settings</p>
</div>
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>
<div className='top-of-page-right'>
<input className="input-type1 mr-a" placeholder="Search" />
<button className="btn-type1 "><IconSearch className="icon-type1" />  </button>
</div>

</div>

<div className='resource-group-top-boxes mb-c' ></div>


<div  style={{display:"flex" , flexDirection:"column" ,gap:"45px"}}>

<Settings_section_config/>

<Settings_section_ShowInUi all_Tools={all_Tools}/>

{/* <Settings_section_edit_mssp_config_json all_Tools={all_Tools}/> */}

<Settings_section_process isMainProcessWork={isMainProcessWork}  set_isMainProcessWork={set_isMainProcessWork}/>

</div>

 

</div>
 
</>


    );
  }
  
  export default Settings;

