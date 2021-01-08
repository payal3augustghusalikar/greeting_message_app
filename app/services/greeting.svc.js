const Greeting = require('../models/greeting.mdl.js');

class GreetingService {
    /**
     * @description Create and save greeting then send response to controller
     * @method create is used to save the greeting
     * @param callBack is the callBack for controller
     */


    create = (greetingInfo, callBack) => {
        // create a greeting
        Greeting.create(greetingInfo, (error, data) => {
            if (error)
                return callBack(error, null);
            return callBack(null, data);
        })
    }


    /**
     * @description Find all the greetings and return response to controller
     * @method findAll is used to retrieve greetings
     * @param callBack is the callBack for controller
     */
    findAll = (callBack) => {
        Greeting.findAll((error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }

    /**
     * @description Find greeting by id and return response to controller
     * @method findOne is used to retrieve greeting by ID
     * @param callBack is the callBack for controller
     */
    findOne = (greetingID, callBack) => {
        Greeting.findOne(greetingID, (error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }

    /**
     * @description Update greeting by id and return response to controller
     * @method update is used to update greeting by ID
     * @param callBack is the callBack for controller
     */
    update = (greetingInfo, callBack) => {
        Greeting.update(greetingInfo, (error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }


    /**
     * @description Delete greeting by id and return response to controller
     * @method deleteById is used to remove greeting by ID
     * @param callBack is the callBack for controller
     */
    delete = (greetingID, callBack) => {
        Greeting.deleteById(greetingID, (error, data) => {
            if (error)
                return callBack(error, null);
            else
                return callBack(null, data);
        });
    }
}

module.exports = new GreetingService();