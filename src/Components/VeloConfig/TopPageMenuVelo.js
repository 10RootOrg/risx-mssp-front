import "./../Settings/Settings_Menu.css";

function TopPageMenuVelo({ Preview_This_in_menu, handle_Click_Btn ,sub_menu_options}) {


  return (
    <div className="SubMenu-all">
      <div className="SubMenu-in">
        {sub_menu_options.map((item, index) => {
          const fater_value = item?.value;

          return (
            <div className="SubMenu-unit" key={index}>
              <button
                disabled={
                  Preview_This_in_menu === item?.value && !item?.is_nasted
                }
                className={`SubMenu-btn ${
                  Preview_This_in_menu === item?.value &&
                  !item?.is_nasted &&
                  "SubMenu-btn-active"
                }    ${
                  Preview_This_in_menu === item?.value &&
                  item?.is_nasted &&
                  "SubMenu-btn-active-and-clickable"
                }                     `}
          
                onClick={() => {
                  handle_Click_Btn(item?.value, item?.is_nasted, fater_value);
                }}
              >
                <p className="font-type-menu">{item?.preview_name}</p>
                <div className="SubMenu-gap" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopPageMenuVelo;
