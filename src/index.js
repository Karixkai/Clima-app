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

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#grade").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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

function celcius(event) {
  event.preventDefault();
  let grade = document.querySelector("#grade");
  grade.innerHTML = "40";
}

function faren(event) {
  event.preventDefault();
  let grade2 = document.querySelector("#grade");
  grade2.innerHTML = "104";
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
