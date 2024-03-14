import React from 'react'
 
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import { ReactComponent as IconPlus } from '../icons/ico-plus.svg';
import { ReactComponent as IconTrash } from '../icons/ico-trash.svg';
import { ReactComponent as IconSettings } from '../icons/ico-settings.svg';
import { ReactComponent as IconExpend } from '../icons/ico-expend.svg';
import { ReactComponent as IconLine } from '../icons/ico-line.svg';
function ResourceGroup_Action_btns() {

    return (
 
      <div className='resource-group-Right-Action_btns'>
      <input className="input-type1 mr-a" placeholder="Search" />
      <button className="btn-type1"><IconSearch className="icon-type1" />  </button>
      <button className="btn-type1"><IconPlus className="icon-type1" />  </button>
      <button className="btn-type1"><IconTrash className="icon-type1" />  </button>
      <button className="btn-type1"><IconSettings className="icon-type1" />  </button>
      <IconLine className="icon-type1" />
      <button className="btn-type1"><IconExpend className="icon-type1" />  </button>
      
       </div>
 


    );
  }
  
  export default ResourceGroup_Action_btns;

