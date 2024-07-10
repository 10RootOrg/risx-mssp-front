import React , {useState , useEffect ,useContext} from 'react';
 import './Dashboard_iframes.css';
import GeneralContext from '../../Context.js';
import {make_url_from_id} from './functions_for_dashboards.js'


function Dashboard({show_SideBar,set_show_SideBar,set_visblePage,visblePage}) {
  set_visblePage("dashboard-risx");

    const [iframe_url , set_iframe_url] = useState("")
    const {front_IP , moduleLinks} = useContext(GeneralContext)

  // dont show sidebar in this page
useEffect(() => {  if (show_SideBar === false) {set_show_SideBar(true)}}, []);



useEffect(() => {  
  if(moduleLinks === undefined || moduleLinks.length === 0){return}
  const url = make_url_from_id(visblePage,moduleLinks,front_IP)
console.log("url -------- ",url);
set_iframe_url(url);
      }, [visblePage,moduleLinks]);



    return (
 
<>
<div className='app-main' >
<div className='top-of-page'> 

<div className='top-of-page-left mb-b'>
<p  className="font-type-menu" >Dashboards:</p>
<p  className="font-type-h3" >Risx</p>
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

