 
import React, { useEffect, useState } from "react";
import './PopUp.css'; // import CSS file for modal styling
// import CloseButton from "./CloseButton";
import { ReactComponent as CloseButton } from '../icons/ico-Close_type1.svg';
//  import Nuclei_json  from '../../tmpjsons/Nuclei.json'
import jsonData from '../../tmpjsons/Nuclei.json'



  export const PopUpSmart = (props) => {
    const { HeadLine, readMoreText   ,popUp_show, set_popUp_show ,logoAddress_1_ForSrc    ,toolURL,buttonTitle  ,IconAddressForSrc, popUp_iconSize} = props;
     // const [modalVisible, setModalVisible] = useState(false);
   
    useEffect(() => {
      set_popUp_show(popUp_show)
    }, [popUp_show]);
  
 

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
  export const PopUp_For_Nuclei_data = (props) => {
    const { HeadLine, readMoreText   ,popUp_show, set_popUp_show ,logoAddress_1_ForSrc    ,toolURL,buttonTitle  ,IconAddressForSrc, popUp_iconSize} = props;
     // const [modalVisible, setModalVisible] = useState(false);
   
    useEffect(() => {
      set_popUp_show(popUp_show)
    }, [popUp_show]);
  
    function flattenArray(array) {
      return array.join(', ');
    }
    
    function flattenObject(obj) {
      return Object.entries(obj).map(([key, value]) => `${key}: ${Array.isArray(value) ? flattenArray(value) : value}`).join(', ');
    }

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
          <div className={`PopUp-background  `} onClick={handleClickOutside} >
            
            <div className={`PopUp-content  `} style={{width:"80%" }}>

<div className="display-flex justify-content-end  " style={{marginRight:"-40px"}}>
<button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
</div>




                 {IconAddressForSrc !== undefined && IconAddressForSrc !== "" ? (

 <>

 <img src={IconAddressForSrc} alt="Icon" width={popUp_iconSize === "Big" ? "200"  : "70" }  height={popUp_iconSize === "Big" ? "100"  : "70" }  className='mb-a'   style={{ marginLeft: popUp_iconSize === "Big" && "-15px" , marginBottom: popUp_iconSize === "Big" && "5px"  } }/> </>):null}
                
<p className="font-type-h4 Color-White mb-c">{HeadLine} </p>

 

<div style={{height:"500px", overflowY:"auto"}}>
{/* {jsonData?.map((Info, index) =>( */}
 
<div className='display-flex   align-items-center' style={{  }}>

<table  className="pop_up_table">
      <thead>
        <tr>
          <th>Template</th>
          <th>Template URL</th>
          <th>Template ID</th>
          <th>Template Path</th>
          <th>Info</th>
          <th>Type</th>
          <th>Host</th>
          <th>Matched At</th>
          <th>Request</th>
          <th>Response</th>
          <th>Timestamp</th>
          <th>Matcher Status</th>
        </tr>
      </thead>
      <tbody >
        {jsonData.map((item, index) => (
          <tr key={index} style={{height:"20px"}}>
            <td  ><p>{item.template}</p></td>
            <td><p>{item['template-url']} </p></td>
            <td><p>{item['template-id']}</p></td>
            <td><p>{item['template-path']}</p></td>
            <td><p>{flattenObject(item.info)}</p></td>
            <td><p>{item.type}</p></td>
            <td><p>{item.host}</p></td>
            <td><p>{item['matched-at']}</p></td>
            <td><p>{item.request}</p></td>
            <td><p>{item.response}</p></td>
            <td><p>{item.timestamp}</p></td>
            <td><p>{item['matcher-status'].toString()}</p></td>
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
        <  a href={toolURL} target="_blank"> <button className="btn-type2"><p className='font-type-menu '>{buttonTitle}</p>  </button></a>
      )
      }
     

      </div>


 
              
            
            </div>
          </div>)}
    
      </>
    );
  }
  