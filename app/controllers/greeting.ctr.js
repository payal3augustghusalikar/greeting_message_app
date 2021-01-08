// // const greetingService = require('../services/greeting.svc.js')
// // const logger = require('../../logger/logger.js');

// // const Joi = require('joi');

// // // const namePattern = Joi.string().regex(/^[A-Za-z]+$/);

// // // const ControllerDataValidation = Joi.object().keys({
// // //     name: namePattern.required(),
// // //     message: namePattern.required(),
// // // })


// // const inputPattern = Joi.object({
// //     name: Joi.string().regex(/^[a-zA-Z ]+$/).min(3).required().messages({
// //         'string.pattern.base': 'name should contain only characters.',
// //         'string.min': 'name must have minimum 2 characters.',
// //         'string.empty': 'name can not be empty',
// //     }),
// //     message: Joi.string().allow('', null)
// // })


// class Controller {
//     // /**
//     //  * @description Create and Save greeting
//     //  * @param {*} req 
//     //  * @param {*} res 
//     //  */
//     // create = (req, res) => {
//     //     const greetingInfo = {
//     //         name: req.body.name || "Untitled greeting",
//     //         message: req.body.message
//     //     }
//     //     const validationCheck = ControllerDataValidation.validate(greetingInfo);
//     //     if (validationCheck.err) {
//     //         return res.send({
//     //             success: false,
//     //             status_code: 400,
//     //             message: `please give valid greeting`
//     //         })
//     //     }
//     //     else {
//     //         greetingService.create(greetingInfo, (error, data) => {
//     //             if (error) {
//     //                 logger.error("error occured");
//     //                 res.send({
//     //                     success: false,
//     //                     status_code: 400,
//     //                     message: `greeting can not be empty`
//     //                 });
//     //             } else {
//     //                 logger.info("greeting created successfully")
//     //                 res.send({
//     //                     success: true,
//     //                     status_code: 200,
//     //                     message: `greeting created successfully`,
//     //                     data: data
//     //                 });
//     //             }
//     //         })
//     //     }
//     // }



//     //     // /**
//     //     //  * @description Create and Save greeting
//     //     //  * @param {*} req 
//     //     //  * @param {*} res 
//     //     //  */
//     //     // create = (req, res) => {

//     //     //     const greetingInfo = {
//     //     //         name: req.body.name || "Untitled greeting",
//     //     //         message: req.body.message
//     //     //     }

//     //     //         greetingService.create(greetingInfo, (error, data) => {
//     //     //             if (error) {
//     //     //                 res.send({
//     //     //                     success: false,
//     //     //                     status_code: 400,
//     //     //                     message: `greeting can not be empty`
//     //     //                 });
//     //     //             } else {
//     //     //                 res.send({
//     //     //                     success: true,
//     //     //                     status_code: 200,
//     //     //                     message: `greeting created successfully`,
//     //     //                     data: (data)
//     //     //                 });
//     //     //             }
//     //     //         })
//     //     // }





//     create = (req, res) => {
//         const greetingInfo = {
//             name: req.body.name,
//             message: req.body.message
//         }

//         const greetingResponse = {
//         }

//         const validationResult = inputPattern.validate(greetingInfo);

//         if (validationResult.error) {
//             return res.status(400).send({
//                 success: greetingResponse.success = false,
//                 message: greetingResponse.message = validationResult.error.message
//             });
//         }

//         greetingService.create(greetingInfo, (error, data) => {
//             if (error) {
//                 logger.error("Some error occurred while creating greeting")
//                 return res.status(500).send({
//                     success: greetingResponse.success = false,
//                     message: greetingResponse.message = "Some error occurred while creating greeting"
//                 });
//             }

//             logger.info("Greeting added successfully !")
//             res.send({
//                 success: greetingResponse.success = true,
//                 message: greetingResponse.message = "Greeting added successfully !",
//                 data: greetingResponse.data = data
//             });
//         });
//     }




//     /**
//      * @description find greeting by its id
//      * @param {*} req takes _id
//      * @param {*} res sends responce from server
//      */
//     findOne = (req, res) => {
//         try {
//             const greetingID = req.params.greetingId;
//             greetingService.findOne(greetingID, (error, data) => {
//                 if (error) {
//                     logger.warn("greeting not found with id " + req.params.greetingId);
//                     return res.send({
//                         success: false,
//                         status_code: 404,
//                         message: "greeting not found with id " + req.params.greetingId,
//                     });
//                 }
//                 logger.info("greeting found with id " + req.params.greetingId);
//                 return res.send({
//                     success: true,
//                     status_code: 200,
//                     message: "greting found with id " + req.params.greetingId,
//                     data: (data)
//                 });
//             })
//         }
//         catch (error) {
//             logger.error("could not found greeting with id" + req.params.greetingId);
//             return res.send({
//                 success: false,
//                 status_code: 500,
//                 message: "error retrieving greeting with id " + req.params.greetingId
//             })
//         }
//     }





//     /**
//      * @description delete greeting by its _id
//      * @param {*} req 
//      * @param {*} res 
//      */
//     delete = (req, res) => {
//         try {
//             const greetingID = req.params.greetingId
//             greetingService.delete(greetingID, (error, data) => {
//                 if (error) {
//                     logger.warn("greeting not found with id " + req.params.greetingId);
//                     return res.send({
//                         success: false,
//                         status_code: 404,
//                         message: "greeting not found with id " + req.params.greetingId
//                     });
//                 }
//                 logger.info("greeting deleted successfully!");
//                 res.send({
//                     success: true,
//                     status_code: 200,
//                     message: "greeting deleted successfully!"
//                 })
//             })
//         }
//         catch (error) {
//             if (error.kind === 'ObjectId' || error.name === 'NotFound') {
//                 logger.error("could not found greeting with id" + req.params.greetingId);
//                 return res.send({
//                     success: false,
//                     status_code: 404,
//                     message: "greeting not found with id " + req.params.greetingId
//                 });
//             }
//             logger.error("Could not delete greeting with id " + req.params.greetingId);
//             return res.send({

//                 success: false,
//                 status_code: 500,
//                 message: "Could not delete greeting with id " + req.params.greetingId
//             });
//         }
//     }

//     /**
//      * @description find all greetings 
//      * @param {*} request 
//      * @param {*} response 
//      */
//     findAll = (req, res) => {

//         greetingService.findAll((error, data) => {
//             try {
//                 if (error) {
//                     logger.error("Could not find greeting with id ");
//                     return res.send({

//                         success: false,
//                         status_code: 500,
//                         message: "Could not find greeting "
//                     });
//                 }
//                 //if (data) {
//                 logger.info("greeting found!");
//                 res.send({
//                     success: true,
//                     status_code: 200,
//                     message: `greeting found`,
//                     data: (data)
//                 });
//             }
//             // }

//             catch (error) {
//                 logger.error("greeting not found");
//                 res.send({
//                     success: false,
//                     status_code: 404,
//                     message: `greeting not found`,
//                 });
//             }
//         })
//     }


//     //     // findAll = (req, res) => {
//     //     //     greetingService.findAllGreetings((error, data) => {
//     //     //         if(error){
//     //     //             logger.error("Some error occurred while retrieving greetings");
//     //     //             return res.status(500).send({
//     //     //                 success :false,
//     //     //                 message :"Some error occurred while retrieving greetings"
//     //     //             });
//     //     //         }

//     //     //         logger.info("Successfully retrieved greetings !");
//     //     //         res.send({
//     //     //             success : true,
//     //     //             message : "Successfully retrieved greetings !",
//     //     //             data : data
//     //     //         });
//     //     //     });
//     //     // }




//     //     // /**
//     //     //  * @description find and update greeting by its _id
//     //     //  * @param {*} req 
//     //     //  * @param {*} res 
//     //     //  */
//     //     // update = (req, res) => {
//     //     //     try {
//     //     //         const greetingInfo = {
//     //     //             name: req.body.name,
//     //     //             message: req.body.message,
//     //     //             greetingID: req.params.greetingId
//     //     //         }
//     //     //         // Validate Request
//     //     //         if (!req.body.message) {
//     //     //             logger.warn("greeting content can not be empty")
//     //     //             return res.send({
//     //     //                 success: false,
//     //     //                 status_code: 400,
//     //     //                 message: "greeting content can not be empty"
//     //     //             });
//     //     //         }
//     //     //         greetingService.update(greetingInfo, { new: true },
//     //     //             (error, data) => {
//     //     //                 if (error) {
//     //     //                     logger.warn("greeting not found with id " + req.params.greetingId)
//     //     //                     return res.send({
//     //     //                         success: false,
//     //     //                         status_code: 404,
//     //     //                         message: "greeting not found with id " + req.params.greetingId
//     //     //                     });
//     //     //                 }
//     //     //                 logger.info("greeting updated successfully with id " + req.params.greetingId)
//     //     //                 return res.send({
//     //     //                     success: true,
//     //     //                     status_code: 200,
//     //     //                     message: "greeting updated successfully with id " + req.params.greetingId,
//     //     //                     data: (data)
//     //     //                 });
//     //     //             })
//     //     //     } catch (error) {
//     //     //         if (err.kind === 'ObjectId') {
//     //     //             logger.error("greeting not found with id " + req.params.greetingId)
//     //     //             return res.send({
//     //     //                 success: false,
//     //     //                 status_code: 404,
//     //     //                 message: "greeting not found with id " + req.params.greetingId
//     //     //             });
//     //     //         }
//     //     //         logger.error("Error updating greeting with id " + req.params.greetingId)
//     //     //         return res.send({
//     //     //             success: false,
//     //     //             status_code: 500,
//     //     //             message: "Error updating greeting with id " + req.params.greetingId
//     //     //         });
//     //     //     };
//     //     // }




//     /**
//          * @description Update greeting by id
//          * @method update is service class method
//          * @param res is used to send the response
//          */
//     update = (req, res) => {
//         const greetingInfo = {
//             name: req.body.name,
//             message: req.body.message,
//             greetingID: req.params.greetingId
//         }

//         greetingService.update(greetingInfo, (error, data) => {
//             if (error) {
//                 logger.error("Error updating greeting with id : " + greetingID)
//                 return res.status(500).send({
//                     success: false,
//                     message: "Error updating greeting with id : " + greetingID
//                 });
//             }

//             if (!data) {
//                 logger.warn("Greeting not found with id : " + greetingID)
//                 return res.status(404).send({
//                     success: false,
//                     message: "Greeting not found with id : " + greetingID
//                 });
//             }

//             logger.info("Greeting updated successfully !")
//             res.send({
//                 success: true,
//                 message: "Greeting updated successfully !",
//                 data: data
//             });
//         });
//     }
// }

// module.exports = new Controller();









const greetingService = require('../services/greeting.svc.js');
const Joi = require('joi');
const logger = require('../../logger/logger.js');

const inputPattern = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z ]+$/).min(3).required(),
    // .messages({
    //     'string.pattern.base': 'name should contain only characters.',
    //     'string.min': 'name must have minimum 2 characters.',
    //     'string.empty': 'name can not be empty',
    //   }),
   message: Joi.string().required()
})

class GreetingController {
    /**
     * @description Create and save a new greeting
     * @param NAME_PATTERN is used to validate name
     * @param res is used to send the response
     */
    create = (req, res) => {
        const greetingData = {
            name: req.body.name,
            message: req.body.message
        }


        const validationResult = inputPattern.validate(greetingData);

        if (validationResult.error) {
            return res.status(400).send({
                success: false,
                message: validationResult.error.message
            });
        }

        greetingService.create(greetingData, (error, data) => {
            if (error) {
                logger.error("Some error occurred while creating greeting")
                return res.status(500).send({
                    success: false,
                    message: "Some error occurred while creating greeting"
                });
            }

            logger.info("Greeting added successfully !")
            res.send({
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
        // const greetingData = {
        //     greetingID: req.params.greetingId
        // }
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
                });





                // res.send({
                //     success:  true,
                //     message:"Successfully retrieved greeting with id : " + greetingID,
                //     data: data
                // });
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
            const greetingData = {
                name: req.body.name,
                message: req.body.message,
                greetingID: req.params.greetingId
            }

            const greetingResponse = {
            }

            greetingService.update(greetingData, (error, data) => {
                if (error) {
                    logger.error("Error updating greeting with id : " + greetingData.greetingID)
                    return res.status(500).send({
                        success: greetingResponse.success = false,
                        message: greetingResponse.message = "Error updating greeting with id : " + greetingData.greetingID
                    });
                }

                if (!data) {
                    logger.warn("Greeting not found with id : " + greetingData.greetingID)
                    return res.status(404).send({
                        success: greetingResponse.success = false,
                        message: greetingResponse.message = "Greeting not found with id : " + greetingData.greetingID
                    });
                }

                logger.info("Greeting updated successfully !")
                res.send({
                    success: greetingResponse.success = true,
                    message: greetingResponse.message = "Greeting updated successfully !",
                    data: greetingResponse.data = data
                });
            });
        }

        /**
        * @description Update greeting with id
        * @method delete is service class method
        * @param response is used to send the response 
        */
        delete (req, res) {



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