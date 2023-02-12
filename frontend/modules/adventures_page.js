
import config from "../conf/index.js";
//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // let idx=search.indexOf('=');
  // let id=search.substring(idx+1);
  // return id;
  const param= new URLSearchParams(search);
  const city=param.get("city");

  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let response=await fetch(config.backendEndpoint+`/adventures?city=${city}`);
    let data=await response.json();
    return data;
  }
  catch(e)
  {
    return null;
  }
}
//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let div=document.getElementById('data');
  adventures?.forEach(element=>{
    let card=document.createElement('div');
    card.className='col-12 col-sm-6 col-lg-3 mb-4 position-relative'
    card.innerHTML=`
    <a id=${element.id} href='detail/?adventure=${element.id}'>
    <div class='category-banner'>
    <p>${element.category}</p>
    </div>
    <div id=${element.id} class='activity-card'>
      <img src=${element.image} class='img-responsive'>
      <div class='d-flex flex-column w-100'>
         <div class='d-flex justify-content-between w-100 px-3 mt-2'>
         <h6>${element.name}</h6>
         <p style='color:rgb(27,28,28)'>${element.currency} ${element.costPerHead}</p>
         </div>
         <div class='d-flex justify-content-between w-100 px-3'>
         <h6>Duration</h6>
         <p style='color:rgb(27,28,28)'>${element.duration} Hours</p>
         </div>
      </div>
    </div>
    </a>`;
    div.append(card);
  })
  }
    window.onload=function (){ let btn=document.getElementById('adventure-btn');
    btn.addEventListener('click',()=>{
    const city=getCityFromURL(window.location.search);
    fetch(`${config.backendEndpoint}/adventures/new`, {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "city":city})
    }).then(response => response.json())
    .then(response => (JSON.stringify(response)))
     })}
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let arr=list.filter(element=>{
    if(element.duration>=low && element.duration<=high)
    {
      return element;
    }
  })
  return arr;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // let arr=[];
  // categoryList.forEach(element=>{
  //   let arr2=list.filter(temp=>{
  //     if(temp.category===element)
  //     {return temp;}
  //   })
  //   arr2.forEach(variable=>{
  //     arr.push(variable);
  //   })
  // })
  // return arr;
  
  const arr=list.filter(adventure => categoryList.includes(adventure.category));
  return arr;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  let filteredList = [];
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  // 2. Filter by duration only
  else if (filters["duration"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  // 1. Filter by category only
  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  }
  else {
    filteredList = list;
  }
  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  
  window.localStorage.setItem("filters", JSON.stringify(filters));

  return true;
  }

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  
  return JSON.parse(window.localStorage.getItem("filters"));
}
//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM
function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  
  document.getElementById("duration-select").value = filters.duration;

  //Iterates over category filters and inserts category pills into DOM
  filters["category"].forEach((key) => {
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `
                 <div>${key}<button value=${key} id=${key} onclick="clearParticular(event)"> x</button></div>
                `;
    document.getElementById("category-list").appendChild(ele);
  });
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return null;
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
