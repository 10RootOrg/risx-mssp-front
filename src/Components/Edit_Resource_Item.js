 
import React, { useEffect, useState } from "react";
import '../Components/Features/PopUp.css'; // import CSS file for modal styling
// import CloseButton from "./CloseButton";
import { ReactComponent as CloseButton } from './icons/ico-Close_type1.svg';
import { ReactComponent as IconCart } from './icons/ico-cart.svg';

import Tools from './../tmpjsons/previewBoxesTools.json';
import capeLogo from './Logos/CAPE.png'; // Adjust the path as necessary

  export const Edit_Resource_Item = (props) => {
    const {
       HeadLine, readMoreText   ,popUp_show, set_popUp_show ,logoAddress_1_ForSrc    ,toolURL,buttonTitle  ,IconAddressForSrc, popUp_iconSize,
      
       IconBIG ,
       resourceItem
      
      } = props;
     // const [modalVisible, setModalVisible] = useState(false);
    //  const [InputUser, set_InputUser] = useState("");
     const [name, setName] = useState(resourceItem?.Name || '');
     const [type, setType] = useState(resourceItem?.Type || '');
     const [ipAddress, setIpAddress] = useState(resourceItem?.IPAdress || '');
     const [port, setPort] = useState(resourceItem?.Port || '');
     const [description, setDescription] = useState(resourceItem?.Description || '');
   

     useEffect(() => {
      setName(resourceItem?.Name || '');
      setType(resourceItem?.Type || '');
      setIpAddress(resourceItem?.IPAdress || '');
      setPort(resourceItem?.Port || '');
      setDescription(resourceItem?.Description || '');
    }, [resourceItem]); // Re-initialize state if `resourceItem` changes
  
  
    const handleInputChange = (setter) => (event) => setter(event.target.value);


    useEffect(() => {
      set_popUp_show(popUp_show)
    }, [popUp_show]);
  
console.log(Tools);

    // function to close modal when user clicks outside of it
    function handleClickOutside(e) {
      console.log("clickoutside");
      console.log("e.target" , e.target);
      console.log("e.target.className" , e.target.className);

      if (e.target.className === 'modal-background') {
   

        set_popUp_show(false);
   
      }
    }
  
    function handleClose() {
      set_popUp_show(false);
 
    }
 
    const handleNameChange = (event) => setName(event.target.value);




    return (
      <>
   


 {popUp_show && (
          <div className={`PopUp-background  `} onClick={handleClickOutside}>
            
            <div className={`PopUp-content  `} style={{width:"800px"}}>

<div className="display-flex justify-content-end  " style={{marginRight:"-40px"}}>
            <button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
            </div>



 
<div className='display-flex mb-d' ><IconBIG/> <p className='font-type-h4   Color-White ml-b'>{HeadLine}</p></div>

{/* <p className='font-type-menu    Color-White '>{resourceItem?.Name}</p> */}


<div className="items_top_center_buttom">


<div className="items_top">

<div className="items_left">
<div className="item_info_left">
<p className='font-type-menu   Color-Grey1 '>Name</p>
<input className="input-type2 mb-a " type="text" style={{width:"100%"}} value={name}      placeholder={resourceItem?.Name || 'Name'}
     onChange={handleInputChange(setName)}
 />
</div>
<div className="item_info_left"> 
<p className='font-type-menu   Color-Grey1  '>Type</p>
<input className="input-type2 mb-a " type="text" style={{width:"100%"}} value={type}      placeholder={resourceItem?.Type || 'Type'}
     onChange={handleInputChange(setType)}
 /></div>
<div className="item_info_left">
<p className='font-type-menu   Color-Grey1  '>IP Adress</p>
<input className="input-type2 mb-a " type="text" style={{width:"100%"}} value={ipAddress}      placeholder={resourceItem?.ipAddress || 'Ip Address'}
     onChange={handleInputChange(setIpAddress)}
 />
</div>
<div className="item_info_left"> 
<p className='font-type-menu   Color-Grey1 '>Port</p>
<input className="input-type2 mb-a " type="text" style={{width:"100%"}} value={port}      placeholder={resourceItem?.Port || 'Port'}
     onChange={handleInputChange(setPort)}
 /></div>
</div>

<div className="item_info_right"> 
 <textarea  className="input-type2 reading-height  "   style={{width:"" }}  value={description}      placeholder={resourceItem?.Description || 'Description'}
     onChange={handleInputChange(setDescription)}
 />
</div>
</div>

 
{/* <p className='font-type-menu   Color-Grey1   '>Tools</p> */}
<div className="item_info_tools_all">

<div className="titles mb-c">
<label className="container"> 
<input type="checkbox" defaultChecked />
<span className="checkmark"></span>
</label>
<p className='column font-type-menu   Color-Grey1 column-small'>Name</p>
<p className='column font-type-menu   Color-Grey1 '>Description</p>
<p className='column font-type-menu   Color-Grey1 column-small justify-content-center  mr-b'>Developer</p>
 
</div>
<div className="item_info_tools_box"
 
 > 



<div className="item_info_tools"
 >
 
{Tools?.map((Info, index) => {
 
 

    return (

<div className="toolsData"
>
  

{Info?.ServicePackage  === "Standard" ?(
  <div className="toolsData-checkbox "

  >
  <label className="container" > 
  <input type="checkbox" defaultChecked />
  <span className="checkmark"></span>
  </label>
  </div>
  
  
  ):(
    <div style={{  
  // backgroundColor: "red", 
  width: "20px", 
  height: "20px",  
  display: "flex",  
  justifyContent: "center",  
  alignItems: "center",  
  position: "relative",

 }}>
  <IconCart style={{
      // width: "111px",
      // height: "111px", 
      // position: "absolute",
      // top:"-32px",
      // backgroundColor: "yellow",
      zIndex: 22  
  
    }}/>
  </div>
  )}


 <div className='column column-small'>
  
 <p className='   font-type-txt   Color-Blue-Glow tagit' >{Info?.Toolname}</p>  

 </div>
 
<p className='column-for-txt font-type-txt     Color-Grey1'>{Info?.description}</p>
 
  <div className='column column-small justify-content-center'> 
  <img className='velociraptor-EndpointModules-logo   '          src={Info?.logoAddress_1 ? require(`${Info.logoAddress_1}`) : undefined}></img>
 
  </div>
 
</div>
   
 
    );
  })}

</div>
</div>



 


</div>

 
<label className="switch"> <p className='column font-type-menu   Color-Grey1 '>Start Monitoring</p>

  <input type="checkbox" 
  //  checked={Info?.Monitor}
  defaultChecked={Math.random() < 0.7}
   />
  <span className="slider round"></span> 
</label>
 

 
</div>

        <div className='display-flex mt-c' style={{  }}>
 
       <button className="btn-type2" onClick={handleClose} style={{marginLeft:"auto"}}><p className='font-type-menu '>{buttonTitle}</p>  </button>


      </div>


 
              
            
            </div>
          </div>)}
    
      </>
    );
  }
  
  