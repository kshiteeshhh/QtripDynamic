import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let response=await fetch(config.backendEndpoint+'/cities');
    let data=await response.json();
    return data;
  }
  catch(e)
  {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let div=document.getElementById('data');
  let card=document.createElement('div');
  card.className='col-6 col-lg-3 mb-3'
  let anchorTag=document.createElement('a');
  anchorTag.setAttribute('href',`pages/adventures/?city=${id}`);
  anchorTag.setAttribute('id',id);
  let tileText=document.createElement('div');
  tileText.setAttribute('class','tile-text text-center');
  tileText.innerHTML=`<h3>${city}</h3>
                      <p>${description}<p>`;
  let imageElement=document.createElement('img');
  imageElement.setAttribute('src',image);
  imageElement.className='img-responsive';
  let cardContainer=document.createElement('div');
  cardContainer.append(tileText,imageElement);
  cardContainer.className='tile';
  anchorTag.append(cardContainer);
  card.append(anchorTag);
  div.append(card);
  
}
export { init, fetchCities, addCityToDOM };
