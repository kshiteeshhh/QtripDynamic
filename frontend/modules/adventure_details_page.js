import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let value=search.split('=');
  return value[1];
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let resp=await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`);
    let data=await resp.json();
    return data;
  }
  catch(e)
  {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById('adventure-name').textContent=adventure.name;
  document.getElementById('adventure-subtitle').textContent=adventure.subtitle;
  let photos=document.getElementById('photo-gallery');
  (adventure.images).forEach(ele=>
    {
      let div=document.createElement('div');
      let img=document.createElement('img');
      img.src=ele;
      img.classList="activity-card-image";
      div.append(img)
      photos.append(div);
    })
  document.getElementById('adventure-content').textContent=adventure.content;
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photos=document.getElementById('photo-gallery');
  photos.innerHTML=`<div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel1"></div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>`
  let div=document.getElementById('carousel1');
  images.forEach((ele,i)=>{
  div.innerHTML+=`<div class="carousel-item ${i===0?"active":""}">
                  <img src=${ele} class="d-block w-100" alt="...">
                  </div>`;
  })
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available===true)
  { 
    document.getElementById('reservation-panel-sold-out').style.display='none';
    document.getElementById("reservation-panel-available").style.display='block';
    document.getElementById('reservation-person-cost').textContent=adventure.costPerHead;
  }
  else 
  {
    document.getElementById('reservation-panel-available').style.display='none';
    document.getElementById('reservation-panel-sold-out').style.display='block';
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let total_cost=adventure.costPerHead*persons;
  document.getElementById('reservation-cost').textContent=total_cost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form=document.querySelector('#myForm');
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formdata=new FormData(form);
    let obj={
      name:formdata.get('name'),
      date:formdata.get('date'),
      person:formdata.get('person'),
      adventure:adventure.id
    }
    console.log(obj);
    fetch(`${config.backendEndpoint}/reservations/new`,{
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
      }).then(_response =>{
      alert("Success");
      location.reload();
      }
      )
      .catch(_resp=>{
        alert("failed")})
      })
    }

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved===true)
  {
    document.getElementById('reserved-banner').style.display='block';
  }
  else 
  {
    document.getElementById('reserved-banner').style.display='none';
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
