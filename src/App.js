import logo from './logo.svg';
import './App.css';
import SideBar from './SideBar/SideBar'
import ResourceGroup from './monitoring/ResourceGroup'


function App() {
  return (


    <div className='app-out' >

       <SideBar/> 

<div className='app-main' >
<ResourceGroup/>
 
</div>




    </div>

    
 
  );
}

export default App;
