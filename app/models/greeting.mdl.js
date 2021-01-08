// const mongoose = require('mongoose');
// //const Services = require('../services/greeting.svc')
// let validator = require('validator')

// // document structure and required and optional in data
// const GreetingSchema = mongoose.Schema({
//     "name": {
//         "type": "string",
//         required: true,
//         unique: true,
//         validate: (value) => {
//             return validator.isName(value)
//         }
//     },
//     "message": {
//         "type": "string",
//         required: true,
//         validate: (value) => {
//             return validator.isMessage(value)
//         }
//     },
// }, {
//     timestamps: true
// });

// // creating a nw collection
// const Greeting = mongoose.model('Greeting', GreetingSchema)

// class GreetingModel {
//     /**
//      * @description create new greeting
//      * @param {*} greeting
//      * @param {*} callback calls service method
//      */
//     create = (greetingInfo, callback) => {

//         const greeting = new Greeting({
//             name: greetingInfo.name || "Untitled greeting",
//             message: greetingInfo.message
//         });
//         greeting.save({}, (error, data) => {
//             if (error)
//                 return callback(error, null);
//             else
//                 return callback(null, data)
//         })
//     }

//     /**
//      * @description find all greetings
//      * @param {*} callBack calls service method
//      */
//     findAll = (callback) => {
//         Greeting.find((error, data) => {
//             if (error)
//                 return callback(error, null)
//             else
//                 return callback(null, data)
//         });
//     }

//     // findAllGreeting = (callBack) => {
//     //     Greeting.find( (error, data) => {
//     //         if(error)
//     //             return callBack(error, null);
//     //         return callBack(null, data);
//     //     });
//     // } 

//     /**
//      * @description find searched greeting by its id
//      * @param {*} greetingID takes from request
//      * @param {*} callBack calls service method
//      */
//     findOne = (greetingID, callback) => {
//         Greeting.findById(greetingID, (error, data) => {
//             if (error)
//                 return callback(error, null);
//             else
//                 return callback(null, data);
//         });
//     }

//     /**
//      * @description delete searched greeting by its id
//      * @param {*} greetingID takes from request
//      * @param {*} callBack calls service method
//      */
//     deleteById = (greetingID, callback) => {
//         Greeting.findByIdAndRemove(greetingID, (error, data) => {
//             if (error)
//                 return callback(error, null);
//             else
//                 return callback(null, data);
//         });
//     }

//     /** */
//     // update = (greetingInfo, callback) => {
//     //     Greeting.findByIdAndUpdate(greetingInfo, (error, data) => {
//     //         if (error)
//     //             return callback(error, null);
//     //         else
//     //             return callback(null, data);
//     //     });
//     // }


//     update = (greetingData, callBack) => {
//         Greeting.findByIdAndUpdate(greetingData.greetingID, {
//             name : greetingData.name,
//             message : greetingData.message || "Empty Message"
//             }, {new: true}, (error, data) => {
//                 if(error)
//                     return callBack(error, null);
//                 return callBack(null, data);
//         });
//     }


// }
// module.exports = new GreetingModel();

//module.exports = mongoose.model('Greeting', GreetingSchema);








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
    create = (greetingData, callBack) => {
        const greeting = new Greeting({
            name: greetingData.name,
            message: greetingData.message || "Empty Message"
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
            return callBack(null, data);
        });
    }

    findOne = ( greetingID, callBack) => {
        Greeting.findById( greetingID, (error, data) => {
            if (error)
                return callBack(error, null);
            return callBack(null, data);
        });
    }

    update = (greetingData, callBack) => {
        Greeting.findByIdAndUpdate(greetingData.greetingID, {
            name: greetingData.name,
            message: greetingData.message || "Empty Message"
        }, { new: true }, (error, data) => {
            if (error)
                return callBack(error, null);
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