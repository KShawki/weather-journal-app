/* Global Variables */
const reset = document.querySelector("#reset");
const generate = document.querySelector('#generate');

/* Personal API Key for OpenWeatherMap API */
const API_KEY = 'd049ed25ecfb2a1d010c09c7c67a6402&units=metric'

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = `${date.getMonth()}.${date.getDate()}.${date.getFullYear()}`

// Event listener to add function to existing HTML DOM element
generate.addEventListener( "click", async () => {
  var zipCode = document.querySelector("#zip").value;
  var feeling = document.querySelector("#feeling").value;
  
    const URL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},&appid=${API_KEY}`;
    const response = await fetch(URL).then((result) => result.json());

  // Other information for redesign UI After Project Submit.. {NOT COMPLETED}
    var city = await response.name;
    var country = await response.sys.country;
    var address = `${city}, ${country}`;
    var temp = await response.main.temp;
    var humidity = await response.main.humidity;
    var feels_like = await response.main.feels_like;

    
  // Check Results
    // console.log(`zipCode = ${zipCode}`);
    // console.log(`Feeling = ${feeling}`);
    // console.log(address);
    // console.log(temp);
    // console.log(humidity);
    // console.log(feels_like);
    // console.log(response);

  /* Function to POST data */
  await fetch("/add", {
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

  /* Function to GET Project Data */
  const result = await fetch("/get").then( respnose => {response.json()});
  
  alert(result);

  document.querySelector(".main-content").classList.add("d-none");
  document.querySelector(".results").classList.remove("d-none");

  // document.querySelector("#country").innerHTML = `${data.address}`;
  document.querySelector("#content").innerHTML = `i'm Feeling => ${data.feeling}`;
  document.querySelector("#date").innerHTML = `Date => ${data.date}`;
  document.querySelector("#temp").innerHTML = `Temp => ${data.temp}`;
}); 


// Reset Button 
reset.addEventListener("click", ()=> {
  document.querySelector("#zip").value = "";
  document.querySelector("#feeling").value = "";
})


