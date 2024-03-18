import React from 'react'
import { PreviewBox_type1, PreviewBox_type2 ,PreviewBox_type_tools_a,PreviewBox_type_tools_b,PreviewBox_type_tools_big} from '../PreviewBoxes.js'
import { PreviewBox_velociraptor} from '../PreviewBox_main_velociraptor.js'

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
<div className='top-of-page-center'>{/* placeholder for dropDown */}</div>

 
<div className='top-of-page-right'>
<input className="input-type1 mr-a" placeholder="Search" />
<button className="btn-type1 "><IconSearch className="icon-type1" />  </button>
</div>


</div>

 
<div className='resource-group-top-boxes mb-c' >

<PreviewBox_velociraptor/>

{jsonData?.map((Info, index) =>(

<>
{Info?.BoxType === "Tools_a" ? (  
<PreviewBox_type_tools_a
key={index}
iconAddress={Info?.iconAddress}
HeadLine={Info?.headline}
description={Info?.description}
Toolname={Info?.Toolname}
StatusColor={Info?.StatusColor}
date={Info?.LastRun}
isActive={Info?.isActive}
logoAddress_1={Info?.logoAddress_1}
logoAddress_2={Info?.logoAddress_2}
readMoreAddress={Info?.readMoreAddress}
readMoreText={Info?.readMoreText}
buttonTitle={Info?.buttonTitle}
toolURL={Info?.toolURL}
            />  ) : null }

     </>      

           
           ))}


{jsonData?.map((Info, index) =>(

<>
{Info?.BoxType === "Tools_b" ? (  
<PreviewBox_type_tools_b
indexNumber={index}
iconAddress={Info?.iconAddress}
HeadLine={Info?.headline}
description={Info?.description}
Toolname={Info?.Toolname}
StatusColor={Info?.StatusColor}
date={Info?.LastRun}
isActive={Info?.isActive}
logoAddress_1={Info?.logoAddress_1}
logoAddress_2={Info?.logoAddress_2}
readMoreAddress={Info?.readMoreAddress}
readMoreText={Info?.readMoreText}
buttonTitle={Info?.buttonTitle}
toolURL={Info?.toolURL}
            />  ) : null }

     </>      

           
           ))}




</div>
      
{/* <div className='resource-group-top-boxes mb-c' >

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
logoAddress_1={Info?.logoAddress_1}
readMoreAddress={Info?.readMoreAddress}
readMoreText={Info?.readMoreText}
buttonTitle={Info?.buttonTitle}
toolURL={Info?.toolURL}
            />  ) : null }

     </>      

           
           ))}
</div> */}
 
 
</>


    );
  }
  
  export default DashBoard;

