
import './Settings_Menu.css';

function Settings_Menu() {

const sub_menu_options = [
{   
preview_name:'Config Files',
value:'Config Files'
},
{   
preview_name:'UI Settings',
value:'UI Settings'
},
{   
preview_name:'Modules paths',
value:'Modules paths'
},
{   
  preview_name:'Output Sample',
  value:'Output Sample'
  },
 
  {   
    preview_name:'Backend Log',
    value:'Backend Log'
    },
   
     
  {   
    preview_name:'Users',
    value:'Users'
    },
   
 


]


    return (
      <div className="SubMenu-all">

         <div className="SubMenu-in">


      {    sub_menu_options.map((item,index)=>
 

 
<button  className="SubMenu-btn" key={index}> 
 
< p className="font-type-menu">{item?.preview_name}</p>
<div className="SubMenu-gap"/>
{/* <span className="SubMenu-gap    font-type-txt Color-Grey2"> |</span> */}

</button >
 
)
}

         </div>
     
      </div>
    );
  }
  
  export default Settings_Menu;
  