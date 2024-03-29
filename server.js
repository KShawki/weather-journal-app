// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express'),
      cors = require('cors'),
      bodyParser = require('body-parser'); 

// Start up an instance of app
const app = express(); 

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const PORT = process.env.port || 9000;
app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT} ..`));

// Helper Function
const addData = (request, response) => {
  projectData = request.body;
  response.end(); 
  console.log(`Server side data ${projectData}`);
}

const sendData = (request, response) => {
  response.send(projectData);
}
// Post & Get Data from API
app.post("/addData", addData);
app.get("/getData", sendData);




