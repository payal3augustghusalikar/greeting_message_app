/**
 * @module        models
 * @file          greeting.js
 * @description  controllers takes request and send the response  
 * @author       Payal Ghusalikar <payal.ghusalikar9@gmail.com>
*  @since         26/01/2021  
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
     * 
     * @param {*} greetingInfo 
     * @param {*} callBack 
     */
    create = (greetingInfo, callBack) => {
        const greeting = new Greeting({
            name: greetingInfo.name,
            message: greetingInfo.message || "Empty Message"
        });

        greeting.save({}, (error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }

    findAll = (callBack) => {
        Greeting.find((error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }

    findOne = (greetingID, callBack) => {
        Greeting.findById(greetingID, (error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }

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