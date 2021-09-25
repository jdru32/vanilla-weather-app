function formatDate(timestamp) {
  //timestamp will be the number of milliseconds that have happened since 1970
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
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
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  //The function that is called when axios gets the URL
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  //The temp is inside an object called main, inside an object called data
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  //OpenWeather provides dt or date time
  //We are sending the timestamp from OpenWeather to our formatDate function which will turn dt into date and time
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  //OpenWeather provides weather condition codes that relate to specific images
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "9a2a40fbafb3cdf4386821927d8245af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //To access this api, we need to tell axios to get the URL
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  //Prevents the page from reloading
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  //Once we have the value entered in the search bar, we put that value through the search function
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
