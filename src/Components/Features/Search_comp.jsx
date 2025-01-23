import React, { useState, useEffect } from 'react';
import { ReactComponent as IconSearch } from '../icons/ico-search.svg';
import { ReactComponent as IconTrash } from '../icons/ico-trash.svg';
import './Search_comp.css';

const  Search_comp = ({ items_for_search, set_items_for_search, filter_string, set_filter_string }) => {
  const [all_items, set_all_items] = useState([]);

  useEffect(() => {
    if (!items_for_search) return;

    // Check if items_for_search is an array or a string
    if (Array.isArray(items_for_search)) {
      if (items_for_search.length > all_items.length) {
        set_all_items(items_for_search);
      }
    } else if (typeof items_for_search === 'string') {
      // Handle the case where items_for_search is a single string
      set_all_items([items_for_search]);
    }
  }, [items_for_search]);

  useEffect(() => {
    if (!filter_string) {
      set_items_for_search(all_items);
      return;
    }

    const filterLower = filter_string.toLowerCase();

    const filteredItems = all_items.filter(item => {
      if (typeof item === 'string') {
        // If the item is a string, check if it includes the filter string
        return item.toLowerCase().includes(filterLower);
      }

      // If the item is an object, check its properties
      for (const key in item) {
        if (
          key === "description_long" ||
          key === "iconAddress" ||
          key === "logoAddress_1" ||
          key === "logoAddress_2" ||
          key === "toolURL" ||
          key === "LastRun" ||
          key === "ServicePackage" ||
          key === "ShowInUi" ||
          key === "Status" ||
          key === "isActive" ||
          key === "threshold_time" ||
          key === "useResourceType" ||
          key === "arguments"
        ) {
          continue;
        }

        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const value = item[key];
          if (typeof value === 'string' && value.toLowerCase().includes(filterLower)) {
            return true; // If the filter_string is found in any property, return true to include the item in the filtered list
          }
        }
      }
      return false; // If no property contains the filter_string, exclude the item from the filtered list
    });

    set_items_for_search(filteredItems);
  }, [filter_string, all_items, set_items_for_search]);

  const handleClearFilter = () => {
    set_filter_string('');
    // Clear the input field value
    const inputField = document.querySelector('.search_filter');
    if (inputField) {
      inputField.value = '';
    }
  };

  return (
    <div className='resource-group-Right-Action_btns '
    style={{ position: "relative",  }}
    >
      <input
        className="input-type1 search_filter "
        placeholder="Search"
        onChange={  (e) => set_filter_string(e.target.value)}
      />
      <div
        className='search_filter-btns'
        style={{ position: "absolute", right: "2px", display: "flex", alignItems: "center", height: "auto" }}
      >
        {document?.querySelector('.search_filter')?.value === "" ? (
          <IconSearch className="icon-type1 icon-type1-smaller" />
        ) : (
          <button className="btn-type1 btn-type1-smaller" onClick={handleClearFilter}>
            <IconTrash className="icon-type1 icon-type1-smaller" />
          </button>
        )}
      </div>
    </div>
  );
}

const  Search_comp_for_logs = ({ log_data, set_log_data,set_preview_data, preview_data }) => {
  const [filter_string,   set_filter_string] = useState("");
 
    useEffect(() => {
      if (!filter_string){set_preview_data(log_data); return }

      else{
        const filterLogLinesString = filterLogLines(log_data, filter_string)
        if(filterLogLinesString){set_preview_data(filterLogLinesString)}
       else{set_preview_data("No Results For this Filter..")}
      }
    }, [filter_string]);
 

  function filterLogLines(log_data, filter_string) {
    // Split the log text into lines
    const lines = log_data.split('\n');
    
    // Filter lines that contain the substring (case-insensitive)
    const filteredLines = lines.filter(line => line.toLowerCase().includes(filter_string.toLowerCase()));
    
    // Join the filtered lines back into a single string
    return filteredLines.join('\n');
  }


  const filteredLog = filterLogLines(log_data, "Number");
  console.log("filteredLog" , filteredLog);

  const handleClearFilter = () => {
   set_filter_string('');
    // Clear the input field value
    // const inputField = document.querySelector('.search_filter');
    // if (inputField) {
    //   console.log(" inputField " , inputField );

    //   console.log(" inputField.value " , inputField.value );

    //   inputField.value = '';
    // }
  };



  return (
    <div className='resource-group-Right-Action_btns '
    style={{ position: "relative",  }}
    >
      <input
        className="input-type1 search_filter "
        placeholder="Search"
        onChange={(e) => set_filter_string(e.target.value)}
        value={filter_string}  

       />
      <div
        className='search_filter-btns'
        style={{ position: "absolute", right: "2px", display: "flex", alignItems: "center", height: "auto" }}
      >
        {!filter_string ? (
          <IconSearch className="icon-type1 icon-type1-smaller" />
        ) : (
          <button className="btn-type1 btn-type1-smaller"
           onClick={()=>handleClearFilter()}
           >
            <IconTrash className="icon-type1 icon-type1-smaller" />
          </button>
        )}
      </div>
    </div>
  );
}

 



export {Search_comp,Search_comp_for_logs} ;
