 
import React, { useEffect, useState ,useContext} from "react";
import GeneralContext from '../Context.js';
import './PopUp.css'; // import CSS file for modal styling
import { PreviewBox_type0_static   } from './PreviewBoxes.js'
import { ReactComponent as CloseButton } from '../Components/icons/ico-Close_type1.svg';
import {ReactComponent as SuccessIcon} from '../Components/icons/General-icons-success.svg';
import {ReactComponent as UnderConstruction} from '../Components/icons/General-icons-code.svg';
 import {ReactComponent as  CarefulIcon} from '../Components/icons/General-icons-careful.svg';
 import {ReactComponent as  InfofulIcon} from '../Components/icons/General-icons-info.svg';
 import {ReactComponent as  AlertInfo} from '../Components/icons/General-icons-alert.svg';
 import { ReactComponent as Loader } from '../Components/icons/loader_typea.svg';
 
// import jsonData from '../tmpjsons/Nuclei.json'
import axios from 'axios';

const downloadJsonFile = (file) => {
  console.log(file);
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(file));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "data.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const PopUp_Request_info = (props) => {
  const { HeadLine, paragraph   ,popUp_show, set_popUp_show  ,buttonTitle     } = props;
  const [active, setActive] = useState(false);
 
  useEffect(() => {
    set_popUp_show(popUp_show)
  }, [popUp_show]);

  useEffect(() => {
    if (popUp_show) {
        setTimeout(() => setActive(true), 100); // Wait for animation to finish before removing
    }
  }, [popUp_show]);


  function handleClickOutside(e) {
    if (e.target.className === 'PopUp-background') {
      setActive(false); // Trigger exit animation
      setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
    }
  }

  function handleClose() {
    setActive(false); // Trigger exit animation
    setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
  }




  return (
    <>
 


{popUp_show && (
        <div className={`PopUp-background`} onClick={handleClickOutside}>
          
          <div className={`PopUp-content  ${active ? 'popup-enter-active' : 'popup-enter'}`} style={{   width:"auto" ,paddingBottom:" "}}>

<div className="display-flex justify-content-end  " style={{marginRight:"-40px"  }}>
<button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
</div>

<InfofulIcon className="mb-a "
alt="Icon" width="100px" height="70px"    style={{ marginLeft:"-15px" }}
/>
              
<p className="font-type-h4 Color-White mb-a">{HeadLine}</p>
<p  className="font-type-txt  reading-height Color-White"  >{paragraph}</p>
    

 <div className='display-flex mt-c' style={{  }}>
    <button className="btn-type2   '" style={{ marginLeft:"auto" }} onClick={handleClose} ><p className='font-type-menu '>{buttonTitle}</p>  </button> 
 
  </div>



            
          
          </div>
        </div>)}
  
    </>
  );
}

export const PopUp_All_Good = (props) => {
  const { HeadLine, paragraph   ,popUp_show, set_popUp_show  ,buttonTitle     } = props;
  const [active, setActive] = useState(false);
 
  useEffect(() => {
    set_popUp_show(popUp_show)
  }, [popUp_show]);

  useEffect(() => {
    if (popUp_show) {
        setTimeout(() => setActive(true), 100); // Wait for animation to finish before removing
    }
  }, [popUp_show]);


  function handleClickOutside(e) {
    if (e.target.className === 'PopUp-background') {
      setActive(false); // Trigger exit animation
      setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
    }
  }

  function handleClose() {
    setActive(false); // Trigger exit animation
    setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
  }




  return (
    <>
 


{popUp_show && (
        <div className={`PopUp-background`} onClick={handleClickOutside}>
          
          <div className={`PopUp-content  ${active ? 'popup-enter-active' : 'popup-enter'}`} style={{   width:"250px" ,paddingBottom:" "}}>

<div className="display-flex justify-content-end  " style={{marginRight:"-40px"  }}>
<button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
</div>

<SuccessIcon className="mb-a "
alt="Icon" width="100px" height="70px"    style={{ marginLeft:"-15px" }}
/>
              
<p className="font-type-h4 Color-White mb-a">{HeadLine}</p>
<p  className="font-type-txt  reading-height Color-White"  >{paragraph}</p>
    

 <div className='display-flex mt-c' style={{  }}>
    <button className="btn-type2   '" style={{ marginLeft:"auto" }} onClick={handleClose} ><p className='font-type-menu '>{buttonTitle}</p>  </button> 
 
  </div>



            
          
          </div>
        </div>)}
  
    </>
  );
}

export const PopUp_Alert_info = (props) => {
  const { HeadLine, description  ,time ,popUp_show, set_popUp_show  ,buttonTitle    ,severity } = props;
  const [active, setActive] = useState(false);
  const [AlertColors, set_AlertColors] = useState(false);

  useEffect(() => {


 

    switch (severity.toLowerCase()) {
      case 'critical':set_AlertColors('alert-bg-color-critical');  break;
      case 'high':set_AlertColors('alert-bg-color-high');  break;
      case 'medium':set_AlertColors('alert-bg-color-medium');  break;
      case 'low':set_AlertColors('alert-bg-color-low');  break;
      case 'all-good':set_AlertColors('alert-bg-color-none');  break;

      default:
        set_AlertColors('alert-bg-color-no-alert');  break;
    }
    

  }, [severity]);




  useEffect(() => {
    set_popUp_show(popUp_show)
  }, [popUp_show]);

  useEffect(() => {
    if (popUp_show) {
        setTimeout(() => setActive(true), 100); // Wait for animation to finish before removing
    }
  }, [popUp_show]);


  function handleClickOutside(e) {
    if (e.target.className === 'PopUp-background') {
      setActive(false); // Trigger exit animation
      setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
    }
  }

  function handleClose() {
    setActive(false); // Trigger exit animation
    setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
  }




  return (
    <>
 


{popUp_show && (
        <div className={`PopUp-background`} onClick={handleClickOutside}>
          
          <div className={`PopUp-content  ${active ? 'popup-enter-active' : 'popup-enter'}`} style={{   width:"350px" ,paddingBottom:" "}}>

<div className="display-flex justify-content-end  " style={{marginRight:"-40px"  }}>
<button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
</div>


<div style={{position:"relative"}}>
<div className={`${AlertColors}   light-bulb-type1`}
 style={{
  // marginLeft:"auto", marginRight:"auto"
 left:"44px",
 top:'1px',
position:"absolute"
 }}
 />
<AlertInfo className="mb-a "
alt="Icon" width="48px" height="70px"    style={{ marginLeft:" " }}
/>
 </div>             
<p className="font-type-h4 Color-White mb-a">{HeadLine}</p>

<p  className="font-type-txt  reading-height Color-Grey1"  ><span className="font-type-menu reading-height Color-White mr-a" >Description:</span>{description}</p>

<p  className="font-type-txt  reading-height Color-Grey1"  ><span className="font-type-menu reading-height Color-White mr-a" >Time:</span>{time}</p>


    

 <div className='display-flex mt-c' style={{  }}>
    <button className="btn-type2   '" style={{ marginLeft:"auto" }} onClick={handleClose} ><p className='font-type-menu '>{buttonTitle}</p>  </button> 
 
  </div>



            
          
          </div>
        </div>)}
  
    </>
  );
}

export const PopUp_Are_You_Sure = (props) => {
  const { HeadLine, paragraph   ,popUp_show, set_popUp_show  ,button_True_text ,button_False_text   ,True_action ,False_action  } = props;
  const [active, setActive] = useState(false);
  const [disable_buttons, set_disable_buttons] = useState(false);

  useEffect(() => {
    if (popUp_show) {
        setTimeout(() => setActive(true), 100); // Wait for animation to finish before removing
    }
  }, [popUp_show]);


  function handleClickOutside(e) {
    if (e.target.className === 'PopUp-background') {
      setActive(false); // Trigger exit animation
      setTimeout(() =>    False_action())  // Wait for animation to finish before removing
    }
  }

  function handleClose() {
    setActive(false); // Trigger exit animation
    setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
  }

  // function handleClose() {
  //   // False_action();
  //   setActive(false); // Trigger exit animation
  //   setTimeout(() => False_action(), 100); // Wait for animation to finish before removing
  // }


  return (
    <>
 

{popUp_show && (
        <div className={`PopUp-background`} onClick={handleClickOutside}>
          
          <div className={`PopUp-content  ${active ? 'popup-enter-active' : 'popup-enter'}`} style={{   width:"250px" ,paddingBottom:" "}}>

<div className="display-flex justify-content-end  " style={{marginRight:"-40px"  }}>
<button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
</div>

<CarefulIcon className="mb-a "
alt="Icon" width="100px" height="70px"    style={{ marginLeft:"-15px" }}
/>
              
<p className="font-type-h4 Color-White mb-a">{HeadLine}</p>
<p  className="font-type-txt  reading-height Color-White"  >{paragraph}</p>
    

 <div className='display-flex mt-c' style={{  }}>
    <button className="btn-type2" 
disabled={disable_buttons} 
   style={{ marginLeft:"auto" }} 
   onClick={() => {
    True_action();
    set_disable_buttons(true);  // Assuming disable_buttons is a function that accepts a boolean argument
  }}><p className='font-type-menu '>{button_True_text}</p>  </button> 
    <button className="btn-type2"
    disabled={disable_buttons} 
        style={{ marginLeft:"10px" }}
   
     
     onClick={() => {
      False_action();
      set_disable_buttons(true);  // Assuming disable_buttons is a function that accepts a boolean argument
    }}
     
     ><p className='font-type-menu '>{button_False_text}</p>  </button> 
  </div>



            
          
          </div>
        </div>)}
  
    </>
  );
}

 export const PopUp_For_Read_More = (props) => {
    const { HeadLine, readMoreText   ,popUp_show, set_popUp_show ,logoAddress_1_ForSrc    ,toolURL,buttonTitle  ,IconAddressForSrc, popUp_iconSize} = props;
    const [active, setActive] = useState(false);   
    // useEffect(() => {
    //   set_popUp_show(popUp_show)
    // }, [popUp_show]);
  
 


    // function handleClickOutside(e) {
 
    //   console.log("e.target.className" , e.target.className);

    //   if (e.target.className === 'PopUp-background') {
   

    //     set_popUp_show(false);
   
    //   }
    // }
  
    // function handleClose() {
    //   set_popUp_show(false);
 
    // }
  
    useEffect(() => {
      set_popUp_show(popUp_show)
    }, [popUp_show]);
  
    useEffect(() => {
      if (popUp_show) {
          setTimeout(() => setActive(true), 100); // Wait for animation to finish before removing
      }
    }, [popUp_show]);
  
  
    function handleClickOutside(e) {
      if (e.target.className === 'PopUp-background') {
        setActive(false); // Trigger exit animation
        setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
      }
    }
  
    function handleClose() {
      setActive(false); // Trigger exit animation
      setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
    }
  
    
 
    return (
      <>
   


 {popUp_show && (
          <div className={`PopUp-background`} onClick={handleClickOutside}>
            
            <div className={`PopUp-content  ${active ? 'popup-enter-active' : 'popup-enter'}`}   >


<div className="display-flex justify-content-end  " style={{marginRight:"-40px"}}>
            <button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
            </div>




                 {IconAddressForSrc !== undefined && IconAddressForSrc !== "" ? (

 <>

 <img src={IconAddressForSrc} alt="Icon" width={popUp_iconSize === "Big" ? "200"  : "70" }  height={popUp_iconSize === "Big" ? "100"  : "70" }  className='mb-a'   style={{ marginLeft: popUp_iconSize === "Big" && "-15px" , marginBottom: popUp_iconSize === "Big" && "5px"  } }/> 
    

 </>
              

                 
                  ):null}
                
                <p className="font-type-h4 Color-White mb-b">{HeadLine}</p>
                <p  className="font-type-txt  reading-height Color-White"  >{readMoreText}</p>
      

   <div className='display-flex mt-c' style={{  }}>
      <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
      <img src={logoAddress_1_ForSrc} alt="logo" maxwidth="140px" height="30"  style={{marginRight:"auto"}}/>
      
      {buttonTitle === "Close" ? (
      <button className="btn-type2" onClick={handleClose} ><p className='font-type-menu '>{buttonTitle}</p>  </button> 
      ):(
        <  a href={toolURL} target="_blank"> <button className="btn-type2"><p className='font-type-menu '>{buttonTitle}</p>  </button></a>
      )
      }
     

      </div>


 
              
            
            </div>
          </div>)}
    
      </>
    );
  }
 
  export const PopUp_For_Dehashed_data = (props) => {
    const { HeadLine,  popUp_show, set_popUp_show ,logoAddress_1_ForSrc    ,toolURL,buttonTitle  ,IconAddressForSrc, popUp_iconSize} = props;
     const { backEndURL } = useContext(GeneralContext);
     const [Dehashed_data, set_Dehashed_data] = useState({})
  const [active, setActive] = useState(false);



 
    // get json HashR data
    useEffect(() => {
      // const get_json_Dehashed_data= async()=>{
      //       try{
      //    const res = await axios.get(`${backEndURL}/tools/dehashed-json`,);
      //   console.log("res.data", res.data);
      //   console.log("res.data", typeof res.data);
      //   set_Dehashed_data(res.data)
      //       }catch(err)
      //       {console.log(err);}
      //   }

      //   get_json_Dehashed_data();




const tmpdata2 = {"balance":97,"entries":[{"id":"5234114","email":"efibox@sheba.co.il","ip_address":"","username":"","password":"","hashed_password":"03453534be65342423344561","name":"","vin":"","address":"","phone":"","database_name":"Dropbox"},{"id":"3453s4535","email":"efit@sca.co.il","ip_address":"31.128.245.223","username":"","password":"","hashed_password":"","name":"efi dudi","vin":"","address":"hari yehuda 13, gani tikva, IL","phone":"0526666122","database_name":"v2tgel_de1"},{"id":"123131319","email":"efy@eer.co.il","ip_address":"","username":"","password":"","hashed_password":"db51443253453ddeb7fb0fbc8652441d7a:202034242151046","name":"","vin":"","address":"","phone":"","database_name":"MyHeritage"},{"id":"8741510w11","email":"mariana@rrv.co.il","ip_address":"","username":"","password":"","hashed_password":"7de06140d5fca1b6f305e8624b6c123103d8638f:20160113143920","name":"","vin":"","address":"","phone":"","database_name":"My32"}],"success":true,"took":"419µs","total":22}

 


set_Dehashed_data(tmpdata2);



    }, [ ]);
  
 
  
  useEffect(() => {
    set_popUp_show(popUp_show)
  }, [popUp_show]);

  useEffect(() => {
    if (popUp_show) {
        setTimeout(() => setActive(true), 100); // Wait for animation to finish before removing
    }
  }, [popUp_show]);


  function handleClickOutside(e) {
    if (e.target.className === 'PopUp-background') {
      setActive(false); // Trigger exit animation
      setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
    }
  }

  function handleClose() {
    setActive(false); // Trigger exit animation
    setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
  }


 
    return (
      <>
   


 {popUp_show && (
          <div className={`PopUp-background`} onClick={handleClickOutside} >
            
            <div className={`PopUp-content  ${active ? 'popup-enter-active' : 'popup-enter'}`} style={{   width:"80%" }}>

<div className="display-flex justify-content-end  " style={{marginRight:"-40px"}}>
<button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
</div>




 {IconAddressForSrc !== undefined && IconAddressForSrc !== "" ? (

 <>

 <img src={IconAddressForSrc} alt="Icon" width={popUp_iconSize === "Big" ? "200"  : "70" }  height={popUp_iconSize === "Big" ? "100"  : "70" }  className='mb-a'   style={{ marginLeft: popUp_iconSize === "Big" && "-15px" , marginBottom: popUp_iconSize === "Big" && "5px"  } }/> </>):null}
                
<p className="font-type-h4 Color-White mb-b">{HeadLine} </p>


<div className='display-flex   align-items-center    mb-c' style={{  height:"30px"}}>

<div className='display-flex   align-items-center     mr-c' style={{  height:"30px"}}>
<p  className="font-type-txt Color-Blue-Glow mr-a" >Balance </p>
<p  className="font-type-menu  Color-Blue-Glow  " > {Dehashed_data?.balance}</p>
</div>

<div className='display-flex   align-items-center    mr-c ' style={{  height:"30px"}}>
<p  className="font-type-txt Color-Blue-Glow mr-a" >Took </p>
<p  className="font-type-menu  Color-Blue-Glow  " > {Dehashed_data?.took}</p>
 
</div>

<div className='display-flex   align-items-center   mr-c  ' style={{  height:"30px"}}>
<p  className="font-type-txt Color-Blue-Glow mr-a" >Success </p>
<p  className="font-type-menu  Color-Blue-Glow  " > {Dehashed_data?.success === true ? ("True"):("False")}</p>
</div>

<div className='display-flex   align-items-center   mr-c  ' style={{  height:"30px"}}>
<p  className="font-type-txt Color-Blue-Glow mr-a" >Total Count</p>
<p  className="font-type-menu  Color-Blue-Glow  " > {Dehashed_data?.total} </p>
</div>

</div>


 

<div style={{height:"100px", overflowY:"auto" ,margin:0 , padding:0}}>
 
 
<div className='display-flex   align-items-center' style={{  }}>

<table  className="pop_up_table">
      <thead>
        <tr>
          <th>database_name</th>
          <th>email</th>
          <th>hashed_password</th>
          <th>id</th>

          <th>ip_address</th>
          <th>name</th>
          <th>password</th>
          <th>phone</th>
          <th>username</th>
          <th>vin</th>
 

        </tr>
      </thead>
      <tbody >
        {Dehashed_data?.entries?.map((item, index) => (
          <tr key={index} style={{height:"20px"}}>
            <td  ><p>{item?.database_name}</p></td>
            <td  ><p>{item?.email}</p></td>
            <td  ><p>{item?.hashed_password}</p></td>
            <td  ><p>{item?.id}</p></td>

            <td  ><p>{item?.ip_address}</p></td>
            <td  ><p>{item?.name}</p></td>
            <td  ><p>{item?.password}</p></td>
            <td  ><p>{item?.phone}</p></td>
            <td  ><p>{item?.username}</p></td>
            <td  ><p>{item?.vin}</p></td>
       


 

          </tr>
        ))}
      </tbody>
    </table>
{/* <p  className="font-type-txt  reading-height Color-White"  >{Info?.template} </p> */}
{/* <p  className="font-type-txt  reading-height Color-White"  >{jsonData} </p> */}
</div>

{/* ))} */}
</div>


   <div className='display-flex mt-c' style={{  }}>
      <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
      <img src={logoAddress_1_ForSrc} alt="logo" maxwidth="140px" height="30"  style={{marginRight:"auto"}}/>
      
      {buttonTitle === "Close" ? (
      <button className="btn-type2" onClick={handleClose} ><p className='font-type-menu '>{buttonTitle}</p>  </button> 
      ):(
        <div> 
          <button className="btn-type2   " onClick={()=>downloadJsonFile(Dehashed_data)}><p className='font-type-menu '>Download JSON File</p>  </button> 
        <  a href={toolURL} target="_blank" className="  ml-b"> <button className="btn-type2"><p className='font-type-menu '>{buttonTitle}</p>  </button></a>
        </div>
      )
      }
     

      </div>


 
              
            
            </div>
          </div>)}
    
      </>
    );
  }

  export const PopUp_Error = (props) => {
    const { HeadLine, paragraph   ,popUp_show, set_popUp_show  ,buttonTitle     } = props;
    const [active, setActive] = useState(false);
   
    useEffect(() => {
      set_popUp_show(popUp_show)
    }, [popUp_show]);
  
    useEffect(() => {
      if (popUp_show) {
          setTimeout(() => setActive(true), 100); // Wait for animation to finish before removing
      }
    }, [popUp_show]);
  
  
    function handleClickOutside(e) {
      if (e.target.className === 'PopUp-background') {
        setActive(false); // Trigger exit animation
        setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
      }
    }
  
    function handleClose() {
      setActive(false); // Trigger exit animation
      setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
    }
  
  
  
  
    return (
      <>
   
  
  
  {popUp_show && (
          <div className={`PopUp-background`} onClick={handleClickOutside}>
            
            <div className={`PopUp-content  ${active ? 'popup-enter-active' : 'popup-enter'}`} style={{   width:"250px" ,paddingBottom:" "}}>
  
  <div className="display-flex justify-content-end  " style={{marginRight:"-40px"  }}>
  <button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
  </div>
  
  <CarefulIcon className="mb-a "
  alt="Icon" width="100px" height="70px"    style={{ marginLeft:"-15px" }}
  />
                
  <p className="font-type-h4 Color-White mb-a">{HeadLine}</p>
  <p  className="font-type-txt  reading-height Color-White"  >{paragraph}</p>
      
  
   <div className='display-flex mt-c' style={{  }}>
      <button className="btn-type2   '" style={{ marginLeft:"auto" }} onClick={handleClose} ><p className='font-type-menu '>{buttonTitle}</p>  </button> 
   
    </div>
  
  
  
              
            
            </div>
          </div>)}
    
      </>
    );
  }
   

  export const PopUp_loader = (props) => {
    const {  popUp_show, set_popUp_show     } = props;
    const [active, setActive] = useState(false);
   
    // useEffect(() => {
    //   set_popUp_show(popUp_show)
    // }, [popUp_show]);
  
 
 
  
  
  
    return (
      <>
   
  
  
  {popUp_show && (
          <div className={`PopUp-background`}  >
            
<div className="PopUp-loader"> <Loader/></div>
           
 

          </div>)}
    
      </>
    );
  }


  export const PopUp_Under_Construction = (props) => {
    const { HeadLine, paragraph   ,popUp_show, set_popUp_show  ,buttonTitle     } = props;
    const [active, setActive] = useState(false);
   
    useEffect(() => {
      set_popUp_show(popUp_show)
    }, [popUp_show]);
  
    useEffect(() => {
      if (popUp_show) {
          setTimeout(() => setActive(true), 100); // Wait for animation to finish before removing
      }
    }, [popUp_show]);
  
  
    function handleClickOutside(e) {
      if (e.target.className === 'PopUp-background') {
        setActive(false); // Trigger exit animation
        setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
      }
    }
  
    function handleClose() {
      setActive(false); // Trigger exit animation
      setTimeout(() => set_popUp_show(false), 100); // Wait for animation to finish before removing
    }
  
  
  
  
    return (
      <>
   
  
  
  {popUp_show && (
          <div className={`PopUp-background`} onClick={handleClickOutside}>
            
            <div className={`PopUp-content  ${active ? 'popup-enter-active' : 'popup-enter'}`} style={{   width:"250px" ,paddingBottom:" "}}>
  
  <div className="display-flex justify-content-end  " style={{marginRight:"-40px"  }}>
  <button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
  </div>
  
  <UnderConstruction className="mb-a "
  alt="Icon" width="100px" height="70px"    style={{ marginLeft:"-15px" }}
  />
                
  <p className="font-type-h4 Color-White mb-a">{HeadLine}</p>
  <p  className="font-type-txt  reading-height Color-White"  >{paragraph}</p>
      
  
   <div className='display-flex mt-c' style={{  }}>
      <button className="btn-type2   '" style={{ marginLeft:"auto" }} onClick={handleClose} ><p className='font-type-menu '>{buttonTitle}</p>  </button> 
   
    </div>
  
  
  
              
            
            </div>
          </div>)}
    
      </>
    );
  }