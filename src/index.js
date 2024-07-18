import React, { useState ,useContext,useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route  , Navigate  } from "react-router-dom";
import { ContextProvider}from './Context'
// import GeneralContext from './Context';
import SideBar from './SideBar/SideBar'
import Modules from './Components/Modules/Modules'
import ResourceGroup from './Components/ResourceGroup/ResourceGroup'
import Alerts from './Components/Alerts/Alerts_main'

import DashboardResults from './Components/Dashboards/Dashboard_Results'
import DashboardRisx from './Components/Dashboards/Dashboard_Risx'
import DashboardTimesketch from './Components/Dashboards/Dashboard_Timesketch'
import Dashboard_Forensics from './Components/Dashboards/Dashboard_Forensics'


// import Dashboardold from './Components/Dashboards/Dashboard_old'

import Settings from './Components/Settings/Settings'
import Users from './Components/Users/Users'
import Login from './Pages/Login'
import NoPage404 from './Pages/NoPage404'
import TestPage from './Pages/TestPage'
import  Constantfunctions from './Constantfunctions/Constantfunctions'

export default function App() {

  const [visblePage, set_visblePage]  = useState(localStorage.getItem('visiblePage') || 'Modules');
  const [show_SideBar, set_show_SideBar] = useState(false)
  const [notification_number, set_notification_number] = useState(0);
  const [isMainProcessWork, set_isMainProcessWork] = useState(false);
  // const {  backEndURL } = useContext(GeneralContext);

  console.log("visblePage" , visblePage);

  
  return (
<> 
      <div className='app-out' > 
 
 
      <ContextProvider> 
         <BrowserRouter>

    {show_SideBar && <SideBar visblePage={visblePage} set_visblePage={set_visblePage}   notification_number={notification_number} set_notification_number={set_notification_number} isMainProcessWork={isMainProcessWork} />  }

   {visblePage != "login"  && < Constantfunctions  isMainProcessWork={isMainProcessWork}  set_isMainProcessWork={set_isMainProcessWork} /> } 
  
     
      <Routes>
           <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="login"               element={<Login              show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage}/>} />
          <Route path="assets"              element={<ResourceGroup      show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage} />} />
          <Route path="Modules"             element={<Modules            show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage} notification_number={notification_number} />} />
          <Route path="alerts"              element={<Alerts             show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage} notification_number={notification_number} />} />

          


          <Route path="dashboard-general"    element={<DashboardResults    show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage}   set_notification_number={set_notification_number}     />} />
          <Route path="dashboard-risx"       element={<DashboardRisx       show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage}   visblePage={visblePage}  />} />
          <Route path="dashboard-timesketch" element={<DashboardTimesketch show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage}   visblePage={visblePage}  />} />
          <Route path="dashboard-forensics"  element={<Dashboard_Forensics show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage}   visblePage={visblePage}  />} />


          


          <Route path="settings"            element={<Settings           show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage}    set_notification_number={set_notification_number}    isMainProcessWork={isMainProcessWork}  set_isMainProcessWork={set_isMainProcessWork}  />} />
          <Route path="users"               element={<Users              show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage}    set_notification_number={set_notification_number}    isMainProcessWork={isMainProcessWork}  set_isMainProcessWork={set_isMainProcessWork}  />} />
      
          <Route path="TestPage"     element={<TestPage />} />   
          <Route path='*' element={<NoPage404/> }/>
      </Routes>
    

    </BrowserRouter>
    </ContextProvider>  
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
