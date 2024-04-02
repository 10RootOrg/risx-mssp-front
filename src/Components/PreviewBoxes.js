import React , {useState , useEffect} from 'react';
 import { ReactComponent as IconLastRun } from './icons/ico-lastrun.svg';
 import { ReactComponent as IconReadMore } from './icons/ico-readmore.svg';
 import { PopUp_For_Read_More , PopUp_For_Nuclei_data , PopUp_For_Dehashed_data} from "./Features/PopUpSmart.js";


import  Counter  from './Features/AnimationCounter.js'
 import TmpChart2 from '../tmpjsons/tempChart.png'; 
 
//  onClick={()=>handleReadMore("the_tool_info")} 

     

import './PreviewBoxes.css';
 

const openInNewTab = (toolURL) => {
  const newWindow = window.open(toolURL, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}








function PreviewBox_type1({
HeadLine,BigNumber,
SmallNumber,StatusColor,
date, resource_type_id ,
description_short,
filter_Resource,
set_filter_Resource,
 
 
}) {
 
  const [isHovered, setIsHovered] = useState(false);
  const [is_Filtering, set_is_Filtering] = useState(false);

  useEffect(() => { 

    console.log("change--999" , filter_Resource?.type_ids?.length === 0 );
        if (filter_Resource?.type_ids?.length === 0 ) {
    
          // console.log("zero filter--999" );
    
          set_is_Filtering(false)
        }
     
    
    },[filter_Resource])
    
 
const  handle_filter_by_Type = (id) => {
  console.log('filter_Resource', filter_Resource);
  
if (id === null || id === undefined){
  console.log("its for everything");
  
  set_filter_Resource({type_ids:[],tool_ids:[]})
  // set_clear_all_btns_filter_preview(true)
  // const stayAsYouR = filter_Resource.tool_ids
  // set_filter_Resource({type_ids:[],tool_ids:stayAsYouR})
  return
}



else{

const found = filter_Resource.type_ids.find((ids) => ids ===  id);
console.log("found" ,found);


if (found  === undefined){
  console.log(id, "not there, im insert it to list");

const stayAsYouR = filter_Resource.tool_ids
set_filter_Resource({type_ids:[...filter_Resource.type_ids,id],    tool_ids:stayAsYouR})
set_is_Filtering(true)
// set_clear_all_btns_filter_preview(false)

return
}

else if (found  === id){
   
  const index = filter_Resource.type_ids.indexOf(id);
  console.log("its alredy ther!!  --  index of " , id, "is" , index);
 const filterd = filter_Resource.type_ids.filter(element => element  !== id);
 console.log(" it will look like this "  , filterd);

 const stayAsYouR = filter_Resource.tool_ids
 set_filter_Resource({type_ids:filterd,tool_ids:stayAsYouR})
 set_is_Filtering(false)
 
return
}

 

}
 
 

}

const handleHover = () => {
  setIsHovered(true);
};

const handleLeave = () => {
  setIsHovered(false);
};




 




  const StatusColorClass =
  StatusColor === 'red' ? 'Bg-Red' :
  StatusColor === 'blue' ?'Bg-Blue-Glow' : 
  'Bg-Grey2';

  return (
    <div className={`PreviewBox PreviewBox_for_type_count ${is_Filtering   ? 'PreviewBox_Filtering' : ''}`}
    // className={`box ${isFocused ? 'focused' : ''}`}
    // is_Filtering
      onClick={()=>{handle_filter_by_Type(resource_type_id) }}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      
      
      > 
    <div className='PreviewBox_HeadLine' >
      <p  className="font-type-menu" >{HeadLine}</p>

 <div className={`${StatusColorClass}  light-bulb-type1`}/>

       </div>


    <div> 
     
    <div className='PreviewBox_BigNumber     font-type-h1 Color-White' > <Counter target={BigNumber} isHovered={isHovered} /> </div>
    <div className='PreviewBox_SmallNumber   font-type-txt Color-White' >UnActive:{SmallNumber}</div>
    </div>

     <div className='PreviewBox_ButtomLine' >

       <IconLastRun />
       <div className='font-type-very-sml-txt ' >{date}</div>

     </div> {/*dont delete */}
    </div>
  )
}

function PreviewBox_type2({HeadLine ,all_Resource_Types}) {
 

 

  return (
    <div className='PreviewBox PreviewBox-twice-size' >

          <div className='PreviewBox_HeadLine' > <p  className="font-type-menu" >{HeadLine}</p> </div>
 
   
      <div className='display-flex   justify-content-space-between' style={{ height:"100%"}}>

      <div className='display-flex  ' style={{   width:"100%"}}>  <img src={TmpChart2} alt="Chart"  style={{height:"120px", width:"120px"}}/></div>
   


     <div className='display-flex flex-direction-column justify-content-center  ' style={{   width:"100%" ,gap:"2px" }}>

   


     {all_Resource_Types?.map((Info, index) => {
return(
 
  <div className='display-flex' style={{marginRight:"auto"}} key={index}>
  <div className={` Bg-Blue-Glow light-bulb-type1 mr-a`}  style={{opacity:   (index +1) / all_Resource_Types.length   }} />
  <p className='   font-type-txt Color-White  ' >{Info?.resource_type_name}: {Info?.count}</p>
  </div>
)
 })}


{/* 
      <div className='display-flex' style={{marginRight:"auto"}}>
        <div className={` Bg-Blue-Glow light-bulb-type1 mr-a`}/>
        <p className='   font-type-txt Color-White  ' >
          {all_Resource_Types[0]?.resource_type_name}:
          {all_Resource_Types[0]?.count}</p>
        </div>
     

        <div className='display-flex' style={{marginRight:"auto"}}>
        <div className={`Bg-Blue-Glow Bg-Yellow light-bulb-type1 mr-a`} style={{opacity:'85%'}}/>
        <p className='   font-type-txt Color-White  ' >IP Address: 6</p>
        </div>

        <div className='display-flex' style={{marginRight:"auto"}} >
        <div className={` Bg-Blue-Glow light-bulb-type1 mr-a`}  style={{opacity:'70%'}}/>
        <p className='   font-type-txt Color-White  ' >Emails: 22</p>
        </div>

        <div className='display-flex' style={{marginRight:"auto", width:"100%"}}>
        <div className={` Bg-Blue-Glow light-bulb-type1 mr-a`}  style={{opacity:'55%'}}/>
        <p className='   font-type-txt Color-White  '    >Phone Nembers: 77</p>
        </div>
        
        <div className='display-flex' style={{marginRight:"auto", width:"100%"}}>
        <div className={`Bg-Blue-Glow light-bulb-type1 mr-a`}  style={{opacity:'30%'}}/>
        <p className='   font-type-txt Color-White  ' >Names: 362</p>
        </div>

        <div className='display-flex' style={{marginRight:"auto"}}>
        <div className={` Bg-Blue-Glow light-bulb-type1 mr-a`}  style={{opacity:'15%'}}/>
        <p className='   font-type-txt Color-White  ' >Privileges: 3</p>
        </div> */}

     </div>

      </div>
       
 
       
        </div>
  )
}


function PreviewBox_type_tools_a({   HeadLine,description,  StatusColor,date, logoAddress_1,logoAddress_2,  readMoreText,buttonTitle,iconAddress,toolURL , tool_id, show_only_this_tools, set_show_only_this_tools,     dont_show_this_tools2, set_dont_show_this_tools2 ,all_Tools }) {
 
  const StatusColorClass =
  StatusColor === 'red' ? 'Bg-Red' :
  StatusColor === 'blue' ?'Bg-Blue-Glow' : 
  'Bg-Grey2';
 
  const [logoAddress_1_ForSrc, set_logoAddress_1_ForSrc] = useState("")
  const [logoAddress_2_ForSrc, set_logoAddress_2_ForSrc] = useState("")
  const [disabled, set_disabled] = useState(false)
  // const IconAddressForSrc = require( `${iconAddress}`);

  const [IconAddressForSrc, set_IconAddressForSrc] = useState("")
  const [popUp_show, set_popUp_show] = useState(false);

  const handleReadMore = () =>{
    set_popUp_show(true);
  }

  // tool_id, show_only_this_tools, set_show_only_this_tools}
    // onChange={()=>()}
    // tool_id={Info?.tool_id}

function turn_on_off_tool(){

 
  
  // console.log("turn_on_off_tool" );
  // console.log("tool_id",tool_id);
  // console.log("show_only_this_tools",show_only_this_tools);
  // console.log("show_only_this_tools",show_only_this_tools);
  setTimeout(() => {

    const indexNumber = show_only_this_tools.findIndex(x => x === tool_id);
    if (indexNumber !== -1) {
        const tempArray = [...show_only_this_tools]; // Make a copy of the array
        tempArray.splice(indexNumber, 1); // Remove the element at the found index
        set_show_only_this_tools(tempArray); // Update the state


        const thisTool = all_Tools.filter((tool) => tool.tool_id === tool_id );
        //  console.log("tool_id", tool_id);
        //  console.log("thisTool0",  thisTool[0] );
        //  console.log("thisTool2", [ ...thisTool ]);
         const tempArray2 = dont_show_this_tools2
         tempArray2.push(thisTool[0]);
         set_dont_show_this_tools2(tempArray2);
  
//  const newArry  = dont_show_this_tools
//  newArry.push(tool_id);
//     set_dont_show_this_tools(newArry);

 
 
    }
}, 250); // W
}



// const indexNumber = all_websites.findIndex(x=>x.WebSiteID  === Id)
// console.log(indexNumber);
// all_websites.splice(indexNumber,1)
// fs.writeFileSync(pathToTmpJson,JSON.stringify(all_websites)) 






  useEffect(() => {
    if (logoAddress_1 !== "" &&  logoAddress_1 !== null &&  logoAddress_1 !== undefined ) {
 
     const  Src = require( `${logoAddress_1}`)
      set_logoAddress_1_ForSrc(Src)
    }
    if (logoAddress_2 !== "" &&  logoAddress_2 !== null &&  logoAddress_2 !== undefined ) {
   
     const  Src = require( `${logoAddress_2}`)
      set_logoAddress_2_ForSrc(Src)
    }
    if (iconAddress !== "" &&  iconAddress !== null &&  iconAddress !== undefined ) {
   
     const  Src = require( `${iconAddress}`)
     set_IconAddressForSrc(Src)
    }

    }, []);

 
  return (

<>

<PopUp_For_Read_More
        HeadLine={HeadLine}
        readMoreText={readMoreText}
        logoAddress_1_ForSrc={logoAddress_1_ForSrc}
        toolURL={toolURL}
        buttonTitle={buttonTitle}
        set_popUp_show={set_popUp_show}
        popUp_show={popUp_show}
        IconAddressForSrc={IconAddressForSrc}
      />

    <div className='PreviewBox PreviewBox-of-tools'
    style={{
      flexGrow:1
     }}
    > 

    <div className='PreviewBox_HeadLine' >

   <label className="switch"><input type="checkbox" 
  //  checked={true}
  defaultChecked
    onChange={turn_on_off_tool}
    disabled={disabled}
    onClick={() => set_disabled(true)} 
    // tool_id={Info?.tool_id}
    /> <span className="slider round"></span></label>    {/* //  checked={Info?.Monitor} */}




 {/* ///////////// 1 or 2 logos /////////////// */}
 {logoAddress_2_ForSrc !== "" ? (
     <div className='display-flex     mr-a ml-a' style={{  }}>
 
     <img src={logoAddress_1_ForSrc} alt="logo"   className='responsive-logos-type_a'  />
     <p  className="font-type-very-sml-txt   Color-Grey1 mr-a ml-a" >&</p>
     <img src={logoAddress_2_ForSrc} alt="logo"     className='responsive-logos-type_a'  />
     </div>
    ):(
      <div className='display-flex ' style={{marginRight:"24px"}}>
      <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
      <img src={logoAddress_1_ForSrc} alt="logo" maxwidth="140" height="20"  />
      </div>
    )  }

  <div className={`${StatusColorClass}  light-bulb-type1`}/></div>
  
    <div className='display-flex justify-content-center align-items-center flex-direction-column'  > 
    <img src={IconAddressForSrc} alt="Icon" width="70" height="70" className='mb-a' />
    <p className='text-center     font-type-h4 Color-White mb-a'  style={{maxwidth:"350px"}} >{HeadLine}</p>
    <p className='text-center   font-type-txt Color-White  mb-a'    style={{maxwidth:"250px"}}>{description}</p>
    <button className="btn-type3 mb-c" onClick={()=>handleReadMore()}><p className=' font-type-txt'>Read More</p><IconReadMore className="icon-type1 "  />  </button>

 <  a href={toolURL} target="_blank"> 
    <button className="btn-type2"><p className='font-type-menu '>{buttonTitle} </p>  </button></a>
   
    </div>

     <div className='PreviewBox_ButtomLine' >
       <IconLastRun />
       <div className='font-type-very-sml-txt Color-Grey1' >{date}</div>

     </div> {/*dont delete */}

     
    </div>
</>


  )
}

function PreviewBox_type_tools_b({  HeadLine,description,  StatusColor,date, logoAddress_1,logoAddress_2, readMoreText,buttonTitle, toolURL, show_tool_PreviewBoxs_type_a_b, tool_id, show_only_this_tools, set_show_only_this_tools,   dont_show_this_tools2, set_dont_show_this_tools2, all_Tools }) {
 
 
  const StatusColorClass =
  StatusColor === 'red' ? 'Bg-Red' :
  StatusColor === 'blue' ?'Bg-Blue-Glow' : 
  'Bg-Grey2';



  const [Show_popUp___Read_More,     set_Show_popUp___Read_More] = useState(false);
  const [Show_PopUp_tool___Nuclei,  set_Show_PopUp_tool___Nuclei] = useState(false);
  const [Show_PopUp_tool___Dehashed,   set_Show_PopUp_tool___Dehashed] = useState(false);

  const [logoAddress_1_ForSrc, set_logoAddress_1_ForSrc] = useState("")
  const [logoAddress_2_ForSrc, set_logoAddress_2_ForSrc] = useState("")
  const [disabled, set_disabled] = useState(false)


  const handleReadMore = () =>{
    set_Show_popUp___Read_More(true);
  }


const handle_Main_Btn =(tool_id,toolURL)=>{

  if      (tool_id ===  '1005') { set_Show_PopUp_tool___Nuclei(true)  }
  else if (tool_id ===  '1009') { set_Show_PopUp_tool___Dehashed(true)  }
  else {openInNewTab(toolURL) }
  
}
 
  useEffect(() => {
    if (logoAddress_1 !== "" &&  logoAddress_1 !== null &&  logoAddress_1 !== undefined ) {
 
     const  Src = require( `${logoAddress_1}`)
      set_logoAddress_1_ForSrc(Src)
    }
    if (logoAddress_2 !== "" &&  logoAddress_2 !== null &&  logoAddress_2 !== undefined ) {
 
     const  Src = require( `${logoAddress_2}`)
      set_logoAddress_2_ForSrc(Src)
    }



    }, []);

 
 

    function turn_on_off_tool(){
      // console.log("turn_on_off_tool" );
      // console.log("tool_id",tool_id);
      // console.log("show_only_this_tools",show_only_this_tools);
      // console.log("show_only_this_tools",show_only_this_tools);
      // set_disabled(true);
      setTimeout(() => {
    
        const indexNumber = show_only_this_tools.findIndex(x => x === tool_id);
        if (indexNumber !== -1) {

          const tempArray = show_only_this_tools;
          const newArr = tempArray.slice(0, indexNumber).concat(tempArray.slice(indexNumber + 1));
         set_show_only_this_tools( newArr);

       
         const thisTool = all_Tools.filter((tool) => tool.tool_id === tool_id );
        //  console.log("tool_id", tool_id);
        //  console.log("thisTool0",  thisTool[0] );
        //  console.log("thisTool2", [ ...thisTool ]);
         const tempArray2 = dont_show_this_tools2
         tempArray2.push(thisTool[0]);
         set_dont_show_this_tools2(tempArray2);


        //  const newArry  = dont_show_this_tools
        //  newArry.push(tool_id);
        //     set_dont_show_this_tools(newArry);






        }
    }, 250); // W
    }

  return (
<>


{Show_popUp___Read_More &&
<PopUp_For_Read_More
        HeadLine={HeadLine}
        readMoreText={readMoreText}
        logoAddress_1_ForSrc={logoAddress_1_ForSrc}
        toolURL={toolURL}
        buttonTitle={buttonTitle}
        set_popUp_show={set_Show_popUp___Read_More}
        popUp_show={Show_popUp___Read_More}
      />}

{Show_PopUp_tool___Nuclei &&
<PopUp_For_Nuclei_data
        HeadLine={HeadLine}
        readMoreText={readMoreText}
        logoAddress_1_ForSrc={logoAddress_1_ForSrc}
        toolURL={toolURL}
        buttonTitle={buttonTitle}
        set_popUp_show={set_Show_PopUp_tool___Nuclei}
        popUp_show={Show_PopUp_tool___Nuclei}
      />}

{Show_PopUp_tool___Dehashed && 
<PopUp_For_Dehashed_data
        HeadLine={HeadLine}
        readMoreText={readMoreText}
        logoAddress_1_ForSrc={logoAddress_1_ForSrc}
        toolURL={toolURL}
        buttonTitle={buttonTitle}
        set_popUp_show={set_Show_PopUp_tool___Dehashed}
        popUp_show={Show_PopUp_tool___Dehashed}
      />}

  <div className='PreviewBox PreviewBox-of-tools' > 


{show_tool_PreviewBoxs_type_a_b ? (<>

  <div className='PreviewBox_HeadLine' style={{  height:20}}>
 



 <label className="switch"><input type="checkbox"  defaultChecked 
 disabled={disabled}
 onClick={() => set_disabled(true)} 
 onChange={turn_on_off_tool}/> <span className="slider round"></span></label>    {/* //  checked={Info?.Monitor} */}

<div className={`${StatusColorClass}  light-bulb-type1`}/></div>

  <div className='display-flex justify-content-center align-items-center flex-direction-column'  > 
  {/* <img src={IconAddressForSrc} alt="Icon" width="70" height="70" className='mb-a' /> */}
  <p className='text-center     font-type-h4 Color-White mb-a'  style={{maxwidth:"350px"}} >{HeadLine}</p>
  <p className='text-center   font-type-txt Color-White  mb-b cutLongParagraph'    style={{maxwidth:"250px"}}>{description}</p>



{/* ///////////// 1 or 2 logos /////////////// */}
  {logoAddress_2_ForSrc !== "" ? (
   <div className='display-flex mb-a' style={{  }}>
   {/* <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p> */}
   <img src={logoAddress_1_ForSrc} alt="logo"   className='responsive-logos-type_b'  />
   <p  className="font-type-very-sml-txt   Color-Grey1 mr-a ml-a" >&</p>
   <img src={logoAddress_2_ForSrc} alt="logo"     className='responsive-logos-type_b'  />
   </div>
  ):(
    <div className='display-flex mb-a' style={{marginRight:"5px"  }}>
    <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
    <img src={logoAddress_1_ForSrc} alt="logo" maxwidth="140px" height="30"  />
    </div>
  )  }





  <button className="btn-type3 mb-c" onClick={()=>handleReadMore()}><p className=' font-type-txt'>Read More</p><IconReadMore className="icon-type1 " />  </button>

 

{/* {tool_id === '1005' ? ( */}
<button className="btn-type2" onClick={()=>handle_Main_Btn(tool_id,toolURL)}><p className='font-type-menu ' >{buttonTitle} </p>  </button> 

{/* :(<  a href={toolURL} target="_blank"> <button className="btn-type2"><p className='font-type-menu '>{buttonTitle} </p>  </button></a>)} */}
 
 {/* {tool_id === '1005' ? (
<button className="btn-type2" onClick={()=>set_Show_PopUp_tool___Nuclei(true)}><p className='font-type-menu ' >{buttonTitle} </p>  </button>)

:(<  a href={toolURL} target="_blank"> <button className="btn-type2"><p className='font-type-menu '>{buttonTitle} </p>  </button></a>)}
  */}




  </div>

   <div className='PreviewBox_ButtomLine' >
     <IconLastRun />
     <div className='font-type-very-sml-txt Color-Grey1' >{date}</div>

   </div> {/*dont delete */}


</>):(<p>loading</p> )}






    </div>
</>

  
  )
}

function PreviewBox_Not_active_tools({      show_only_this_tools, set_show_only_this_tools, dont_show_this_tools2, set_dont_show_this_tools2}) {
 
 
  function ToggleSwitch({ Info, onToggle }) {
    const [isChecked, setIsChecked] = useState(false);
 
    const handleChange = () => {
      setIsChecked(!isChecked);
      onToggle(Info); // Call the onToggle function passed from the parent, if needed
    };
  
    return (
      <label className="switch">
        <input
        disabled={isChecked}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        <span className="slider round"></span>
      </label>
    );
  }
  
  const handleToggle = (Info) => {
    // setIsChecked(true);
    setTimeout(() => {

// to show the box again
const newArry =   [ ...show_only_this_tools,  Info?.tool_id ]
set_show_only_this_tools( newArry);

// to dlete from not show list
  const indexNumber = dont_show_this_tools2.findIndex(x => x.tool_id  ===     Info?.tool_id);
console.log("indexNumber" , indexNumber);

const newArry2 = dont_show_this_tools2
// const index = array.indexOf(5);
if (indexNumber > -1) { 
  newArry2.splice(indexNumber, 1); 
}
 set_dont_show_this_tools2(newArry2)

//  setIsChecked(false);


  }, 250);    };

 

  return (
<>

 

  <div className='PreviewBox PreviewBox-of-tools' style={{

  //  flexShrink:5,
     flexGrow:1, 
     width:"248px",
    //  maxWidth:"210px",
    //  minWidth:"210px",
     }} > 
  

<div style={{
  
  paddingTop:"var(--space-d)",
  paddingBottom:"var(--space-d)",
  paddingLeft:"var(--space-c)",
  paddingRight:"var(--space-c)", 
 display:'flex',
 flexDirection:'column',
  justifyContent:"space-between",
  
  height:"100%",

}}>


<div className=' '  > 
 
 <p className='  text-center    font-type-h4 Color-White mb-d'  style={{maxwidth:"350px"}} >UnActive</p>
 {/* <p className='text-center   font-type-txt Color-White  mb-a'    style={{maxwidth:"250px"}}>Return to Tools Dashboard</p> */}
 <div style={{
 
    height:"170px",
    overflowY: "auto"
 }}>

{dont_show_this_tools2?.map((Info, index) => {
return(
<>
<div className=' '  
 key={index}
 style={{
  display:"flex",
  justifyContent:"left",
  alignItems: "center",
  marginTop:"var(--space-b)",

 }}
 >
           <ToggleSwitch Info={Info} onToggle={handleToggle} />

 {/* <label className="switch">
  <input type="checkbox"  
  key={index}
    checked={isChecked}
   onChange={()=>turn_on(Info)}
   /> 
  <span className="slider round"></span></label>    */}
  <p className='text-center   font-type-txt Color-White  ml-b'    style={{ }}>{Info?.headline}</p>
 </div>
 
</>
 


)

 }
 )}


 </div>




 </div>

  



 



<div>
<button className="btn-type2"><p className='font-type-menu '>Turn on all</p>  </button> 
</div>

</div>





    </div>
</>

  
  )
}


export { PreviewBox_type1, PreviewBox_type2 ,PreviewBox_type_tools_a,PreviewBox_type_tools_b , PreviewBox_Not_active_tools};