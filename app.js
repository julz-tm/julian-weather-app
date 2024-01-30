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
    // Your existing code to display current weather details
    const weatherCondition = getWeatherCondition(data.weather[0].main);
    updateWeatherEmoji(weatherCondition);

    // Add other current weather details here
}

function displayForecast(data) {
    // Your existing code to display 5-day forecast details
    // ...

    // Example usage of updating weather emoji dynamically for each forecast day
    for (let i = 0; i < data.list.length; i += 8) {
        const forecastData = data.list[i];
        const weatherCondition = getWeatherCondition(forecastData.weather[0].main);
        const emojiElement = document.createElement('div');
        emojiElement.className = 'weatherEmoji';
        emojiElement.textContent = getWeatherEmoji(weatherCondition);

        const forecastDetailsElement = document.createElement('div');
        forecastDetailsElement.className = 'forecastDetails';
        forecastDetailsElement.innerHTML = `
            <p>Date: ${forecastData.dt_txt}</p>
            <!-- Add other forecast details here -->
        `;

        const forecastDayElement = document.createElement('div');
        forecastDayElement.className = 'forecastDay';
        forecastDayElement.appendChild(emojiElement);
        forecastDayElement.appendChild(forecastDetailsElement);

        forecastDiv.appendChild(forecastDayElement);
    }
}

function addCityToHistory(cityName) {
    // Your existing code to add city to search history
    // ...
}

function getWeatherCondition(main) {
    // Your existing code to determine weather condition
    // ...
}

function updateWeatherEmoji(weatherCondition) {
    const emojiElement = document.querySelector('.weatherEmoji');
    emojiElement.textContent = getWeatherEmoji(weatherCondition);
}

function getWeatherEmoji(weatherCondition) {
    // Map weather conditions to corresponding emojis
    const emojiMap = {
        'clear': '☀️',
        'clouds': '☁️',
        'rain': '🌧️',
        'thunderstorm': '⛈️',
        'snow': '❄️',
        // Add more conditions as needed
    };
    return emojiMap[weatherCondition] || '❓';
}

