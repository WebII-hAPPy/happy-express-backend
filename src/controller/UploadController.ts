import { NextFunction, Request, Response } from "express";
import { IResponse } from "../models/Response.model";
import { IUploadResponse } from "../models/UploadResult.model";
import { COLLECTION_NAME } from "../shared/constants";
import { db, loadCollection } from "../shared/utils";

export class UploadController {
  /**
   * Login authentication
   * @param request User request
   * @param response Server response
   * @param next callback
   */
  async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<IResponse> {
    try {
      const col: LokiConstructor.Collection<any> = await loadCollection(
        COLLECTION_NAME,
        db
      );

      const data: any = col.insert(request.file);

      db.saveDatabase();

      let result: IUploadResponse = {
        id: data.$loki,
        fileName: data.filename,
        originalName: data.originalname
      };

      return {
        status: 200,
        data: result
      };
    } catch (err) {
      console.log(err);

      response.sendStatus(400);
    }
  }
}
