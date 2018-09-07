import { NextFunction, Request, Response } from "express";
import * as Loki from "lokijs";

// setup
const DB_NAME = "db.json";
const COLLECTION_NAME = "images";
const UPLOAD_PATH = "uploads";
// const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration
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

export class UploadController {
  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const col = await loadCollection(COLLECTION_NAME, db);
      const data = col.insert(request.file);

      db.saveDatabase();

      let result = {
        id: data.$loki,
        fileName: data.filename,
        originalName: data.originalname
      };

      return result;
    } catch (err) {
      response.sendStatus(400);
    }
  }
}
