import React, { useState,useEffect } from 'react'
 
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import { ReactComponent as IconTrash } from '../icons/ico-trash.svg';
import './Search_comp.css'
function Search_comp({items_for_search,  set_items_for_search,}) {
 
const [filter_string , set_filter_string] = useState("");
const [all_items , set_all_items] = useState([]);

useEffect(() => {
if(items_for_search?.length  === undefined){return}
if(all_items?.length  === undefined){return}

if(items_for_search?.length > all_items?.length){
  set_all_items(items_for_search); 
}

  }, [items_for_search ])





useEffect(() => {

console.log("all_items" , all_items);
 
const filteredItems = all_items.filter(item => {
  const filterLower = filter_string.toLowerCase();
  for (const key in item) {
if (
  key === "description_long" ||
  key === "iconAddress" ||
  key === "logoAddress_1" ||
  key === "logoAddress_2"  ||
  key === "toolURL"  ||
  key === "LastRun" ||
  key === "ServicePackage" ||
  key === "ShowInUi"  ||
  key === "Status" ||
  key === "isActive"  ||
  key === "threshold_time"  ||
  key === "toolURL"  ||
  key === "useResourceType"  ||
  key === "arguments"  
 
){return}

    
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

  console.log("filteredItems", filteredItems  , filteredItems?.length);
}, [filter_string])

const handleClearFilter = () => {
  set_filter_string('');
  // Clear the input field value
  const inputField = document.querySelector('.search_filter');
  if (inputField) {
    inputField.value = '';
  }
};


    return (
 
      <div className='resource-group-Right-Action_btns'>
      <input className="input-type1 search_filter mr-a" placeholder="Search"     onChange={(e) => set_filter_string(e.target.value)} />


      {/* marginLeft:"-35px" , */}
      <div className='search_filter-btns' style={{ position: "absolute", right: "25px" , display: "flex", alignItems: "center", height: "100%"}}>
  
    {document?.querySelector('.search_filter')?.value === "" ? (
      <IconSearch className=" icon-type1 icon-type1-smaller" />
    ) : (
      <button className="btn-type1  btn-type1-smaller" onClick={handleClearFilter}   >
        <IconTrash className="icon-type1 icon-type1-smaller"   /> 
      </button>
    )}
 
</div>





     
       </div>
 


    );
  }
  
  export default Search_comp;

     {/* <button className="btn-type1"><IconSearch className="icon-type1" />  </button> */}
      {/* <button className="btn-type1" onClick={()=>add_resource_item()}><IconPlus className="icon-type1" /></button>
      <button className="btn-type1"><IconTrash className="icon-type1" />  </button>
      <button className="btn-type1"><IconSettings className="icon-type1" />  </button>
      <IconLine className="icon-type1" />
      <button className="btn-type1"><IconExpend className="icon-type1" />  </button> */}