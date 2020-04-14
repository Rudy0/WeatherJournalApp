/* Global Variables */
let baseURL = "api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=0252daeced35aad0d7a14eef14d3ced4";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generateWeather);
/* Function called by event listener */
function generateWeather(){
  addData()
    .then(displayData);
};

const addData = async() => {
  const weather = await getApi();
  const feeling = document.getElementById("feelings").value;
  postData("/data", {date:newDate, temp:weather, feelings:feeling});
};

const displayData = async() => {
  const allData = await getData("/all");
  try {
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature is : ${allData.temp}&#8451;`;
    document.getElementById('content').innerHTML = `You are feeling: ${allData.feelings}`;
    } catch(error) {
      console.log('error on displayData', error);
    };
};

/* Function to GET Web API Data*/
const getApi = async () => {
  const zip = document.getElementById("zip").value;
  const weatherApi = await fetch(`http://${baseURL}${zip}&units=metric${apiKey}`);
  try {
      const weather = await weatherApi.json();
      const temp = weather.main.temp;
      return temp;
  } catch(error) {
      console.log('error in getAPI', error);
  };
};

/* Function to POST data */
const postData = async ( url = "", data = {})=>{
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
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error in postData", error);
      }
  };
/* Function to GET Project Data */

const getData = async (url="")=>{
    const response = await fetch(url);
    try {
      const data = await response.json();
      return data;
    }catch(error) {
    console.log("error in getData", error);
    }
};