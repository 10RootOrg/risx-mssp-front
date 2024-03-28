 
import React, { useEffect, useState } from "react";
import '../Components/Features/PopUp.css'; // import CSS file for modal styling
// import CloseButton from "./CloseButton";
import { ReactComponent as CloseButton } from './icons/ico-Close_type1.svg';
import { ReactComponent as IconCart } from './icons/ico-cart.svg';
import axios from 'axios';
import Tools from './../tmpjsons/previewBoxesTools.json';
import GeneralContext from '../Context.js';
import { useContext } from "react";
  export const Edit_Resource_Item = (props) => {
    const {popUp_show, set_popUp_show   ,buttonTitle ,IconBIG ,resourceItem, item_types_list, set_item_types_list ,item_tool_list, set_item_tool_list} = props;

const {all_Resource_Types ,all_Tools} = useContext(GeneralContext)


 
 
 

     const [resource_string, set_resource_string] = useState(resourceItem?.resource_string || '');
  

     const [monitoring, set_monitoring] = useState(resourceItem?.monitoring || '');
     const [description, setDescription] = useState(resourceItem?.description || '');
     const [resource_id, set_resource_id] = useState(resourceItem?.resource_id || '');
     


 
 

     useEffect(() => {
      set_resource_id(resourceItem?.resource_id  || '');
      set_resource_string(resourceItem?.resource_string  || '');
      set_monitoring(resourceItem?.monitoring || '');
      setDescription(resourceItem?.description || '');
    }, [resourceItem]); // Re-initialize state if `resourceItem` changes
  

    const handle_Types_Checkbox_Change = (e, resourceTypeId) => {
      const isChecked = e.target.checked;
      if (isChecked) {
        set_item_types_list([...item_types_list, resourceTypeId]); // Add the resourceTypeId to the array
      } else {
        set_item_types_list(item_types_list.filter(id => id !== resourceTypeId)); // Remove the resourceTypeId from the array
      }

   
    };


    const handle_Tools_Checkbox_Change = (e, ToolId) => {

      console.log(e);
console.log(e.target);
console.log(e.target.checked);
      const isChecked = e.target.checked;
      if (isChecked) {
        set_item_tool_list([...item_tool_list, ToolId]); // Add the resourceTypeId to the array
      } else {
        set_item_tool_list(item_tool_list.filter(id => id !== ToolId)); // Remove the resourceTypeId from the array
      }

   console.log("item_tool_list" , item_tool_list);
    };


// console.log("all_Tools", all_Tools);

    const handleInputChange = (setter) => (event) => setter(event.target.value);

    useEffect(() => {
      set_popUp_show(popUp_show)
    }, [popUp_show]);
  
 

    // function to close modal when user clicks outside of it
    function handleClickOutside(e) {
      console.log("clickoutside");
      console.log("e.target" , e.target);
      console.log("e.target.className" , e.target.className);

      if (e.target.className === 'modal-background') {
   

        set_popUp_show(false);
   
      }
    }
  
    function handleClose() {
      set_popUp_show(false);
 
    }
 



    return (
      <>
   


 {popUp_show && (
          <div className={`PopUp-background  `} onClick={handleClickOutside}>
            
            <div className={`PopUp-content  `} style={{width:"800px"}}>

<div className="display-flex justify-content-end  " style={{marginRight:"-40px"}}>
            <button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
            </div>



 
<div className='display-flex mb-d' ><IconBIG/> <p className='font-type-h4   Color-White ml-b'>Edit Item</p></div>


<div className="items_top_center_buttom">

<div className="items_top">

<div className="items_left">
  
<div 
className="item_info_left"
>
<p className='font-type-menu   Color-Grey1 pb-b'>String</p>
<input className="input-type2 mb-a " type="text"
//  style={{width:"100%"}}
  value={resource_string}      placeholder={resourceItem?.Name || 'Name'}
     onChange={handleInputChange(set_resource_string)}
 />
</div>


 

 <div  className="item_info_left"  style={{width:"" ,height:"100%"}}> 
<p className='font-type-menu   Color-Grey1 '>Description</p>
<textarea  className="input-type2 reading-height  "   style={{width:"" ,height:"100%"}}  value={description}      placeholder={resourceItem?.Description || 'Description'}
     onChange={handleInputChange(setDescription)}
 />
 
 </div>






 
</div>

<div className="item_info_left "> 
<p className='font-type-menu   Color-Grey1 '>Resource Type</p>
<div className="item_info_tools_all">
<div className="">
{all_Resource_Types?.map((Info, index) => {
 
 

    return (

<div key={index} className="toolsData  " style={{width:"180px"}}>
  
  <div className="toolsData-checkbox " >
  <label className="container" > 
  <input type="checkbox"
  value={item_types_list}
//  checked={resourceItem.types.find(type => type.resource_type_id == Info?.resource_type_id)}

 checked={item_types_list.find((type) => type  == Info?.resource_type_id)}
 onChange={(e) => handle_Types_Checkbox_Change(e, Info?.resource_type_id)}
 />
  <span className="checkmark"></span>
  </label>
  </div>

 <div className='  'style={{marginTop:"auto"}}>
 <p className='    font-type-txt   Color-Grey1 tagit_type1 tagit_type2_on_popup' >{Info?.resource_type_name}  </p>  
 </div>

</div>
   
 
    );
  })}
</div>
</div>

 {/* <textarea  className="input-type2 reading-height  "   style={{width:"" }}  value={description}      placeholder={resourceItem?.Description || 'Description'}
     onChange={handleInputChange(setDescription)}
 /> */}
</div>


</div>

 
 























{/* //////////////////// */}

<div className="item_info_tools_all">

<div className="titles mb-c">
<label className="container"> 
<input type="checkbox" defaultChecked />
<span className="checkmark"></span>
</label>
<p className='column font-type-menu   Color-Grey1 column-small'>Name</p>
<p className='column font-type-menu   Color-Grey1 '>Description</p>
<p className='column font-type-menu   Color-Grey1 column-small justify-content-center  mr-b'>Developer</p>
 
</div>

<div className="item_info_tools_box"
 
 > 



<div className="item_info_tools"
 >
 
{all_Tools?.map((Info, index) => {
 
 

    return (

<div className="toolsData  "
>
  

{Info?.ServicePackage  === "Standard" ?(
  <div className="toolsData-checkbox "

  >


 



  <label className="container" > 
  <input type="checkbox"
  value={item_tool_list}
  checked={item_tool_list.find((type) => type == Info?.tool_id    )}
  onChange={(e) => handle_Tools_Checkbox_Change(e,Info?.tool_id)}
  />
  <span className="checkmark"></span>
  </label>
  </div>
  
  
  ):(
    <div style={{  
  // backgroundColor: "red", 
  width: "20px", 
  height: "20px",  
  display: "flex",  
  justifyContent: "center",  
  alignItems: "center",  
  position: "relative",

 }}>
  <IconCart style={{
      // width: "111px",
      // height: "111px", 
      // position: "absolute",
      // top:"-32px",
      // backgroundColor: "yellow",
      zIndex: 22  
  
    }}/>
  </div>
  )}


 <div className='column column-small  '>
  
 <p className='   font-type-txt   Color-Blue-Glow tagit_type1' >{Info?.Tool_name}</p>  

 </div>
 
<p className='column-for-txt font-type-txt     Color-Grey1'>{Info?.description_short}</p>
 
  <div className='column column-small justify-content-center'> 
  <img className='velociraptor-EndpointModules-logo   '          src={Info?.logoAddress_1 ? require(`${Info.logoAddress_1}`) : undefined}></img>
 
  </div>
 
</div>
   
 
    );
  })}

</div>
</div>



 


</div>

<div className="display-flex  ">
 <div className="display-flex  ">
<label className="switch"> <p className='column font-type-menu   Color-Grey1 '>Start Monitoring</p>

  <input type="checkbox" 
 checked={monitoring}
 onChange={()=>set_monitoring(!monitoring)}
  // defaultChecked={Math.random() < 0.7}
   />
  <span className="slider round"></span> 
</label>
</div>



<div style={{marginLeft:"auto" ,display:"flex" ,alignItems:"center", justifyContent:"center", height:"22px"}}>
<p className='column font-type-menu   Color-Grey1 mr-a '  >ID</p>
<p className=' font-type-txt     Color-Grey1'>  {resource_id}</p></div>
</div>

</div>

        <div className='display-flex mt-c' style={{  }}>
 
       <button className="btn-type2" onClick={handleClose} style={{marginLeft:"auto"}}><p className='font-type-menu '>{buttonTitle}</p>  </button>


      </div>

     
            </div>
          </div>)}
    
      </>
    );
  }
  
  