import * as winston from "winston";
import { Logger, transports } from "winston";

const logger: Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.json(),
    winston.format.padLevels(),
    winston.format.label(),
    winston.format.timestamp()
  ),
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug",
      format: null,
      handleExceptions: true
    }),
    new transports.File({
      filename: "app.log.json",
      dirname: "logs",
      level: "info",
      eol: "\n",
      maxsize: 5242880,
      maxFiles: 5,
      handleExceptions: true,
      options: {
        flag: "a"
      }
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
