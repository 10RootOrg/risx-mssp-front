import './fonts.css';
import './App.css';
import SideBar from './SideBar/SideBar'
import ResourceGroup from './Components/ResourceGroup/ResourceGroup'
import DashBoard from './Components/monitoring/DashBoard'
import React, { useState } from 'react';







function App() {
  const [visblePage, set_visblePage] = useState("Dashboard")

  return (


    <div className='app-out' >

<SideBar visblePage={visblePage} set_visblePage={set_visblePage}/> 


<div className='app-main' >
{visblePage === "Dashboard" &&  <DashBoard/>}
{visblePage === "ResourceGroup" &&  <ResourceGroup/>}
</div>




    </div>

    
 
  );
}

export default App;
