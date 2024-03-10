const APIKey = "5d4ca925a87248e7cedd264a409ba9c7";

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const todayContainer = document.getElementById('today');
const forecastContainer = document.getElementById('forecast');
const historyContainer = document.getElementById('history');

const handleFormSubmit = (event) => {
    event.preventDefault();
    const searchedCity = searchInput.value; 
    searchInput.value = "";
    cityWeatherData(searchedCity); 
};

// Event Listener for the submit button
searchForm.addEventListener('submit', handleFormSubmit);

// Function for fetching API data
const cityWeatherData = (searchedCity) => {
    const weatherDataURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=5&appid=${APIKey}`;
    fetch(weatherDataURL)
        .then(function (response) {
            return response.json();
        }).then(function (coordinates) {
            getLonLat(coordinates, searchedCity);
        });
};

// Function for getting longitute and latitude of the searched city
const getLonLat = (coordinates, searchedCity) => {
    console.log(coordinates);
    const city = coordinates[0].name;
    const lat = coordinates[0].lat;
    const lon = coordinates[0].lon;
    const queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
};