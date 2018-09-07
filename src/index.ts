import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import * as multer from "multer";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Routes } from "./routes";

createConnection()
  .then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    const UPLOAD_PATH = "uploads";
    const upload = multer({ dest: `${UPLOAD_PATH}/` });

    // register express routes from defined application routes
    Routes.forEach(route => {
      if (route.route == "/upload") {
        (app as any)[route.method](
          route.route,
          upload.single("pic"),
          (request: Request, res: Response, next: Function) => {
            const result = new (route.controller as any)()[route.action](
              request,
              res,
              next
            );
            if (result instanceof Promise) {
              result.then(
                result =>
                  result !== null && result !== undefined
                    ? res.send(result)
                    : undefined
              );
            } else if (result !== null && result !== undefined) {
              res.json(result);
            }
          }
        );
      } else {
        // const uploadCheck = route.route == "/upload" ? upload.single("pic") : (() => {});
        (app as any)[route.method](
          route.route,
          // uploadCheck,
          (req: Request, res: Response, next: Function) => {
            const result = new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            if (result instanceof Promise) {
              result.then(
                result =>
                  result !== null && result !== undefined
                    ? res.send(result)
                    : undefined
              );
            } else if (result !== null && result !== undefined) {
              res.json(result);
            }
          }
        );
      }
    });

    function checkMultipart(req, res, next) {
      const contentType = req.headers["content-type"];
      // Make sure it's multipart/form
      if (!contentType || !contentType.includes("multipart/form-data")) {
        // Stop middleware chain and send a status
        return res.sendStatus(500);
      }
      next();
    }

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch(error => console.log(error));
