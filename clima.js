document.addEventListener("DOMContentLoaded", () => {
    const key = ""; // Informar a chave de acesso
    const woeidCode = ""; //Para consular pelo codigo da cidade, para encontrar o código correspondente a cidade usar https://console.hgbrasil.com/documentation/weather/tools
    const city = ""; // Para consultar por cidade
    const getUserCityType = ["woeid=" + woeidCode, "city_name=" + city, "user_ip=remote"];
    const option = 1; // OPÇÃO: 0 para código woeid, 1 para cidade, 2 para IP do usuário

    const getElement = (selector) => document.querySelector(selector);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=${key}&${getUserCityType[option]}`);
            const { results } = await response.json();
            return results;

        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const updateWeatherData = (data) => {
        const elements = {
            temp: getElement('.temp'),
            date: getElement('.date'),
            time: getElement('.time'),
            description: getElement('.description'),
            currently: getElement('.currently'),
            city: getElement('.city'),
            humidity: getElement('.humidity'),
            cloudiness: getElement('.cloudiness'),
            rain: getElement('.rain'),
            wind_speedy: getElement('.wind_speedy'),
            wind_direction: getElement('.wind_direction'),
            wind_cardinal: getElement('.wind_cardinal'),
            sunrise: getElement('.sunrise'),
            sunset: getElement('.sunset'),
            moon_phase: getElement('.moon_phase'),
            condition_slug: getElement('.condition_slug'),
            city_name: getElement('.city_name'),
            timezone: getElement('.timezone'),
        };

        const {
            temp, date, time, description, currently, city, humidity, cloudiness, rain, wind_speedy,
            wind_direction, wind_cardinal, sunrise, sunset, moon_phase, condition_slug, city_name, timezone,
            forecast
        } = data;

        if (elements.temp) elements.temp.innerHTML = `${temp}°`;
        if (elements.date) elements.date.innerHTML = date;
        if (elements.time) elements.time.innerHTML = time;
        if (elements.description) elements.description.innerHTML = description;
        if (elements.currently) elements.currently.innerHTML = currently;
        if (elements.city) elements.city.innerHTML = city;
        if (elements.humidity) elements.humidity.innerHTML = `${humidity}%`;
        if (elements.cloudiness) elements.cloudiness.innerHTML = `${cloudiness}%`;
        if (elements.rain) elements.rain.innerHTML = `${rain}%`;
        if (elements.wind_speedy) elements.wind_speedy.innerHTML = wind_speedy;
        if (elements.wind_direction) elements.wind_direction.innerHTML = `${wind_direction}°`;
        if (elements.wind_cardinal) elements.wind_cardinal.innerHTML = wind_cardinal;
        if (elements.sunrise) elements.sunrise.innerHTML = sunrise;
        if (elements.sunset) elements.sunset.innerHTML = sunset;
        if (elements.moon_phase) elements.moon_phase.src = `https://assets.hgbrasil.com/weather/icons/moon/${moon_phase}.png`;
        if (elements.condition_slug) elements.condition_slug.src = `https://assets.hgbrasil.com/weather/icons/conditions/${condition_slug}.svg`;
        if (elements.city_name) elements.city_name.innerHTML = city_name;
        if (elements.timezone) elements.timezone.innerHTML = `UTC ${timezone}`;

        forecast.forEach((day, index) => {
            const dayElements = {
                date: getElement(`.day${index}_date`),
                weekday: getElement(`.day${index}_weekday`),
                max: getElement(`.day${index}_max`),
                min: getElement(`.day${index}_min`),
                cloudiness: getElement(`.day${index}_cloudiness`),
                rain: getElement(`.day${index}_rain`),
                rain_probability: getElement(`.day${index}_rain_probability`),
                wind_speedy: getElement(`.day${index}_wind_speedy`),
                description: getElement(`.day${index}_description`),
                condition: getElement(`.day${index}_condition`)
            };

            if (dayElements.date) dayElements.date.innerHTML = day.date;
            if (dayElements.weekday) dayElements.weekday.innerHTML = day.weekday;
            if (dayElements.max) dayElements.max.innerHTML = `${day.max}°`;
            if (dayElements.min) dayElements.min.innerHTML = `${day.min}°`;
            if (dayElements.cloudiness) dayElements.cloudiness.innerHTML = `${day.cloudiness}%`;
            if (dayElements.rain) dayElements.rain.innerHTML = `${day.rain}%`;
            if (dayElements.rain_probability) dayElements.rain_probability.innerHTML = `${day.rain_probability}%`;
            if (dayElements.wind_speedy) dayElements.wind_speedy.innerHTML = day.wind_speedy;
            if (dayElements.description) dayElements.description.innerHTML = day.description;
            if (dayElements.condition) dayElements.condition.src = `https://assets.hgbrasil.com/weather/icons/conditions/${day.condition}.svg`;

        });
    };

    fetchWeatherData().then(updateWeatherData);
});
