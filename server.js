const express = require('express');
const bodyParser = require('body-parser');
require('./config/database.config.js')();

//for api documentation
//const swaggerJsDoc = require(`swagger-jsdoc`);

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded - extended is a key
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json 
app.use(bodyParser.json())

const logger = require('./logger/logger.js');

// define a simple route and data in json format
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to greeting application. " });
});


/**
 * @description require swagger-ui and swagger.json
 */
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./lib/swagger.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Require Notes routes  
require('./app/routes/greeting.rt.js')(app);

const port = process.env.PORT || 2000;
// listen for requests using callback
app.listen(port, () => {
    logger.info(`Server is listening on port:  ${port}`);
});





// const express = require('express');
// const bodyParser = require('body-parser');
// const swaggerJsDoc = require(`swagger-jsdoc`);
// const swaggerUI = require(`swagger-ui-express`);
// // const swaggerOptions = {
// //     openapi : ''
// // }
// // create express app
// const app = express();
// // parse requests of content-type - application/x-www-form-urlencoded - extended is a key
// app.use(bodyParser.urlencoded({ extended: true })) // true - we are using urlencoded
// // parse requests of content-type - application/json 
// app.use(bodyParser.json())
// // Configuring the database
// const dbConfig = require('./config/database.config.js');
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// // // Connecting to the database
// // mongoose.connect(dbConfig.url, {
// //     useNewUrlParser: true
// // }).then(() => {
// //     console.log("Successfully connected to the database");    
// // }).catch(err => {
// //     console.log('Could not connect to the database. Exiting now...', err);
// //     process.exit();
// // });

// // define a simple route and data in json format
// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to greeting application. "}); 
// });

// const logger = require('./config/logger.js');

// const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./swagger.json')

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // ........ 
// // Require Notes routes  
// require('./app/routes/greeting.rt.js')(app);
// app.listen(2000, () => { 
//     console.log("Server is listening on port 2000");
// });

