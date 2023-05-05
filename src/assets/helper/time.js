const time = {
  now : () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var now = yyyy+'-'+mm+'-'+dd;
  
    return now;
  }
}

export default time;
