import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import * as morgan from "morgan";
import * as multer from "multer";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Routes } from "./routes";
import { UPLOAD_PATH } from "./shared/constants";
import { imageFilter } from "./shared/utils";
import { infoLogger, errorLogger } from "./config/logger";

createConnection()
  .then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: imageFilter });

    // register express routes from defined application routes
    Routes.forEach(route => {
      (app as any)[route.method](
        route.route,
        route.route == "/image"
          ? upload.single("image")
          : function(request, response, next) {
              next();
            },
        (request: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            request,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then(result => {
              result !== null && result !== undefined
                ? res.send(result)
                : undefined;
            });
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // logging
    app.use(
      morgan("dev", {
        skip: function(req, res) {
          return res.statusCode < 400;
        },
        stream: {
          write: message => errorLogger.error(message)
        }
      })
    );

    app.use(
      morgan("dev", {
        skip: function(req, res) {
          return res.statusCode >= 400;
        },
        stream: {
          write: message => infoLogger.info(message)
        }
      })
    );

    // start express server
    app.listen(3000);

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch(error => console.log(error));
