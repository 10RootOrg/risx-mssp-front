import React , {useState , useEffect, useContext} from 'react';
 import { ReactComponent as IconLastRun } from './icons/ico-lastrun.svg';
 import { ReactComponent as RisxMssp_logo_wide_small} from './Logos/RisxMssp_logo_wide_small.svg';
 import { ReactComponent as IconReadMore } from './icons/ico-readmore.svg';
 import { PopUp_For_Read_More ,PopUp_All_Good} from "./PopUp_Smart.js";
//  import jsonData from '../tmpjsons/previewBox-main-velociraptor.json'
 import axios from 'axios';
 import GeneralContext from '../Context.js';

import './PreviewBoxes.css';
 


function PreviewBox_velociraptor({  }) {
 
  const StatusColor = "grey"

  const StatusColorClass =
  StatusColor === 'red' ? 'Bg-Red' :
  StatusColor === 'blue' ?'Bg-Blue-Glow' : 
  'Bg-Grey2';
  const {  backEndURL ,all_artifacts,set_all_artifacts,all_Tools} = useContext(GeneralContext);
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



const handle_click_velociraptor= async()=>{
//  window.open( toolURL , '_blank');
  try{
      const res = await
      axios.get(`${backEndURL}/tools/active-velociraptor-artifact`, {
        params: {
          checked_artifacts:  checked_artifacts2 ,
          resource_list: JSON.stringify(['test_0000001', 'test_0000002' ])
        }
      });
  
      set_popUp_all_good____txt({  HeadLine:"Beginning of data processing",paragraph:"This process may take several minutes. The information will be displayed on the 'Results' section." ,buttonTitle:"Ok"})
      set_popUp_all_good____show(true)
      if(res.data){
        console.log("res.data 44444444444444", res.data);

      }
  
         }catch(err)
         {console.log(err);}
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
 

      <div className='PreviewBox PreviewBox-of-tools velociraptor-all  ' > 
{/* ---------------------left-box----------------------------- */}
<div className='velociraptor-left-side  display-flex     flex-direction-column  '  >


{/* top left / */}
<div className='display-flex  ' >
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

<div className='velociraptor-EndpointModules-list-out'  >
 
<div className='Bg-Grey2' style={{width:"100%", height:"2px" ,borderRadius:"5px"}}/>

<div className='velociraptor-EndpointModules-list-in'  >

 
{Array.isArray(all_artifacts) &&  all_artifacts?.map((Info, index) =>(
 
  
<>


<div key={index} className='velociraptor-EndpointModules-item' >

<div  className='velociraptor-EndpointModules-checkbox mr-b'>
{/* <input type='checkbox' />  */}


<label className="container"> 
<input type="checkbox" 
checked={Info?.isActive}
disabled={disabled}
// defaultChecked
 value={Info?.artifact_id}
     onChange={()=> edit_checked_artifacts(Info?.artifact_id ,Info?.isActive) }


    //  onChange={()=>set_checked_artifacts([ ...checked_artifacts,Info?.artifact_id])}
     />
<span className="checkmark"></span>
</label>
</div>

<div  className='velociraptor-EndpointModules-text'>
  <p className='font-type-menu  Color-White   cutLongLine'>{Info?.headline}</p>
  <p className='font-type-txt   Color-Grey1   cutLongLine'>{Info?.description}</p>
  <button className="btn-type3 " style={{padding:0 }}  onClick={()=>handleReadMore(Info?.headline, Info?.readMoreText  , Info?.logoAddress_1 ,"Close"  ,null,"Small"  )}><p className=' font-type-txt'>Read More</p><IconReadMore className="icon-type1 " style={{width:20 ,height:20}}/>  </button>
 
</div>
{/* toolURL */}
<div  className='velociraptor-EndpointModules-logo  mr-b ml-b'  >
  <img className='velociraptor-EndpointModules-logo  '          src={Info?.logoAddress_1 ? require(`${Info.logoAddress_1}`) : undefined}></img>

  </div>

</div>   

</>

           ))}

 
 
 

 
 

</div>


<div className='Bg-Grey2' style={{width:"100%", height:"2px" ,borderRadius:"5px"}}/>
</div>



{/* buttom buttons */}
<div className='display-flex justify-content-end mb-b' style={{ width:"100%"}}>

{checked_artifacts2?.length === 0 ? (
  <p className='ml-a font-type-txt  Color-Red mr-b'>Choose at least 1 Artifact</p>):
(<>
{/* <RisxMssp_logo_wide_small style={{ width:"72px"}}/> */}
 <p className='ml-a font-type-txt  Color-Grey1 mr-b'><b> </b>Agent required</p></>
)}

<div className='mr-b'>
<button className="btn-type2" onClick={() => window.open(toolURL, '_blank')}>
      <p className='font-type-menu'>Site</p>
    </button>
    </div>

  <button className="btn-type2 "
  // disabled={checked_artifacts.length === 0}
  

  onClick={()=>handle_click_velociraptor()}
  disabled ={checked_artifacts2.length === 0}
  >
  <p className='font-type-menu ' >Run Artifacts</p>
    </button> 
</div>
 
   </div>

     
    </div>  
    

 


    </>

  )
}


export { PreviewBox_velociraptor};