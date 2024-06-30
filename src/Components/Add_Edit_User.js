 
import React, { useEffect, useState } from "react";
import '../Components/PopUp.css'; // import CSS file for modal styling
// import CloseButton from "./CloseButton";
import { ReactComponent as CloseButton } from './icons/ico-Close_type1.svg';
import { ReactComponent as IconCart } from './icons/ico-cart.svg';
import axios from 'axios';
// import Tools from '../tmpjsons/previewBoxesTools.json';
import { ReactComponent as IconTrash } from '../Components/icons/ico-trash.svg';
import GeneralContext from '../Context.js';
import { useContext } from "react";
  export const Add_Edit_User = (props) => {
    const {popUp_show,
       set_popUp_show
          ,IconBIG
           ,resourceItem,
             set_resourceItem,
             user_Info,
        
                  item_tool_list,
        
                    popUp_Add_or_Edit__status,
                    set_filter_Resource, 
                    set_PopUp_All_Good__txt,
                    set_PopUp_All_Good__show,
                    Preview_this_Resource,
                    set_Preview_this_Resource,
    
                    set_PopUp_Are_You_Sure__txt,
                    set_PopUp_Are_You_Sure__show
                  } = props;

const {   backEndURL,get_all_resource_types} = useContext(GeneralContext)


 

     const [user_name, set_user_name] = useState(user_Info?.user_name || '');
     const [email, set_email] = useState(user_Info?.email || '');



     
    //  const [monitoring, set_monitoring] = useState(resourceItem?.monitoring === 1 ? true : false);
 
 
     const [error_message, set_error_message] = useState("");
 
  

 console.log("user_Info",user_Info);

     const Handele_are_you_sure =( ) =>{
 
    set_popUp_show(false) /// the add adit popup
      
      set_PopUp_Are_You_Sure__txt({
          HeadLine:"Are you sure you want to delete?",
          paragraph:"This record will be permanently deleted from the database",
          buttonTrue:"Yes",
          buttonFalse:"No"
        });
        
        set_PopUp_Are_You_Sure__show(true)
      }
      

  
 

//     const handle_Tools_Checkbox_Change = (e, ToolId) => {

//       console.log(e);
// console.log(e.target);
// console.log(e.target.checked);
//       const isChecked = e.target.checked;
//       if (isChecked) {
//         set_item_tool_list([...item_tool_list, ToolId]); // Add the resourceTypeId to the array
//       } else {
//         set_item_tool_list(item_tool_list.filter(id => id !== ToolId)); // Remove the resourceTypeId from the array
//       }

//    console.log("item_tool_list" , item_tool_list);
//     };


//     const change_tools_preview_acording_asset_types=()=>{
// if(item_types_list.length === 0 ){ set_tools_preview([]); return}


// const filtered_tools = all_Tools.filter(tool =>
//   item_types_list.some(item_type =>
//       tool.useResourceType.includes(item_type)
//   )
// );
// set_tools_preview(filtered_tools);
// console.log("filtered_tools",  filtered_tools);


//     }

    // useEffect(() => { change_tools_preview_acording_asset_types(); }, [item_types_list]);

 
// console.log("all_Tools", all_Tools);

    const handleInputChange = (setter) => (event) => setter(event.target.value);
    useEffect(() => {  set_popUp_show(popUp_show) }, [popUp_show]);
  
 

    // function to close modal when user clicks outside of it
    function handleClickOutside(e) {
      // console.log("e.target.className" , e.target.className);
       if (e.target.className === 'PopUp-background') { set_popUp_show(false); } }
  
    function handleClose() {
      set_popUp_show(false);
 
    }
 

    // async function getAllCountriesWithStates() {
    //   try {
    //     const response = await axios.get('https://restcountries.com/v3.1/all');
    //     const countries = response.data;
    

    //     console.log("countries", countries);
    //     // Extract countries with states/provinces
    //     const countriesWithStates = countries
    //       .filter(country => country.hasOwnProperty('states'))
    //       .map(country => ({
    //         countryName: country.name.common,
    //         states: Object.values(country.states).map(state => state.name)
    //       }));
    
    //     return countriesWithStates;
    //   } catch (error) {
    //     console.error('Error fetching countries:', error.message);
    //     throw error; // Handle or propagate the error as needed
    //   }
    // }
    // useEffect(() => {getAllCountriesWithStates()
    //   .then(countries => console.log('Countries with states:', countries))
    //   .catch(error => console.error('Error:', error.message)); }, []);

    



    function handle_add_or_edit_item(){
      // popUp_Add_or_Edit__status

      const data = {
// "resource_id": resource_id,
"user_name": user_name,
"email": email ,
 
      }
 
 

 
      if(popUp_Add_or_Edit__status == "add"){ 
        console.log("data to add =============== ",data);
        const add_resource = async()=>{
          try{
            set_error_message("")
              const res = await axios.post(`${backEndURL}/resources`,data );

if(res){console.log("ssssssssssssss popUp_Add_or_Edit__status sssssssssssssssssssss",res.data);}

              if (res?.status === 200){ 
                console.log("res.data" , res.data[0]);
               set_filter_Resource({type_ids:[],tool_ids:[]})// for not have mistakealso will pull all list
               get_all_resource_types(); // for count again

               set_popUp_show(false) // close this popup
               set_PopUp_All_Good__txt({ HeadLine:"Successfully Saved", paragraph:"The resource has been successfully saved in the database.", buttonTitle:"Close"})
               set_PopUp_All_Good__show(true)



                 }} catch(err){ 
                    console.log(  err?.response?.data);  set_error_message(err?.response?.data)        }  }
              add_resource();     

      }
    
    
    
     else if(popUp_Add_or_Edit__status == "edit"){
      console.log("data to edit =============== ",data);

   const edit_Resouce = async()=>{
    try{
      set_error_message("")
        const res = await axios.put(`${backEndURL}/resources`,data );
        if (res?.status === 200){ 

// update the object 
set_filter_Resource({type_ids:[],tool_ids:[]})// for not have mistakealso will pull all list
set_popUp_show(false) // close this popup
set_PopUp_All_Good__txt({ HeadLine:"Successfully Updated", paragraph:"The resource has been successfully update in the database.", buttonTitle:"Close"})
set_PopUp_All_Good__show(true)





           }} catch(err){ 
              console.log(  err?.response?.data);  set_error_message(err?.response?.data)        }  }
              edit_Resouce();     
 


      }
    


    }


 
    useEffect(() => {
      if(popUp_Add_or_Edit__status == "add"){
        set_user_name("");
        set_email("");
 
      }

     else if(popUp_Add_or_Edit__status == "edit"){
 
      set_user_name(user_Info?.user_name  || '');
      set_email(user_Info?.email  || '');
 
      }
   



    }, [ popUp_Add_or_Edit__status]); // Re-initialize state if `resourceItem` changes
  
 
       
 
     

    return (
      <>
   


 {popUp_show && (
          <div className={`PopUp-background`} onClick={handleClickOutside}>
            
            <div className={`PopUp-content`} style={{width:"800px"}}>

<div className="display-flex justify-content-end  " style={{marginRight:"-40px"}}>
            <button className="PopUp-Close-btn" onClick={handleClose} ><CloseButton className="PopUp-Close-btn-img"/> </button>
            </div>



 
<div className='display-flex mb-d' ><IconBIG/> <p className='font-type-h4   Color-White ml-b'>
  {popUp_Add_or_Edit__status === "add" ? (<>Add User</>):(<>Edit User</> )} </p>
  
  
  
  
  </div>


<div className="items_top_center_buttom">

<div className="items_top">

<div className="items_left">
  
<div 
className="item_info_left"
>

<div>
<p className='font-type-menu   Color-Grey1 pb-b'>User Name</p>
<input className="input-type2 mb-a " type="text" value={user_name}      placeholder={user_Info?.Name || 'Choose Name'} onChange={handleInputChange(set_user_name)}/>
</div>

<div>
<p className='font-type-menu   Color-Grey1 pb-b'>Email</p>
<input className="input-type2 mb-a " type="text" value={email}      placeholder={user_Info?.email || 'Enter Valid Email'} onChange={handleInputChange(set_email)}/>
</div>




</div>




 {/* <div  className="item_info_left"  style={{width:"" ,height:"100%"}}> 
<p className='font-type-menu   Color-Grey1 '>Description</p>
<textarea  className="input-type2 reading-height  "   style={{width:"" ,height:"100%"}}  value={description}      placeholder={resourceItem?.Description || 'Description'}
     onChange={handleInputChange(setDescription)}
 />
 
 </div> */}






 
</div>
 


</div>

 
 


 





{/* //////////////////// */}
 

  <div className="display-flex  ">
 




</div>  

</div>




        <div className='display-flex  mt-c' style={{     }}>
          <div style={{   marginLeft:"auto"  }}/> 
          {error_message === "" ? null :(  <p className='  font-type-menu   Color-Red  mr-b' >{error_message}</p>)}
      

          <div style={{marginLeft:"auto" ,display:"flex" ,alignItems:"center", justifyContent:"center", height:"22px"}}>
{popUp_Add_or_Edit__status === "edit" ? (<>
  <p className='column font-type-menu   Color-Grey1 mr-a '  >ID</p>
<p className=' font-type-txt     Color-Grey1'>  {user_Info?.user_id}</p>

</>):null}


</div>

        {popUp_Add_or_Edit__status === "edit" &&     <button className="btn-type1"style={{marginRight:"5px"}} onClick={Handele_are_you_sure}>
       
          
          <IconTrash className="icon-type1" />  </button>   }     
       <button className="btn-type2" onClick={handle_add_or_edit_item}  ><p className='font-type-menu '>{popUp_Add_or_Edit__status === "add" ? (<>Save</>):(<>Update</> )}</p></button>
     

      </div>

     
            </div>
          </div>)}
    
      </>
    );
  }
  
  