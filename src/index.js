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
  let apiUrl = `https:api.openweathermap.org/data/2.5/weather?q=${citySelected.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(getTemperature);
}

function getTemperature(response) {
  let temperature = document.querySelector("#current-temp");
  let cityDisplayed = document.querySelector("#city");

  celsiusTemperature = response.data.main.temp;
  temperature.innerHTML = Math.round(celsiusTemperature);
  cityDisplayed.innerHTML = response.data.name;
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlCoords = `https:api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(urlCoords).then(getTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);

function displayFahrenheit(event) {
  event.preventDefault();
  let tempUnit = document.querySelector("#current-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempUnit.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#f-unit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

function displayCelsius(event) {
  event.preventDefault();
  let tempUnit = document.querySelector("#current-temp");
  tempUnit.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;
let celsiusLink = document.querySelector("#c-unit");
celsiusLink.addEventListener("click", displayCelsius);
