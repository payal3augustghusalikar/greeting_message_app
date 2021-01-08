
const logger = require('../logger/logger');

//const mongoose = require('mongoose');
require(`dotenv`).config();

module.exports = () =>  {
    const mongoose = require('mongoose');
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useFindAndModify : false
    }).then(() => {
        logger.info("Successfully connected to the database");
    }).catch(err => {
        logger.info("Could not connect to the database. Exiting now..", err);
        process.exit();
    })
}

