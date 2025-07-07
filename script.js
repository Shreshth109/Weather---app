document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-name");  // Changed to match HTML
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityHeadingDisplay = document.getElementById("city-heading"); // Changed to match HTML
    const temperatureDisplay = document.getElementById("temperature"); // Fixed spelling
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = '77c094dc6f674cf5a5462522250104';

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) {
            alert("Please enter a city name.");
            return;
        }
          
        // it may throw an eror 
        // server/database is always on other continent

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError(error.message);
        }
    });

    async function fetchWeatherData(city) {
        const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        console.log(data);

        const { location, current } = data;
        cityHeadingDisplay.textContent = location.name; // Changed to match HTML
        temperatureDisplay.textContent = `Temperature: ${current.temp_c}°C`; // Fixed spelling
        descriptionDisplay.textContent = `Condition: ${current.condition.text}`;
        
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError(message) {
        weatherInfo.classList.add('hidden');
        errorMessage.textContent = `Error: ${message}`;
        errorMessage.classList.remove('hidden');
    }
});