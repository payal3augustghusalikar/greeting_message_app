const mongoose = require('mongoose');
require(`dotenv`).config();

module.exports = () => {
    // Connecting to the database
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}

