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
     * @param {*} callBack 
     */
    create = (greetingInfo, callBack) => {
        const greeting = new Greeting({
            name: greetingInfo.name,
            message: greetingInfo.message || "Empty Message"
        });
        greeting.save((error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }


    /**
     * @description retrive all the greetings from database
     * @param {*} callBack 
     */
    findAll = (callBack) => {
        Greeting.find((error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }

    /**
     * @description retrive one greeting from database
     * @param {*} callBack 
     */
    findOne = (greetingID, callBack) => {
        Greeting.findById(greetingID, (error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }

    /**
     * @description find  greeting by id from database and update
     * @param {*} greetingInfo 
     * @param {*} callBack 
     */
    update = (greetingInfo, callBack) => {
        Greeting.findByIdAndUpdate(greetingInfo.greetingID, {
            name: greetingInfo.name,
            message: greetingInfo.message || "Empty Message"
        }, { new: true }, (error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }

    /**
     * @description find  greeting by id from database and delete
     * @param {*} greetingInfo 
     * @param {*} callBack 
     */
    deleteById = (greetingID, callBack) => {
        Greeting.findByIdAndRemove(greetingID, (error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }
}

module.exports = new GreetingModel();