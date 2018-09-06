import { getRepository, Timestamp } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Analysis } from "../entity/Analysis";
import { Emotion } from "../entity/Emotion";
import { User } from "../entity/User";
import { Accessory } from "../entity/Accessory";

export class TestController {
  private testRepository = getRepository(Analysis);

  async one(request: Request, response: Response, next: NextFunction) {
    let test = new Analysis();

    test.id = 12;

    test.emotion = new Emotion();
    test.emotion.anger = 0.25;
    test.emotion.contempt = 0.4;
    test.emotion.disgust = 0.45;
    test.emotion.fear = 0.46;
    test.emotion.happiness = 0.69;
    test.emotion.id = 21;
    test.emotion.neutral = 0.645;
    test.emotion.sadness = 0.1;
    test.emotion.smile = 1.0;
    test.emotion.surprise = 0.22;

    test.user = new User();

    test.user.id = 12;

    let date = new Date();

    // test.time = new Date().getTime;

    return test;
  }
}
