import React from 'react';
 import { ReactComponent as IconLastRun } from './icons/ico-lastrun.svg';
 import { ReactComponent as IconReadMore } from './icons/ico-readmore.svg';
 import { ReactComponent as IconSettings } from './icons/ico-settings.svg';


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
      
   
      
       {HeadLine}
       
       
        </div>
  )
}

function PreviewBox_type_tools_a({ indexNumber,HeadLine,description,by,StatusColor,date,isActive,logoAddress,readMoreAddress,readMoreText,buttonTitle,iconAddress,toolURL}) {
 
  const StatusColorClass =
  StatusColor === 'red' ? 'Bg-Red' :
  StatusColor === 'blue' ?'Bg-Blue-Glow' : 
  'Bg-Grey2';
 
 const logoAddressForSrc = require( `${logoAddress}`);
 const IconAddressForSrc = require( `${iconAddress}`);

  return (
    <div className='PreviewBox PreviewBox-type3' > 

    <div className='PreviewBox_HeadLine' >

   <label className="switch"><input type="checkbox" /> <span className="slider round"></span></label>    {/* //  checked={Info?.Monitor} */}

<div className='display-flex' style={{marginRight:"24px"}}>
 <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
 <img src={logoAddressForSrc} alt="logo" maxWidth="140" height="20"  />
 </div>

  <div className={`${StatusColorClass}  light-bulb-type1`}/></div>
  
    <div className='display-flex justify-content-center align-items-center flex-direction-column'  > 
    <img src={IconAddressForSrc} alt="Icon" width="70" height="70" className='mb-a' />
    <p className='text-center     font-type-h4 Color-White mb-a'  style={{maxWidth:"350px"}} >{HeadLine}</p>
    <p className='text-center   font-type-txt Color-White  mb-a'    style={{maxWidth:"250px"}}>{description}</p>
    <button className="btn-type3 mb-c"><p className=' font-type-txt'>Read More</p><IconReadMore className="icon-type1 " />  </button>

 <  a href={toolURL} target="_blank"> 
    <button className="btn-type2"><p className='font-type-menu '>{buttonTitle} </p>  </button></a>
   
    </div>

     <div className='PreviewBox_ButtomLine' >
       <IconLastRun />
       <div className='font-type-very-sml-txt Color-Grey1' >{date}</div>

     </div> {/*dont delete */}
    </div>
  )
}

function PreviewBox_type_tools_b({ indexNumber,HeadLine,description,by,StatusColor,date,isActive,logoAddress,readMoreAddress,readMoreText,buttonTitle,iconAddress,toolURL}) {
 
  const StatusColorClass =
  StatusColor === 'red' ? 'Bg-Red' :
  StatusColor === 'blue' ?'Bg-Blue-Glow' : 
  'Bg-Grey2';
 
 const logoAddressForSrc = require( `${logoAddress}`);
//  const IconAddressForSrc = require( `${iconAddress}`);

  return (
    <div className='PreviewBox PreviewBox-type3' > 

    <div className='PreviewBox_HeadLine' >

   <label className="switch"><input type="checkbox" /> <span className="slider round"></span></label>    {/* //  checked={Info?.Monitor} */}


  <div className={`${StatusColorClass}  light-bulb-type1`}/></div>
  
    <div className='display-flex justify-content-center align-items-center flex-direction-column'  > 
    {/* <img src={IconAddressForSrc} alt="Icon" width="70" height="70" className='mb-a' /> */}
    <p className='text-center     font-type-h4 Color-White mb-a'  style={{maxWidth:"350px"}} >{HeadLine}</p>
    <p className='text-center   font-type-txt Color-White  mb-b cutLongParagraph'    style={{maxWidth:"250px"}}>{description}</p>


  <div className='display-flex mb-a' style={{marginRight:"24px"  }}>
 <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
 <img src={logoAddressForSrc} alt="logo" maxWidth="140px" height="30"  />
 </div>



    <button className="btn-type3 mb-c"><p className=' font-type-txt'>Read More</p><IconReadMore className="icon-type1 " />  </button>

 <  a href={toolURL} target="_blank"> 
    <button className="btn-type2"><p className='font-type-menu '>{buttonTitle} </p>  </button></a>
   
    </div>

     <div className='PreviewBox_ButtomLine' >
       <IconLastRun />
       <div className='font-type-very-sml-txt Color-Grey1' >{date}</div>

     </div> {/*dont delete */}
    </div>
  )
}


export { PreviewBox_type1, PreviewBox_type2 ,PreviewBox_type_tools_a,PreviewBox_type_tools_b};