const apiKey = '65b821c27fc70bc6a99650bbd9a1c53e';
const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const forecastDiv = document.querySelector('#forecast');
const prevDayBtn = document.querySelector('#prevDay');
const nextDayBtn = document.querySelector('#nextDay');
const forecastControls = document.querySelector('.forecast-controls'); // Navigation controls

let forecastData = [];
let currentDayIndex = 0;

async function checkWeather(city) {
    // Fetch current weather
    const response = await fetch(currentWeatherUrl + city + `&appid=${apiKey}`);
    
    if (response.status === 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
        forecastControls.style.display = 'none'; // Hide controls if there is an error
        return;
    }

    let data = await response.json();

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    const weatherCondition = data.weather[0].main;
    updateWeatherIcon(weatherCondition);

    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';

    // Fetch 5-day forecast
    const forecastResponse = await fetch(forecastUrl + city + `&appid=${apiKey}`);
    forecastData = await forecastResponse.json();
    displayForecast();

    // Show navigation controls after successful data fetch
    forecastControls.style.display = 'flex';
}

function updateWeatherIcon(condition) {
    const iconMap = {
        Clouds: 'clouds.png',
        Clear: 'clear.png',
        Rain: 'rain.png',
        Drizzle: 'drizzle.png',
        Snow: 'snow.png',
        Mist: 'mist.png'
    };
    weatherIcon.src = `./assets/img/${iconMap[condition] || 'default.png'}`;
}

function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function displayForecast() {
    forecastDiv.innerHTML = '';
    const forecastList = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));

    if (forecastList.length > 0) {
        const forecastItem = forecastList[currentDayIndex];
        const forecastDate = formatDate(forecastItem.dt);
        const forecastTime = formatTime(forecastItem.dt);
        const weatherCondition = forecastItem.weather[0].main;
        const icon = `./assets/img/${{
            Clouds: 'clouds.png',
            Clear: 'clear.png',
            Rain: 'rain.png',
            Drizzle: 'drizzle.png',
            Snow: 'snow.png',
            Mist: 'mist.png'
        }[weatherCondition] || 'default.png'}`;

        forecastDiv.innerHTML = `
            <div class="forecast-item">
                <h3>${forecastDate}</h3>
                <p>${forecastTime}</p>
                <img src="${icon}" class="weather-icon" alt="Weather Icon">
                <p>Temp: ${Math.round(forecastItem.main.temp)}°C</p>
                <p>Humidity: ${forecastItem.main.humidity}%</p>
                <p>Weather: ${weatherCondition}</p>
            </div>
        `;
    }
}

function showNextDay() {
    if (forecastData.list) {
        currentDayIndex = (currentDayIndex + 1) % forecastData.list.length;
        displayForecast();
    }
}

function showPreviousDay() {
    if (forecastData.list) {
        currentDayIndex = (currentDayIndex - 1 + forecastData.list.length) % forecastData.list.length;
        displayForecast();
    }
}

// Call the function upon clicking the search button
searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
    searchBox.value = '';
});

prevDayBtn.addEventListener('click', showPreviousDay);
nextDayBtn.addEventListener('click', showNextDay);
