import React , {useState , useEffect} from 'react';
 import { ReactComponent as IconLastRun } from './icons/ico-lastrun.svg';
 import { ReactComponent as IconReadMore } from './icons/ico-readmore.svg';
 import { PopUpSmart } from "./Features/PopUpSmart.js";

 import TmpChart2 from '../tmpjsons/tempChart.png'; 
 
//  onClick={()=>handleReadMore("the_tool_info")} 

     

import './PreviewBoxes.css';
 
function PreviewBox_type1({HeadLine,BigNumber,SmallNumber,StatusColor,date}) {
 

  const StatusColorClass =
  StatusColor === 'red' ? 'Bg-Red' :
  StatusColor === 'blue' ?'Bg-Blue-Glow' : 
  'Bg-Grey2';

  return (
    <div className='PreviewBox' > 
    <div className='PreviewBox_HeadLine' >
      <p  className="font-type-menu" >{HeadLine}</p>

 <div className={`${StatusColorClass}  light-bulb-type1`}/>

       </div>


    <div> 
    <div className='PreviewBox_BigNumber     font-type-h1 Color-White' >{BigNumber}</div>
    <div className='PreviewBox_SmallNumber   font-type-txt Color-White' >UnActive:{SmallNumber}</div>
    </div>

     <div className='PreviewBox_ButtomLine' >

       <IconLastRun />
       <div className='font-type-very-sml-txt Color-Grey1' >{date}</div>

     </div> {/*dont delete */}
    </div>
  )
}

function PreviewBox_type2({HeadLine}) {
 
  return (
    <div className='PreviewBox PreviewBox-twice-size' >

          <div className='PreviewBox_HeadLine' > <p  className="font-type-menu" >{HeadLine}</p> </div>
 
   
      <div className='display-flex   justify-content-space-between' style={{ height:"100%"}}>

      <div className='display-flex  ' style={{   width:"100%"}}>  <img src={TmpChart2} alt="Chart"  style={{height:"120px", width:"120px"}}/></div>
   


     <div className='display-flex flex-direction-column justify-content-center  ' style={{   width:"100%" ,gap:"2px" }}>

      <div className='display-flex' style={{marginRight:"auto"}}>
        <div className={` Bg-Blue-Glow light-bulb-type1 mr-a`}/>
        <p className='   font-type-txt Color-White  ' >Domains: 127</p>
        </div>
     
        <div className='display-flex' style={{marginRight:"auto"}}>
        <div className={`Bg-Blue-Glow Bg-Yellow light-bulb-type1 mr-a`} style={{opacity:'85%'}}/>
        <p className='   font-type-txt Color-White  ' >I.P Addresses: 6</p>
        </div>

        <div className='display-flex' style={{marginRight:"auto"}} >
        <div className={` Bg-Blue-Glow light-bulb-type1 mr-a`}  style={{opacity:'70%'}}/>
        <p className='   font-type-txt Color-White  ' >Emails: 22</p>
        </div>

        <div className='display-flex' style={{marginRight:"auto", width:"100%"}}>
        <div className={` Bg-Blue-Glow light-bulb-type1 mr-a`}  style={{opacity:'55%'}}/>
        <p className='   font-type-txt Color-White  '    >Phone Nembers: 77</p>
        </div>
        
        <div className='display-flex' style={{marginRight:"auto", width:"100%"}}>
        <div className={`Bg-Blue-Glow light-bulb-type1 mr-a`}  style={{opacity:'30%'}}/>
        <p className='   font-type-txt Color-White  ' >Names: 362</p>
        </div>

        <div className='display-flex' style={{marginRight:"auto"}}>
        <div className={` Bg-Blue-Glow light-bulb-type1 mr-a`}  style={{opacity:'15%'}}/>
        <p className='   font-type-txt Color-White  ' >Has Privileges: 3</p>
        </div>

     </div>

      </div>
       
 
       
        </div>
  )
}


function PreviewBox_type_tools_a({ indexNumber,HeadLine,description,by,StatusColor,date,isActive,logoAddress_1,logoAddress_2, readMoreAddress,readMoreText,buttonTitle,iconAddress,toolURL}) {
 
  const StatusColorClass =
  StatusColor === 'red' ? 'Bg-Red' :
  StatusColor === 'blue' ?'Bg-Blue-Glow' : 
  'Bg-Grey2';
 
  const [logoAddress_1_ForSrc, set_logoAddress_1_ForSrc] = useState("")
  const [logoAddress_2_ForSrc, set_logoAddress_2_ForSrc] = useState("")
  const IconAddressForSrc = require( `${iconAddress}`);
  const [popUp_show, set_popUp_show] = useState(false);

  const handleReadMore = () =>{
    set_popUp_show(true);
  }


  useEffect(() => {
    if (logoAddress_1 !== "" &&  logoAddress_1 !== null &&  logoAddress_1 !== undefined ) {
      console.log("OK", logoAddress_1 );
     const  Src = require( `${logoAddress_1}`)
      set_logoAddress_1_ForSrc(Src)
    }
    if (logoAddress_2 !== "" &&  logoAddress_2 !== null &&  logoAddress_2 !== undefined ) {
      console.log("OK", logoAddress_2 );
     const  Src = require( `${logoAddress_2}`)
      set_logoAddress_2_ForSrc(Src)
    }


    }, []);

 
  return (

<>

<PopUpSmart
        HeadLine={HeadLine}
        readMoreText={readMoreText}
        logoAddress_1_ForSrc={logoAddress_1_ForSrc}
        toolURL={toolURL}
        buttonTitle={buttonTitle}
        set_popUp_show={set_popUp_show}
        popUp_show={popUp_show}
        IconAddressForSrc={IconAddressForSrc}
      />

    <div className='PreviewBox PreviewBox-of-tools'
    style={{
      flexGrow:1
     }}
    > 

    <div className='PreviewBox_HeadLine' >

   <label className="switch"><input type="checkbox" /> <span className="slider round"></span></label>    {/* //  checked={Info?.Monitor} */}




 {/* ///////////// 1 or 2 logos /////////////// */}
 {logoAddress_2_ForSrc !== "" ? (
     <div className='display-flex     mr-a ml-a' style={{  }}>
     {/* <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p> */}
     <img src={logoAddress_1_ForSrc} alt="logo"   className='responsive-logos-type_a'  />
     <p  className="font-type-very-sml-txt   Color-Grey1 mr-a ml-a" >&</p>
     <img src={logoAddress_2_ForSrc} alt="logo"     className='responsive-logos-type_a'  />
     </div>
    ):(
      <div className='display-flex ' style={{marginRight:"24px"}}>
      <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
      <img src={logoAddress_1_ForSrc} alt="logo" maxwidth="140" height="20"  />
      </div>
    )  }

  <div className={`${StatusColorClass}  light-bulb-type1`}/></div>
  
    <div className='display-flex justify-content-center align-items-center flex-direction-column'  > 
    <img src={IconAddressForSrc} alt="Icon" width="70" height="70" className='mb-a' />
    <p className='text-center     font-type-h4 Color-White mb-a'  style={{maxwidth:"350px"}} >{HeadLine}</p>
    <p className='text-center   font-type-txt Color-White  mb-a'    style={{maxwidth:"250px"}}>{description}</p>
    <button className="btn-type3 mb-c" onClick={()=>handleReadMore()}><p className=' font-type-txt'>Read More</p><IconReadMore className="icon-type1 "  />  </button>

 <  a href={toolURL} target="_blank"> 
    <button className="btn-type2"><p className='font-type-menu '>{buttonTitle} </p>  </button></a>
   
    </div>

     <div className='PreviewBox_ButtomLine' >
       <IconLastRun />
       <div className='font-type-very-sml-txt Color-Grey1' >{date}</div>

     </div> {/*dont delete */}
    </div>
</>


  )
}

function PreviewBox_type_tools_b({   indexNumber,HeadLine,description,by,StatusColor,date,isActive,logoAddress_1,logoAddress_2,readMoreAddress,readMoreText,buttonTitle,iconAddress,toolURL}) {
 

  const StatusColorClass =
  StatusColor === 'red' ? 'Bg-Red' :
  StatusColor === 'blue' ?'Bg-Blue-Glow' : 
  'Bg-Grey2';



  const [popUp_show, set_popUp_show] = useState(false);

  const [logoAddress_1_ForSrc, set_logoAddress_1_ForSrc] = useState("")
  const [logoAddress_2_ForSrc, set_logoAddress_2_ForSrc] = useState("")

  const handleReadMore = () =>{
    set_popUp_show(true);
  }
  useEffect(() => {
    if (logoAddress_1 !== "" &&  logoAddress_1 !== null &&  logoAddress_1 !== undefined ) {
      console.log("OK", logoAddress_1 );
     const  Src = require( `${logoAddress_1}`)
      set_logoAddress_1_ForSrc(Src)
    }
    if (logoAddress_2 !== "" &&  logoAddress_2 !== null &&  logoAddress_2 !== undefined ) {
      console.log("OK", logoAddress_2 );
     const  Src = require( `${logoAddress_2}`)
      set_logoAddress_2_ForSrc(Src)
    }



    }, []);

 




  return (
<>

<PopUpSmart
        HeadLine={HeadLine}
        readMoreText={readMoreText}
        logoAddress_1_ForSrc={logoAddress_1_ForSrc}
        toolURL={toolURL}
        buttonTitle={buttonTitle}
        set_popUp_show={set_popUp_show}
        popUp_show={popUp_show}
      />


  <div className='PreviewBox PreviewBox-of-tools' > 

    <div className='PreviewBox_HeadLine' style={{  height:20}}>
 
   <label className="switch"><input type="checkbox" /> <span className="slider round"></span></label>    {/* //  checked={Info?.Monitor} */}

  <div className={`${StatusColorClass}  light-bulb-type1`}/></div>
  
    <div className='display-flex justify-content-center align-items-center flex-direction-column'  > 
    {/* <img src={IconAddressForSrc} alt="Icon" width="70" height="70" className='mb-a' /> */}
    <p className='text-center     font-type-h4 Color-White mb-a'  style={{maxwidth:"350px"}} >{HeadLine}</p>
    <p className='text-center   font-type-txt Color-White  mb-b cutLongParagraph'    style={{maxwidth:"250px"}}>{description}</p>
 

 
 {/* ///////////// 1 or 2 logos /////////////// */}
    {logoAddress_2_ForSrc !== "" ? (
     <div className='display-flex mb-a' style={{  }}>
     {/* <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p> */}
     <img src={logoAddress_1_ForSrc} alt="logo"   className='responsive-logos-type_b'  />
     <p  className="font-type-very-sml-txt   Color-Grey1 mr-a ml-a" >&</p>
     <img src={logoAddress_2_ForSrc} alt="logo"     className='responsive-logos-type_b'  />
     </div>
    ):(
      <div className='display-flex mb-a' style={{marginRight:"5px"  }}>
      <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
      <img src={logoAddress_1_ForSrc} alt="logo" maxwidth="140px" height="30"  />
      </div>
    )  }



 

  

    <button className="btn-type3 mb-c" onClick={()=>handleReadMore()}><p className=' font-type-txt'>Read More</p><IconReadMore className="icon-type1 " />  </button>

 <  a href={toolURL} target="_blank"> <button className="btn-type2"><p className='font-type-menu '>{buttonTitle} </p>  </button></a>
   
    </div>

     <div className='PreviewBox_ButtomLine' >
       <IconLastRun />
       <div className='font-type-very-sml-txt Color-Grey1' >{date}</div>

     </div> {/*dont delete */}
    </div>
</>

  
  )
}


export { PreviewBox_type1, PreviewBox_type2 ,PreviewBox_type_tools_a,PreviewBox_type_tools_b };