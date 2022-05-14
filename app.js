let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let footer = document.querySelector("footer");

footer.innerHTML = `Last Updated: ${day}, ${hours}:${minutes}`;

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let tempMax = document.querySelector("#high");
  let tempMin = document.querySelector("#low");
  let feelsLike = document.querySelector("#feelslike");
  let pressure = document.querySelector("#pressure");

  temperatureElement.innerHTML = ` ${Math.round(response.data.main.temp)}°C`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  tempMax.innerHTML = `High: ${Math.round(response.data.main.temp_max)}°C |`;
  tempMin.innerHTML = `Low: ${Math.round(response.data.main.temp_min)}°C`;
  feelsLike.innerHTML = ` ${Math.round(response.data.main.feels_like)}°C`;
  pressure.innerHTML = response.data.main.pressure;

}

function search(city) {
  let apiKey = "0dd4796646f67d5530803ad34faf15e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  console.log(apiUrl);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function searchLocation(position) {
  let apiKey = "0dd4796646f67d5530803ad34faf15e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  console.log(apiUrl);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let showCurrentPosition = document.querySelector("#current-location-button");
showCurrentPosition.addEventListener("click", getCurrentPosition);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
