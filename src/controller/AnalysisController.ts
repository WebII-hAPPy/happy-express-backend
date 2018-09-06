import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Analysis } from "../entity/Analysis";
import * as request from "request-promise-native";
import * as multer from "multer";
import * as fs from "fs";
import * as path from "path";
import * as Loki from "lokijs";
import * as del from "del";

// setup
const DB_NAME = "db.json";
const COLLECTION_NAME = "images";
const UPLOAD_PATH = "uploads";
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: "fs" });

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

const cleanFolder = function(folderPath) {
  // delete files inside folder but not the folder itself
  del.sync([`${folderPath}/**`, `!${folderPath}`]);
};

export class AnalysisController {
  private analysisRepository = getRepository(Analysis);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.analysisRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.analysisRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const col = await loadCollection(COLLECTION_NAME, db);
      const data = col.insert(request.file);

      db.saveDatabase();
      response.send({
        id: data.$loki,
        fileName: data.filename,
        originalName: data.originalname
      });
    } catch (err) {
      response.sendStatus(400);
    }
    return this.analysisRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    await this.analysisRepository.remove(request.params.id);
  }
}
