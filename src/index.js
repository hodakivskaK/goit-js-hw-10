import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const fieldInputEl = document.querySelector('#search-box');
const listEl = document.querySelector(".country-list");
const boxCountryEl = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;

// 1
import {fetchCountriesByName} from './fetchCountries'
 
// input Search and function 
fieldInputEl.addEventListener("input", debounce(inputSearch, DEBOUNCE_DELAY))

function inputSearch(e) {
    const inputValue = e.target.value;
    console.log(inputValue)
    if (inputValue === "") {
        boxCountryEl.innerHTML = "";
        listEl.innerHTML = "";
        return;
    }
    fetchCountriesByName(inputValue)
        .then(countries => {
            boxCountryEl.innerHTML = "";
            listEl.innerHTML = "";
            console.log(countries)
            if (countries.length > 10) {
            return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        }
            if (countries.length === 1) {
                
                countries.map(c => markupBox(c.name.official, c.capital, c.population, Object.keys(c.languages).join(", "), c.flags.svg));
                return;
            } else {
            
                countries.map(c => markupList(c.flags.svg, c.name.official));
                return
        }
            
            //             countries.map(c => markupList(c.capital, c.name.official, c.population, c.flags.svg, c.languages));
    })
    
}

// Markup list and country box
function markupList(url, nameCountry) {
    const createLi = document.createElement("li");
    const createImg = document.createElement("img");
    const createTitle = document.createElement("p");
    createLi.style.display = "flex"
    createLi.style.listStyle = "none";
    createLi.style.marginBottom = "25px";

    createImg.src = url;
    createImg.alt = nameCountry;
    createImg.height = "24";
    createImg.width = "30";
    createImg.style.marginRight = "10px";

    createTitle.textContent = nameCountry;
    createTitle.style.margin = 0;

    createLi.append(createImg, createTitle);
    listEl.append(createLi);

//       listEl.innerHTML =  `<li>
//     <img src = ${url} alt ="${nameCountry}" height ="13" weight= "15" > 
//     <p>${nameCountry} </p>
//   </li>
//    `;
   
}

function markupBox(countryName, capital, population, languages, flag) {
    boxCountryEl.innerHTML = `<h1>${countryName}</h1>
      <img src = ${flag} alt ="${countryName}" height ="130" weight= "150" > 
      <p>Capital: ${capital}<p>
      <p>Population: ${population}<p>
      <p>Languages: ${languages}<p>
    `}