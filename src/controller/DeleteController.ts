import { NextFunction, Request, Response } from "express";
import { deleteImage } from "../shared/utils";

export class DeleteController {
  /**
   * Login authentication
   * @param request User request
   * @param response Server response
   * @param next callback
   */
  async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const result: string[] = deleteImage(request.params.imageName);

    if (result !== []) {
      response.sendStatus(200);
    } else if (result != null) {
      response.sendStatus(404);
    } else {
      response.sendStatus(501);
    }
  }
}
