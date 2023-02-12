
import config from "../conf/index.js";
//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let resp=await fetch(config.backendEndpoint+'/reservations');
    let data=await resp.json();
    return data;
  }
  catch(e){
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  if(reservations.length>0)
  {
    document.getElementById('no-reservation-banner').style.display='none';
    document.getElementById('reservation-table-parent').style.display='block';
    let tableBody= document.getElementById('reservation-table');
    reservations.forEach((ele,idx)=>{
      let tr=document.createElement('tr');
      let time=new Date(ele.time);
      var hours = time.getHours();
      var AmOrPm = hours >= 12 ? 'pm' : 'am';
      hours = (hours % 12) || 12;
      let bookingTime=new Date(ele.time).toLocaleString('en-IN',{day: 'numeric',month:'long', year:'numeric'})
      let date=new Date(ele.date).toLocaleDateString('en-IN',{day:'numeric',month:"numeric", year:'numeric'});
      tr.innerHTML+=`
      <td><strong>${ele.id}</strong></td><td>${ele.name}</td><td>${ele.adventureName}</td><td>${ele.person}</td>
      <td>${date}</td><td>${ele.price}</td>
      <td>${bookingTime}, ${hours}:${time.getMinutes()}:${time.getSeconds()} ${AmOrPm}</td>
      <td><div id="${ele.id}" class="reservation-visit-button"><a href="../detail/?adventure=${ele.adventure}">Visit Adventure</a></div></td>
       `
      tableBody.append(tr);
    })
      
  }
  else 
  {
    document.getElementById('no-reservation-banner').style.display='block';
    document.getElementById('reservation-table-parent').style.display='none';
  }
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
