import { NextFunction, Request, Response } from "express";
import { loadCollection, db } from "../shared/utils";
import { COLLECTION_NAME } from "../shared/constants";

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
