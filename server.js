let express = require('express');

let bodyParser = require('body-parser');

let app = express();

let db = require('./database')

require('dotenv').config()

// Import routes
let healthCheckRoutes = require("./app/routes/healthcheck");
let sampleRoutes = require("./app/routes/sample");
  
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Setup server port
var port = process.env.PORT || 3000;

db.connect(process.env.DB_HOST, process.env.DB_NAME, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    console.log('Successfully Connected To Database')
  }
})

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Admin_API_Nodejs'));
// Use Api routes in the App
var basepath = '/admin-api';

app.use(basepath, healthCheckRoutes);
app.use(basepath, sampleRoutes);

// Launch app to listen to specified port
var server = app.listen(port, function () {
    console.log("Running App on port " + port);
});

module.exports = server;