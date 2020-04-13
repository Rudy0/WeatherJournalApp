/* Global Variables */
let baseURL = "api.openweathermap.org/data/2.5/weather?";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=0252daeced35aad0d7a14eef14d3ced4";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generateWeather);
/* Function called by event listener */
function generateWeather(){
  addData().then(displayData);
};

const addData = async() => {
  const temp = await getAPI();
  const feeling = document.getElementById("feelings").value;
  const zip = document.getElementById("zip").value;
  postData('/data', {zip:zip, feelings:feeling, date:newDate, weather:temp});
};

const displayData = async() => {
  const allData = await getData();
  try {
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${allData.weather}`;
    document.getElementById('content').innerHTML = `Feelings: ${allData.feelings}`;
    } catch(error) {
      console.log('error on displayData', error);
    };
};

/* Function to GET Web API Data*/
const getAPI = async () => {
  const zip = document.getElementById("zip").value;
  const openWeather = await fetch(`${baseURL}zip=${zip}&units=imperial${apiKey}`, {
      body: JSON.stringify(),
  });

  try {
      const weather = await openWeather.json();
      const temp = weather.main.temp;
      return temp;
  } catch(error) {
      console.log('error in getAPI', error);
  };
};

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data)
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response.json();
        return newData
      }catch(error) {
      console.log("error in postData", error);
      // appropriately handle the error
      }
  };
/* Function to GET Project Data */

const getData = async ()=>{
    const response = await fetch("/all");
    try {
      const data = await response.json();
      return data;
    }catch(error) {
    console.log("error in getData", error);
    }
};