const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const countryInfo = document.getElementById("countryInfo");

async function fetchCountries(countryName) {
    try {
        const url = `https://restcountries.com/v3.1/name/${countryName}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 404) {
            countryInfo.innerHTML = "<p>Country not found</p>";
            return;
        }
        
        const country = data[0];
        countryInfo.innerHTML = `
            <div class="country-card">
                <h2>${country.name.common}</h2>
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" width="100">
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Currency:</strong> ${Object.values(country.currencies)[0].name} (${Object.keys(country.currencies)[0]})</p>
                <p><strong>Languages:</strong> ${Object.values(country.languages).join(", ")}</p>
            </div>
        `;
    } catch (error) {
        console.log("Ошибка", error);
        countryInfo.innerHTML = "<p>Error fetching country data</p>";
    }
}

searchButton.addEventListener('click', () => {
    const countryNameInput = countryInput.value.trim().toLowerCase();
    if (countryNameInput) {
        fetchCountries(countryNameInput);
    }
});