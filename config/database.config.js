// const mongoose = require('mongoose');
// const logger = require('../../config/logger.js');
// require(`dotenv`).config();


// module.exports = () => {
//     // Connecting to the database
//     mongoose.connect(process.env.MONGODB_URL, {
//         useNewUrlParser: true
//     }).then(() => {
//         logger.info("Successfully connected to the database");
//     }).catch(err => {
//         logger.error('Could not connect to the database. Exiting now...', err);
//         process.exit();
//     });
// }



// const mongoose = require('mongoose');
// require(`dotenv`).config();

// module.exports = () => {
//     // Connecting to the database
//     mongoose.connect(dbConfig.url, {
//         useNewUrlParser: true,
//        // useUnifiedTopology: true,
//     }).then(() => {
//         console.log("Successfully connected to the database");
//     }).catch(err => {
//         console.log('Could not connect to the database. Exiting now...', err);
//         process.exit();
//     });
// }

// module.exports = {
//     url: 'mongodb://localhost:27017/greeting-messages'
// }




// const mongoose = require('mongoose');
// require(`dotenv`).config();

// module.exports = () => {
//     mongoose.Promise = global.Promise;
//     /**
//      * @description Connecting to the database
//      */
//     mongoose.connect(process.env.MONGODB_URL, {
//         useNewUrlParser: true,
//         UnifiedTopology: true
//     }).then(() => {
//         console.log(`Successfully connected to the database`);
//     }).catch(err => {
//         console.log('Could not connect to the database. Exiting now...', err);
//         process.exit();

//     });
// }




//const mongoose = require('mongoose');
require(`dotenv`).config();

module.exports = () =>  {
    const mongoose = require('mongoose');
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useFindAndModify : false
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log("Could not connect to the database. Exiting now..", err);
        process.exit();
    })
}