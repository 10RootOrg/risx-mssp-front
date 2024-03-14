
import React, { useState } from 'react';
import './SideBar.css';

function SideBar({set_visblePage}) {




const handleClick = (page_name) => {
  set_visblePage(page_name);
};

 
    return (
 

      <div className='side-bar-out'>
     <p > SideBar </p>

<input type='button' value='DashBoard' onClick={()=>handleClick("DashBoard")} ></input>
<input type='button' value='ResourceGroup' onClick={()=>handleClick("ResourceGroup")} ></input>
      </div>
     
 
    );
  }
  
  export default SideBar;