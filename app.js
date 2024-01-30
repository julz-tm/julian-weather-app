const apiKey = 'fc695e4e3f9c4ce19b67f28935deb5aa';
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastDiv = document.getElementById('forecast');
const searchHistoryDiv = document.getElementById('searchHistory');
let searchHistory = [];

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const cityName = cityInput.value.trim();
    if (cityName === '') return;

    // Fetch current weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            addCityToHistory(cityName);
        })
        .catch(error => console.error('Error fetching current weather:', error));

    // Fetch 5-day forecast data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => console.error('Error fetching forecast:', error));
});

function displayCurrentWeather(data) {
    // Add your code to display current weather details
    // Example:
    currentWeatherDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <!-- Add your code to display the weather icon representation -->
    `;
}

function displayForecast(data) {
    // Add your code to display 5-day forecast details
    // Example:
    forecastDiv.innerHTML = '<h2>5-Day Forecast</h2>';
    for (let i = 0; i < data.list.length; i += 8) {
        const forecastData = data.list[i];
        forecastDiv.innerHTML += `
            <div>
                <p>Date: ${forecastData.dt_txt}</p>
                <p>Temperature: ${forecastData.main.temp} °C</p>
                <p>Humidity: ${forecastData.main.humidity}%</p>
                <p>Wind Speed: ${forecastData.wind.speed} m/s</p>
                <!-- Add your code to display the weather icon representation -->
            </div>
        `;
    }
}

function addCityToHistory(cityName) {
    searchHistory.push(cityName);
    // Add your code to update the search history display
    // Example:
    searchHistoryDiv.innerHTML = `
        <h2>Search History</h2>
        <ul>
            ${searchHistory.map(city => `<li><a href="#" onclick="searchHistoryClick('${city}')">${city}</a></li>`).join('')}
        </ul>
    `;
}

function searchHistoryClick(cityName) {
    // Add your code to handle click on a city in the search history
    // Example:
    cityInput.value = cityName;
    searchForm.dispatchEvent(new Event('submit'));
}
