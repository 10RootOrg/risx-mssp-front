

import React ,{useEffect, useState} from 'react'
import axios from 'axios';
import lottie from 'lottie-web';
import {
  PreviewBox_respo_pie,
 
} from "../Components/PreviewBoxes";
import animationData from '../Components/Logos/Risx-mssp-logo-anim.json';

function TestRespo() {

 
                

  return (
    <div style={{  display:"flex" , width:"100%" , gap:"15px"}} >



 
<PreviewBox_respo_pie 
HeadLine={`PreviewBox_respo_pie2`}
description_short={'Multiple SMTP servers are vulnerable to spoofing attacks that allow hackers to bypass authentication.'}
bar_numbers = {        [ "33", "31", '21']                        }
bar_headlines = {['Failed','Pass','None'] }
// bar_title_legend = {["Tests"]}
is_popup = {false}
enable_hover={false}
 
display_this_value={"prime_data"}
colors={"Basic"} // Basic , Alert
box_height="600px"
/>


 
<PreviewBox_respo_pie 
HeadLine={`PreviewBox_respo_pie2`}
description_short={'Multiple SMTP servers are vulnerable to spoofing attacks that allow...'}

bar_numbers = {        [ "33", "31", '21',"33", "0", '21', "333", "31", '21',"33", "31", '21']                        }
bar_headlines = {['Failed','Pass','None','Failed','sssss ssssssshhhhs','None','Failed','Pass','None','Failed','23424234234234234242384723098472309847239048723094873209482730498','None'] }
// bar_title_legend = {["Tests"]}
is_popup = {false}
enable_hover={false}
 
display_this_value={"prime_data"}
colors={"Basic"} // Basic , Alert
box_height="400px"
/>

 




 
        </div>
  )
}

export default TestRespo