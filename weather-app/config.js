const apiKey = '5203e021922bbde551b990eabe06f621'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const weatherInfo = document.getElementById('weather-info');
    const city = cityInput.value;
    
    if (!city) {
        weatherInfo.innerHTML = 'Please enter a city name.';
        return;
    }
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        
        if (data.cod === '404') {
            weatherInfo.innerHTML = 'City not found. Please try again.';
        } else {
            const weather = data.weather[0].description;
            const temp = data.main.temp;
            const feelsLike = data.main.feels_like;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            
            weatherInfo.innerHTML = `
                        <h2>Weather in ${data.name}</h2>
                        <p>Temperature: ${temp}°C</p>
                        <p>Feels like: ${feelsLike}°C</p>
                        <p>Weather: ${weather}</p>
                        <p>Humidity: ${humidity}%</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                    `;
        }
    } catch (error) {
        weatherInfo.innerHTML = 'An error occurred. Please try again later.';
        console.error('Error:', error);
    }
}