const winston = require('winston');
require('winston-daily-rotate-file');


const transport = new winston.transports.DailyRotateFile({
  filename: './logs/common.log-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d'
});

transport.on('rotate', function(oldFilename, newFilename) {
  // do something fun
});

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({format:'MM-YY-DD HH:mm:ss'}),
        winston.format.prettyPrint(),
        winston.format.json(),
        winston.format.printf((info) =>
        JSON.stringify({
            level: info.level,
            Identifier:info.flag,
            timestamp: info.timestamp,
            message: info.message,
            body: info.body,
        }) + ',')
    ),
  transports: [
    transport
  ]
});
module.exports = logger;