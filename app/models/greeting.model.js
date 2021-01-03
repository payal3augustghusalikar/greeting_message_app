const mongoose = require('mongoose');
const Services = require('../services/greeting.services')

// document structure and required and optional in data
const GreetingSchema = mongoose.Schema({
    name: String,
    message: String
}, {
    timestamps: true
});

// creating a nw collection
const Greeting = mongoose.model('Greeting', GreetingSchema)

/**
 * @description create new greeting
 * @param {*} greeting
 * @param {*} callback calls service method
 */
exports.create = (greeting, callback) => {

    greeting.save({}, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            return callback(null, data)
        }
    })
}

/**
 * @description find all greetings
 * @param {*} callBack calls service method
 */
exports.findAll = (callBack) => {
    Greeting.find((error, data) => {
        if (error)
            return callBack(error, data)
        else
            return callBack(data)
    })
}

/**
 * @description find searched greeting by its id
 * @param {*} greetingID takes from request
 * @param {*} callBack calls service method
 */
exports.findGreeting = (greetingID, callBack) => {
    Greeting.findById(greetingID, (error, data) => {
        if (error)
            return callBack(error, null);
        else
            return callBack(null, data);
    });
}

/**
 * @description delete searched greeting by its id
 * @param {*} greetingID takes from request
 * @param {*} callBack calls service method
 */
exports.delete = (greetingID, callBack) => {
    Greeting.findByIdAndRemove(greetingID, (error, data) => {
        if (error)
            return callBack(error, null);
        return callBack(null, data);
    });
}

/** */
exports.updateGreeting = (greetingID, greeting, callBack) => {
    greeting.findByIdAndUpdate(greetingID, greeting, (error, data) => {
        if (error)
            return callBack(error, null);
        else
            return callBack(null, data);
    });
}


module.exports = mongoose.model('Greeting', GreetingSchema);