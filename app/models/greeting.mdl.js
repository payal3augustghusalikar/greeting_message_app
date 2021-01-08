const mongoose = require('mongoose');

const GreetingSchema = mongoose.Schema({
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
}, {
    timestamps: true
});
const Greeting = mongoose.model('Greeting', GreetingSchema);

class GreetingModel {
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