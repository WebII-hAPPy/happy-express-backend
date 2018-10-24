import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import { Express, Request, Response } from "express";
import * as morgan from "morgan";
import * as multer from "multer";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { LoggerStream } from "./config/logger";
import { IRequestResult } from "./models/RequestResult.model";
import { Routes } from "./routes";
import { AuthService } from "./services/auth.service";
import { UPLOAD_PATH } from "./shared/constants";

export class App {
  public static async getApp(): Promise<Express> {
    await createConnection(process.env.NODE_ENV);

    // create express app
    const app: Express = express();
    app.use(bodyParser.json());

    const corsOptions: cors.CorsOptions = {
      exposedHeaders: ["Access-Control-Expose-Headers", "code"]
    };
    app.use(cors(corsOptions));
    const upload: multer.Instance = multer({
      dest: `${UPLOAD_PATH}/`
    });

    const authService: AuthService = new AuthService();
    const middleware: any = {
      skip: function(
        request_1: Request,
        response: Response,
        next: Function
      ): void {
        next();
      },
      protect: function(
        request_3: Request,
        response: Response,
        next: Function
      ): void {
        if (authService.validate(request_3)) {
          next();
        } else {
          response
            .set("status", "401")
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
        (request_4: Request, res: Response, next: Function) => {
          const result: IRequestResult = new (route.controller as any)()[
            route.action
          ](request_4, res, next);
          if (result instanceof Promise) {
            result.then((result_1) => {
              if (result_1 !== null && result_1 !== undefined) {
                if (result_1.status !== undefined) {
                  res
                    .set("status", `${result_1.status}`)
                    .status(result_1.status)
                    .json({ message: result_1.message, data: result_1.data });
                } else {
                  res.json({ data: result_1 });
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
    console.log("Express server has started on port 3000.");
    return app;
  }
}

if (process.env.NODE_ENV !== "test") {
  App.getApp();
}
