import React, { useState ,useContext,useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route  , Navigate  } from "react-router-dom";
import { ContextProvider}from './Context'
import GeneralContext from './Context';
import SideBar from './SideBar/SideBar'
import DashBoard from './Components/monitoring/DashBoard'
import ResourceGroup from './Components/ResourceGroup/ResourceGroup'
import Results from './Components/Results/Results'
import Settings from './Components/Settings/Settings'
import Users from './Components/Users/Users'
import Login from './Pages/Login'
import NoPage404 from './Pages/NoPage404'
import TestPage from './Pages/TestPage'
import  Constantfunctions from './Constantfunctions/Constantfunctions'

export default function App() {

  const [visblePage, set_visblePage]  = useState(localStorage.getItem('visiblePage') || 'Dashboard');
  const [show_SideBar, set_show_SideBar] = useState(false)
  const [notification_number, set_notification_number] = useState(0);
  const [isMainProcessWork, set_isMainProcessWork] = useState(false);
  // const {  backEndURL } = useContext(GeneralContext);

 

  
  return (
<> 
      <div className='app-out' > 
 
    
      <ContextProvider> 
         <BrowserRouter>

    {show_SideBar && <SideBar visblePage={visblePage} set_visblePage={set_visblePage}notification_number={notification_number} set_notification_number={set_notification_number} isMainProcessWork={isMainProcessWork} />  }
    < Constantfunctions  isMainProcessWork={isMainProcessWork}  set_isMainProcessWork={set_isMainProcessWork} />
  
     
      <Routes>
           <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="login" element={<Login                  show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar}/>} />
          <Route path="resourcegroup" element={<ResourceGroup  show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage} />} />
          <Route path="dashboard"     element={<DashBoard      show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage} notification_number={notification_number} />} />
          <Route path="results"      element={<Results         show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage}   set_notification_number={set_notification_number}     />} />
          <Route path="settings"      element={<Settings       show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage}    set_notification_number={set_notification_number}    isMainProcessWork={isMainProcessWork}  set_isMainProcessWork={set_isMainProcessWork}  />} />
          <Route path="users"         element={<Users          show_SideBar={show_SideBar}    set_show_SideBar={set_show_SideBar} set_visblePage={set_visblePage}    set_notification_number={set_notification_number}    isMainProcessWork={isMainProcessWork}  set_isMainProcessWork={set_isMainProcessWork}  />} />

 

      
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
