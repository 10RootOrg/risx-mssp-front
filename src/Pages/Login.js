import React , {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import  './Login.css'
// import { PreviewBox_type1, PreviewBox_type2 ,PreviewBox_type_tools_a,PreviewBox_type_tools_b,PreviewBox_type_tools_big} from '../PreviewBoxes.js'
 
// import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
 
 
 
 
function Login({ set_show_SideBar}) {

    useEffect(() => {
      set_show_SideBar(false) 
        }, []);
      
    return (
 
<>

<div className='login-page-all'> 

 
<div className='login-card'> 


 <form className="login-form" >
<p className='font-type-menu   Color-Grey1  '>Login</p>
<input className="input-type1  " placeholder="UserName" />
<input className="input-type1  " placeholder="UserName" />

{/* display-flex justify-content-center align-items-center */}
 
<label className="container "> 
<input type="checkbox" defaultChecked />
<span className="checkmark "> </span>
<p className='font-type-very-sml-txt   Color-Grey1  ' style={{marginTop:"4px", marginLeft:"8px" , marginBottom:"3px"}}>Loginssssssss</p>

</label>
 

</form>

</div>


</div>
 
 
 
</>


    );
  }
  
  export default Login;

