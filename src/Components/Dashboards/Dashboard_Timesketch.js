import React , {useState , useEffect ,useContext} from 'react';
 import './Dashboard_iframes.css';
import GeneralContext from '../../Context.js';
import {Make_url_from_id} from './functions_for_dashboards.js'

function Dashboard({show_SideBar,set_show_SideBar,set_visblePage,visblePage}) {
  set_visblePage("dashboard-timesketch");

    const [iframe_url , set_iframe_url] = useState("")
    const {front_IP , moduleLinks} = useContext(GeneralContext)
  // dont show sidebar in this page

useEffect(() => {  if (show_SideBar === false) {set_show_SideBar(true)}}, []);


// const make_url = (id) => {
//   if(moduleLinks === undefined || moduleLinks.length === 0){return}
//   const [module_data] = moduleLinks.filter(element => element?.toolID  === id);
//   const module_link =  module_data?.toolURL
//   if(module_link === undefined  ){return}
//      if(  module_link.includes("${FRONT_IP}")){
//         const module_link_change_front_ip = module_link.replace("${FRONT_IP}", front_IP);
//         console.log("module_link_change_front_ip",module_link_change_front_ip);
//         set_iframe_url(module_link_change_front_ip);
//       return  
//       }
// else{ 
//   console.log("module_link",module_link);
//   set_iframe_url(module_link);
//   return module_link}




// }
    
// useEffect(() => {  
// if(moduleLinks === undefined || moduleLinks.length === 0){return}

// switch(visblePage) {

// case "dashboard-cti":   
// make_url("2001003");
// console.log("dashboard-cti");
// break;

// case "dashboard-risx":   
// make_url("2001000");
// console.log("dashboard-risx");
// break;

// case "dashboard-misp":   
// make_url("2001012");
// console.log("dashboard-misp");
// break;

// case "dashboard-iris":   
// make_url("2001010");
// console.log("dashboard-iris");
// break;
 
// case "dashboard-timesketch":   
// make_url("2001002");
// console.log("dashboard-timesketch");
// break;
 


// default:
// console.log("dashboard-default-didnt find the visable page");
// make_url("2001000");
// break;

//         }  
//     }, [visblePage,moduleLinks]);


// console.log("iframe_url", iframe_url);
useEffect(() => {  
  if(moduleLinks === undefined || moduleLinks.length === 0){return}
  const url = Make_url_from_id(visblePage,moduleLinks,front_IP)
console.log("url -------- ",url);
set_iframe_url(url);
      }, [visblePage,moduleLinks]);

    
    return (
<>
<div className='app-main' >
<div className='top-of-page'> 

<div className='top-of-page-left mb-b'>
{/* <p  className="font-type-menu" >Dashboards:</p> */}
<p  className="font-type-h3" >Timesketch</p>
</div>
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>

{/* <div className='top-of-page-right'>
<input className="input-type1 mr-a" placeholder="Search" />
<button className="btn-type1 "><IconSearch className="icon-type1" />  </button>
</div> */}


</div>


     <div>

 <iframe src={iframe_url} className='iframe_full_screen'  title={visblePage}></iframe>


</div>


</div>
 
</>


    );
  }
  
  export default Dashboard;

