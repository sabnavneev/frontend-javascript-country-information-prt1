import axios from "axios";

console.log('Werkt de console');

const countryInfo = document.getElementById('country');

async function getCountry() {
    try {
        const result = await axios.get('https://restcountries.com/v2/all');

        // Haal data uit result
        const { data } = result;

        // Sorteer landen op population
        data.sort(function (a, b) {
            return a.population - b.population;
        });

        // Vul een html lijst met land info: flag, name, population
        // Kleur name aan de hand van region
        for (let i = 0; i < data.length; i++){
            let CountryColor = setColorRegion(data);
            function setColorRegion(data){
                switch (data[i].region){
                    case "Africa":
                        return "blue";
                        break;
                    case "Americas":
                        return "green";
                        break;
                    case "Asia":
                        return "red";
                        break;
                    case "Europe":
                        return "yellow";
                        break;
                    case "Oceania":
                        return "purple";
                        break;
                    default:
                        return "black";
                        break;
                }
            }
            countryInfo.innerHTML += `
                <li>
                <img src="${data[i].flag}" alt="Flag" class="flag"> 
                <span class="${CountryColor}">${data[i].name}</span> 
                <br>
                <p>Has a population of <strong>${data[i].population}</strong> people</p>
                </li>
                `;
        }
    } catch (e) {
        console.error(e);
    }
}

getCountry();