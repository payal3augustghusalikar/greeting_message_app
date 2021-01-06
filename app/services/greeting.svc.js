const greetingModel = require('../models/greeting.mdl')
const mongoose = require('mongoose');

class Services {

    /**
     * @description create new greeting 
     * @param {*} data 
     * @param {*} callback calls controller method
     */
    createNewGreeting = (greetingInfo, callback) => {
        greetingModel.create(greetingInfo, (error, data) => {
            if (error)
                return callback(error, null)
            else
                return callback(null, data);
        })
    }

    /**
     * @description find all greetings
     * @param {*} callBack calls controller method
     */
    findAll = (callBack) => {
        greetingModel.findAllGreeting((data, error) => {
            if (error)
                return callBack(null, new Error("Some error occurred while retrieving greeting"))
            else
                return callBack(data, null)
        })
    }


    /**
     * @description find greeting by _id
     * @param {*} greetingID 
     * @param {*} callBack calls controller method
     */
    findGreeting = (greetingID, callBack) => {
        greetingModel.findGreeting(greetingID, (data, error) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }

    /**
     * @description delete greting by _id
     * @param {*} greetingID 
     * @param {*} callBack 
     */
    delete = (greetingID, callBack) => {
        greetingModel.delete((greetingID), (data, error) => {
            if (error)
                return callBack(new Error("Some error occurred while deleting greeting"))
            else
                return callBack(null, data)
        })
    }

    /**
     * @param {*} greetingID 
     * @param {*} greeting 
     * @param {*} callBack 
     */
    updateGreeting = (greetingInfo, callBack) => {
        greetingModel.updateGreeting(greetingInfo, (error, data) => {
            if (error)
                return callBack(new Error("Some error occurred while updating greeting"), null)
            else
                return callBack(null, data)
        })
    }
}
module.exports = new Services();


