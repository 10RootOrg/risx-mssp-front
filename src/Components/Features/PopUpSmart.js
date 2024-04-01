 
import React, { useEffect, useState ,useContext} from "react";
import GeneralContext from '../../Context.js';
import './PopUp.css'; // import CSS file for modal styling
// import CloseButton from "./CloseButton";
import { ReactComponent as CloseButton } from '../icons/ico-Close_type1.svg';
//  import Nuclei_json  from '../../tmpjsons/Nuclei.json'
import jsonData from '../../tmpjsons/Nuclei.json'
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
   
     const [Nuclei_data, set_Nuclei_data] = useState(jsonData)


 



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
        {Nuclei_data.map((item, index) => (
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
        <button className="btn-type2   " onClick={()=>downloadJsonFile(Nuclei_data)}><p className='font-type-menu '>Download JSON File</p>  </button> 
      <  a href={toolURL} target="_blank" className="  ml-b"> <button className="btn-type2"><p className='font-type-menu '>{buttonTitle}</p>  </button></a>
      </div>


        // <div>   
        // <a href={`http://51.145.229.232:3003/Nuc_001.json`} download="data.json" target="_blank" className="mr-b">  <button className="btn-type2 "><p className='font-type-menu '>Download JSON File</p>  </button></a>
        // <  a href={toolURL} target="_blank"> <button className="btn-type2"><p className='font-type-menu '>{buttonTitle}</p>  </button></a>
        // </div>
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




    useEffect(() => {
      set_popUp_show(popUp_show)
    }, [popUp_show]);
  
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

const tmpdata2 = {"balance":97,"entries":[{"id":"5969345144","email":"shanybox@sheba.co.il","ip_address":"","username":"","password":"","hashed_password":"038c12d166d8c3fc439c22bac4bf8d9cbe654561","name":"","vin":"","address":"","phone":"","database_name":"Dropbox"},{"id":"21447830815","email":"shimrit@sheba.co.il","ip_address":"91.228.248.251","username":"","password":"","hashed_password":"","name":"shimrit david","vin":"","address":"hari yehuda 60, gani tikva, IL","phone":"0526666897","database_name":"vtightgel_ne"},{"id":"8728171969","email":"etay@sheba.co.il","ip_address":"","username":"","password":"","hashed_password":"db51b69f175cee53ddeb7fb0fbc8659ce6841d7a:20130228151046","name":"","vin":"","address":"","phone":"","database_name":"MyHeritage"},{"id":"8741530011","email":"mariana@sheba.co.il","ip_address":"","username":"","password":"","hashed_password":"7de06f40d5fca1b6f905e86d4b6c123103d8638f:20160113143920","name":"","vin":"","address":"","phone":"","database_name":"MyHeritage"}],"success":true,"took":"49µs","total":4}

 


set_Dehashed_data(tmpdata2);



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
  
 