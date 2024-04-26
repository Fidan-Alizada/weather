
async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "54b1407dcc4d3ca0d88eefdeca4dd8a4";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");
    const currentTime = new Date();
    const sunriseTime = new Date(data.sys.sunrise * 1000);
    const sunsetTime = new Date(data.sys.sunset * 1000);
    const isDay = currentTime > sunriseTime && currentTime < sunsetTime;
    const dayNightClass = isDay ? "day" : "night";
    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    const temperature = (data.main.temp - 273.15).toFixed(1);
    const windSpeed = data.wind.speed;
    weatherInfo.innerHTML = `
        <h2 class="${dayNightClass}">${data.name}, ${data.sys.country}</h2>
        <p class="${dayNightClass}">Temperature: ${temperature}°C</p>
        <p class="${dayNightClass}">Weather: ${weatherDescription}</p>
        <img class="weather-image" src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
        <div class="weather-info ${dayNightClass}">
            <p>Wind Speed: ${windSpeed} m/s</p>
        </div>
    `;
    if (windSpeed > 0) {
        const windGif = document.createElement('img');
        windGif.classList.add('wind-gif');
        windGif.src = 'https://cdn.pixabay.com/animation/2023/11/11/18/15/18-15-55-407_512.gif';
        weatherInfo.appendChild(windGif);
    }
}
