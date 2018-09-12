import { NextFunction, Request, Response } from "express";
import { loadCollection, db } from "../shared/utils";
import { COLLECTION_NAME, URI_BASE } from "../shared/constants";
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
      if (err) console.log("read jpg fail " + err);
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
            // "Content-Length": data.length,
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
            // result = JSON.stringify(responseText);
            response.send(responseText);
          });
        });

        post_req.write(data);

        post_req.end();
      }
    });
    // console.log("ICH WERDE AUFGERUFEN!!!");

    // console.log(data);

    // const filePath = "./220efb561ae8d0e0f1b00359b8233362.jpeg";

    // const responseFile = ((request.body.path), response) => {
    //   const filePath = "./220efb561ae8d0e0f1b00359b8233362.jpeg"; // or any file format

    //   // Check if file specified by the filePath exists
    //   fs.exists(filePath, function(exists) {
    //     if (exists) {
    //       // Content-type is very interesting part that guarantee that
    //       // Web browser will handle response in an appropriate manner.
    //       response.writeHead(200, {
    //         "Content-Type": "application/octet-stream",
    //         "Content-Disposition": "attachment; filename=" +
    //       });
    //       fs.createReadStream(filePath).pipe(response);
    //     } else {
    //       response.writeHead(400, { "Content-Type": "text/plain" });
    //       response.end("ERROR File does not exist");
    //     }
    //   });
    // };

    // fs.readFile("image.jpg", function(err, data) {
    //   if (err) throw err;

    //   // Encode to base64
    //   var encodedImage = new Buffer(data, "binary").toString("base64");
    // });

    // const options = {
    //   method: "POST",
    //   uri: "https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect",
    //   headers: {
    //     "content-type": "application/octet-stream",
    //     "Ocp-Apim-Subscription-Key": "2f43ea3609644ba99c3a8cdae4382178"
    //   },
    //   body: responseFile
    // }

    // fs.createReadStream("/220efb561ae8d0e0f1b00359b8233362").pipe(
    //   rp.post("https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect").on("end", done => {
    //     console.log("Upload Done");
    //   })
    // );

    // fs.readFile(`../../uploads/${request.body.path}.jpg`, function(err, data) {
    //   if (err) throw err;

    //   // Encode to base64
    //   let encodedImage = new Buffer(data, 'binary').toString('base64');
    // });

    // const bitmap = fs.readFileSync(file);
    // // convert binary data to base64 encoded string
    // return new Buffer(bitmap).toString('base64');

    // const result = await rp(options);

    // console.log("THIS IS THE RESULT: \n\n\n\n" + result);

    // return result;

    // const data = fs.readFileSync(
    //   `./220efb561ae8d0e0f1b00359b8233362.jpeg`,
    //   "base64"
    // );

    // const baseUrl = "https://westeurope.api.cognitive.microsoft.com";
    // const queryString = "/face/v1.0/detect";
    // var options = {
    //   uri: baseUrl + queryString,
    //   headers: {
    //     "content-type": "application/octet-stream",
    //     "Ocp-Apim-Subscription-Key": "2f43ea3609644ba99c3a8cdae4382178"
    //   },
    //   body: data
    // };

    // const result = await rp.get(options);

    // return result;
  }
}
