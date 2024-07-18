import React , {useState , useEffect ,useContext} from 'react';
import { PreviewBox_type1_number, } from '../PreviewBoxes.js'
import axios from 'axios';
import GeneralContext from '../../Context.js';


function Alerts_main({show_SideBar,set_show_SideBar,set_visblePage}) {
  set_visblePage("alerts");

    const {   backEndURL  } = useContext(GeneralContext);
 
  // dont show sidebar in this page
    useEffect(() => {  if (show_SideBar === false) {set_show_SideBar(true)}}, []);

    return (
<>
<div className='app-main' >
<div className='top-of-page'> 

<div className='top-of-page-left mb-b'>
{/* <p  className="font-type-menu" >Dashboards:</p> */}
<p  className="font-type-h3" >Alerts</p>
</div>  
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>



</div>

 
     <div>

 

</div>
<div className='resource-group-all-the-Lists'>
  <p  className="font-type-menu" >this page is under development</p>  
 

</div>

</div>
 
</>


    );
  }
  
  export default Alerts_main;

