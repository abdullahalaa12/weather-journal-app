/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=6da09e078caab3c4b7ef6156ef3e13d6&units=imperial";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Output entries
const tempEntry = document.querySelector("#temp");
const feelingEntry = document.querySelector("#content");
const dateEntry = document.querySelector("#date");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* Methods */

//Async GET
const retrieveData = async (url) => {
  try {
    const response = await fetch(url);
    // Transform into JSON
    const allData = await response.json();
    return allData;
  } catch (error) {
    console.log(error);
  }
};

//Async POST
const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const updateUI = (data) => {
  // Write updated data to DOM elements
  tempEntry.innerHTML = Math.round(data.temp) + "ºF";
  feelingEntry.innerHTML = data.feel;
  dateEntry.innerHTML = data.date;
};

// Button click event listener
document.querySelector("#generate").addEventListener("click", () => {
  // Entered zip code
  const zip = document.querySelector("#zip").value;
  fetch(apiUrl + zip + apiKey)
    .then((response) => response.json())
    .then((data) => {
      // API Returned temp
      const temp = data.main.temp;
      // Entered feeling
      const feel = document.querySelector("#feelings").value;
      // Create a new date instance dynamically with JS
      let d = new Date();
      let date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

      return { temp, feel, date };
    })
    .then((data) => postData("/add", data))
    .then((data) => retrieveData("all"))
    .then((data) => {
      updateUI(data);
    })
    .catch((error) => alert("Invalid Zipcode"));
});
