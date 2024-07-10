

// const make_url_from_id = (id, moduleLinks,front_IP) => {


const cases =(visblePage)=>{
  switch(visblePage) {

    case "dashboard-cti":   
     console.log("dashboard-cti"); 
    return("2001003");
    break;
    
    case "dashboard-risx":   
    console.log("dashboard-risx");
    return("2001000");
    break;
    
    case "dashboard-misp":   
    console.log("dashboard-misp");
    return("2001012");
    break;
    
    case "dashboard-iris":   
    console.log("dashboard-iris");
    return("2001010");
    break;
     
    case "dashboard-timesketch":  
    console.log("dashboard-timesketch");
    return("2001002");
    break;
     
    case "dashboard-anyrun":  
    console.log("dashboard-anyrun");
    return("2001006");
    break;
    
    
    default:
    console.log("dashboard-default-didnt find the visable page");
    return("2001000");
    break;
    
}
}



  const make_url_from_id = (visblePage,moduleLinks,front_IP) => {


 
const id = cases(visblePage);
console.log("make_url_from_id" , id);

    if(moduleLinks === undefined || moduleLinks.length === 0){return}
    const [module_data] = moduleLinks.filter(element => element?.toolID  === id);

console.log("module_data" , module_data);
    const module_link =  module_data?.toolURL
    console.log("module_link" , module_link);

    if(module_link === undefined  ){return}
       if(  module_link.includes("${FRONT_IP}")){
          const module_link_change_front_ip = module_link.replace("${FRONT_IP}", front_IP);
          console.log("module_link_change_front_ip",module_link_change_front_ip);
         return  module_link_change_front_ip;
        }
  else{ 
    console.log("module_link",module_link);
    return module_link}
  
  
  
  
  }

  export {make_url_from_id}