const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationData = document.querySelector("#location-data");
const forecastData = document.querySelector("#forecast-data");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    locationData.textContent = "Loading...";
    forecastData.textContent = "";

    fetch(`/weather?address=${search.value}`)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            
            locationData.textContent = "";
            forecastData.textContent = data.error;

        } else {

            locationData.textContent = data.location;
            forecastData.textContent = data.forecast;
        }
    });
});