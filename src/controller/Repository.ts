import { NextFunction, Request, Response } from "express";
import { URI_BASE, OCP_APIM_SUBSCRIPTION_KEY } from "../shared/constants";
import * as fs from "fs";
import * as https from "https";

const params: any = {
  faceId: true,
  faceLandmarks: false,
  faceAttributes:
    "age,gender,smile,facialHair,glasses,emotion,hair,makeup,accessories"
};

export class Repo {
  async getImageAnalysis(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    fs.readFile(`./uploads/${request.params.imageName}`, function(err, data) {
      if (err) console.log("could not read file " + err);
      else {
        var post_options = {
          host: URI_BASE,
          path: `/face/v1.0/detect?returnFaceId=${
            params.faceId
          }&returnFaceLandmarks=${params.faceLandmarks}&returnFaceAttributes=${
            params.faceAttributes
          }`,
          method: "POST",
          data: data,
          headers: {
            "Content-Type": "application/octet-stream",
            "Content-Length": data.length,
            "Ocp-Apim-Subscription-Key": OCP_APIM_SUBSCRIPTION_KEY
          }
        };

        var post_req = https.request(post_options, function(_response) {
          var responseText = "";

          _response.on("data", function(rdata) {
            responseText += rdata;
          });

          _response.on("end", function() {
            // TODO: Process JSON before sending it
            response.send(responseText);
          });
        });

        post_req.write(data);

        post_req.end();
      }
    });
  }
}
