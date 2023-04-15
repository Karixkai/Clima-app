let now = new Date();
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
let weekday = document.querySelector("#weekday");
let currentminutes = now.getMinutes();
currentminutes = ("0" + currentminutes).slice(-2);
let currentHours = now.getHours();
currentHours = ("0" + currentHours).slice(-2);
let currentime = `${day} ${currentHours}:${currentminutes}`;
weekday.innerHTML = currentime;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getforecast(coordinates){
  let apiKey = "3499ef150985eccadd080ff408a018df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayforecast);

}

function displayforecast(response){
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <li>
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </li>
  `;
    }
  });

  forecastHTML = forecastHTML;
  forecastElement.innerHTML = forecastHTML;
}


function displayWeatherCondition(response) {
   let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let c = Math.round(response.data.main.temp);
  let f = (c * 9) / 5 + 32;
  document.querySelector("#city").innerHTML = response.data.name;
  console.log(response);
  const celcius2 = celcius.bind(null,c);
  const faren2 = faren.bind(null,f);
  let farlink = document.querySelector("#far");
farlink.addEventListener("click", faren2);
let cellink = document.querySelector("#cel");
cellink.addEventListener("click", celcius2);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#emoji").src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
celcius2(c);
getforecast(response.data.coord);
}

function searchCity(city) {
  if (city.length == 0) {
    alert("Please write a city");
    return;
  }
  let apiKey = "88f711e799b7cf72786d772cd4b3bcca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityname").value;
  searchCity(city);
}

function searchlocation(position) {
  let apiKey = "88f711e799b7cf72786d772cd4b3bcca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchlocation);
}

function celcius(c="40") {
  document.querySelector("#grade").innerHTML = c;

}

function faren(f="104") {
  document.querySelector("#grade").innerHTML = f;
}

let farlink = document.querySelector("#far");
farlink.addEventListener("click", faren);

let cellink = document.querySelector("#cel");
cellink.addEventListener("click", celcius);

let searchForm = document.querySelector("#button1");
searchForm.addEventListener("click", submit);

let LocationButton = document.querySelector("#button2");
LocationButton.addEventListener("click", getCurrentLocation);

searchCity("Dublin");
