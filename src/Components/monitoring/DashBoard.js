import React from 'react'
import { PreviewBox_type1, PreviewBox_type2 ,PreviewBox_type_tools_a,PreviewBox_type_tools_b} from '../PreviewBoxes.js'
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
 
 
import jsonData from '../../tmpjsons/previewBoxesToos.json';  
 
function DashBoard() {


      
    return (
 
<>

<div className='top-of-page'> 

<div className='top-of-page-left mb-b'>
<p  className="font-type-menu" >Monitoring:</p>
<p  className="font-type-h3" >DashBoard</p>
</div>
<div className='top-of-page-center'>center</div>


<div className='top-of-page-right'>
<input className="input-type1 mr-a" placeholder="Search" />
<button className="btn-type1 "><IconSearch className="icon-type1" />  </button>
</div>


</div>

{/* <PreviewBox_type2 HeadLine="קוביה גדולה"/>  */}

<div className='resource-group-top-boxes mb-c' >

{jsonData?.map((Info, index) =>(

<>
{Info?.BoxType === "Tools_a" ? (  
<PreviewBox_type_tools_a
indexNumber={index}
iconAddress={Info?.iconAddress}
HeadLine={Info?.headline}
description={Info?.description}
by={Info?.by}
StatusColor={Info?.StatusColor}
date={Info?.LastRun}
isActive={Info?.isActive}
logoAddress={Info?.logoAddress}
readMoreAddress={Info?.readMoreAddress}
readMoreText={Info?.readMoreText}
buttonTitle={Info?.buttonTitle}
toolURL={Info?.toolURL}
            />  ) : null }

     </>      

           
           ))}
</div>
      
<div className='resource-group-top-boxes mb-c' >

{jsonData?.map((Info, index) =>(

<>
{Info?.BoxType === "Tools_b" ? (  
<PreviewBox_type_tools_b
indexNumber={index}
iconAddress={Info?.iconAddress}
HeadLine={Info?.headline}
description={Info?.description}
by={Info?.by}
StatusColor={Info?.StatusColor}
date={Info?.LastRun}
isActive={Info?.isActive}
logoAddress={Info?.logoAddress}
readMoreAddress={Info?.readMoreAddress}
readMoreText={Info?.readMoreText}
buttonTitle={Info?.buttonTitle}
toolURL={Info?.toolURL}
            />  ) : null }

     </>      

           
           ))}
</div>
 
 
</>


    );
  }
  
  export default DashBoard;

