import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import * as morgan from "morgan";
import * as multer from "multer";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { LoggerStream } from "./config/logger";
import { IRequestResult } from "./models/RequestResult.model";
import { Routes } from "./routes";
import { AuthService } from "./services/auth.service";
import { UPLOAD_PATH } from "./shared/constants";
import { imageFilter } from "./shared/utils";
import * as cors from "cors";

createConnection()
  .then(async (connection) => {
    // create express app
    const app: any = express();
    app.use(bodyParser.json());

    app.use(cors());

    const upload: multer.Instance = multer({
      dest: `${UPLOAD_PATH}/`,
      fileFilter: imageFilter
    });

    const authService: AuthService = new AuthService();

    const middleware: any = {
      skip: function(
        request: Request,
        response: Response,
        next: Function
      ): void {
        next();
      },
      protect: function(
        request: Request,
        response: Response,
        next: Function
      ): void {
        if (authService.validate(request)) {
          next();
        } else {
          response
            .status(401)
            .json({ message: "Route protected. Authentication required." });
        }
      }
    };

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        [
          route.route === "/api/image"
            ? upload.single("image")
            : middleware.skip,
          route.route.startsWith("/api") ? middleware.protect : middleware.skip
        ],
        (request: Request, res: Response, next: Function) => {
          const result: IRequestResult = new (route.controller as any)()[
            route.action
          ](request, res, next);
          if (result instanceof Promise) {
            result.then((result) => {
              if (result !== null && result !== undefined) {
                if (result.status !== undefined) {
                  res
                    .status(result.status)
                    .json({ message: result.message, data: result.data });
                } else {
                  res.json({ data: result });
                }
              }
            });
          } else if (result !== null && result !== undefined) {
            res.json({ data: result });
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
