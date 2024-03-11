const APIKey = "5d4ca925a87248e7cedd264a409ba9c7";

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const todayContainer = document.getElementById('today');
const forecastContainer = document.getElementById('forecast');
const historyContainer = document.getElementById('history');

// Function for preventing the refreshing of the page and passing the input as an argument
const handleFormSubmit = (event) => {
    event.preventDefault();
    const searchedCity = searchInput.value; 
    searchInput.value = "";
    locationData(searchedCity); 
};

// Event Listener for the submit button
searchForm.addEventListener('submit', handleFormSubmit);

// Function for getting longitute and latitude of the searched city
const locationData = (searchedCity) => {
    const locationDataURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=5&appid=${APIKey}`;
    fetch(locationDataURL)
        .then(function (response) {
            return response.json();
        }).then(function (coordinates) {
            weatherData(coordinates, searchedCity);
        })
};

// Function for fetching the weather data
const weatherData = (coordinates, searchedCity) => {
    const lat = coordinates[0].lat;
    const lon = coordinates[0].lon;
    const queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            todaysWeather(data);
        }); 
};

// Function for creating the elements to display the weather
const todaysWeather = (data) => {
    console.log(data);
    const cityName = data.city.name
    const currentTime = dayjs().format()
    const currentTemperature = data.list[0].main.temp - 273.15 + "°C"; // 1C = 1K - 273.15
    const currentHumidity = data.list[0].main.humidity + "%"
    const currentWind = data.list[0].wind.speed + "m/s"
    const icon = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
 
    const weatherCardEl = document.createElement("div")
    const cardContentEl = document.createElement("div")
    const headerEl = document.createElement("h2")
    const iconEl = document.createElement("img")

    // Creating and appending the elements, and setting their text content
    todayContainer.append(headerEl)
    headerEl.textContent = cityName + " " + currentTime
    todayContainer.appendChild(cardContentEl);
    cardContentEl.textContent = "The temperature right now is " + currentTemperature + ". The wind speed is equal to " + currentWind + " and the humidity is equal to " + currentHumidity + "."
};

