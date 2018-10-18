import { SuperTest, Test } from "supertest";
import { getTestApp } from "../bootstrap";
import { IRegister } from "../models/register.model";

let app: SuperTest<Test>;
let token: number;
let userId: number;

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

  describe("LOGIN the user", () => {
    const data: IRegister = {
      name: "test",
      email: "phuc.vuuu@gmail.com",
      password: "test"
    };
    it("should log a user in", (done) => {
      app
        .post("/login")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          token = res.body.data.token;
          userId = res.body.data.user.id;
          console.log(userId);
          done();
        });
    });
  });

  describe("LOGIN the user without password", () => {
    const data: IRegister = {
      name: "test",
      email: "phuc.vuuu@gmail.com",
      password: ""
    };
    it("should be rejected", (done) => {
      app
        .post("/login")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(401)
        .end((err) => (err ? done(err) : done()));
    });
  });

  describe("LOGIN the user without email", () => {
    const data: IRegister = {
      name: "test",
      email: "",
      password: "test"
    };
    it("should be rejected", (done) => {
      app
        .post("/login")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(401)
        .end((err) => (err ? done(err) : done()));
    });
  });

  describe("LOGIN the user with wrong password", () => {
    const data: IRegister = {
      name: "test",
      email: "phuc.vuuu@gmail.com",
      password: "test_wrong"
    };
    it("should be rejected", (done) => {
      app
        .post("/login")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(422)
        .end((err) => (err ? done(err) : done()));
    });
  });

  describe("LOGIN the user with wrong email", () => {
    const data: IRegister = {
      name: "test",
      email: "some@mail.com",
      password: "test"
    };
    it("should be rejected", (done) => {
      app
        .post("/login")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(422)
        .end((err) => (err ? done(err) : done()));
    });
  });

  describe("DELETE the test user", () => {
    const data: IRegister = {
      name: "test",
      email: "phuc.vuuu@gmail.com",
      password: "test"
    };
    it("should be rejected", (done) => {
      app
        .delete("/api/deleteAccount/" + userId)
        .send(data)
        .set({
          "Accept": "application/json",
          "authorization": token
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err) => (err ? done(err) : done()));
    });
  });
});
