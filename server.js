const express = require('express');
const bodyParser = require('body-parser');

//for api documentation
const swaggerJsDoc = require(`swagger-jsdoc`);

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded - extended is a key
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json 
app.use(bodyParser.json())

const logger = require('./config/logger.js');

// define a simple route and data in json format
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to greeting application. " });
});


/**
 * @description require swagger-ui and swagger.json
 */
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Require Notes routes  
require('./app/routes/greeting.routes.js')(app);

const port = process.env.PORT || 2000;
// listen for requests using callback
app.listen(port, () => {
    logger.info(`Server is listening on port:  ${port}`);
});