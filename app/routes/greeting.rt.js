module.exports = (app) => {
    const greetings = require('../controllers/greeting.ctr.js');
 
    // Create a new greeting
    app.post('/greetings', greetings.create);

    // Retrieve all greetings
    app.get('/greetings', greetings.findAll);

    // Retrieve a single greeting with greetingId
    app.get('/greetings/:greetingId', greetings.findOne);

    // Update a greeting with greetingId
    app.put('/greetings/:greetingId', greetings.update);

    // Delete a greeting with greetingId
    app.delete('/greetings/:greetingId', greetings.delete);
}

// /**
//      * @description Create new Greeting
//      */
//     app.post('/greetings', greetings.create);

//     /**
//      * @description Retrieve all  Greetings
//      */
//     app.get('/greetings', greetings.findAll);

//     /**
//      * @description Retrieve single greeting with greetingID
//      */
//     app.get('/greetings/:greetingID', greetings.findOne);

//     /**
//      * @description Update Greeting with greetingID
//      */
//     app.put('/greetings/:greetingID', greetings.update);

//     /**
//      * @description Delete Greeting with greetingID
//      */
//     app.delete('/greetings/:greetingID', greetings.delete);
// }

