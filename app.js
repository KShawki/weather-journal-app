/* Global Variables */
const generate = document.querySelector('#generate');
const reset = document.querySelector("#reset");
const majorUI = document.querySelector(".inputs");
const resultUI = document.querySelector(".results");

/* Personal API Key from OpenWeatherMap */
const API_KEY = 'd049ed25ecfb2a1d010c09c7c67a6402'

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = `${date.getMonth()+1}.${date.getDate()}.${date.getFullYear()}`;

/* Function to GET data */ 
const getWeatherData = async (URL) => {

  /*
    Solution Steps: 
      1. Fetch API From Open Weather Map
      2. Convert it to JSON Object to send it to server.
      3. Catch error if happen. 
  */

  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

/* Function to POST data */
const postWeatherData = async(URL="", data={}) => {

  const response = await fetch (URL, {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  try {
    const theData = await response.json();
    return theData;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

const displayData = async () => {

  majorUI.classList.add("d-none");
  resultUI.classList.remove("d-none");

  let country = document.querySelector("#country");
  let city = document.querySelector("#city");
  let temp = document.querySelector("#temp");
  let date = document.querySelector("#date");
  let feeling = document.querySelector("#feeling");

  try {
    const response = await fetch("/getData");
    const responseJSON = await response.json();

    // Display data into user
    country.innerHTML = responseJSON.country;
    feeling.innerHTML = responseJSON.feeling
    city.innerHTML = responseJSON.city;
    temp.innerHTML = responseJSON.temp;
    date.innerHTML = response.newDate;


  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

// Function called by event listener. 
const main = async () => {
  /**
    Solution Steps:
      1. read user inputs
      2. read weather from api
      3. parse major data.
      4. create data object to post in server
      4. post data object data into server
      4. read weather data from server
      5. update user interface with new data
   */
  var zip = document.querySelector("#zip").value;
  var feeling = document.querySelector("#feeling").value;

  const URL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API_KEY}&units=metric`;

  getWeatherData(URL).then( data => {
    var country = data.sys.country;
    var city = data.name;
    var temp = parseInt(data.main.temp);
    const data_obj = {
      newDate:newDate,
      country:country,
      city:city, 
      temp:temp,
      feeling:feeling
    };

    // console.log(data_obj); // it works;
    
    postWeatherData("/addData", data_obj).then( data => {
      displayData(`Data : ${data}`);
    })
  })
};

const resetData = () => {
  // console.log("test")
}

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", main); 
reset.addEventListener("click", resetData);
