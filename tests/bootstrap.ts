import * as supertest from "supertest";
import { createConnection } from "../src/index";
import { SuperTest, Test } from "supertest";

export function getTestApp(): SuperTest<Test> {
  return supertest(createConnection(process.env.NODE_ENV));
}
