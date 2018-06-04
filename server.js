// Node modules for server start
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Import Article model for manipulation using app routes
var Article = require('./models/Article.js');

// Initialization
const app = express();

// set up ports for port and mongo
var PORT = process.env.PORT || 9001;
var mongo_connection = process.env.MONGODB_URI || "mongodb://localhost/NYT-";

// Set up functionality for app
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type : "application/vnd.api+json"}));

// define db connection
const db = mongoose.connection;

// log errors
db.on('error', function(err) {
    console.log('Mongoose Error: ', err);
});

db.once('open', (err) =>{
    console.log("Connected to db");
});