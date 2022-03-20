let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
let hours = currentDate.getHours();
let minutes = String(currentDate.getMinutes()).padStart(2, "0");

let dayTime = document.querySelector(".day-time");
dayTime.innerHTML = `${day} ${hours}:${minutes}`;

let apiKey = "e2f36d818d6c24ee59a8141538e2d51f";
let search = document.querySelector("#search-button");
search.addEventListener("click", citySearch);

function citySearch(event) {
  event.preventDefault();
  let citySelected = document.querySelector("#input-city");
  let cityDisplayed = document.querySelector("#city");
  cityDisplayed.innerHTML = citySelected.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySelected.value}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(getTemperature);
}

function getForecast(coordinates) {
  let apiKey = "e2f36d818d6c24ee59a8141538e2d51f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function getTemperature(response) {
  let temperature = document.querySelector("#current-temp");
  let cityDisplayed = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperature.innerHTML = Math.round(celsiusTemperature);
  cityDisplayed.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed} m/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(urlCoords).then(getTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="day">${formatDay(forecastDay.dt)}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="50"
              />
              <div class="weather-forecast temperatures">
              <span class="forecast-max-temperature">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="forecast-min-temperature">${Math.round(
                forecastDay.temp.min
              )}°</span>
           </div>
         </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
