const time = {
  now : () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var now = yyyy+'-'+mm+'-'+dd;
  
    return now;
  },
  nowGetWithTIme : () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var now = yyyy+'-'+mm+'-'+dd+' '+ today.getHours() +':'+today.getMinutes()+':'+today.getSeconds();
    
    return now;
  },
  setExpired : (FrontEndTime, h = 1) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var now = yyyy+'-'+mm+'-'+dd+' '+ (today.getHours()+1)+':'+(today.getMinutes())+':'+today.getSeconds();
    
    var data  = {
      "value" : "expred",
      "datetime" : now
    }
    return data;
  }
}

export default time;
