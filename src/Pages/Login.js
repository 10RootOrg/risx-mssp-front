import React , {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as RisxMsspLogo } from '../Components/Logos/RisxMssp_logo_Standart.svg';
 
import { ReactComponent as IcoKey } from '../Pages/Login/Images/ico-login-key.svg';
import { ReactComponent as IcoUser } from '../Pages/Login/Images/ico-login-user.svg';

import { ReactComponent as Login_circle } from '../Pages/Login/Images/Login_circle.svg';
import { ReactComponent as Login_bar } from '../Pages/Login/Images/Login_bar.svg';


/// png & svg logos  
import Logo1 from '../Pages/Login/Images/OPENCTI.png';
import { ReactComponent as Logo2 } from '../Pages/Login/Images/TLSH.svg';
import { ReactComponent as Logo3 } from '../Pages/Login/Images/Kitty.svg';
import { ReactComponent as Logo4 } from '../Pages/Login/Images/10Root.svg';

import Logo5 from '../Pages/Login/Images/CAPE.png';
import { ReactComponent as Logo6 } from '../Pages/Login/Images/Velociraptor.svg';
import { ReactComponent as Logo7 } from '../Pages/Login/Images/Zircolite.svg';
import { ReactComponent as Logo8 } from '../Pages/Login/Images/Elasticsearch.svg';

import Logo9 from '../Pages/Login/Images/MISP.png';
import { ReactComponent as Logo10 } from '../Pages/Login/Images/dehashed.svg';
import { ReactComponent as Logo11 } from '../Pages/Login/Images/Nuclei.svg';
import { ReactComponent as Logo12 } from '../Pages/Login/Images/ELK.svg';

import Logo13 from '../Pages/Login/Images/Hasher.png';
import { ReactComponent as Logo14 } from '../Pages/Login/Images/Timesketch.svg';
 


import  './Login.css'
// import { PreviewBox_type1, PreviewBox_type2 ,PreviewBox_type_tools_a,PreviewBox_type_tools_b,PreviewBox_type_tools_big} from '../PreviewBoxes.js'
 
// import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
 
 
 
 
function Login({ set_show_SideBar}) {

const [InputUser, set_InputUser] = useState("");
const [InputPassword, set_InputPassword] = useState("");

const necessaryUser1  = "DorAmit"
const necessaryUser2  = "YanivR"
const [necessaryPassword , set_necessaryPassword] = useState("123");
const [errorMessage , set_errorMessage] = useState("");


///for logo animation
const [activeGroup, setActiveGroup] = useState('logoBulk1');
 
  
  const navigate = useNavigate();

    useEffect(() => {
      set_show_SideBar(false) 
        }, []);
      
        const handlePasswordChange = (event) => {
          set_InputPassword(event.target.value);  
        };

        const handleUserChange = (event) => {
          set_InputUser(event.target.value);  
        };


const handleClick = (event) => {

  event.preventDefault(); // Prevent form submission and page reload
  set_errorMessage("")
if ( necessaryUser1 === InputUser  && necessaryPassword === InputPassword) {
  navigate(`/${"dashboard"}`);  
}

else if ( necessaryUser2 === InputUser  && necessaryPassword === InputPassword) {
  navigate(`/${"dashboard"}`);  
}


else{
  set_errorMessage("Username or Password Incorrect")
}

         
        };
        

        useEffect(() => {
          let nextGroup = 'logoBulk1';
          const interval = setInterval(() => {
            setActiveGroup(''); // Temporarily clear the active group to hide all
      
            setTimeout(() => {
              // Determine the next group
              if (nextGroup === 'logoBulk1') nextGroup = 'logoBulk2';
              else if (nextGroup === 'logoBulk2') nextGroup = 'logoBulk3';
              else if (nextGroup === 'logoBulk3') nextGroup = 'logoBulk4';
              else if (nextGroup === 'logoBulk4') nextGroup = 'logoBulk1';
              setActiveGroup(nextGroup); // Set the next group as active
            }, 500); // This timeout should match the fade-out animation duration
          }, 3000); // Total cycle duration
      
          return () => clearInterval(interval);
        }, []);

    return (
 
<>

<div className='login-page-all'> 

<div className='login-left-design'>


<Login_circle style={{
  position: "absolute",
  left: "0", 
  top: "0", 
  transform: "translate(-50%, -50%)",
  width: "35vw", 
  height: "35vw" 
   }}/> 

<div className='login-marketing-center'  style={{maxWidth:"740px"}}>
<h1 className='font-type-h1    Color-Grey5 mb-c'  style={{fontWeight:"600"}}><span className='Color-Blue-Glow'>All-in-one </span>Mssp for improved,<br/>  streamlined Cybersecurity</h1>
<h2 className='font-type-h5 reading-height-less Color-Grey5 mb-e' >Alongside our services, benefit from advanced risk management capabilities, sophisticated threat detection, proactive measures against attacks, and continuous monitoring to prevent data breaches and operational disruptions</h2>

<div className="logosBox-out  ">


<div className={`logosBox-in logoBulk1 ${activeGroup === 'logoBulk1' ? 'show fade-in' : 'fade-out'}`}>
<img src={Logo1} alt="OPENCTI" className='logos' /> 
<Logo2 className='logos'/>
<Logo3 className='logos'/>
<Logo4 className='logos'/>
  </div>

  <div className={`logosBox-in logoBulk2 ${activeGroup === 'logoBulk2' ? 'show fade-in' : 'fade-out'}`}>
<img src={Logo5} alt="CAPE" className='logos' /> 
<Logo6 className='logos'/>
<Logo7 className='logos'/>
<Logo8 className='logos'/>
  </div>

  <div className={`logosBox-in logoBulk3 ${activeGroup === 'logoBulk3' ? 'show fade-in' : 'fade-out'}`}>
<img src={Logo9} alt="MISP" className='logos' /> 
<Logo10 className='logos'/>
<Logo11 className='logos'/>
<Logo12 className='logos'/>
  </div>

  <div className={`logosBox-in logoBulk4 ${activeGroup === 'logoBulk4' ? 'show fade-in' : 'fade-out'}`}>
<img src={Logo13} alt="Hasher" className='logos' /> 
<Logo14 className='logos'/>
  </div>



</div>


</div>


</div>
 

 

<div className='login-right-design'> 


 <form className="login-form" >

<div className='mb-c' style={{width:"100%" ,  textAlign:"center"}}>  <RisxMsspLogo style={{height:"auto", width:"154px" }}/></div>


<p className='font-type-menu   Color-Grey1  ' >Login</p>

<div className="input-wrapper">
    <IcoUser />
    <input className="input-type2 mb-a " type="text"  value={InputUser}  onChange={handleUserChange}  placeholder="UserName" />
  </div>
  <div className="input-wrapper">
    <IcoKey />
    <input className="input-type2 mb-a " type="password"  value={InputPassword}  onChange={handlePasswordChange}   placeholder="PassWord"  />
  </div>


 
  
 
<label className="container mb-a"> 
<input type="checkbox" defaultChecked />
<span className="checkmark "> </span>
<p className='font-type-txt  Color-Grey1  ' style={{marginTop:"1px", marginLeft:"7px"  }}>Remember me</p>

</label>
 

{/* <div style={{width:"100%" ,textAlign:"center"  }} className="mt-a "> */}


<div>
<button className="btn-type2 "
 style={{
  height:"40px" ,width:"100%"
  // paddingRight:"60px" ,paddingLeft:"45px"
 }} 
  onClick={handleClick}><p className='font-type-menu '>Log in</p>  </button> 
<p className='font-type-txt   Color-Red  ' style={{height:"20px", marginBottom:"-4px" ,marginTop:"2px"}}>{errorMessage}</p>

</div>

{/* </div> */}



<div
//  style={{  textAlign:"center" }}
 >
 
 <div>
 <p className='font-type-txt  make-underline-regular-txt Color-Grey1   '>No account yet? Sign Up</p>
 </div>
 <div>
 <p className='font-type-txt  make-underline-regular-txt Color-Grey1  '>Forgot Password?</p>
 </div>

 </div>


</form>


<Login_bar style={{
  position: "absolute",
  left: "-92px", 
  bottom: "0",
  transform: "translate(-50%, 0)",
  // width: "370px",
  height: "",
 
   }}/> 

</div>






</div>
 
 
 
</>


    );
  }
  
  export default Login;

