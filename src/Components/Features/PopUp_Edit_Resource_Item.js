 
import React, { useEffect, useState } from "react";
import './PopUp.css'; // import CSS file for modal styling
// import CloseButton from "./CloseButton";
import { ReactComponent as CloseButton } from '../icons/ico-Close_type1.svg';
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import Tools from '../../tmpjsons/previewBoxesTools.json';
import capeLogo from '../Logos/CAPE.png'; // Adjust the path as necessary

  export const PopUp_Edit_Resource_Item = (props) => {
    const {
       HeadLine, readMoreText   ,popUp_show, set_popUp_show ,logoAddress_1_ForSrc    ,toolURL,buttonTitle  ,IconAddressForSrc, popUp_iconSize,
      
       IconBIG ,
       resourceItem
      
      } = props;
     // const [modalVisible, setModalVisible] = useState(false);
     const [InputUser, set_InputUser] = useState("");
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
    const handleUserChange = (event) => {
      console.log(event.target.value);
      set_InputUser(event.target.value);  
    };
 
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
<input className="input-type2 mb-a " type="text" style={{width:"100%"}} value={InputUser}   placeholder={resourceItem?.Name} onChange={handleUserChange} />
</div>
<div className="item_info_left"> 
<p className='font-type-menu   Color-Grey1  '>Type</p>
<input className="input-type2 mb-a " type="text" style={{width:"100%"}} value={InputUser}   placeholder={resourceItem?.Type} onChange={handleUserChange} />
</div>
<div className="item_info_left">
<p className='font-type-menu   Color-Grey1  '>IP Adress</p>
<input className="input-type2 mb-a " type="text" style={{width:"100%"}} value={InputUser}   placeholder={resourceItem?.IPAdress} onChange={handleUserChange} />
</div>
<div className="item_info_left"> 
<p className='font-type-menu   Color-Grey1 '>Port</p>
<input className="input-type2 mb-a " type="text" style={{width:"100%"}} value={InputUser}   placeholder={resourceItem?.Port} onChange={handleUserChange} />
</div>
</div>

<div className="item_info_right"> 
<textarea  className="input-type2 reading-height  "   style={{width:"" }} value={InputUser}   placeholder={resourceItem?.Description} onChange={handleUserChange} />
</div>
</div>

 
{/* <p className='font-type-menu   Color-Grey1   '>Tools</p> */}
<div className="item_info_tools_all">

<div className="titles mb-c">
<label className="container"> 
<input type="checkbox" defaultChecked />
<span className="checkmark"></span>
</label>
<p className='column font-type-menu   Color-Grey1 '>Tool Name</p>
<p className='column font-type-menu   Color-Grey1 '>Description</p>
<p className='column font-type-menu   Color-Grey1 '>Developer</p>
</div>
<div className="item_info_tools_box"> 



<div className="item_info_tools">



{Tools?.map((Info, index) => {
 
//  const src = Info?.logoAddress_1
 const AAA = require(`../Logos/CAPE.png`);


 const filePath = Info?.logoAddress_1;
 const isSvg = filePath.endsWith('.svg');
 const imageSrc = `.${filePath}`;

// console.log(filePath);
console.log("isSvg", isSvg);
console.log("imageSrc", imageSrc );


//   const BBB =  Info?.logoAddress_1 ;
// console.log(BBB);
 
// const logoSrc = `http://localhost:3003/src/Components/${Info?.logoAddress_1}`;
//  console.log(logoSrc);
//  const BBB = require(`.${Info?.logoAddress_1}`)

 //  console.log(src);
 
//  Info?.logoAddress_1

    return (

<div className="toolsData">
  
  <div className="toolsData-checkbox">
<label className="container"> 
<input type="checkbox" defaultChecked />
<span className="checkmark"></span>
</label>
</div>

 <div className='column'>
  
 <p className='   font-type-txt   Color-Blue-Glow tagit' >{Info?.Toolname}</p>  

 </div>
 
<p className='column-for-txt font-type-txt     Color-Grey1'>{Info?.description}</p>

 


  <div className='column'>
  
  {/* <img src={capeLogo} alt="logo"   className='responsive-logos-type_b'  />   */}
  {/* <img src='../Logos/CAPE.png' alt="logo"   className='responsive-logos-type_b'  />   */}
  {/* <img src={require(`{Info?.logoAddress_1}`)} className='responsive-logos-type_b' ></img>   */}


  <img src={AAA} className='responsive-logos-type_b' ></img> 
  <img src={require(`../Logos/CAPE.png`)} className='responsive-logos-type_b' ></img>  
    <img src={require(`../Logos/Nuclei.svg`)} className='responsive-logos-type_b' ></img>  
    
  </div>

{/* <img className='velociraptor-EndpointModules-logo  '          src={Info?.logoAddress_1 ? require(`${Info.logoAddress_1}`) : undefined}></img> */}

  {/* <img src={src} alt="logo"   className='responsive-logos-type_b'  /> */}
 {/* <img src={logoAddress_1_ForSrc} alt="logo"   className='responsive-logos-type_b'  /> */}
{/* const  Src = require( `${logoAddress_1}`) */}
{/* <p className='column-for-txt font-type-txt   Color-Grey1 '>cccccccccccc</p> */}
</div>
   
 
    );
  })}

</div>
</div>



 


</div>

 

<label className="switch"> 
  <input type="checkbox" 
  //  checked={Info?.Monitor}
  defaultChecked={Math.random() < 0.7}
   />
  <span className="slider round"></span> <p className='column font-type-menu   Color-Grey1 '>Start Monitoring</p>
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
  
  