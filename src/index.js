function currentTime() {
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
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-sm-auto">
          <div class="forecast-date">${day}</div>
          <img src="" alt="" id="weather-icon" />
          <div class="forecast-temps>
            <span class="highest-forecast-temp">23°</span>
            <span class="lowest-forecast-temp">23°</span>
          </div>
        </div>
      `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
  degreeC.classList.add("active");
  degreeF.classList.remove("active");
}

function convertCelsius() {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = celsiusTemp;
  degreeC.classList.add("active");
  degreeF.classList.remove("active");
}

function convertFahrenheit() {
  let currentTemp = document.querySelector("#current-temp");
  let fahrenheitTemp = Math.round(celsiusTemp * 1.8 + 32);
  currentTemp.innerHTML = fahrenheitTemp;
  degreeF.classList.add("active");
  degreeC.classList.remove("active");
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

let degreeC = document.querySelector("#degree-c");
degreeC.addEventListener("click", convertCelsius);

let degreeF = document.querySelector("#degree-f");
degreeF.addEventListener("click", convertFahrenheit);

currentTime();
searchCity("Hanoi");
displayForecast();
