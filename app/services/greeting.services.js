const greetingModel = require('../models/greeting.model')
const mongoose = require('mongoose');


/**
 * @description create new greeting 
 * @param {*} data 
 * @param {*} callback calls controller method
 */
exports.createNewGreeting = (greeting, callback) => {

    // const Usergreeting = new greeting({
    //     UserTitle: req.body.title || "Untitled greeting",
    //     UserContent: req.body.content
    // });

    greetingModel.create( greeting , (err, data) => {
        if (err) {
            callback(err, null)
        } else {
            return callback(null, data);
        }
    })
}

/**
 * @description find all greetings
 * @param {*} callBack calls controller method
 */

exports.findAll = (callBack) => {
    greetingModel.findAll((data, error) => {
        if (error)
            return callBack(new Error("Some error occurred while retrieving greeting"), null)
        else
            return callBack(data)
    })
}



/**
 * @description find greeting by _id
 * @param {*} greetingID 
 * @param {*} callBack calls controller method
 */
exports.findGreeting = (gretingID, callBack) => {
    greetingModel.findGreeting(gretingID, (data, error) => {
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
exports.delete = (greetingID, callBack) => {
    greetingModel.delete((greetingID), (data, error) => {
        if (error)
            return callBack(new Error("Some error occurred while deleting greeting"))
        else
            return callBack(null, data)
    })
}

/**
 * 
 * @param {*} greetingID 
 * @param {*} greeting 
 * @param {*} callBack 
 */
exports.updateGreeting = (greetingID, callBack) => {
    greetingModel.updateGreeting(greetingID, (data, error) => {
        if (error)
            return callBack(new Error("Some error occurred while updating greeting"), null)
        else
            return callBack(data, null)
    })
}
