const greetingService = require('../services/greeting.svc.js');
const Joi = require('joi');
const logger = require('../../logger/logger.js');

const ControllerDataValidation = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z ]+$/).min(3).required(),
    message: Joi.string().regex(/^[a-zA-Z ]+$/).min(3).required()
})


class GreetingController {
    /**
     * @description Create and save a new greeting
     * @param res is used to send the response
     */
    create = (req, res) => {
        const greetingInfo = {
            name: req.body.name,
            message: req.body.message
        }
        const validation = ControllerDataValidation.validate(greetingInfo);
        if (validation.error) {
            return res.status(400).send({
                success: false,
                message: "please enter valid details"
            });
        }
        greetingService.create(greetingInfo, (error, data) => {
            if (error) {
                logger.error("Some error occurred while creating greeting")
                return res.status(500).send({
                    success: false,
                    message: "Some error occurred while creating greeting"
                });
            }
            logger.info("Greeting added successfully !")
            res.status(200).send({
                success: true,
                message: "Greeting added successfully !",
                data: data
            });
        });
    }

    /**
     * @description Find all the greeting
     * @method findAll is service class method
     */
    findAll = (req, res) => {

        greetingService.findAll((error, data) => {
            try {
                if (error) {
                    logger.error("Some error occurred while retrieving greetings");
                    res.send({
                        success: false,
                        status_code: 404,
                        message: `greeting not found`,
                    });
                }
                logger.info("Successfully retrieved greetings !");
                res.send({
                    success: true,
                    status_code: 200,
                    message: `greeting found`,
                    data: (data)
                });
            }
            catch (error) {
                logger.error("greeting not found");
                res.send({
                    success: false,
                    status_code: 500,
                    message: `greeting not found`,
                });
            }
        });
    }

    /**
     * @description Find greeting by id
     * @method findOne is service class method
     * @param response is used to send the response
     */
    findOne = (req, res) => {
        try {
            const greetingID = req.params.greetingId;
            greetingService.findOne(greetingID, (error, data) => {
                if (error) {
                    logger.error("Error retrieving note with id " + greetingID)
                    return res.status(500).send({
                        success: false,
                        message: "Error retrieving note with id " + greetingID
                    });
                }
                if (!data) {
                    logger.warn("Greeing not found with id : " + greetingID)
                    return res.status(404).send({
                        success: false,
                        message: "Greeing not found with id : " + greetingID
                    });
                }
                logger.info("greeting found with id " + req.params.greetingId);
                return res.send({
                    success: true,
                    status_code: 200,
                    message: "greting found with id " + req.params.greetingId,
                    data: (data)
                })
            });
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
     * @description Update greeting by id
     * @method update is service class method
     * @param res is used to send the response
     */
    update = (req, res) => {
        try {
            const greetingInfo = {
                name: req.body.name,
                message: req.body.message,
                greetingID: req.params.greetingId
            }
            greetingService.update(greetingInfo, (error, data) => {
                if (error) {
                    logger.error("Error updating greeting with id : " + req.params.greetingId)
                    return res.send({
                        success: false,
                        status_code: 500,
                        message: "Error updating greeting with id : " + req.params.greetingId
                    });
                }
                if (!data) {
                    logger.warn("Greeting not found with id : " + req.params.greetingId)
                    return res.send({

                        success: false,
                        status_code: 404,
                        message: "Greeting not found with id : " + req.params.greetingId
                    });
                }
                logger.info("Greeting updated successfully !")
                res.send({
                    success: true,
                    message: "Greeting updated successfully !",
                    data: data
                });
            });
        }
        catch (error) {
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


    /**
    * @description Update greeting with id
    * @method delete is service class method
    * @param response is used to send the response 
    */
    delete(req, res) {
        try {
            const greetingID = req.params.greetingId;
            greetingService.delete(greetingID, (error, data) => {
                if (error) {
                    logger.warn("greeting not found with id " + greetingID);
                    return res.send({
                        success: false,
                        status_code: 404,
                        message: "greeting not found with id " + greetingID
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
                logger.error("could not found greeting with id" + greetingID);
                return res.send({
                    success: false,
                    status_code: 404,
                    message: "greeting not found with id " + greetingID
                });
            }
            logger.error("Could not delete greeting with id " + greetingID);
            return res.send({
                success: false,
                status_code: 500,
                message: "Could not delete greeting with id " + greetingID
            });
        }
    }
}

module.exports = new GreetingController();