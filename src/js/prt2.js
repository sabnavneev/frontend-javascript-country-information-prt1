import axios from "axios";

console.log('Werkt de console');

//variabele aanmaken en koppelen aan html
const countryInfo = document.getElementById('country-info');
const form = document.getElementById('country-form')

//eventlistener koppelen aan input field
form.addEventListener('submit', fetchCountryInfo);

//async functie maken met GET request naar endpoint /name
//landinfo tonen op pagina
//error message tonen op pagina
//refresh voorkomen
//zoekwaarde leegmaken ( Dit lukt nog niet goed!)
async function fetchCountryInfo(e) {
        e.preventDefault()
        try {
            const searchContent = document.getElementById('search-content').value;
            const resultArray = await axios.get('https://restcountries.com/v2/name/' + searchContent);
            const { name, flag: png, subregion, population, capital, currencies } = resultArray.data[0];

            countryInfo.innerHTML += `
                <h3><img src="${png}" alt="Flag" class="flag"><span class="gochi-font"> ${name}</span></h3>
                <p>${name} is situated in ${subregion}. It has a population of ${population} people.
                <br>
                The capital is ${capital} and you can pay with ${currencies[0].name}'s.<p>
                `;
            form.reset();
        } catch (e) {
            console.error(e);
            countryInfo.innerHTML =`
                <p>Dit land is niet bekend in de database.</p>
                `;
        }
}