document.addEventListener("DOMContentLoaded", async () => {
    try {
        let weather = getLocalStorage("weatherData");
        if (!weather) {
            weather = await weatherData();
        }
        console.log(weather);
        bindWeatherData(weather);
    } catch (error) {
        console.error(error);
    }

    document.getElementById("searchWeatherBtn").addEventListener("click", searchWeatherByCity);
});

async function weatherData() {

    return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                try {

                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    const locationResponse = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
                    );

                    const locationData = await locationResponse.json();

                    const city =
                        locationData.address.city ||
                        locationData.address.town ||
                        locationData.address.village ||
                        locationData.address.state_district;

                    const weatherResponse = await fetch(
                        `https://api.weatherstack.com/current?access_key=555bc95a7f8eaf574c0f05e70723c321&query=${city}`
                    );

                    const weather = await weatherResponse.json();
                    setLocalStorage('weatherData', weather);
                    resolve(weather);

                } catch (error) {
                    reject(error);
                }

            },
            reject
        );

    });

}

function bindWeatherData(data) {

    const location = data.location;
    const current = data.current;
    const air = current.air_quality;
    const astro = current.astro;

    // Header
    document.querySelector(".weather-header-bar h3").textContent =  `${location.name}, ${location.region}`;

    document.querySelector(".weather-header-bar p").textContent = `Local Time : ${location.localtime}`;

    document.querySelector(".weather-pill").textContent = current.weather_descriptions[0];

    document.querySelectorAll(".weather-pill")[1].textContent = `Updated ${current.observation_time}`;


    // Hero Section

    document.querySelector(".weather-hero h1").textContent = `${current.temperature}°C`;

    document.querySelector(".weather-condition").textContent = `Feels Like ${current.feelslike}°C • ${current.weather_descriptions[0]}`;

    document.querySelector(".weather-location-row strong").textContent = location.name;

    document.querySelector(".weather-location-row span").textContent = `${current.cloudcover}% Cloud Cover • ${current.wind_dir} Wind`;

    document.querySelector(".weather-sun-times div:nth-child(1) strong").textContent = astro.sunrise;

    document.querySelector(
        ".weather-sun-times div:nth-child(2) strong"
    ).textContent = astro.sunset;


    // Stats Cards

    const stats = document.querySelectorAll(".weather-stat-card strong");

    stats[0].textContent = `${current.humidity}%`;
    stats[1].textContent = `${current.wind_speed} km/h`;
    stats[2].textContent = current.uv_index;
    stats[3].textContent = `${current.visibility} km`;
    stats[4].textContent = `${current.pressure} hPa`;

    const epa = Number(air["us-epa-index"]);

    stats[5].textContent = epa <= 2 ? "Good" :epa <= 4 ? "Moderate" : "Poor";


    // AQI Section

    document.querySelector(".aqi-value").textContent =
        Math.round(Number(air.pm2_5));

    document.querySelector(".aqi-card h4").textContent =
        epa <= 2 ? "Good" :
            epa <= 4 ? "Moderate" :
                "Poor";

    document.querySelector(".aqi-card p").textContent =
        `PM2.5 ${air.pm2_5} • PM10 ${air.pm10}`;


    // Sun & Moon

    const sunMoon =
        document.querySelectorAll(".sunmoon-card strong");

    sunMoon[0].textContent = astro.sunrise;
    sunMoon[1].textContent = astro.sunset;
    sunMoon[2].textContent = astro.moon_phase;
    sunMoon[3].textContent = `${astro.moon_illumination}%`;


    // Alerts

    const alertList =
        document.querySelector(".alert-list");

    if (current.wind_speed > 25) {

        alertList.innerHTML = `
            <div class="alert-card warning">
                <strong>High Wind Alert</strong>
                <p>Wind Speed ${current.wind_speed} km/h (${current.wind_dir})</p>
            </div>
        `;

    } else {

        alertList.innerHTML = `
            <div class="alert-card good">
                <strong>No Alerts</strong>
                <p>Weather conditions are stable.</p>
            </div>
        `;
    }


    // Insights

    const insights =
        document.querySelectorAll(".insight-card");

    insights[0].innerHTML = `
        <h4>Current Weather</h4>
        <p>${current.weather_descriptions[0]} with temperature ${current.temperature}°C.</p>
    `;

    insights[1].innerHTML = `
        <h4>Humidity & Visibility</h4>
        <p>${current.humidity}% humidity and visibility ${current.visibility} km.</p>
    `;

    insights[2].innerHTML = `
        <h4>Air Quality</h4>
        <p>PM2.5 ${air.pm2_5} • PM10 ${air.pm10}</p>
    `;
}

async function searchWeatherByCity() {

    const city = document.querySelector("#cityInput").value.trim();

    if (!city) {
        alert("Please enter city name");
        return;
    }

    try {
        const response = await fetch(
            `https://api.weatherstack.com/current?access_key=555bc95a7f8eaf574c0f05e70723c321&query=${city}`
        );

        const weather = await response.json();

        if (!weather.location) {
            alert("City not found");
            return;
        }
        setLocalStorage("weatherData", weather);
        bindWeatherData(weather);
    } catch (error) {
        console.error(error);
    }
}

