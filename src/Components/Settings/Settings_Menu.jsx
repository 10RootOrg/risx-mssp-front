import "./Settings_Menu.css";

function Settings_Menu({Preview_This_in_menu,  Preview_This_comp ,handle_Click_Btn, set_show_nested ,show_nested }) {


  console.log("Preview_This_comp", Preview_This_comp);


  const sub_menu_options = [
    {
      preview_name: "Main Config",
      value: "Main Config",
      is_nasted: false,
    },
    {
      preview_name: "UI Settings",
      value: "UI Settings",
      is_nasted: false,
    },
    {
      preview_name: "Module paths",
      value: "Module paths",
      is_nasted: false,
      father_comp:''
    },
    {
      preview_name: "Output Sample",
      value: "Output Sample",
      is_nasted: false,
    },
    {
      preview_name: "Portainer",
      value: "Portainer",
      is_nasted: false,
    },
    // {
    //   preview_name: "Backend Log",
    //   value: "Backend Log",
    //   is_nasted: false,
    // },
    // {
    //   preview_name: "Python Main Log",
    //   value: "Python Main Log",
    //   is_nasted: false,
    // },
    // {
    //   preview_name: "Python Interval Log",
    //   value: "Python Interval Log",
    //   is_nasted: false,
    // },
    {
      preview_name: "Users",
      value: "Users",
      is_nasted: false,
    },
    {
      preview_name: "Logs",
      value: "Logs",
      is_nasted: true,
      sub_sub:[
        {
          preview_name: "Backend",
          value: "Backend Log",
          is_nasted: false,
          father_comp:'Logs',
        },
        {
          preview_name: "Python Main",
          value: "Python Main Log",
          is_nasted: false,
          father_comp:'Logs',
        },
        {
          preview_name: "Python Interval",
          value: "Python Interval Log",
          is_nasted: false,
          father_comp:'Logs',
        },
      ]
    },

    
  ];

  return (
<div className="SubMenu-all">
  <div className="SubMenu-in">
    
    {sub_menu_options.map((item, index) =>  { 

const fater_value = item?.value

return(
      <div className="SubMenu-unit" key={index}>
        <button
          disabled={Preview_This_in_menu === item?.value &&  !item?.is_nasted}
          className={`SubMenu-btn ${Preview_This_in_menu === item?.value &&  !item?.is_nasted && "SubMenu-btn-active"}    ${Preview_This_in_menu === item?.value &&  item?.is_nasted && "SubMenu-btn-active-and-clickable"}                     `}
          // onClick={() => {
          //   set_Preview_This_comp(item?.value);
          // }}
          onClick={() => {
            handle_Click_Btn(item?.value , item?.is_nasted ,show_nested ,fater_value);
          }}


          

        >
          <p className="font-type-menu">
            {item?.preview_name}
          </p>
          <div className="SubMenu-gap" />
        </button>

        {item?.is_nasted  &&  show_nested && (
          <div className="SubMenu-submenu" onMouseLeave={()=>set_show_nested(false)} >
 

{item.sub_sub.map((item, index) => (
  
 
  <div className="SubMenu-submenu-item"      onClick={() => {
            handle_Click_Btn(item?.value ,  item?.is_nasted, show_nested  ,fater_value);
          }}
          
  > <p className="font-type-menu" >{item?.preview_name}</p></div>))}


          {/* <div className="SubMenu-submenu">
            <div className="SubMenu-submenu-item"> <p className="font-type-menu" >submenu1</p></div>
            <div className="SubMenu-submenu-item"> <p className="font-type-menu" >sub_sub</p></div>
            <div className="SubMenu-submenu-item"> <p className="font-type-menu" >submenu3</p></div>
          </div> */}

</div>

        )}

      </div>
)})}




    
  </div>
</div>



  
  );
}

export default Settings_Menu;
