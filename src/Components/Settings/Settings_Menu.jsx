import "./Settings_Menu.css";

function Settings_Menu({ setMenuSelector, MenuSelector }) {
  const sub_menu_options = [
    {
      preview_name: "Config Files",
      value: "Config Files",
    },
    {
      preview_name: "UI Settings",
      value: "UI Settings",
    },
    {
      preview_name: "Modules paths",
      value: "Modules paths",
    },
    {
      preview_name: "Output Sample",
      value: "Output Sample",
    },
    {
      preview_name: "Portainer",
      value: "Portainer",
    },
    {
      preview_name: "Backend Log",
      value: "Backend Log",
    },
    {
      preview_name: "Python Main Log",
      value: "Python Main Log",
    },
    {
      preview_name: "Python Interval Log",
      value: "Python Interval Log",
    },
  ];

  return (
    <div className="SubMenu-all">
      <div className="SubMenu-in" >
        {sub_menu_options.map((item, index) => (
          <button
            disabled={MenuSelector == item?.value}
            className="SubMenu-btn"
            key={index}
            onClick={() => {
              setMenuSelector(item?.value);
            }}
          >
            <p className="font-type-menu">{item?.preview_name}</p>
            <div className="SubMenu-gap" />
            {/* <span className="SubMenu-gap    font-type-txt Color-Grey2"> |</span> */}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Settings_Menu;
