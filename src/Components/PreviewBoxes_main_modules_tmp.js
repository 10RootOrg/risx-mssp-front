import React , {useState , useEffect, useContext} from 'react';
 import { ReactComponent as IconLastRun } from './icons/ico-lastrun.svg';
//  import { ReactComponent as RisxMssp_logo_wide_small} from './Logos/RisxMssp_logo_wide_small.svg';
 import { ReactComponent as IconReadMore } from './icons/ico-readmore.svg';
 import { ReactComponent as IcoKey } from './icons/ico-eye.svg';
 import { PopUp_For_Read_More ,PopUp_All_Good} from "./PopUp_Smart.js";
 import { Make_url_from_id ,fix_path} from "../Components/Dashboards/functions_for_dashboards";

//  import jsonData from '../tmpjsons/previewBox-main-velociraptor.json'
 import axios from 'axios';
 import GeneralContext from '../Context.js';

import './PreviewBoxes.css';
import './all_tools.css';


function PreviewBoxes_main_modules2({  }) {
 
  const StatusColor = "blue"

  const StatusColorClass =
  StatusColor === 'red' ? 'Bg-Red' :
  StatusColor === 'blue' ?'Bg-Blue-Glow' : 
  'Bg-Grey2';

  const {  backEndURL ,all_artifacts,set_all_artifacts,all_Tools,front_IP,front_URL} = useContext(GeneralContext);
  const [popUp_show, set_popUp_show] = useState(false);
  const [popUp_headline, set_popUp_headline] = useState("");
  const [popUp_ReadMoreText, set_popUp_ReadMoreText] = useState("");
  const [popUp_btnTitle, set_popUp_btnTitle] = useState("");
  const [popUp_logoAddress_1, set_popUp_logoAddress_1] = useState("");
  const [popUp_iconAddress, set_popUp_iconAddress] = useState("");
  const [popUp_iconSize, set_popUp_iconSize] = useState("Small");
  

  const [popUp_all_good____show, set_popUp_all_good____show] = useState(false);
  const [popUp_all_good____txt, set_popUp_all_good____txt] = useState({  HeadLine:"",paragraph:"" ,buttonTitle:""})
  const [ toolURL, set_toolURL] = useState("https://docs.velociraptor.app");
 
  const [disabled, set_disabled] = useState(false)

  const [ checked_artifacts2, set_checked_artifacts2] = useState([]);
  
  const handleReadMore = (headline,readMoreText,logoAddress_1,btnTitle,iconAddress,iconSize) =>{
    console.log(iconAddress);
    set_popUp_headline(headline);
    set_popUp_ReadMoreText(readMoreText);
     set_popUp_logoAddress_1( require(`${logoAddress_1}`));
    set_popUp_btnTitle(btnTitle);
    set_popUp_iconSize(iconSize)

    if (iconAddress !== null && iconAddress !== undefined){    set_popUp_iconAddress( require(`${iconAddress}`));
  }   else{set_popUp_iconAddress("")}

    set_popUp_show(true);
  }



  const handle_Main_Btn =(toolURL)=>{
console.log("handle_Main_Btn",toolURL);



const  path = fix_path(toolURL,front_IP,front_URL)

if (path) { 
  console.log("Velo path: ", path);
   window.open(  path , '_blank') ;
}
 
else{console.log("problem with velociraptor path, it is:", path); }

 
     
    
 
         
      }




// const handle_click_velociraptor= async()=>{
// //  window.open( toolURL , '_blank');
//   try{
//       const res = await
//       axios.get(`${backEndURL}/tools/active-velociraptor-artifact`, {
//         params: {
//           checked_artifacts:  checked_artifacts2 ,
//           resource_list: JSON.stringify(['test_0000001', 'test_0000002' ])
//         }
//       });
  
//       set_popUp_all_good____txt({  HeadLine:"Beginning of data processing",paragraph:"This process may take several minutes. The information will be displayed on the 'Results' section." ,buttonTitle:"Ok"})
//       set_popUp_all_good____show(true)
//       if(res.data){
//         console.log("res.data 44444444444444", res.data);

//       }
  
//          }catch(err)
//          {console.log(err);}
//   }

 
  async function  ShowInUi (Info){
 
if(Info.parent_id === "2000000"  ||  Info.parent_id === 2000000 ){

 set_popUp_all_good____txt({ HeadLine:"Stays on",paragraph:"Velociraptor artifacts configured to always be visible." ,buttonTitle:"Close"})
 set_popUp_all_good____show (true);
 }


 
     }
   
 
  useEffect(() => { 
    const all = all_artifacts.map(({ artifact_id, Toolname ,logoAddress_1 }) => ({ artifact_id, Toolname, logoAddress_1 }));
    set_checked_artifacts2(all)
   }, [all_artifacts ]);
 

 
 

   async function  edit_checked_artifacts  (artifact_id ,isActive) {
if (artifact_id === undefined ||isActive === undefined ){console.log("undefined cant change artifact");return} 


try{
  set_disabled(true);
  const res = await  axios.put(`${backEndURL}/tools/enable-disable-artifact`, {
    params: {
     artifact_id: artifact_id ,
     set_enable_disable_to: !isActive,
    }
  });



  
  if(res.data){

    console.log(res.data);
    const index = all_artifacts.findIndex(art => art.artifact_id === artifact_id);
    console.log(index);
    if (index !== -1) {
 
      const updatedARTS = [...all_artifacts];
 console.log(updatedARTS);
      updatedARTS[index] = { ...updatedARTS[index], artifact_id: artifact_id, isActive: !isActive };


      // Set the state with the updated array
      set_all_artifacts(updatedARTS);
      set_disabled(false);
    }
  
   
  
    }

 
     }catch(err){set_disabled(false);console.log(err);}

  
  
  
  
  }
  


  useEffect(() => {
    set_popUp_show(popUp_show)
  }, [popUp_show]);

  const logoAddress="./Logos/Velociraptor.svg";
  const iconAddress="./icons/General-icons-g.svg"
  const lastrun="17/03/2024"
  // const toolURL="https://velociraptor-10root.northeurope.cloudapp.azure.com:8889"
  const HeadLine= "Endpoints Modules"
  const ReadMore= "At the press of a (few) buttons, perform targeted collection of digital forensic evidence simultaneously across your endpoints, with speed and precision. Continuously collect endpoint events such as event logs, file modifications and process execution. Centrally store events indefinitely for historical review and analysis. Don't wait until an event occurs. Actively search for suspicious activities using our library of forensic artifacts, then customize to your specific threat hunting needs."




  useEffect(() => {
    const url =   all_Tools.filter(item => (item.tool_id === "2000000" ))[0]?.toolURL
//  const url = velociraptor_from_all_tools[0]?.toolURL

if (url === undefined){return}
set_toolURL(url)

  }, [ all_Tools]);
 

 
  return (


    <>
<PopUp_All_Good

   set_popUp_show={set_popUp_all_good____show}
   popUp_show={popUp_all_good____show}
   HeadLine={popUp_all_good____txt.HeadLine}
   buttonTitle={popUp_all_good____txt.buttonTitle}
   paragraph={popUp_all_good____txt.paragraph}
/>



<PopUp_For_Read_More
        HeadLine={popUp_headline}
        readMoreText={popUp_ReadMoreText}
        logoAddress_1_ForSrc={popUp_logoAddress_1}
        // toolURL={toolURL}
        buttonTitle={popUp_btnTitle}
        IconAddressForSrc={popUp_iconAddress}
        set_popUp_show={set_popUp_show}
        popUp_show={popUp_show}
        popUp_iconSize={popUp_iconSize}
      />
 

      <div className=' all-tools-main' > 
{/* ---------------------left-box----------------------------- */}
<div className='all-tools-left-side  '  >


{/* top left / */}
<div style={{ display:"flex",alignItems:"center", justifyContent:"center"}} >
 <p  className="font-type-very-sml-txt   Color-Grey1 mr-a" >By:</p>
  {/* <img src={ logoAddress_1 ? require(`${ logoAddress_1}`) : undefined} alt="velociraptor" maxwidth="180" height="28" position='relative'    />  */}
  <img src={ logoAddress ? require(`${ logoAddress}`) : undefined} alt="velociraptor" maxwidth="180" height="28" position='relative'    /> 

 </div>

{/*  center  */}
<div className='display-flex flex-direction-column  ' >
{/*  icon  */}
<img src={ iconAddress ? require(`${ iconAddress}`) : undefined} alt="Icon" width="100%" height="80" className='mb-a'   /> 
   
{/*  text  */}
    <p className='text-center     font-type-h4 Color-White mb-a'  style={{maxWidth:"350px"}} >{HeadLine}</p>
    <p className='text-center   font-type-txt Color-White  mb-a'    style={{maxWidth:"250px"}}>Select tools from the list and execute artifacts on endpoints</p>

{/*  read more  */}
    <button className="btn-type3 " onClick={()=>handleReadMore(HeadLine, ReadMore  , logoAddress ,"Close"  ,iconAddress ,"Big" )}><p className=' font-type-txt' >Read More</p><IconReadMore className="icon-type1 " />  </button>

    </div>

{/* /////////////// button //////////// */}
<div className='PreviewBox_ButtomLine' ><IconLastRun /><div className='font-type-very-sml-txt Color-Grey1' >{lastrun}</div></div>
 
    </div>


{/* -----------------------right-box------------------------ */}
  <div className='velociraptor-right-side display-flex  flex-direction-column' > 

  <div className=' display-flex  justify-content-space-between' style={{width:"100%", height:"24px"}} >
  <div style={{width:"1px" }}/> 
  <div className={`${StatusColorClass}  light-bulb-type1`} />
</div>

 
 
{/* <div className='Bg-Grey2' style={{width:"100%", height:"2px" ,borderRadius:"5px"}}/> */}

<div className='all-tools-right-side'  >

 



<table className='all-tools-table'  style={{ margin:0 , padding:0, border:0}}       >
                  {/* <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--color-Grey5)', zIndex: 1  }}>
                    <tr  style={{ textAlign: 'left' ,height:"30px"}}>
                      <th className='font-type-menu Color-Grey1' style={{}}>{list_array_column1?.previewName}</th>
                      <th className='font-type-menu Color-Grey1'  style={{textAlign:"right" ,paddingRight:"5px"}}>{list_array_column2?.previewName}</th>
                    </tr>
                  </thead> */}
                  <tbody      style={{ margin:0 , padding:0, border:0}}>
                    {/* {list_array?.map((item, index) => (
                      <tr key={index}>

                        {is_tags ? (
                         <td className='font-type-txt  font-type-txt   Color-Blue-Glow tagit_type1' style={{ }}>{item[list_array_column1?.key]}</td>
                        ):(
                       <td className='font-type-txt Color-Grey1 ' style={{ }}>{item[list_array_column1?.key]}</td>
                       ) }
                        <td className='font-type-txt Color-White ' style={{textAlign:"right" ,paddingRight:"5px"}}>{item[list_array_column2?.key]}</td>
                      </tr> */}
            
 

         




{Array.isArray(all_artifacts) &&  all_artifacts?.map((Info, index) =>(
 
  
<>


<tr key={index} className='all-tools-line'  >

 

<td>
  
  <label className="container" style={{marginTop:"-11px"}}> 
<input type="checkbox" 

checked={Info?.isActive}
disabled={disabled}
// defaultChecked
 value={Info?.artifact_id}
     onChange={()=> edit_checked_artifacts(Info?.artifact_id ,Info?.isActive) }


    //  onChange={()=>set_checked_artifacts([ ...checked_artifacts,Info?.artifact_id])}
     />
<span className="checkmark"></span>
</label></td>

 
<td><p className='font-type-menu  Color-White  cutLongLine' >{Info?.headline}</p></td>
<td> <p className='font-type-txt   Color-Grey1   cutLongLine'     style={{}}>{Info?.description}</p></td>
<td className='' ><div style={{display:"flex", alignItems:"center " }}><p className='font-type-very-sml-txt   Color-Grey1 mr-a'>By:</p><img className='logo-cell  ' style={{ }} src={Info?.logoAddress_1 ? require(`${Info.logoAddress_1}`) : undefined}></img></div></td>
<td><button  className="btn-type3"   onClick={() => handleReadMore( Info?.headline,  Info?.readMoreText,   Info?.logoAddress_1,  "Close",  null,   "Small" )} ><p className='font-type-txt' style={{   whiteSpace: 'nowrap' }}>Read More</p><IconReadMore className="icon-type1" style={{ width: 20, height: 20    }} /></button></td> 
<td className='' ><div style={{display:"flex", alignItems:"center", }}><IconLastRun /><p className='font-type-very-sml-txt Color-Grey1' >{lastrun}</p></div></td>
<td
  className=''
  onClick={() => ShowInUi(Info)}
  style={{ position: 'relative' }} // Optional: Ensures proper positioning
>
  <button
    className="btn-type4"
    tool_id={Info?.tool_id}
    style={{
      marginRight: 0,
      paddingRight: 0,
      backgroundColor: 'transparent', // Optional: Make button background transparent
      border: 'none', // Optional: Remove button border
      cursor: 'default', // Optional: Change cursor to default
      position: 'absolute', // Optional: Position it absolutely within <td>
      top: 0, // Adjust as needed
      left: 0, // Adjust as needed
      pointerEvents: 'none' // Ensure button does not handle pointer events
    }}
  >
    {/* <IcoKey className="icon-type1" style={{ marginRight: 0, paddingRight: 0 }} /> */}
  </button>

  {/* Other content in <td> can go here */}
  <IcoKey className="icon-type1 icon-type1-disable" />
</td>



 







 

</tr>   

</>

           ))}

          </tbody>
                </table>





 
 

 
 

</div>


{/* <div className='Bg-Grey2' style={{width:"100%", height:"2px" ,borderRadius:"5px"}}/> */}
 



{/* buttom buttons */}
<div className='display-flex justify-content-end mb-b' style={{ width:"100%"}}>

{checked_artifacts2?.length === 0 ? (
  <p className='ml-a font-type-txt  Color-Red mr-b'>Choose at least 1 Artifact</p>):
(<>
{/* <RisxMssp_logo_wide_small style={{ width:"72px"}}/> */}
 <p className='ml-a font-type-txt  Color-Grey1 mr-b'><b> </b>Agent required</p></>
)}

<div className=' '>
<button className="btn-type2" onClick={()=>handle_Main_Btn(toolURL)}>
      <p className='font-type-menu'>Site</p>
    </button>
    </div>

  {/* <button className="btn-type2 ml-b "
  // disabled={checked_artifacts.length === 0}
  

  onClick={()=>handle_click_velociraptor()}
  disabled ={checked_artifacts2.length === 0}
  >
  <p className='font-type-menu ' >Run Artifacts</p>
    </button>  */}
</div>
 
   </div>

    </div>  
    

 


    </>

  )
}


export { PreviewBoxes_main_modules2};