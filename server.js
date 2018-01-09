//Initialize Express
var express = require("express");
var app = express();

var PORT = process.env.PORT || 8080;

//Set Body-Parser
var bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Set Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Set Heroku
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

//Set Mongoose
var mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/scraper");

//Routes
var routes = require("./controllers/controller.js");
app.use("/", routes);


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
