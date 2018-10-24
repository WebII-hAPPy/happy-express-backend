import * as supertest from "supertest";
import { App } from "../src/index";
import { SuperTest, Test } from "supertest";

export function getTestApp(): Promise<SuperTest<Test>> {
  return App.getApp().then((app) => supertest(app));
}
