/**
 * @module       models
 * @file         greeting.js
 * @description  greetingModel class holds the databse related methods 
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
 * @since        2/01/2021  
-----------------------------------------------------------------------------------------------*/

const mongoose = require('mongoose');

const GreetingSchema = mongoose.Schema({
    name: String,
    message: String
}, {
    timestamps: true
});
const Greeting = mongoose.model('Greeting', GreetingSchema);

class GreetingModel {

    /**
     * @description save the greeting in database
     * @param {*} greetingInfo 
     * @param {*}callback 
     */
    create = (greetingInfo, callback) => {
        const greeting = new Greeting({
            name: greetingInfo.name,
            message: greetingInfo.message || "Empty Message"
        });
        greeting.save((error, data) => {
            return (error) ?
                callback(error, null) :
                callback(null, data);
        });
    }

    /**
     * @description retrive all the greetings from database
     * @param {*}callback 
     */
    findAll = (callback) => {
        Greeting.find((error, data) => {
            return (error) ?
                callback(error, null) :
                callback(null, data);
        });
    }

    /**
     * @description retrive one greeting from database
     * @param {*}callback 
     */
    findOne = (greetingID, callback) => {
        Greeting.findById(greetingID, (error, data) => {
            return (error) ?
                callback(error, null) :
                callback(null, data);
        });
    }

    /**
     * @description find  greeting by id from database and update
     * @param {*} greetingInfo 
     * @param {*}callback 
     */
    update = (greetingInfo, callback) => {
        Greeting.findByIdAndUpdate(greetingInfo.greetingID, {
            name: greetingInfo.name,
            message: greetingInfo.message || "Empty Message"
        }, { new: true }, (error, data) => {
            return (error) ?
                callback(error, null) :
                callback(null, data);
        });
    }

    /**
     * @description find  greeting by id from database and delete
     * @param {*} greetingInfo 
     * @param {*}callback 
     */
    deleteById = (greetingID, callback) => {
        Greeting.findByIdAndRemove(greetingID, (error, data) => {
            return (error) ?
                callback(error, null) :
                callback(null, data);
        });
    }
}

module.exports = new GreetingModel();