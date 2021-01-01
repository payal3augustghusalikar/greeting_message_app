


const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require(`swagger-jsdoc`);
const swaggerUI = require(`swagger-ui-express`);
// const swaggerOptions = {
//     openapi : ''
// }


// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded - extended is a key
app.use(bodyParser.urlencoded({ extended: true })) // true - we are using urlencoded

// parse requests of content-type - application/json 
app.use(bodyParser.json())


// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// define a simple route and data in json format
app.get('/', (req, res) => {
    res.json({"message": "Welcome to greeting application. "}); 
});

// ........ 

// Require Notes routes  
require('./app/routes/greeting.routes.js')(app);

// ........

// listen for requests using callback
app.listen(2000, () => { 
    console.log("Server is listening on port 3001");
});