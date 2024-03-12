import React from 'react'
 import { ReactComponent as IconLastRun } from '../icons/ico-lastrun.svg';



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
    <div className='PreviewBox_BigNumber     font-type-h1' >{BigNumber}</div>
    <div className='PreviewBox_SmallNumber   font-type-txt' >UnActive:{SmallNumber}</div>
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



export { PreviewBox_type1, PreviewBox_type2 };