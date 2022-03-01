const { createLogger, format, transports } = require('winston');
require('winston-mongodb');
const { combine, timestamp, printf, colorize, splat } = format;

const url = process.env.DB_URL;

const myFormat = printf((info) => {
	if (info.meta && info.meta instanceof Error) {
		return `${info.timestamp} ${info.level} ${info.message} : ${info.meta.stack}`;
	}
	return `${info.timestamp} ${info.level}: ${info.message}`;
});

const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
const logger = createLogger({
	transports: [
		new transports.MongoDB({
			db: url,
			useNewUrlParser: true,
			format: combine(colorize(), timestamp(), splat(), myFormat),
			level: LOG_LEVEL,
		}),
		new transports.File({
			filename: 'logfile.log',
			level: LOG_LEVEL,
			format: combine(colorize(), timestamp(), splat(), myFormat),
		}),
		new transports.Console({
			level: LOG_LEVEL,
			format: combine(colorize(), timestamp(), splat(), myFormat),
		}),
	],
	exceptionHandlers: [
		new transports.File({
			filename: 'uncaughtExceptions.log',
			format: combine(colorize(), timestamp(), splat(), myFormat),
		}),
		new transports.MongoDB({
			db: url,
			level: LOG_LEVEL,
			format: combine(colorize(), timestamp(), splat(), myFormat),
		}),
	],
});
module.exports = logger;
