import Notiflix from 'notiflix';

export const fetchCountriesByName =  countryName =>  {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}`
    // return fetch(`https://restcountries.com/v3.1/name/fields=${name};capital;lang;population;flags.svg;name.official`)
)
    .then(response => {
        if (!response.ok) {
            throw new Error(Notiflix.Notify.failure("Oops, there is no country with that name"))
        }
        return response.json()
    })
}  
