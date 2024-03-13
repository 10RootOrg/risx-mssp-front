
import './App.css';
import SideBar from './SideBar/SideBar'
import ResourceGroup from './Components/ResourceGroup/ResourceGroup'
import DashBoard from './Components/monitoring/DashBoard'

function App() {
  return (


    <div className='app-out' >

       <SideBar/> 

<div className='app-main' >
<DashBoard/>
{/* <ResourceGroup/> */}
 
</div>




    </div>

    
 
  );
}

export default App;
