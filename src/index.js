import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route , useLocation } from "react-router-dom";

import DashBoard from './Components/monitoring/DashBoard'
import ResourceGroup from './Components/ResourceGroup/ResourceGroup'
import Login from './Pages/Login'
import SideBar from './SideBar/SideBar'
 
 

export default function App() {

  const [visblePage, set_visblePage] = useState("DashBoard")
  const [show_SideBar, set_show_SideBar] = useState(false)

  return (
<> 
      <div className='app-out' > 
    <BrowserRouter>

    {show_SideBar && <SideBar visblePage={visblePage} set_visblePage={set_visblePage} />  }
    
  
     
      <Routes>
          <Route path="Login" element={<Login   set_show_SideBar={set_show_SideBar}/>} />

          <Route path="ResourceGroup" element={<ResourceGroup show_SideBar={show_SideBar} set_show_SideBar={set_show_SideBar}/>} />
          <Route path="DashBoard"     element={<DashBoard show_SideBar={show_SideBar} set_show_SideBar={set_show_SideBar}/>} />
      </Routes>
    

    </BrowserRouter>|  
     </div>
     </>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


        // <Route path="blogs" element={<Blogs />} />
        //   <Route path="contact" element={<Contact />} />
        //   <Route path="*" element={<NoPage />} />

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
