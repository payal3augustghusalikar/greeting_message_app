const express = require('express');
const bodyParser = require('body-parser');
require('./config/mongoDB.js')();
const cors = require('cors');

// create express app
const app = express();
app.use(cors())


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Origin', "Origin, X-requested-Width, Content-type, Accept, Authorization")
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Origin', 'PUT', 'POST', 'DELETE', 'GET');
//         return res.status(200).json({});
//     }
// })

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
require('./app/routes/greeting.js')(app);

const port = process.env.PORT || 2000;
// listen for requests using callback
app.listen(port, () => {
    logger.info(`Server is listening on port:  ${port}`);
});

module.exports = app;