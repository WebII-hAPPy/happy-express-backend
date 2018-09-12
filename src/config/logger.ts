import * as winston from "winston";

const options = {
  file: {
    level: "info",
    filename: "logs/app.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
    timestamp: true
  },
  error: {
    level: "error",
    filename: "logs/error.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
    timestamp: true
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const infoLogger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});

const errorLogger = winston.createLogger({
  level: "error",
  transports: [
    new winston.transports.File(options.error),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});

// create a stream object with a 'write' function that will be used by `morgan`
// logger.stream = {
//   write: function(message, encoding) {
//     // use the 'info' log level so the output will be picked up by both transports (file and console)
//     logger.info(message);
//   },
// };

export { infoLogger, errorLogger };
