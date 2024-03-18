 
import React, { useEffect, useState } from "react";
import './PopUp.css'; // import CSS file for modal styling
// import CloseButton from "./CloseButton";
import { ReactComponent as CloseButton } from '../icons/ico-Close_type1.svg';
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';


  export const PopUpSmart = (props) => {
    const { HeadLine, readMoreText   ,popUp_show, set_popUp_show ,logoAddress_1_ForSrc    ,toolURL,buttonTitle  ,IconAddressForSrc, popUp_iconSize} = props;
     // const [modalVisible, setModalVisible] = useState(false);
   
    useEffect(() => {
      set_popUp_show(popUp_show)
    }, [popUp_show]);
  
console.log(IconAddressForSrc);

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
  
 
    return (
      <>
   


 {popUp_show && (
          <div className={`PopUp-background  `} onClick={handleClickOutside}>
            
            <div className={`PopUp-content  `}>

<div className="display-flex justify-content-end  " style={{marginRight:"-40px"}}>
            <button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
            </div>




                 {IconAddressForSrc !== undefined && IconAddressForSrc !== "" ? (

 <>

 <img src={IconAddressForSrc} alt="Icon" width={popUp_iconSize === "Big" ? "200"  : "70" }  height={popUp_iconSize === "Big" ? "100"  : "70" }  className='mb-a'   style={{ marginLeft: popUp_iconSize === "Big" && "-15px" , marginBottom: popUp_iconSize === "Big" && "5px"  } }/> 
    

 </>
              

                 
                  ):null}
                
                <p className="font-type-h4 Color-White mb-c">{HeadLine}</p>
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
  
  