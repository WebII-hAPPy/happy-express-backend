// // // // import * as winston from "winston";
// // // import { Logger } from "winston";

// // // //  const level = process.env.LOG_LEVEL || "debug";

// // // //  const log = new winston.Logger({
// // // //     transports: [
// // // //       new winston.transports.Console({
// // // //         level: this.level,
// // // //         timestamp: function() {
// // // //           return new Date().toISOString();
// // // //         }
// // // //       })
// // // //     ]
// // // //   });

// // // const logger = new Logger({
// // //   transports: [
// // //     new transports.Console({
// // //       level: process.env.NODE_ENV === "production" ? "error" : "debug",
// // //       handleExceptions: true,
// // //       json: false,
// // //       colorize: true
// // //     }),
// // //     new transports.File({
// // //       filename: "debug.log",
// // //       level: "info",
// // //       handleExceptions: true,
// // //       json: true,
// // //       colorize: false
// // //     })
// // //   ],
// // //   exitOnError: false
// // // });

// // // if (process.env.NODE_ENV !== "production") {
// // //   logger.debug("Logging initialized at debug level");
// // // }

// // // logger.stream = split().on("data", function(message: string) {
// // //   logger.info(message);
// // // });

// // // export default logger;

// // import { Logger, transports } from 'winston';
// // import stream from 'stream';
// // import split from 'split';

// // // http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
// // // https://www.loggly.com/ultimate-guide/node-logging-basics/

// // const logger = new Logger({
// //     transports: [
// //         new (transports.Console)({
// //             level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
// //             handleExceptions: true,
// //             json: false,
// //             colorize: true
// //         }),
// //         new (transports.File)({
// //             filename: 'debug.log', level: 'info',
// //             handleExceptions: true,
// //             json: true,
// //             colorize: false
// //         })
// //     ],
// //     exitOnError: false,
// // });

// // if (process.env.NODE_ENV !== 'production') {
// //     logger.debug('Logging initialized at debug level');
// // }

// // logger.stream = split().on('data', function (message: string) {
// //     logger.info(message);
// // });

// // export default logger;

// import * as winston from 'winston';
// // winston.level = 'debug';

// class Logger {
//   private name: string;

//   constructor(name: string) {
//     this.name = name;
//   }

//   debug(format: string, ...params: any[]) {
//     winston.log.apply(this, ['debug', this.name + ' - ' + format].concat(params));
//   }

//   info(format: string, ...params: any[]) {
//     winston.log.apply(this, ['info', this.name + ' - ' + format].concat(params));
//   }

//   warn(format: string, ...params: any[]) {
//     winston.log.apply(this, ['warn', this.name + ' - ' + format].concat(params));
//   }

//   error(format: string, ...params: any[]) {
//     winston.log.apply(this, ['error', this.name + ' - ' + format].concat(params));
//   }
// }

// export default function(name: string) {
//   return new Logger(name);
// }

// import * as winston from "winston";

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   verbose: 3,
//   debug: 4,
//   silly: 5
// };

// const format = winston.format;

// const myFormat = format.printf(info => {
//   return `${info.timestamp} [${info.level}]: ${info.message}`;
// });

// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: "combine.log" })
//   ],
//   format: format.combine(format.timestamp(), myFormat)
// });

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
