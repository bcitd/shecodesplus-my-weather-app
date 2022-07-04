function currentTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  day = date.getDay();
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row justify-content-center">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-sm-auto">
          <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
          <img src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" id="forecast-weather-icon"/>
          <div class="forecast-temps>
            <span class="highest-forecast-temp">${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="lowest-forecast-temp">${Math.round(
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

function getForecast(coordinates) {
  let apiKey = "15e40d2ffa0578647f1c626db4ee96ed";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentTemp(response) {
  let description = document.querySelector("#description");
  let currentWindSpeed = document.querySelector("#wind-speed");
  let weatherIcon = document.querySelector("#weather-icon");
  let currentTemp = document.querySelector("#current-temp");
  celsiusTemp = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  currentWindSpeed.innerHTML = response.data.wind.speed;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  currentTemp.innerHTML = celsiusTemp;

  getForecast(response.data.coord);
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

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", search);

let currentCity = document.querySelector("#current-city");

let currentCityBttn = document.querySelector("#current-location");
currentCityBttn.addEventListener("click", getCurrentLocation);

let celsiusTemp = "null";

currentTime();
searchCity("Hanoi");
