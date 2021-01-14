require(`dotenv`).config();

/**
* @module  mongo-db-instance
* @desc    Promisified (with Bluebird) connection handler for Mongoose connections.
*
* @requires {@link https://github.com/visionmedia/debug|debug}
* @requires {@link https://github.com/petkaantonov/bluebird|bluebird}
* @requires {@link http://mongoosejs.com/|mongoose}
*
* @example
* var MongoDBAdapter = require('mongo-db-instance');
*
* var db = new MongoDBAdapter('mongodb://localhost/database');
* db.connect()
* .then(function(uri){
*   console.log('Connected to ' + uri);
*   return db.disconnect();
* })
* .then(function(uri){
*   console.log('Disconnected from ' + uri);
* });
*
*/

'use strict';

var DEBUG_CONNECTING = 'Connecting to db server %s...';
var DEBUG_ALREADY_CONNECTED = 'Already connected to db server %s.';
var DEBUG_ALREADY_CONNECTING = 'Already connecting to db server %s.';
var DEBUG_CONNECTED = 'Successfully connected to db server %s.';
var DEBUG_CONNECTION_ERROR = 'An error has occured while connecting to db server %s.';

var blueBird = require('bluebird');
var mongoose = require('mongoose');
var debug = require('debug');
//const { Console } = require('winston/lib/winston/transports');
//const { options } = require('joi');

var d = debug('mongo-db-instance');

var isState = function (state) {
    return mongoose.connection.readyState === mongoose.Connection.STATES[state];
};

/**
* @constructor
*
* @param {string} uri     - Mongoose connection URI.
* @see http://mongoosejs.com/docs/connections.html
* @param {object} options - Mongoose connection options.
*
*/

function MongoDBAdapter(uri, options) {
    this.uri = uri;
    this.options = options;
}

/**
* @description Add connection listeners without adding more than one for each event.
* This is done to avoid:
*   'warning: possible EventEmitter memory leak detected. 11 listeners added'
* More info: https://github.com/joyent/node/issues/5108
*/
MongoDBAdapter.prototype.addConnectionListener = function (event, cb) {
    console.log(event);
    var listeners = mongoose.connection.on;
    console.log("connect", listeners)
    if (!listeners || !listeners[event] || listeners[event].length === 0) {
        mongoose.connection.once(event, cb.bind(this));
    }
};

/**
* @description Returns a promise that gets resolved when successfully connected to MongoDB URI, or rejected otherwise.
* @returns {Promise} Returns promise
*/
MongoDBAdapter.prototype.connect = function () {
    return new blueBird(function (resolve, reject) {
        if (isState('connected')) {
            d(DEBUG_ALREADY_CONNECTED, this.uri);
            return resolve(this.uri);
        }

        this.addConnectionListener('error', function (err) {
            d(DEBUG_CONNECTION_ERROR, this.uri);
            return reject(err);
        });

        this.addConnectionListener('open', function () {
            d(DEBUG_CONNECTED, this.uri);
            return resolve(this.uri);
        });

        if (isState('connecting')) {
            d(DEBUG_ALREADY_CONNECTING, this.uri);
        } else {
            d(DEBUG_CONNECTING, this.uri);
            mongoose.connect(this.uri, this.options);
        }
    }.bind(this));
};

const uri = process.env.MONGODB_URL;

var mongoDBAdapter = new MongoDBAdapter(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

mongoDBAdapter.connect()
    .then(uri =>
        console.log("Connected to " + uri))
    .catch(err =>
        console.log("Could not connect database", err));

module.exports = MongoDBAdapter;













// 'use strict';
 
// var DEBUG_CONNECTING            = 'Connecting to db server %s...';
// var DEBUG_ALREADY_CONNECTED     = 'Already connected to db server %s.';
// var DEBUG_ALREADY_CONNECTING    = 'Already connecting to db server %s.';
// var DEBUG_CONNECTED             = 'Successfully connected to db server %s.';
// var DEBUG_CONNECTION_ERROR      = 'An error has occured while connecting to db server %s.';
 
// var blueBird    = require('bluebird');
// var mongoose    = require('mongoose');
// var debug      = require('debug');

// var d           = debug('mongoDb');

// var isState = function(state){
//     return mongoose.connection.readyState === mongoose.Connection.STATES[state];
//    };

// /**
// * @constructor
// *
// * @param {string} uri     - Mongoose connection URI.
// * @see http://mongoosejs.com/docs/connections.html
// * @param {object} options - Mongoose connection options.
// *
// */
// function MongoDBAdapter(uri, options) {
//         this.uri = uri;
//         this.options = options;
//     }

// /**
// * @description Add connection listeners without adding more than one for each event.
// * This is done to avoid:
// *   'warning: possible EventEmitter memory leak detected. 11 listeners added'
// * More info: https://github.com/joyent/node/issues/5108
// */  
// MongoDBAdapter.prototype.addConnectionListener = function(event, cb){
//     var listeners = mongoose.connection._events;
//     if (!listeners || !listeners[event] || listeners[event].length === 0){
//      return mongoose.connection.once(event, cb.bind(this));
//     }
//    };

// /**
// * @description Returns a promise that gets resolved when successfully connected to MongoDB URI, or rejected otherwise.
// * @returns {Promise} Returns promise
// */
// MongoDBAdapter.prototype.connect = function(){
//     return new blueBird(function(resolve, reject){
//       if (isState('connected')){
//         d(DEBUG_ALREADY_CONNECTED, this.uri);
//         return resolve(this.uri);
//       }
    
//       this.addConnectionListener('error', function(err){
//         d(DEBUG_CONNECTION_ERROR, this.uri);
//         return reject(err);
//       });
    
//       this.addConnectionListener('open', function(){
//         d(DEBUG_CONNECTED, this.uri);
//         return resolve(this.uri);
//       });
    
//       if (isState('connecting')){
//         d(DEBUG_ALREADY_CONNECTING, this.uri);
//       } else {
//         d(DEBUG_CONNECTING, this.uri);
//         console.log(DEBUG_ALREADY_CONNECTING);
//         mongoose.connect(this.uri, this.options);
//       }   
//     }.bind(this));
//    };



// let uri = process.env.MONGODB_URL;
// /**
//  * @description creating object of MongoDBAdapter by passing parameters URL and Options
//  */
// var mongoDBAdapter = new MongoDBAdapter(uri, { useNewUrlParser : true, 
//                                         useUnifiedTopology : true,
//                                         useFindAndModify : false }); 

// /**
//  * @description Calling function MongoDBAdapter.prototype.connect
//  * @var mongoDBAdapter 
//  */
// mongoDBAdapter.connect()
// .then(uri =>
//     console.log("Connected to " +uri))
// .catch(err =>
//     console.log("Could not connect to database", err));

// module.exports = MongoDBAdapter;



















// require(`dotenv`).config();
// //const logger = require('./logger/logger.js');
// /**
// * @module  mongo-db-instance
// * @desc    Promisified (with Bluebird) connection handler for Mongoose connections.
// *
// * @requires {@link https://github.com/visionmedia/debug|debug}
// * @requires {@link https://github.com/petkaantonov/bluebird|bluebird}
// * @requires {@link http://mongoosejs.com/|mongoose}
// *
// * @example
// * var MongoDBAdapter = require('mongo-db-instance');
// *
// * var db = new MongoDBAdapter('mongodb://localhost/database');
// * db.connect()
// * .then(function(uri){
// *   console.log('Connected to ' + uri);
// *   return db.disconnect();
// * })
// * .then(function(uri){
// *   console.log('Disconnected from ' + uri);
// * });
// *
// */

// 'use strict';

// var DEBUG_CONNECTING = 'Connecting to db server %s...';
// var DEBUG_ALREADY_CONNECTED = 'Already connected to db server %s.';
// var DEBUG_ALREADY_CONNECTING = 'Already connecting to db server %s.';
// var DEBUG_CONNECTED = 'Successfully connected to db server %s.';
// var DEBUG_CONNECTION_ERROR = 'An error has occured while connecting to db server %s.';

// var blueBird = require('bluebird');
// var mongoose = require('mongoose');
// var debug = require('debug');
// //const { options } = require('joi');

// var d = debug('mongo-db-instance');
// //server status
// var isState = function (state) {
//     return mongoose.connection.readyState === mongoose.Connection.STATES[state];
// };

// /**
// * @constructor
// *
// * @param {string} uri     - Mongoose connection URI.
// * @see http://mongoosejs.com/docs/connections.html
// * @param {object} options - Mongoose connection options.
// *
// */

// function MongoDBAdapter(uri, options) {
//     this.uri = uri;
//     this.options = options;
// }

// /**
// * @description Add connection listeners without adding more than one for each event.
// * This is done to avoid:
// *   'warning: possible EventEmitter memory leak detected. 11 listeners added'
// * More info: https://github.com/joyent/node/issues/5108
// */
// // MongoDBAdapter.prototype.addConnectionListener = function (event, cb) {
// //     var listeners = mongoose.connection._events;
// //     console.log("connected ",this.listeners )
// //     if (!listeners || !listeners[event] || listeners[event].length === 0) {
// //         mongoose.connection.on(event, cb.bind(this));
// //         console.log("connected2 ",this.listeners )
// //     }
// // };

// // STATES[disconnected] = 0;
// // STATES[connected] = 1;
// // STATES[connecting] = 2;
// // STATES[disconnecting] = 3;
// // STATES[uninitialized] = 99;

// MongoDBAdapter.prototype.addConnectionListener = function(event, cb){
//     var listeners = mongoose.connection.on;
//     console.log("connected ",this.listeners )
//     if (!listeners || !listeners[event] || listeners[event].length === 0){
//        mongoose.connection.once(event, cb.bind(this));
//     }
//    };


// /**
// * @description Returns a promise that gets resolved when successfully connected to MongoDB URI, or rejected otherwise.
// * @returns {Promise} Returns promise
// */
// MongoDBAdapter.prototype.connect = function () {
//     return new blueBird(function (resolve, reject) {
//         if (isState('connected')) {
//             d(DEBUG_ALREADY_CONNECTED, this.uri);
//             return resolve(this.uri);
//         }

//         this.addConnectionListener('error', function (err) {
//             d(DEBUG_CONNECTION_ERROR, this.uri);
//             return reject(err);
//         });

//         this.addConnectionListener('open', function () {
//             d(DEBUG_CONNECTED, this.uri);
//             return resolve(this.uri);
//         });

//         if (isState('connecting')) {
//             d(DEBUG_ALREADY_CONNECTING, this.uri);
//         } else {
//             d(DEBUG_CONNECTING, this.uri);
//             mongoose.connect(this.uri, this.options);
//         }
//     }.bind(this));
// };

// var uri = (process.env.MONGODB_URL);

// var mongoDBAdapter = new MongoDBAdapter(uri,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     });

// mongoDBAdapter.connect()
//     .then(uri =>
//         console.log("Connected to " + uri))
//     .catch(err =>
//         console.log("Could not connect database", err));

// module.exports = MongoDBAdapter;



// 'use strict';
 
// var DEBUG_CONNECTING            = 'Connecting to db server %s...';
// var DEBUG_ALREADY_CONNECTED     = 'Already connected to db server %s.';
// var DEBUG_ALREADY_CONNECTING    = 'Already connecting to db server %s.';
// var DEBUG_CONNECTED             = 'Successfully connected to db server %s.';
// var DEBUG_CONNECTION_ERROR      = 'An error has occured while connecting to db server %s.';
 
// var blueBird    = require('bluebird');
// var mongoose    = require('mongoose');
// var debug      = require('debug');

// var d           = debug('mongoDb');

// var isState = function(state){
//     return mongoose.connection.readyState === mongoose.Connection.STATES[state];
//    };

// /**
// * @constructor
// *
// * @param {string} uri     - Mongoose connection URI.
// * @see http://mongoosejs.com/docs/connections.html
// * @param {object} options - Mongoose connection options.
// *
// */
// function MongoDBAdapter(uri, options){
//     this.uri     = uri;
//     this.options = options;
//    }

// /**
// * @description Add connection listeners without adding more than one for each event.
// * This is done to avoid:
// *   'warning: possible EventEmitter memory leak detected. 11 listeners added'
// * More info: https://github.com/joyent/node/issues/5108
// */  
// MongoDBAdapter.prototype.addConnectionListener = function(event, cb){
//    let listeners = mongoose.connection._events;
//     console.log("connection : ",listeners)
//     if (!listeners || !listeners[event] || listeners[event].length === 0){
//       mongoose.connection.on(event, cb.bind(this));
//     }
//    };

// /**
// * @description Returns a promise that gets resolved when successfully connected to MongoDB URI, or rejected otherwise.
// * @returns {Promise} Returns promise
// */
// MongoDBAdapter.prototype.connect = function(){
//     return new blueBird(function(resolve, reject){
//       if (isState('connected')){
//         d(DEBUG_ALREADY_CONNECTED, this.uri);
//         return resolve(this.uri);
//       }
    
//       this.addConnectionListener('error', function(err){
//         d(DEBUG_CONNECTION_ERROR, this.uri);
//         return reject(err);
//       });
    
//       this.addConnectionListener('open', function(){
//         d(DEBUG_CONNECTED, this.uri);
//         return resolve(this.uri);
//       });
    
//       if (isState('connecting')){
//         d(DEBUG_ALREADY_CONNECTING, this.uri);
//       } else {
//         d(DEBUG_CONNECTING, this.uri);
//         console.log(DEBUG_ALREADY_CONNECTING);
//         mongoose.connect(this.uri, this.options);
//       }
    
//     }.bind(this));
//    };

// // /**
// //  * @description creating object of MongoDBAdapter by passing parameters URL and Options
// //  */
// // var mongoDBAdapter = new MongoDBAdapter(process.env.MONGODB_URL, { useNewUrlParser : true, 
// //                                         useUnifiedTopology : true,
// //                                         useFindAndModify : false }); 

// // /**
// //  * @description Calling function MongoDBAdapter.prototype.connect
// //  * @var mongoDBAdapter is the object reference
// //  */
// // mongoDBAdapter.connect()
// // .then(uri =>
// //     console.log("Connected to " +uri))
// // .catch(err =>
// //     console.log("Could not connect to database", err));

// // module.exports = MongoDBAdapter;



// var uri = process.env.MONGODB_URL;

// var mongoDBAdapter = new MongoDBAdapter(uri,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     });

// mongoDBAdapter.connect()
//     .then(uri =>
//         console.log("Connected to " + uri))
//     .catch(err =>
//         console.log("Could not connect database", err));

// module.exports = MongoDBAdapter;


