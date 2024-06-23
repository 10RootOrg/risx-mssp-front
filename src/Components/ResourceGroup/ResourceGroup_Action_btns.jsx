import React, { useState,useEffect } from 'react'
 
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import { ReactComponent as IconPlus } from '../icons/ico-plus.svg';
import { ReactComponent as IconTrash } from '../icons/ico-trash.svg';
import { ReactComponent as IconSettings } from '../icons/ico-settings.svg';
import { ReactComponent as IconExpend } from '../icons/ico-expend.svg';
import { ReactComponent as IconLine } from '../icons/ico-line.svg';
function ResourceGroup_Action_btns({
  set_popUp_Add_or_Edit__show,
  popUp_Add_or_Edit__show ,
  set_popUp_Add_or_Edit__status,

  set_item_types_list,
  set_item_tool_list,
  items_for_search,  set_items_for_search,

  show_btn_add
}) {

 
const [filter_string , set_filter_string] = useState("");
const [all_items , set_all_items] = useState([]);


useEffect(() => {
if(items_for_search?.length  === undefined){return}
if(all_items?.length  === undefined){return}

if(items_for_search?.length > all_items?.length){
  set_all_items(items_for_search); 
}


  }, [items_for_search ])








  const  add_resource_item = () =>{
    console.log("add_resource_item");

    set_item_types_list([])
    set_item_tool_list([])
  
    set_popUp_Add_or_Edit__status("add")
    set_popUp_Add_or_Edit__show(true)
    }







useEffect(() => {

console.log("all_items" , all_items);
 
const filteredItems = all_items.filter(item => {
  const filterLower = filter_string.toLowerCase();
  for (const key in item) {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      const value = item[key];
      if (typeof value === 'string' && value.toLowerCase().includes(filterLower)) {
        return true; // If the filter_string is found in any property, return true to include the item in the filtered list
      }
    }
  }
  return false; // If no property contains the filter_string, exclude the item from the filtered list
});


  set_items_for_search(filteredItems)

  console.log("filteredItems", filteredItems);
}, [filter_string])





    return (
 
      <div className='resource-group-Right-Action_btns'>
      <input className="input-type1 mr-a" placeholder="Search"     onChange={(e) => set_filter_string(e.target.value)} />
      <button className="btn-type1"><IconSearch className="icon-type1" />  </button>


      {show_btn_add&& <button className="btn-type1" onClick={()=>add_resource_item()}><IconPlus className="icon-type1" /></button>}
      <button className="btn-type1"><IconTrash className="icon-type1" />  </button>
      <button className="btn-type1"><IconSettings className="icon-type1" />  </button>
      <IconLine className="icon-type1" />
      <button className="btn-type1"><IconExpend className="icon-type1" />  </button>
     
       </div>
 


    );
  }
  
  export default ResourceGroup_Action_btns;

