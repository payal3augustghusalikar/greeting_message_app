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
