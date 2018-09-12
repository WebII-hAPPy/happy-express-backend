import { NextFunction, Request, Response } from "express";
import { URI_BASE } from "../shared/constants";
import * as fs from "fs";
import * as https from "https";

const params: any = {
  faceId: true,
  faceAttributes: false,
  faceLandmarks:
    "age,gender,smile,facialHair,glasses,emotion,hair,makeup,accessories"
};

export class Repo {
  async getImageAnalysis(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    fs.readFile(`./uploads/${request.body.fileName}`, function(err, data) {
      if (err) console.log("could not read file " + err);
      else {
        var post_options = {
          host: `${URI_BASE}`,
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
            "Ocp-Apim-Subscription-Key": "2f43ea3609644ba99c3a8cdae4382178"
          }
        };

        var post_req = https.request(post_options, function(_response) {
          var responseText = "";

          _response.on("data", function(rdata) {
            responseText += rdata;
          });

          _response.on("end", function() {
            console.log(responseText);
            response.send(responseText);
          });
        });

        post_req.write(data);

        post_req.end();
      }
    });
  }
}
