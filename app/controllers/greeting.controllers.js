const greetingModel = require('../models/greeting.model.js');
const greetingService = require('../services/greeting.services')
const Greeting = require('../models/greeting.model.js');


/**
 * @description Create and Save greeting
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {
    const greeting = new Greeting({
        name: req.body.name || "Untitled greeting",
        message: req.body.message
    });
    greetingService.createNewGreeting(greeting, (err, data) => {
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
 * @description find greeting by its id
 * @param {*} req takes _id
 * @param {*} res sends responce from server
 */
exports.findOne = (req, res) => {
    try {
        const greetingID = req.params.greetingId;
        greetingService.findGreeting(greetingID, greeting => {
            if (!greeting) {
                return res.send({
                    success: false,
                    status_code: 404,
                    message: "greeting not found with id " + req.params.greetingId,
                });
            }
            return res.send({
                success: true,
                status_code: 200,
                message: "greting found with id " + req.params.greetingId,
                data: (greeting)
            });
        })
    }
    catch (error) {
        return res.send({
            success: false,
            status_code: 500,
            message: "greeting retrieving greeting with id " + req.params.greetingId
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
        const greetingID = req.params.greetingId
        greetingService.delete(greetingID, greeting => {
            if (!greeting) {
                return res.send({
                    success: false,
                    status_code: 404,
                    message: "greeting not found with id " + req.params.greetingId
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
                message: "greeting not found with id " + req.params.greetingId
            });
        }
        return res.status(500).send({
            success: false,
            status_code: 500,
            message: "Could not delete greeting with id " + req.params.greetingId
        });
    }
}


/**
 * @description find all greetings 
 * @param {*} request 
 * @param {*} response 
 */
exports.findAll = (req, res) => {
    try {
        greetingService.findAll(greetings => {
            res.send({
                success: true,
                status_code: 200,
                message: `greeting found`,
                data: (greetings)
            });
        });

    } catch (error) {
        res.send({
            success: false,
            status_code: 500,
            message: `greeting not found`,
        });
    }
}


/**
 * @description find and update greeting by its _id
 * @param {*} req 
 * @param {*} res 
 */
exports.update = (req, res) => {
    try {
        const greetingID = req.params.greetingId;
        const greeting = new Greeting({
            name: req.body.name || "Untitled greeting",
            message: req.body.message,
        });
        // Validate Request
        if (!req.body.message) {
            return res.send({
                success: false,
                status_code: 400,
                message: "greeting content can not be empty"
            });
        }
        greetingService.updateGreeting(greetingID, greeting, { new: true },
            greeting => {
                if (!greeting) {
                    return res.send({
                        success: false,
                        status_code: 404,
                        message: "greeting not found with id " + req.params.greetingId
                    });
                }
                return res.send({
                    success: true,
                    status_code: 200,
                    message: "greeting updated successfully with id " + req.params.greetingId,
                    data: (greeting)
                });
            })
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.send({
                success: false,
                status_code: 404,
                message: "greeting not found with id " + req.params.greetingId
            });
        }
        return res.send({
            success: false,
            status_code: 500,
            message: "Error updating greeting with id " + req.params.greetingId
        });
    };
}
