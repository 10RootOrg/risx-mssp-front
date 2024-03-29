 
import React, { useEffect, useState ,useContext} from "react";
import GeneralContext from '../../Context.js';
import './PopUp.css'; // import CSS file for modal styling
// import CloseButton from "./CloseButton";
import { ReactComponent as CloseButton } from '../icons/ico-Close_type1.svg';
//  import Nuclei_json  from '../../tmpjsons/Nuclei.json'
import jsonData from '../../tmpjsons/Nuclei.json'
import axios from 'axios';


  export const PopUp_For_Read_More = (props) => {
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
        <div> 
        <a href={`http://51.145.229.232:3003/Nuc_001.json`} download="data.json" target="_blank" className="mr-b">  <button className="btn-type2 "><p className='font-type-menu '>Download JSON File</p>  </button></a>
        <  a href={toolURL} target="_blank"> <button className="btn-type2"><p className='font-type-menu '>{buttonTitle}</p>  </button></a>
        </div>
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


     const downloadJsonFile = () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(Dehashed_data));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "data.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
  };

    useEffect(() => {
      set_popUp_show(popUp_show)
    }, [popUp_show]);
  
    // get json HashR data
    useEffect(() => {
      const get_json_Dehashed_data= async()=>{
            try{
         const res = await axios.get(`${backEndURL}/Tools/dehashed-json`,);
        console.log("res.data", res.data);
        console.log("res.data", typeof res.data);
        set_Dehashed_data(res.data)
            }catch(err)
            {console.log(err);}
        }

        get_json_Dehashed_data();


// const tmpdata =  {

//   balance: "123",
//   entries:[
//     {
//       address :  "",
//       database_name : "Dox",
//       email:  "aaa.co.l",
//       hashed_password: "038768767678766654561",
//       id  :  "5965675744",  ip_address : "",
//       name
//       : 
//       "23423",
//       password
//       : 
//       "23424",
//       phone
//       : 
//       "",
//       username
//       : 
//       "",
//       vin
//       : 
//       "",
//     },    {
//       address :  "",
//       database_name : "12313",
//       email:  "2eb3.co.l",
//       hashed_password: "03234324254561",
//       id  :  "596567234235744",  ip_address : "",
//       name
//       : 
//       "2344243",
//       password
//       : 
//       "2342343242342424",
//       phone
//       : 
//       "",
//       username
//       : 
//       "bobo",
//       vin
//       : 
//       "",
//     },
//   ],
//   success:true,
//   took:"bbl",
// total:4
//  }

// set_Dehashed_data(tmpdata);



    }, [ ]);
  
 




    

 
 
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


 

<div style={{height:"480px", overflowY:"auto" ,margin:0 , padding:0}}>
 
 
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
          <button className="btn-type2   " onClick={downloadJsonFile}><p className='font-type-menu '>Download JSON File</p>  </button> 
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
  
 