const winston = require(`winston`);
const {
    createLogger,
    transports,
    format
} = require(`winston`);

const logger = createLogger({
    transports: [
        new transports.File({
            
            //filename: (`../../log/error.log`),
            filename: (`../../log/info.log`),
           // filename: (`../../log/warn.log`),
            level: `info`,
            format: winston.format.combine(format.timestamp(), format.json())
        }),
    ]
})

module.exports = logger;


