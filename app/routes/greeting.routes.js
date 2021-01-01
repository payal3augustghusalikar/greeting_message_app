module.exports = (app) => {
    const greetings = require('../controllers/greeting.controllers.js');
    const service = require('../services/greeting.services.js')


    // Create a new Note
    app.post('/greetings', greetings.create);

    // Retrieve all greetings
    app.get('/greetings', greetings.findAll);

    // Retrieve a single Note with noteId
    app.get('/greetings/:noteId', greetings.findOne);

    // Update a Note with noteId
    app.put('/greetings/:noteId', greetings.update);

    // Delete a Note with noteId
    app.delete('/greetings/:noteId', greetings.delete);
}
 