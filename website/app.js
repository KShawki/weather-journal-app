/* Global Variables */
const reset = document.querySelector("#reset");
const generate = document.querySelector('#generate');

/* Personal API Key for OpenWeatherMap API */
const API_KEY = 'd049ed25ecfb2a1d010c09c7c67a6402&units=metric'

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = `${date.getMonth()}.${date.getDate()}.${date.getFullYear()}`

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", async() => {
  var zipCode = document.querySelector("#zip").value;
  var feeling = document.querySelector("#feeling").value;
  const URL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},&appid=${API_KEY}`;

  // Check Results
  // console.log(` zipCode = ${zipCode}\n Feeling = ${feeling}`);

  const response = await fetch(URL).then((result) => result.json());
  const city = await response.name;
  const country = await response.sys.country;
  const address = `${city}, ${country}`;
  const temp = await response.main.temp;
  const humidity = await response.main.humidity;
  const feels_like = await response.main.feels_like;

  console.log(address);
  console.log(temp);
  console.log(humidity);
  console.log(feels_like);
  console.log(response);
});




/* Function called by event listener */

/* Function to GET Web API Data*/

/* Function to POST data */

/* Function to GET Project Data */