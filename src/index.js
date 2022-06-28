let now = new Date();
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear} ${currentHour}:${currentMinute}`;

let currentCity = document.querySelector("#current-city");
let currentTemp = document.querySelector("#current-temp");

function showCurrentTemp(response) {
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
}

function searchCity(city) {
  let apiKey = "15e40d2ffa0578647f1c626db4ee96ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  if (searchInput.value) {
    currentCity.innerHTML = `${searchInput.value}`;
    searchCity(searchInput.value);
  } else {
    alert("Please enter a city");
  }
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", search);

function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "15e40d2ffa0578647f1c626db4ee96ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentCityBttn = document.querySelector("#current-location");
currentCityBttn.addEventListener("click", getCurrentLocation);

searchCity("Hanoi");
