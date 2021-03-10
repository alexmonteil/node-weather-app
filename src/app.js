const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast");


const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to server
const options = {
    extensions: ["htm", "html"]
};
app.use(express.static(publicDir, options));


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Alex Monteil"
    });
});


app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Alex Monteil"
    });
});


app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help section",
        name: "Alex Monteil",
        msg: "This is the help you get..."
    })
}); 


app.get("/weather", (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    
        if (error) {
            return res.send({ error });
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
    
        });
    });
});


app.get("/help/*", (req, res) => {
    res.render("notfound", {
        title: "Error",
        name: "Alex Monteil",
        msg: "Help article not found."
    });
});


app.get("*", (req, res) => {
    res.render("notfound", {
        title: "Error",
        name: "Alex Monteil",
        msg: "Page not found."
    });
});


app.listen(port, () => console.log(`Server is up on port ${port}.`));