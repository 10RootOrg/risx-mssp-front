import React from 'react'

import { ReactComponent as IconArrowRight } from '../icons/ico-arrowRight.svg';
import { ReactComponent as IconArrowLeft } from '../icons/ico-arrowLeft.svg';

function ResourceGroup_buttomLine() {

      
    return (
 
<div  className='resource-group-list-buttomLine   mt-b'>

<p className='font-type-menu  Color-Grey1  '>Records per page: 5</p>

<div className='display-flex'>
  <button className="btn-type1"><IconArrowLeft className="icon-type1 " />  </button>
  <p className='font-type-menu   Color-Grey1 mr-b ml-b'>Page 1 of 1</p>
  <button className="btn-type1"><IconArrowRight className="icon-type1 " />  </button>
  
  </div>

  <p className='font-type-menu  Color-Grey1  '>modified: 18/06/22 09:30</p>
 
</div>


    );
  }
  
  export default ResourceGroup_buttomLine;

