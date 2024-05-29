import React, { useState ,useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import './SideBar.css';
import { ReactComponent as RisxMsspLogo } from '../Components/Logos/RisxMssp_logo_Standart.svg';
import { ReactComponent as MenuArrowDown } from '../Components/icons/ico-menu-arrow-down.svg';
import { ReactComponent as IcoMonitor } from '../Components/icons/ico-menu-monitor.svg';
import { ReactComponent as IcoResults } from '../Components/icons/ico-menu-Results.svg';
import { ReactComponent as IcoResourceGroup } from '../Components/icons/ico-menu-Resource-Group.svg';
import { ReactComponent as IcoAccount } from '../Components/icons/ico-menu-account.svg';
import { ReactComponent as IcoDownload } from '../Components/icons/ico-menu-download.svg';
import GeneralContext from '../Context';
import axios from 'axios';

 
 
function SideBar({ visblePage, set_visblePage, notification_number, set_notification_number}) {

const navigate = useNavigate();
const [openSubMenu, set_openSubMenu] = useState("none")
// const [notification_number, set_notification_number] = useState(0)
const {backEndURL,user_id} =useContext(GeneralContext)

const handleSubMenu = (name) => {
if (openSubMenu === name ){set_openSubMenu("none")}
else{set_openSubMenu(name);}
  
};

const handleClick = (page_name) => {
  set_visblePage(page_name);

  navigate(`/${page_name.toLowerCase()}`); // This navigates to the path specified by page_name

};


const countVelociraptorResponses = async () => {
  try {
   
    const res = await axios.get(`${backEndURL}/results/count-responses-files`);
 

    if (res) {
      const list  = res.data.number


      const listResults =  list
      const seeResults =  localStorage.getItem(user_id + '_seeResults');

      console.log(parseFloat(seeResults));
     
   if(parseFloat(seeResults) != listResults){
const note_gap  = listResults - parseFloat(seeResults)
set_notification_number(note_gap)
   }
else if(parseFloat(seeResults) === listResults){set_notification_number(0)}

      // console.log(parseFloat(seeResults) === listResults);
      // console.log(parseFloat(seeResults) < listResults);


      // set_notification_number
    }
  } catch (err) {
    console.log(err);
  }
};


useEffect(() => { const interval = setInterval(() => {countVelociraptorResponses(); }, 60000); // Change the interval duration to 15000 milliseconds (15 seconds)

  // Clean up interval on component unmount or when dependencies change
  return () => clearInterval(interval);
}, []); // Empty dependency array to run once on component mount

const handleDownload = async () => {
 
};



    return (
 

      <div className='side-bar-desktop-out'>




<RisxMsspLogo className="mt-c mb-b"/>
 

<button className="btn-menu  " >
        <div className='display-flex'>
          <IcoAccount className="btn-menu-icon-placeholder  mr-a " />
          <p className='font-type-menu '>Dor Amit</p>
            {/* <span className='notification'><p className='font-type-very-sml-txt'>2</p></span> */}
            </div>
       <div className="btn-menu-icon-placeholder  "> {/*  <MenuArrowDown  />*/}</div> 
</button> 


 <div className='Bg-Grey2' style={{width:"100%", height:"2px" ,borderRadius:"5px"}}/>




 <div className="btn-menu-list  ">
{/* <button className="btn-menu  " onClick={()=>handleSubMenu("Monitoring")} >
        <div className='display-flex'><IcoMonitor className="btn-menu-icon-placeholder  mr-a " /><p className='font-type-menu '>Monitoring</p></div>
        <div className="btn-menu-icon-placeholder MenuArrowDown "> <MenuArrowDown  /></div>
</button>  */}

 
{/* <button className={
  `
  ${openSubMenu === "Monitoring" && "btn-menu animate-menu-on" }
  ${openSubMenu !== "Monitoring" && "animate-menu-off btn-menu"}
   `
  } 

  disabled={visblePage === "DashBoard"}
    // ${visblePage === "DashBoard" ? "btn-menu-is-active" : ""}
   onClick={()=>handleClick("DashBoard")}>
        <div className='display-flex'><div className="btn-menu-icon-placeholder  mr-a "  ></div>  <p className='font-type-menu '>DashBoard</p></div>
        <div className="btn-menu-icon-placeholder  ">  </div>
</button> */}

 
 
 
<button className="btn-menu  " onClick={()=>handleClick("DashBoard")}   disabled={visblePage === "DashBoard"}>
        <div className='display-flex'><IcoMonitor className="btn-menu-icon-placeholder  mr-a " /><p className='font-type-menu '>DashBoard</p></div>
      <div className="btn-menu-icon-placeholder  ">  {/*  <MenuArrowDown  />*/}</div> 
</button> 



<button className="btn-menu  " onClick={()=>handleClick("ResourceGroup")}   disabled={visblePage === "ResourceGroup"}>
        <div className='display-flex'><IcoResourceGroup className="btn-menu-icon-placeholder  mr-a " /><p className='font-type-menu '>Resource Group</p></div>
      <div className="btn-menu-icon-placeholder  ">  {/*  <MenuArrowDown  />*/}</div> 
</button> 

<button className="btn-menu  " onClick={()=>handleClick("Results")}   disabled={visblePage === "Results"}>
        <div className='display-flex'><IcoResults className="btn-menu-icon-placeholder  mr-a " /><p className='font-type-menu '>Results</p>
        {notification_number != 0 &&  <span className='notification'><p className='font-type-very-sml-txt'>{notification_number}</p></span>}
       
        </div>
      <div className="btn-menu-icon-placeholder  ">  {/*  <MenuArrowDown  />*/}</div> 
</button> 
 </div>


 <div className='Bg-Grey2' style={{width:"100%", height:"2px" ,borderRadius:"5px"}}/>


 
 <button className="btn-menu  "  onClick={handleDownload}>  
        <div className='display-flex'>
          <IcoDownload className="btn-menu-icon-placeholder  mr-a " />
          <p className='font-type-menu '>Download Agent</p>
        
            </div> 
       <div className="btn-menu-icon-placeholder  "> {/*  <MenuArrowDown  />*/}</div> 
</button>  



      </div>
     
 
    );
  }
  
  export default SideBar;