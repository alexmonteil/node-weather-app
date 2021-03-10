const request = require("request");


const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=9254e8fa7e1767e71bd38ee096cbcc0b&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=f`;

    request({ url, json: true}, (error, { body }) => {

        if (error) {

            callback("Unable to access weather services.", undefined);

        } else if (body.error) {

            callback("Unable to find location. Try another location.", undefined);

        } else {

            callback(undefined, `The weather is ${body.current.weather_descriptions[0].toLowerCase()}. It is currently ${body.current.temperature} degrees out and feels like ${body.current.feelslike} degrees.`);

        }
    });
}




module.exports = forecast;