const winston = require(`winston`);
const {
    createLogger,
    transports,
    format
} = require(`winston`);

const logger = createLogger({
    transports: [
        new transports.File({
            // filename: `info.log`,
            // filename: `error.log`,
            // filename: `warn.log`,
            filename: (`../../log/info.log`),
            filename: (`../../log/error.log`),
            filename: (`../../log/warn.log`),
            level: `info`,
            format: winston.format.combine(format.timestamp(), format.json())
        }),
    ]
})

module.exports = logger;


