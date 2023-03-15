const container = document.querySelector('.container');
const search = document.querySelector('.search-icon');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '73dccbb1b77541cbad8143524231503';
    const city = document.querySelector('.search-box .search').value;

    if (city === '')
        return;

    fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`).then(response => response.json()).then(data => {
        if (data.error) {
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            container.style.height = 'auto';
            error404.style.display = 'block';
            error404.classList.add('fade-in');
            return;
        }
        const region = document.querySelector('#name');
        const location = document.querySelector('#location');
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity .humidity-perc');
        const wind = document.querySelector('.weather-details .wind .wind-vel');
        region.textContent = data.location.name;
        location.textContent = `${data.location.region}, ${data.location.country}`;
        image.src = data.current.condition.icon;
        temperature.innerHTML = `${parseInt(data.current.temp_c)}<span>°C</span>`;
        description.innerHTML = `${data.current.condition.text}`;
        humidity.innerHTML = `${data.current.humidity}%`;
        wind.innerHTML = `${parseInt(data.current.gust_kph)}Km/h`;
        error404.style.display = 'none';
        container.style.height = 'auto';
        weatherBox.style.display = 'flex';
        weatherDetails.style.display = 'flex';
        weatherBox.classList.add('fade-in');
        weatherDetails.classList.add('fade-in');
    })
})