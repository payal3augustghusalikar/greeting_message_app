const greetingService = require('../services/greeting.svc')
const logger = require('../../config/logger.js');
const Joi = require('joi');

const namePattern = Joi.string().regex(/^[A-Za-z]+$/);

const ControllerDataValidation = Joi.object().keys({
    name: namePattern.required(),
    message: namePattern.required(),
})

class Controller {
    /**
     * @description Create and Save greeting
     * @param {*} req 
     * @param {*} res 
     */
    create = (req, res) => {
        const greetingInfo = {
            name: req.body.name || "Untitled greeting",
            message: req.body.message
        }
        const validationCheck = ControllerDataValidation.validate(greetingInfo);
        if (validationCheck.err) {
            return res.send({
                success: false,
                status_code: 400,
                message: `please give valid greeting`
            })
        }
        else {
            greetingService.createNewGreeting(greetingInfo, (error, data) => {
                if (error) {
                    logger.warn("greeting can not be empty");
                    res.send({
                        success: false,
                        status_code: 400,
                        message: `greeting can not be empty`
                    });
                } else {
                    logger.info("greeting created successfully")
                    res.send({
                        success: true,
                        status_code: 200,
                        message: `greeting created successfully`,
                        data: (data)
                    });
                }
            })
        }
    }

    /**
     * @description find greeting by its id
     * @param {*} req takes _id
     * @param {*} res sends responce from server
     */
    findOne = (req, res) => {
        try {
            const greetingID = req.params.greetingId;
            greetingService.findGreeting(greetingID, greeting => {
                if (!greeting) {
                    logger.warn("greeting not found with id " + req.params.greetingId);
                    return res.send({
                        success: false,
                        status_code: 404,
                        message: "greeting not found with id " + req.params.greetingId,
                    });
                }
                logger.info("greeting found with id " + req.params.greetingId);
                return res.send({
                    success: true,
                    status_code: 200,
                    message: "greting found with id " + req.params.greetingId,
                    data: (greeting)
                });
            })
        }
        catch (error) {
            logger.error("could not found greeting with id" + req.params.greetingId);
            return res.send({
                success: false,
                status_code: 500,
                message: "error retrieving greeting with id " + req.params.greetingId
            })
        }
    }

    /**
     * @description delete greeting by its _id
     * @param {*} req 
     * @param {*} res 
     */
    delete = (req, res) => {
        try {
            const greetingID = req.params.greetingId
            greetingService.delete(greetingID, greeting => {
                if (!greeting) {
                    logger.warn("greeting not found with id " + req.params.greetingId);
                    return res.send({
                        success: false,
                        status_code: 404,
                        message: "greeting not found with id " + req.params.greetingId
                    });
                }
                logger.info("greeting deleted successfully!");
                res.send({
                    success: true,
                    status_code: 200,
                    message: "greeting deleted successfully!"
                })
            })
        }
        catch (error) {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                logger.error("could not found greeting with id" + req.params.greetingId);
                return res.send({
                    success: false,
                    status_code: 404,
                    message: "greeting not found with id " + req.params.greetingId
                });
            }
            logger.error("Could not delete greeting with id " + req.params.greetingId);
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
    findAll = (req, res) => {
        try {
            greetingService.findAll(greetings => {
                if (greetings) {
                    logger.info("greeting found!");
                    res.send({
                        success: true,
                        status_code: 200,
                        message: `greeting found`,
                        data: (greetings)
                    });
                }
            });
        } catch (error) {
            logger.error("greeting not found");
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
    update = (req, res) => {
        try {
            const greetingInfo = {
                name: req.body.name,
                message: req.body.message,
                greetingID: req.params.greetingId
            }
            // Validate Request
            if (!req.body.message) {
                logger.warn("greeting content can not be empty")
                return res.send({
                    success: false,
                    status_code: 400,
                    message: "greeting content can not be empty"
                });
            }
            greetingService.updateGreeting(greetingInfo, { new: true },
                greeting => {
                    if (!greeting) {
                        logger.warn("greeting not found with id " + req.params.greetingId)
                        return res.send({
                            success: false,
                            status_code: 404,
                            message: "greeting not found with id " + req.params.greetingId
                        });
                    }
                    logger.info("greeting updated successfully with id " + req.params.greetingId)
                    return res.send({
                        success: true,
                        status_code: 200,
                        message: "greeting updated successfully with id " + req.params.greetingId,
                        data: (greeting)
                    });
                })
        } catch (err) {
            if (err.kind === 'ObjectId') {
                logger.error("greeting not found with id " + req.params.greetingId)
                return res.send({
                    success: false,
                    status_code: 404,
                    message: "greeting not found with id " + req.params.greetingId
                });
            }
            logger.error("Error updating greeting with id " + req.params.greetingId)
            return res.send({
                success: false,
                status_code: 500,
                message: "Error updating greeting with id " + req.params.greetingId
            });
        };
    }
}

module.exports = new Controller();

