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

function getTemperature(response) {
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°F`;
  let cityDisplayed = document.querySelector("#city");
  cityDisplayed.innerHTML = response.data.name;
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
