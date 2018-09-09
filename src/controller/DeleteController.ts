import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Statistic } from "../entity/Statistic";
import * as del from "del";
import { deleteImage } from "../shared/utils";

export class DeleteController {
  async delete(request: Request, response: Response, next: NextFunction) {
    const result = deleteImage(request.params.imageName);

    if (result != []) {
      response.sendStatus(200);
    } else if (result != null) {
      response.sendStatus(404);
    } else {
      response.sendStatus(501);
    }
  }
}
