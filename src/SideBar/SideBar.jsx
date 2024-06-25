import React, { useState ,useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import './SideBar.css';
import { ReactComponent as RisxMsspLogo } from '../Components/Logos/RisxMssp_logo_Standart.svg';
import { ReactComponent as IcoMonitor } from '../Components/icons/ico-menu-monitor.svg';
import { ReactComponent as IcoResults } from '../Components/icons/ico-menu-Results.svg';
import { ReactComponent as IcoResourceGroup } from '../Components/icons/ico-menu-Resource-Group.svg';
import { ReactComponent as IcoAccount } from '../Components/icons/ico-menu-account.svg';
import { ReactComponent as IcoSettings } from '../Components/icons/ico-settings.svg';
import { ReactComponent as IcoDownload } from '../Components/icons/ico-menu-download.svg';
// import { ReactComponent as IcoProcess } from '../Components/icons/ico-menu-process.svg';
import { ReactComponent as IcoACtive } from '../Components/icons/ico-menu-active.svg';
import { ReactComponent as IconLastRun } from '../Components/icons/ico-lastrun.svg';
import {PopUp_Error ,PopUp_All_Good,PopUp_Are_You_Sure
  // PopUp_Are_You_Sure
} from '../Components/PopUp_Smart'
 
import GeneralContext from '../Context';
import axios from 'axios';

 
 
function SideBar({ visblePage, set_visblePage, notification_number, set_notification_number ,isMainProcessWork, set_isMainProcessWork}) {

const navigate = useNavigate();
// const [openSubMenu, set_openSubMenu] = useState("none")
const [user_name, set_user_name] = useState("user")
// const [notification_number, set_notification_number] = useState(0)
const {backEndURL,user_id} =useContext(GeneralContext)



const [isHovered, setIsHovered] = useState(false);


const [PopUp_Error____show, set_PopUp_Error____show] = useState(false);
const [PopUp_Error____txt, set_PopUp_Error____txt] = useState({  HeadLine:"",paragraph:"" ,buttonTitle:""})

const [PopUp_All_Good__show, set_PopUp_All_Good__show] = useState(false);
const [PopUp_All_Good__txt, set_PopUp_All_Good__txt] = useState({ HeadLine:"Success", paragraph:"successfully", buttonTitle:"Close"});

const [PopUp_Are_You_Sure__show, set_PopUp_Are_You_Sure__show] = useState(false);
const [PopUp_Are_You_Sure__txt, set_PopUp_Are_You_Sure__txt] = useState({
  HeadLine:"Are You Sure?",
  paragraph:"The record will be deleted from the system",
  buttonTrue:"True",
  buttonFalse:"False"
});



const [download_drop_down, set_download_drop_down] = useState(false);

// const check_main_process_status = async () =>{
//   if(backEndURL === undefined){return}
//   try{
//            const res = await axios.get(`${backEndURL}/process/process-status`);
//             if (res){ set_isMainProcessWork(res.data);
// if(res.data === false)
//   { console.log("process ===" ,  res.data);

//   set_PopUp_Are_You_Sure__txt({
//     HeadLine:"Ineraval is off",
//     paragraph:"Do yo want enable it?",
//     buttonTrue:"Yes",
//     buttonFalse:"No"
//   });
  
//   set_PopUp_Are_You_Sure__show(true)


// }



//             }}



//           catch(err){  console.log("process-status" ,err);}}

//  const check_and_active_interval_of_python = async()=>{ 
//   if (backEndURL == null || backEndURL == undefined || backEndURL == ""){return}
//             try{
//                 const res = await axios.get(`${backEndURL}/process/check-and-active-interval-of-python`);
//                 if (res){
                  
//                if(res.data){   
//                 console.log("check_and_active_interval_of_python ssssssssssssssssssssss" , res.data);
                
       
//                }
          
//             }}
//             catch(err){   console.log(err);}
//         }

//  useEffect(() => { check_main_process_status();}, [backEndURL]); // for first load

// useEffect(() => { const interval = setInterval(() => {check_main_process_status(); },60000);  return () => clearInterval(interval);}, []); 

// const handle_Close_PopUp_Are_You_Sure = () => {set_PopUp_Are_You_Sure__show(false)};


  // const handle_active_interval_process = async () => {
  //   set_PopUp_Error____txt({ HeadLine:"Work in Progress..", paragraph: "Final touches underway; anticipate completion shortly. Stay tuned for updates.", buttonTitle:"Close"})
  //   set_PopUp_Error____show(true)
  // };





// const handleMouseEnter = () => {
//   setIsHovered(true);
// };

// const handleMouseLeave = () => {
//   setIsHovered(false);
// };



console.log("visblePage",visblePage);

// const handleSubMenu = (name) => {
// if (openSubMenu === name ){set_openSubMenu("none")}
// else{set_openSubMenu(name);}
  
// };

const handleClick = (page_name) => {
  set_visblePage(page_name);
  localStorage.setItem('visiblePage', page_name); // Store current page in localStorage
  navigate(`/${page_name.toLowerCase()}`); // This navigates to the path specified by page_name

};





 


// const countVelociraptorResponses = async () => {
//   try {
   
//     const res = await axios.get(`${backEndURL}/results/count-responses-files`);
 

//     if (res) {
//       const list  = res.data.number


//       const listResults =  list
//       const seeResults =  localStorage.getItem(user_id + '_seeResults');

//       console.log(parseFloat(seeResults));
     
//    if(parseFloat(seeResults) != listResults){
// const note_gap  = listResults - parseFloat(seeResults)
// set_notification_number(note_gap)
//    }
// else if(parseFloat(seeResults) === listResults){set_notification_number(0)}

//       // console.log(parseFloat(seeResults) === listResults);
//       // console.log(parseFloat(seeResults) < listResults);


//       // set_notification_number
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };


const handle_download_drop_down =  () => {
  set_download_drop_down(!download_drop_down)
  
};

const handleDownload = async () => {
  window.open( "https://docs.velociraptor.app/downloads/"  , '_blank');
   
};



const handle_click_user = async () => {
  set_PopUp_Error____txt({ HeadLine:"Work in Progress..", paragraph: "Final touches underway; anticipate completion shortly. Stay tuned for updates.", buttonTitle:"Close"})
  set_PopUp_Error____show(true)

};


const handle_active_manual_process = async () => {
 console.log("handle_active_manual_process");
  try{
    const res = await
    axios.get(`${backEndURL}/process/active-manual-process`, {  params: { param1:  "param1value" } });

     if(res.data){
      console.log("handle_active_manual_process", res.data);


      if(res.data === true){
      set_PopUp_All_Good__txt({ HeadLine:"Activated",paragraph:"A Manual Process has Started to run", buttonTitle:"Close" })
      set_PopUp_All_Good__show(true);
      }
   
      else {
        set_PopUp_Error____txt({ HeadLine:"Error", paragraph: "the Manual process could not be started", buttonTitle:"Close"})
        set_PopUp_Error____show(true)
        }



    }

       }catch(err)
       {console.log(err);}
};

useEffect(() => {
  const name = localStorage.getItem('username');

  if (name) {
    set_user_name(name);
  } else {
    console.log('No username found in local storage.');
  }
}, []); 







    return (
 




      
      <div className='side-bar-desktop-out'>



{PopUp_All_Good__show &&
 <PopUp_All_Good
 popUp_show={PopUp_All_Good__show}
 set_popUp_show={set_PopUp_All_Good__show}
 HeadLine={PopUp_All_Good__txt.HeadLine}
 paragraph={PopUp_All_Good__txt.paragraph} 
buttonTitle={PopUp_All_Good__txt.buttonTitle}
 /> 
 }






{PopUp_Error____show &&
 <PopUp_Error
 popUp_show={PopUp_Error____show}
 set_popUp_show={set_PopUp_Error____show}
 HeadLine={PopUp_Error____txt.HeadLine}
 paragraph={PopUp_Error____txt.paragraph} 
buttonTitle={PopUp_Error____txt.buttonTitle}
 /> 
 }


{/* {PopUp_Are_You_Sure__show &&
 <PopUp_Are_You_Sure
 popUp_show={PopUp_Are_You_Sure__show}
 set_popUp_show={set_PopUp_Are_You_Sure__show}

 HeadLine={PopUp_Are_You_Sure__txt.HeadLine}
 paragraph={PopUp_Are_You_Sure__txt.paragraph} 

 button_True_text={PopUp_Are_You_Sure__txt.buttonTrue}
 button_False_text={PopUp_Are_You_Sure__txt.buttonFalse}

True_action={check_and_active_interval_of_python}
False_action={handle_Close_PopUp_Are_You_Sure}

 /> } */}







<RisxMsspLogo className="mt-c mb-b"/>
 

<button className="btn-menu  "   onClick={handle_click_user}>
        <div className='display-flex'>
          <IcoAccount className="btn-menu-icon-placeholder  mr-a " />
          <p className='font-type-menu '>{user_name}</p>
            {/* <span className='notification'><p className='font-type-very-sml-txt'>2</p></span> */}
            </div>
       <div className="btn-menu-icon-placeholder  "> {/*  <MenuArrowDown  />*/}</div> 
</button> 


 <div className='Bg-Grey2' style={{width:"100%", height:"2px" ,borderRadius:"5px"}}/>




 <div className="btn-menu-list  ">

 
 
 
<button className="btn-menu  " onClick={()=>handleClick("Dashboard")}   disabled={visblePage === "Dashboard"}>
        <div className='display-flex'><IcoMonitor className="btn-menu-icon-placeholder  mr-a " /><p className='font-type-menu '>Dashboard</p></div>
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

<button className="btn-menu  " onClick={()=>handleClick("Settings")}   disabled={visblePage === "Settings"}>
        <div className='display-flex'><IcoSettings className="btn-menu-icon-placeholder  mr-a " /><p className='font-type-menu '>Settings</p></div>
      <div className="btn-menu-icon-placeholder  ">  {/*  <MenuArrowDown  />*/}</div> 
</button> 





 </div>
<div className='Bg-Grey2' style={{width:"100%", height:"2px" ,borderRadius:"5px"}}/>

 {/* 

<div style={{width:"100%"  }} >
<button className="btn-menu "  style={{marginBottom:"var(--space-a)"}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
  onClick={handle_active_interval_process}
>  
        <div className='display-flex'>
          <IconLastRun className="btn-menu-icon-placeholder  mr-a " />
          <p className='font-type-menu'>Output:
            {isMainProcessWork && !isHovered &&   <span className='font-type-menu Color-Blue-Glow ml-a'>on</span>}
            {isMainProcessWork && isHovered &&  <span className='font-type-menu Color-Orange ml-a'>turn off</span>}
            {!isMainProcessWork && isHovered &&  <span className='font-type-menu Color-Blue-Glow ml-a'>turn on</span> }
            {!isMainProcessWork && !isHovered &&  <span className='font-type-menu Color-Orange ml-a'>off</span>}
         </p>
        
            </div> 
       <div className="btn-menu-icon-placeholder  "> </div> 
</button>  

<button className="btn-menu"  onClick={handle_active_manual_process}>  
        <div className='display-flex'> <IcoACtive className="btn-menu-icon-placeholder  mr-a " />  <p className='font-type-menu '>Run Selected</p> </div> 
       <div className="btn-menu-icon-placeholder  "> </div> 
</button>  
</div> */}
<button className="btn-menu"  onClick={handle_active_manual_process}>  
        <div className='display-flex'> <IcoACtive className="btn-menu-icon-placeholder  mr-a " />  <p className='font-type-menu '>Run Selected</p> </div> 
       <div className="btn-menu-icon-placeholder  "> </div> 
</button>  
<div className='Bg-Grey2' style={{width:"100%", height:"2px" ,borderRadius:"5px"}}/>


{/* download_drop_down */}

<div className="btn-menu-list"
  onMouseLeave={()=>set_download_drop_down(false)}
  //  onMouseEnter={()=>set_download_drop_down(true)}
   >


 <button className={`btn-menu  ${download_drop_down ? 'btn_look_hover' : ''} `} onClick={handle_download_drop_down} >  
        <div className='display-flex'>
          <IcoDownload className="btn-menu-icon-placeholder  mr-a " />
          <p className='font-type-menu '>Download Agent</p>
        
            </div> 
       <div className="btn-menu-icon-placeholder  "> {/*  <MenuArrowDown  />*/}</div> 
</button>  


<div className={`dropdown-menu ${download_drop_down ? 'open' : ''}`}>
<button className="btn-menu  "  onClick={handleDownload}>  
        <div className='display-flex'>
          <IcoDownload className="btn-menu-icon-placeholder  mr-a " style={{  visibility:   'hidden' }} />
          <p className='font-type-menu '>Windows</p>
        
            </div> 
       <div className="btn-menu-icon-placeholder  "> {/*  <MenuArrowDown  />*/}</div> 
</button>  

<button className="btn-menu  "  onClick={handleDownload}>  
        <div className='display-flex'>
          <IcoDownload className="btn-menu-icon-placeholder  mr-a " style={{  visibility:   'hidden' }} />
          <p className='font-type-menu '>linux</p>
        
            </div> 
       <div className="btn-menu-icon-placeholder  "> {/*  <MenuArrowDown  />*/}</div> 
</button>  

<button className="btn-menu  "  onClick={handleDownload}>  
        <div className='display-flex'>
          <IcoDownload className="btn-menu-icon-placeholder  mr-a " style={{  visibility:   'hidden' }} />
          <p className='font-type-menu '>Mac</p>
        
            </div> 
       <div className="btn-menu-icon-placeholder  "> {/*  <MenuArrowDown  />*/}</div> 
</button>  
</div>


</div>
 

      </div>
     
 
    );
  }
  
  export default SideBar;