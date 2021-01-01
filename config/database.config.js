const mongoose = require('mongoose');
require(`dotenv`).config();

module.exports = () => {
    // Connecting to the database
    mongoose.connect(dbConfig.url, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}



module.exports = {
    url: 'mongodb://localhost:27017/greeting-messages'
}
