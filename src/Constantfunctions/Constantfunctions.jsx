import React, { useState ,useContext,useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
 
 
 
import {PopUp_Error ,PopUp_All_Good,PopUp_Are_You_Sure
  // PopUp_Are_You_Sure
} from '../Components/PopUp_Smart'
 
import GeneralContext from '../Context';
import axios from 'axios';

import {check_and_active_interval_of_python}from '../Components/Features/ProcessFunctions'
 

function  Constantfunctions({  isMainProcessWork, set_isMainProcessWork}) {

// const navigate = useNavigate();
// const [user_name, set_user_name] = useState("user")
// const [notification_number, set_notification_number] = useState(0)
const {backEndURL,user_id} =useContext(GeneralContext)


 
// const [isHovered, setIsHovered] = useState(false);


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



 

const check_main_process_status = async () =>{
  if(backEndURL === undefined){return}
  try{
           const res = await axios.get(`${backEndURL}/process/process-status`);
            if (res){ set_isMainProcessWork(res.data);

console.log( "check_main_process_status22" , res.data);

if(res.data === false)
  { console.log("process ===" ,  res.data);

  set_PopUp_Are_You_Sure__txt({
    HeadLine:"Ineraval is off",
    paragraph:"Do yo want enable it?",
    buttonTrue:"Yes",
    buttonFalse:"No"
  });
  
  set_PopUp_Are_You_Sure__show(true)


}



            }}



          catch(err){  console.log("process-status" ,err);}}


async function got_to_check_and_active_interval_of_python  () {


 const   do_active =  await check_and_active_interval_of_python(backEndURL,isMainProcessWork,set_isMainProcessWork);



 if (do_active){
  console.log("do_active" , do_active);
  set_PopUp_Are_You_Sure__show(false);
 }
else if (do_active === false){
  console.log("do_active" , do_active);
  set_PopUp_Are_You_Sure__show(false);
  set_PopUp_Error____txt({ HeadLine:"Failed", paragraph: "Failed active VelociraptorInterval.py", buttonTitle:"Close"})
  set_PopUp_Error____show(true)


 }




}


//  const check_and_active_interval_of_python = async()=>{ 




//   if (backEndURL == null || backEndURL == undefined || backEndURL == ""){return}
//             try{
//                 const res = await axios.get(`${backEndURL}/process/check-and-active-interval-of-python`);
//                 if (res){
                  
//                if(res){   
//                 console.log("check_and_active_interval_of_python 123" , res.data);
                
       
//                }
          
//             }}
//             catch(err){   console.log(err);}
//         }

 useEffect(() => { check_main_process_status();}, [backEndURL]); // for first load

useEffect(() => { const interval = setInterval(() => {check_main_process_status(); },60000);  return () => clearInterval(interval);}, []); 

const handle_Close_PopUp_Are_You_Sure = () => {set_PopUp_Are_You_Sure__show(false)};


  const handle_active_interval_process = async () => {
    set_PopUp_Error____txt({ HeadLine:"Work in Progress..", paragraph: "Final touches underway; anticipate completion shortly. Stay tuned for updates.", buttonTitle:"Close"})
    set_PopUp_Error____show(true)
  };







// useEffect(() => {
//   const name = localStorage.getItem('username');

//   if (name) {
//     set_user_name(name);
//   } else {
//     console.log('No username found in local storage.');
//   }
// }, []); 







    return (
 




      
      <div className=''>



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


{PopUp_Are_You_Sure__show &&
 <PopUp_Are_You_Sure
 popUp_show={PopUp_Are_You_Sure__show}
 set_popUp_show={set_PopUp_Are_You_Sure__show}

 HeadLine={PopUp_Are_You_Sure__txt.HeadLine}
 paragraph={PopUp_Are_You_Sure__txt.paragraph} 

 button_True_text={PopUp_Are_You_Sure__txt.buttonTrue}
 button_False_text={PopUp_Are_You_Sure__txt.buttonFalse}

True_action={got_to_check_and_active_interval_of_python}
False_action={handle_Close_PopUp_Are_You_Sure}

 /> }


 
 
      </div>
     
 
    );
  }
  
  export default  Constantfunctions;