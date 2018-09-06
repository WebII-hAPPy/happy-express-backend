import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { User } from "./entity/User";
import * as request from "request-promise-native";
import * as multer from "multer";
import * as fs from "fs";
import * as path from "path";
import * as Loki from "lokijs";
import * as del from "del";

createConnection()
  .then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
      (app as any)[route.method](
        route.route,
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
    });

    // setup
    const DB_NAME = "db.json";
    const COLLECTION_NAME = "images";
    const UPLOAD_PATH = "uploads";
    const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration
    const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, {
      persistenceMethod: "fs"
    });

    const loadCollection = function(
      colName,
      db: Loki
    ): Promise<Loki.Collection<any>> {
      return new Promise(resolve => {
        db.loadDatabase({}, () => {
          const _collection =
            db.getCollection(colName) || db.addCollection(colName);
          resolve(_collection);
        });
      });
    };

    app.post("/anal", upload.single("pic"), async (req, res) => {
      try {
        const col = await loadCollection(COLLECTION_NAME, db);
        const data = col.insert(req.file);

        db.saveDatabase();
        res.send({
          id: data.$loki,
          fileName: data.filename,
          originalName: data.originalname
        });
      } catch (err) {
        res.sendStatus(400);
      }
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    // await connection.manager.save(
    //   connection.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27
    //   })
    // );
    // await connection.manager.save(
    //   connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24
    //   })
    // );

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch(error => console.log(error));
