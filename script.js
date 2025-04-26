function searchCountry() {
    var countryName = document.getElementById("countryInput").value.trim();

    if (countryName === "") {
        alert("Please enter a country name!");
        return;
    }

    var url = "https://restcountries.com/v3.1/name/" + countryName;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayCountry(data);
    })
    .catch(error => {
        alert("Country not found!");
        console.log(error);
    });
}

function displayCountry(countries) {
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    countries.forEach(country => {
        var card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${country.name.common}</h3>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <p><strong>Capital:</strong> ${country.capital}</p>
            <button onclick="showMoreDetails('${country.name.common}')">More Details</button>
        `;

        resultDiv.appendChild(card);
    });
}

function showMoreDetails(countryName) {
    var url = "https://restcountries.com/v3.1/name/" + countryName;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        var country = data[0];
        var details = `
            Country: ${country.name.common}
            Capital: ${country.capital}
            Region: ${country.region}
            Population: ${country.population}
            Area: ${country.area} sq km
        `;
        fetchWeather(country.capital, details);
    })
    .catch(error => {
        console.log(error);
    });
}


function fetchWeather(city, countryDetails) {
    var apiKey = "9b1555e02b5ee89dd07eafd8c9f40796"; 
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
    .then(response => response.json())
    .then(weatherData => {
        alert(countryDetails + `

Weather:
Temperature: ${weatherData.main.temp} °C
Weather: ${weatherData.weather[0].description}
Humidity: ${weatherData.main.humidity} %
`);
    })
    .catch(error => {
        alert(countryDetails + "\n\nWeather: Data not available.");
        console.log(error);
    });
}
