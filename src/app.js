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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  //Need to create a new variable that will store the HTML for the forecast
  //Best to use template literals here instead of quotes, as quotes will close off when they reach the first quote inside the HTML
  //Here we are appending this code to the existing forecastHTML
  let forecastHTML = `<div class="row">`;
  //We now want to loop this bit of code so that we create 5 to 7 columns in our row
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  //Now we use a forEach loop, that applies a function to each entry in the array
  days.forEach(function (day) {
    //This function here will do what we want, which is appending a new column
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <img
        src="http://openweathermap.org/img/wn/01d@2x.png"
        alt="sunny"
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">18° </span>
        <span class="weather-forecast-temperature-min">12°</span>
      </div>
    </div>
  `;
  });

  //Now we are closing the row by adding a div endtag
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let lon = coordinates.lon;
  let lat = coordinates.lat;
  let apiKey = "9a2a40fbafb3cdf4386821927d8245af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  //We can redefine the global variable celsiusTemperature here
  celsiusTemperature = response.data.main.temp;
  //The temp is inside an object called main, inside an object called data
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
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
  getForecast(response.data.coord);
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

function displayFahrenheitTemperature(event) {
  //Prevents the browser from trying to open the link in a new window
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  //remove active class from the celsius link
  celsiusLink.classList.remove("active");
  celsiusLink.classList.add("inactive");
  fahrenheitLink.classList.add("active");
  fahrenheitLink.classList.remove("inactive");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //remove active class from the fahrenheit link
  celsiusLink.classList.add("active");
  celsiusLink.classList.remove("inactive");
  fahrenheitLink.classList.remove("active");
  fahrenheitLink.classList.add("inactive");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//These variables are global, and therefore accessible inside all functions
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//This will pre-load New York data whenever the page is refreshed
search("London");
