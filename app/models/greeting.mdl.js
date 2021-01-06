const mongoose = require('mongoose');
const Services = require('../services/greeting.svc')
let validator = require('validator')

// document structure and required and optional in data
const GreetingSchema = mongoose.Schema({
    // "type": "array",
    // "definations": {
    //     "greeting": {
    //         // "type": "object",
    //         "properties": {
                "name": {
                    "type": "string",
                    required: true,
                    unique: true,
                    validate: (value) => {
                        return validator.isName(value)
                    }
                },
                "message": {
                    "type": "string",
                    required: true,
                    validate: (value) => {
                        return validator.isMessage(value)
                    }
                },
    //         }
    //     }
    // },
    // name: String,
    // message: String
}, {
    timestamps: true
});

// creating a nw collection
const Greeting = mongoose.model('Greeting', GreetingSchema)


class Model {

    /**
     * @description create new greeting
     * @param {*} greeting
     * @param {*} callback calls service method
     */
    createNew = (greetingInfo, callback) => {

        const greeting = new Greeting({
            name: greetingInfo.name || "Untitled greeting",
            message: greetingInfo.message
        });

        greeting.save({}, (error, data) => {
            if (error)
                return callback(error, null);
            else
                return callback(null, data)
        })
    }

    /**
     * @description find all greetings
     * @param {*} callBack calls service method
     */
    findAllGreeting = (callBack) => {
        Greeting.find((data, error) => {
            if (error)
                return callBack(null, error)
            else
                return callBack(data, null)
        });
    }

    /**
     * @description find searched greeting by its id
     * @param {*} greetingID takes from request
     * @param {*} callBack calls service method
     */
    findGreeting = (greetingID, callBack) => {
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
    delete = (greetingID, callBack) => {
        Greeting.findByIdAndRemove(greetingID, (error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }

    /** */
    updateGreeting = (greetingInfo, callBack) => {
        greeting.findByIdAndUpdate(greetingInfo, (error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }
}
module.exports = new Model();
module.exports = mongoose.model('Greeting', GreetingSchema);

