import { SuperTest, Test } from "supertest";
import { getTestApp } from "../bootstrap";
import { IRegister } from "../models/register.model";

let app: SuperTest<Test>;

describe("Register test", () => {
  before((done) => {
    getTestApp()
      .then((applicaiton) => {
        app = applicaiton;
        done();
      })
      .catch(done);
  });

  describe("POST /", () => {
    const data: IRegister = {
      name: "test",
      email: "phuc.vuuu@gmail.com",
      password: "test"
    };
    it("should return a user", (done) => {
      app
        .post("/register")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err) => (err ? done(err) : done()));
    });
  });

  describe("POST without email", () => {
    const data: IRegister = {
      name: "test",
      email: "",
      password: "test"
    };
    it("should be rejected", (done) => {
      app
        .post("/register")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(401)
        .end((err) => (err ? done(err) : done()));
    });
  });

  describe("POST without password", () => {
    const data: IRegister = {
      name: "test",
      email: "phuc.vuuu@gmail.com",
      password: ""
    };
    it("should be rejected", (done) => {
      app
        .post("/register")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(401)
        .end((err) => (err ? done(err) : done()));
    });
  });

  describe("POST duplicate already registered user", () => {
    const data: IRegister = {
      name: "test",
      email: "phuc.vuuu@gmail.com",
      password: "test"
    };
    it("should be rejected", (done) => {
      app
        .post("/register")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(409)
        .end((err) => (err ? done(err) : done()));
    });
  });
});
