import { NextFunction, Request, Response } from "express";
import { URI_BASE, OCP_APIM_SUBSCRIPTION_KEY } from "../shared/constants";
import { readFile } from "fs";
import * as https from "https";
import { ClientRequest, IncomingMessage } from "http";

export class Repo {
  public static readonly params = {
    faceId: true,
    faceLandmarks: false,
    faceAttributes:
      "age,gender,smile,facialHair,glasses,emotion,hair,makeup,accessories"
  };

  public async getImageAnalysis(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    readFile(`./uploads/${request.params.imageName}`, function(
      err: NodeJS.ErrnoException,
      data: Buffer
    ): void {
      if (err) {
        console.log("could not read file " + err);
      } else {
        const post_options: any = {
          host: URI_BASE,
          path: `/face/v1.0/detect?returnFaceId=${
            this.params.faceId
          }&returnFaceLandmarks=${
            this.params.faceLandmarks
          }&returnFaceAttributes=${this.params.faceAttributes}`,
          method: "POST",
          data: data,
          headers: {
            "Content-Type": "application/octet-stream",
            "Content-Length": data.length,
            "Ocp-Apim-Subscription-Key": OCP_APIM_SUBSCRIPTION_KEY
          }
        };

        const post_req: ClientRequest = https.request(post_options, function(
          _response: IncomingMessage
        ): void {
          let responseText: string = "";

          _response.on("data", function(rdata: string): void {
            responseText += rdata;
          });

          _response.on("end", function(): void {
            // tODO: Process JSON before sending it
            response.send(responseText);
          });
        });

        post_req.write(data);

        post_req.end();
      }
    });
  }
}
