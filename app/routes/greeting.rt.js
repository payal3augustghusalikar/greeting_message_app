


module.exports = (app) => {





  //  app.use(express.json());

    // const greetings = [
    //     {
    //         id: 1,
    //         name: "Task",
    //         message: "Task"
    //     },
    //     {
    //         id: 2,
    //         name: "Taskk",
    //         message:"Taskk "
    //     },
    //     {
    //         id: 3,
    //         name: "Taskkk",
    //         message: "Taskkk"
    //     }
    // ];
    

    const greetingss = require('../controllers/greeting.ctr.js');
 
    // Create a new greeting
    app.post('/greetings', greetingss.create);

    // Retrieve all greetings
    app.get('/greetings', greetingss.findAll);

    // Retrieve a single greeting with greetingId
    app.get('/greetings/:greetingId', greetingss.findOne);

    // Update a greeting with greetingId
    app.put('/greetings/:greetingId', greetingss.update);

    // Delete a greeting with greetingId
    app.delete('/greetings/:greetingId', greetingss.delete);
}




