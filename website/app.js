/* Global Variables */
const reset = document.querySelector("#reset");
const generate = document.querySelector('#generate');

/* Personal API and url Key for OpenWeatherMap API */
const URL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const API_KEY = 'd049ed25ecfb2a1d010c09c7c67a6402&units=metric'

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = `${date.getMonth()}.${date.getDate()}.${date.getFullYear()}`

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", performAction);

/* Function called by Event Listener */
const performAction = (event) => {
    var zipCode = document.querySelector("#zip").value;
    var feeling = document.querySelector("#feeling").value;

    if (zipCode == '') {
      alert("Enter Valid Zip Code !")
      resetData(); 
    } else {
      openWeatherMap(`${URL}&appid=${API_KEY}`)
        .then(function (postData) {
          // Add data to POST request
          postData("/add", {
            date: newDate,
            temp: userData.main.temp,
            feeling
          });
        })
        .then(updateUI());
    }
    resetData(); 
};


const openWeatherMap = async(link) => {
  const respnose = await fetch (link);
  try {
    const data = await res.JSON();
    return data;  
  } catch (error) {
    console.error(`Error: ${error}!!!`);
  }
}

/* Function to POST data */
const postData = async (url = '', data={}) => {
    const request = await fetch("/add", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-type": "Application/JSON" },
      body: JSON.stringify({
        newDate,
        temp,
        feeling,
        address,
        humidity,
        feeling,
      }),
    });

  const newData = await reqest.json();
  return newData;
}

/* Function to GET Project Data */
const result = await fetch("/get").then((respnose) => {
  response.json();
});

const updateUI = () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    // show icons on the page
    icons.forEach(icon => icon.style.opacity = '1');
    // update new entry values
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
  } catch (error) {
    console.log(error)
  }
}

// Reset button content 
reset.addEventListener("click", console.log("clicked"));
