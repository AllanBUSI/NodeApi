const winston = require('winston'),
    config = require('../../config');

let logger;

if (config.server.env == 'test' || config.server.env == 'local' || config.server.env == 'development')
    logger = console;
else {
    const papertrailTransport = new winston.transports.Papertrail({
        host: config.logger.host,
        port: config.logger.port,
    });

    logger = new winston.Logger({
        transports: [papertrailTransport],
    });
}

module.exports = logger;