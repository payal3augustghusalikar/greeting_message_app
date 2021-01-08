// const greetingModel = require('../models/greeting.mdl')
// //const mongoose = require('mongoose');

// class GreetingServices {

//     /**
//      * @description create new greeting 
//      * @param {*} data 
//      * @param {*} callback calls controller method
//      */
//     create = (greetingInfo, callback) => {
//         greetingModel.create(greetingInfo, (error, data) => {
//             if (error)
//                 return callback(error, null)
//             else
//                 return callback(null, data);
//         })
//     }

//     /**
//      * @description find all greetings
//      * @param {*} callBack calls controller method
//      */
//     findAll = (callback) => {
//         greetingModel.findAll((error, data) => {
//             if (error)
//                 return callback(new Error("Some error occurred while retrieving greeting"), null)
//             else
//                 return callback(null, data)
//         })
//     }


//     // findAllGreetings = (callBack) => {
//     //     greetingModel.findAllGreeting((error, data) => {
//     //         if (error)
//     //             return callBack(error, null);
//     //         return callBack(null, data);
//     //     });
//     // }



//     /**
//      * @description find greeting by _id
//      * @param {*} greetingID 
//      * @param {*} callback calls controller method
//      */
//     findOne = (greetingID, callback) => {
//         greetingModel.findOne(greetingID, (error, data) => {
//             if (error)
//                 return callback(error, null);
//             else
//                 return callback(null, data);
//         });
//     }

//     /**
//      * @description delete greting by _id
//      * @param {*} greetingID 
//      * @param {*} callback 
//      */
//     delete = (greetingID, callback) => {
//         greetingModel.deleteById((greetingID), (error, data) => {
//             if (error)
//                 return callback(new Error("Some error occurred while deleting greeting"), null)
//             else
//                 return callback(null, data)
//         })
//     }

//     /**
//      * @param {*} greetingID 
//      * @param {*} greeting 
//      * @param {*} callBack 
//      */
//     update = (greetingInfo, callback) => {
//         greetingModel.update(greetingInfo, (error, data) => {
//             if (error)
//                 return callback(new Error("Some error occurred while updating greeting"), null)
//             else
//                 return callback(null, data)
//         });
//     }
// }
// module.exports = new GreetingServices();







const Greeting = require('../models/greeting.mdl.js');

class GreetingService {
    /**
     * @description Create and save greeting then send response to controller
     * @method save is used to save the greeting
     * @param callBack is the callBack for controller
     */
    create = (greetingData, callBack) => {
        // create a greeting
        Greeting.create(greetingData, (error, data) => {
            if (error)
                return callBack(error, null);
            return callBack(null, data);
        })
    }

    /**
     * @description Find all the greetings and return response to controller
     * @method find is used to retrieve greetings
     * @param callBack is the callBack for controller
     */
    findAll = (callBack) => {
        Greeting.findAll((error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }

    /**
     * @description Find greeting by id and return response to controller
     * @method findById is used to retrieve greeting by ID
     * @param callBack is the callBack for controller
     */
    findOne = ( greetingID, callBack) => {
        Greeting.findOne( greetingID, (error, data) => {
            if (error)
                return callBack(error, null);
            return callBack(null, data);
        });
    }

    /**
     * @description Update greeting by id and return response to controller
     * @method findByIdAndUpdate is used to update greeting by ID
     * @param callBack is the callBack for controller
     */
    update = (greetingData, callBack) => {
        Greeting.update(greetingData, (error, data) => {
            if (error)
                return callBack(error, null);
            return callBack(null, data);
        });
    }


    /**
     * @description Delete greeting by id and return response to controller
     * @method findByIdAndRemove is used to remove greeting by ID
     * @param callBack is the callBack for controller
     */
    delete = (greetingID, callBack) => {
        Greeting.deleteById(greetingID, (error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }
}

module.exports = new GreetingService();