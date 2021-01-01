
const greetingModel = require('../models/greeting.model.js');
const greetingService = require('../services/greeting.services')
//const Greeting = require('../models/greeting.model.js');

/**
 * @description find greeting by its id
 * @param {*} req takes _id
 * @param {*} res sends responce from server
 */
exports.findOne = (req, res) => {
    try {
        const greetingID = req.params.greetingID;
        greetingService.findGreeting(greetingID, greeting => {
            if (!greeting) {
                return res.send({
                    success: false,
                    status_code: 404,
                    message: "greeting not found with id " + req.params.greetingID
                });
            }
            return res.send({
                success: true,
                status_code: 200,
                message: "greting found with id " + req.params.greetingID,
                data: (greeting)
            });
        })
    }
    catch (error) {
        return res.send({
            success: false,
            status_code: 500,
            message: "greeting retrieving greeting with id " + req.params.greetingID

        })
    }
}


/**
 * @description delete greeting by its _id
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = (req, res) => {
    try {
        const greetingID = req.params.greetingID
        greetingService.delete(greetingID, greeting => {
            if (!greeting) {
                return res.send({
                    success: false,
                    status_code: 404,
                    message: "greeting not found with id " + req.params.greetingID
                });
            }
            res.send({
                success: true,
                status_code: 200,
                message: "greeting deleted successfully!"
            })
        })
    }
    catch (error) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.send({
                success: false,
                status_code: 404,
                message: "greeting not found with id " + req.params.greetingID
            });
        }
        return res.status(500).send({
            success: false,
            status_code: 500,
            message: "Could not delete greeting with id " + req.params.greetingID
        });
    }
}


/**
 * @description Create and Save greeting
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {
    const greeting = new greeting({
        name: req.body.title || "Untitled greeting",
        message: req.body.message
    });
    greetingService.createNewgreeting(greeting, (err, data) => {
        if (err) {
            res.send({
                success: false,
                status_code: 400,
                message: `greeting can not be empty`
            });
        } else {
            res.send({
                success: true,
                status_code: 200,
                message: `greeting created successfully`,
                data: (data)
            });
        }
    })
}


/**
 * @description find all greetings 
 * @param {*} request 
 * @param {*} response 
 */
exports.findAll = (request, response) => {
    try {
        greetingService.findAll((greetings) => {
            res.send({
                success: true,
                status_code: 200,
                message: `greeting found`,
                data: greetings
            });

        });
    } catch (error) {
        response.status(500).send(error.message);
    }
}


/**
 * @description find and update greeting by its _id
 * @param {*} req 
 * @param {*} res 
 */
exports.update = (req, res) => {
    try {
        // Validate Request
        if (!req.body.content) {
            return res.send({
                success: false,
                status_code: 400,
                message: "greeting content can not be empty"
            });
        }
        const greetingID = req.params._id;
        // const greeting = new greeting({
        //     title: req.body.title || "Untitled greeting",
        //     content: req.body.content
        // });
        greetingService.updategreeting(greetingID, { new: true },
            greeting => {
                if (!greeting) {
                    return res.send({
                        success: false,
                        status_code: 404,
                        message: "greeting not found with id " + req.params.greetingID
                    });
                }
                res.send(greeting);
            })
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.send({
                success: false,
                status_code: 404,
                message: "greeting not found with id " + req.params.greetingID
            });
        }
        return res.send({
            success: false,
            status_code: 500,
            message: "Error updating greeting with id " + req.params.greetingID
        });
    };
}