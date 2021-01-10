const winston = require(`winston`);
const {
    createLogger,
    transports,
    format
} = require(`winston`);


const levels = { 
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  };


  winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  );


const logger = createLogger({
    transports: [
        new transports.File({
            
            filename: (`./log/info.log`),
            level: `info`,
            format: winston.format.combine(format.timestamp(), format.json())
            
        }),
        new transports.File({
            filename: (`./log/error.log`),
            //filename: (`../../log/info.log`),
           // filename: (`../../log/warn.log`),
            level: `error`,
            format: winston.format.combine(format.timestamp(), format.json())
        }),

        new transports.File({
            //filename: (`../../log/error.log`),
            //filename: (`../../log/info.log`),
            filename: (`./log/warn.log`),
            level: `warn`,
            format: winston.format.combine(format.timestamp(), format.json())
        }),


    ]
})



// const logger = createLogger({
//     transports: [
//         new transports.File({
//             filename: (`../../log/error.log`),
//             //filename: (`../../log/info.log`),
//            // filename: (`../../log/warn.log`),
//             level: `error`,
//             format: winston.format.combine(format.timestamp(), format.json())
//         }),
//     ]
// })



// const logger = createLogger({
//     transports: [
//         new transports.File({
//             //filename: (`../../log/error.log`),
//             //filename: (`../../log/info.log`),
//             filename: (`../../log/warn.log`),
//             level: `warn`,
//             format: winston.format.combine(format.timestamp(), format.json())
//         }),
//     ]
// })



module.exports = logger;

// const express = require('express');

// const app = express()
// const loggingMiddleware = require('my-logging-middleware')
// app.use(loggingMiddleware)

// const router = express.Router()
// const routeLoggingMiddleware = require('my-route-logging-middleware')
// router.use(routeLoggingMiddleware)

// //const app = express();
// const errorLoggingMiddleware = require('my-error-logging-middleware')
// app.use(errorLoggingMiddleware)


// //const app = express()
// //const winston = require('winston')
// const consoleTransport = new winston.transports.Console()
// const myWinstonOptions = {
//     transports: [consoleTransport]
// }
// const logger = new winston.createLogger(myWinstonOptions)

// function logRequest(req, res, next) {
//     logger.info(req.url)
//     next()
// }
// app.use(logRequest)

// function logError(err, req, res, next) {
//     logger.error(err)
//     next()
// }
// app.use(logError)


// 'use strict'
// //const winston = require('winston')
// const remoteLog = new winston.transports.Http({
//     host: "localhost",
//     port: 3001,
//     path: "/errors"
// })

// const consoleLog = new winston.transports.Console()

// module.exports = {
//     requestLogger: createRequestLogger([consoleLog]),
//     errorLogger: createErrorLogger([remoteLog, consoleLog])
// }

// function createRequestLogger(transports) {
//     const requestLogger = winston.createLogger({
//         format: getRequestLogFormatter(),
//         transports: transports
//     })

//     return function logRequest(req, res, next) {
//         requestLogger.info({req, res})
//         next()
//     }
// }

// function createErrorLogger(transports) {
//     const errLogger = winston.createLogger({
//         level: 'error',
//         transports: transports
//     })

//     return function logError(err, req, res, next) {
//         errLogger.error({err, req, res})
//         next()
//     }
// }

// // function getRequestLogFormatter() {
// //     const {combine, timestamp, printf} = winston.format;

// //     return combine(
// //         timestamp(),
// //         printf(info => {
// //             const {req, res} = info.message;
// //             return (${info.timestamp} ${info.level}: ${req.hostname}${req.port || ''}${req.originalUrl})
// //         })
// //     );
// // }

// var stackify = require('stackify-logger')

// // logs global exceptions to Retrace
// stackify.start({apiKey: '***', env: 'dev'})

// // logs Express route exceptions to Retrace
// app.use(stackify.expressExceptionHandler)

// // or add the Stackify transport
// require('winston-stackify').Stackify
// winstonLogger.add(winston.transports.Stackify, {storage: stackify})

// // or create a Stackify transport and include that in your loggers transports
// require('winston-stackify').Stackify
// const stackifyTransport = new winston.transports.Stackify({storage: stackify})




// module.exports = logger;