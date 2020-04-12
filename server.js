// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/*Dependencies*/

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;

const server = app.listen(port, callback);

function callback (){
    console.log("Server is running!");
    console.log(`On port: ${port}`);
};

// Initialize all route with a callback function
app.get("/all", function(req, res){
    res.send(projectData);
});

// Callback function to complete GET '/all'

// Post Route
app.post("/data", function(req, res) {
	const newData = {
		temperature: req.body.temperature,
		date: req.body.date,
		userResponse: req.body.userResponse
	};
	projectData = newData;
	res.send(newData);
});