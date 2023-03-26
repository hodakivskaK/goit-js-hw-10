import Notiflix from 'notiflix';

export const fetchCountriesByName =  countryName =>  {
    // return fetch(`https://restcountries.com/v3.1/name/${countryName}`
        
    return fetch(`https://restcountries.com/v3.1//name/${countryName}?fields=flags,capital,name,population,languages`)

    .then(response => {
        if (!response.ok) {
            throw new Error(Notiflix.Notify.failure("Oops, there is no country with that name"))
        }
        return response.json()
    })
}  
