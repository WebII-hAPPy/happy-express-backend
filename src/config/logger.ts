import * as winston from "winston";
import { Logger, transports } from "winston";

const date: Date = new Date();
const dateString: string = date.toISOString();

const logger: Logger = winston.createLogger({
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug",
      format: null,
      handleExceptions: true
    }),
    new transports.File({
      filename: `${dateString}.log.json`,
      dirname: "logs",
      level: "info",
      eol: "\n",
      maxsize: 5242880,
      maxFiles: 5,
      options: {
        colorize: false,
        // morgan will turn log file into json
        json: false,
        timestamp: true
      },
      handleExceptions: true
    })
  ],
  exitOnError: false
});

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export class LoggerStream {
  write(message: string): any {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  }
}

export { logger };
