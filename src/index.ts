import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import * as morgan from "morgan";
import * as multer from "multer";
import "reflect-metadata";
import { createConnection } from "typeorm";
// import { errorLogger, infoLogger } from "./config/logger";
import { IRequestResult } from "./models/RequestResult.model";
import { Routes } from "./routes";
import { UPLOAD_PATH } from "./shared/constants";
import { imageFilter } from "./shared/utils";
import { LoggerStream } from "./config/logger";
import { IResponse } from "./models/Response.model";

createConnection()
  .then(async (connection) => {
    // create express app
    const app: any = express();
    app.use(bodyParser.json());

    const upload: multer.Instance = multer({
      dest: `${UPLOAD_PATH}/`,
      fileFilter: imageFilter
    });

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        route.route === "/image"
          ? upload.single("image")
          : function(
              request: Request,
              response: Response,
              next: Function
            ): void {
              next();
            },
        (request: Request, res: Response, next: Function) => {
          const result: IRequestResult = new (route.controller as any)()[
            route.action
          ](request, res, next);
          if (result instanceof Promise) {
            result.then((result) => {
              console.log(result);

              if (result !== null && result !== undefined) {
                if (result.status !== undefined) {
                  res
                    .status(result.status)
                    .json({ message: result.message, data: result.data });
                } else {
                  res.send(result);
                }
              }
            });
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // start express server
    app.listen(3000);

    app.use(morgan("combined", { stream: new LoggerStream() }));
    // app.use(morgan("combined"));
    console.log("Express server has started on port 3000.");
  })
  .catch((error) => console.log(error));
