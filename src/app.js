function displayTemperature(response) {
  //The function that is called when axios gets the URL
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  //The temp is inside an object called main, inside an object called data
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  //OpenWeather provides dt or date time
}

let apiKey = "9a2a40fbafb3cdf4386821927d8245af";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

//To access this api, we need to tell axios to get the URL
axios.get(apiUrl).then(displayTemperature);
