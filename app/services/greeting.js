/**
 * @module       Models
 * @file         greeting.js
 * @description  holds the methods calling from controller
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
*  @since        2/01/2021  
-----------------------------------------------------------------------------------------------*/

const Greeting = require('../models/greeting.js');

class GreetingService {
    /**
     * @description Create and save greeting then send response to controller
     * @method create is used to save the greeting
     * @param callback is the callback for controller
     */
    create = (greetingInfo, callback) => {
        Greeting.create(greetingInfo, (error, data) => {
            return (error) ?
                callback(error, null) :
                callback(null, data);
        })
    }

    /**
     * @description Find all the greetings and return response to controller
     * @method findAll is used to retrieve greetings
     * @param callback is the callback for controller
     */
    findAll = (callback) => {
        Greeting.findAll((error, data) => {
            return (error) ?
                callback(error, null) :
                callback(null, data);
        });
    }

    /**
     * @description Find greeting by id and return response to controller
     * @method findOne is used to retrieve greeting by ID
     * @param callback is the callback for controller
     */
    findOne = (greetingID, callback) => {
        Greeting.findOne(greetingID, (error, data) => {
            return (error) ?
                callback(error, null) :
                callback(null, data);
        });
    }

    /**
     * @description Update greeting by id and return response to controller
     * @method update is used to update greeting by ID
     * @param callback is the callback for controller
     */
    update = (greetingInfo, callback) => {
        Greeting.update(greetingInfo, (error, data) => {
            return (error) ?
                callback(error, null) :
                callback(null, data);
        });
    }

    /**
     * @description Delete greeting by id and return response to controller
     * @method deleteById is used to remove greeting by ID
     * @param callback is the callback for controller
     */
    delete = (greetingID, callback) => {
        Greeting.deleteById(greetingID, (error, data) => {
            return (error) ?
                callback(error, null) :
                callback(null, data);
        });
    }
}

module.exports = new GreetingService();