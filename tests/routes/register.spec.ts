import * as path from "path";
import { SuperTest, Test } from "supertest";
import { getTestApp } from "../bootstrap";
import { IRegister } from "../models/register.model";

let app: SuperTest<Test>;
let token: number;
let userId: number;
let analysisId: number;

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
        .expect(422)
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
        .expect(422)
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
        .expect(422)
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
        .expect(422)
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
        .expect(400)
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
        .expect(400)
        .end((err) => (err ? done(err) : done()));
    });
  });

  describe("UPDATE user password with wrong request body", () => {
    const data: IRegister = {
      pasword: "test1"
    };
    it("should be rejected", (done) => {
      app
        .put("/api/updatePassword")
        .send(data)
        .set({
          Accept: "application/json",
          authorization: token
        })
        .expect("Content-Type", /json/)
        .expect(422)
        .end((err) => (err ? done(err) : done()));
    });
  });

  describe("UPDATE user password", () => {
    const data: IRegister = {
      password: "test1"
    };
    it("should be accepted", (done) => {
      app
        .put("/api/updatePassword")
        .send(data)
        .set({
          Accept: "application/json",
          authorization: token
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err) => (err ? done(err) : done()));
    });
  });

  describe("CHECK if password update works", () => {
    const data: IRegister = {
      email: "phuc.vuuu@gmail.com",
      password: "test1"
    };
    it("should be accepted", (done) => {
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
          done();
        });
    });
  });

  describe("VERIFY the user token", () => {
    const data: IRegister = {
      name: "test",
      email: "phuc.vuuu@gmail.com",
      password: "test"
    };
    it("should be accepted", (done) => {
      app
        .get("/api/verifyToken")
        .send(data)
        .set({
          Accept: "application/json",
          authorization: token
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err) => (err ? done(err) : done()));
    });
  });

  describe("IMAGE upload test image", () => {
    it("should upload a test image", (done) => {
      app
        .post("/api/image")
        .set({
          "Content-Type": "multipart/form-data",
          authorization: token
        })
        .attach("image", path.resolve("tests", "ressources", "testFace.jpeg"))
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, resp) => {
          err ? done(err) : done();
          analysisId = resp.body.data.analysisId;
        });
    });
  });

  describe("IMAGE image without a face", () => {
    it("should be rejected", (done) => {
      app
        .post("/api/image")
        .set({
          "Content-Type": "multipart/form-data",
          authorization: token
        })
        .attach("image", path.resolve("tests", "ressources", "testNoFace.jpeg"))
        .expect("Content-Type", /json/)
        .expect(406)
        .end((err) => {
          err ? done(err) : done();
        });
    });
  });

  describe("IMAGE upload test.txt", () => {
    it("should be rejected", (done) => {
      app
        .post("/api/image")
        .set({
          "Content-Type": "multipart/form-data",
          authorization: token
        })
        .attach("image", path.resolve("tests", "ressources", "test.txt"))
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(415)
        .end((err) => {
          err ? done(err) : done();
        });
    });
  });

  describe("IMAGE upload test image with wrong authorization", () => {
    it("should be rejected", (done) => {
      app
        .post("/api/image")
        .set({
          "Content-Type": "multipart/form-data",
          authorization: 1
        })
        .attach("image", path.resolve("tests", "ressources", "testFace.jpeg"))
        .expect("Content-Type", /json/)
        .expect(401)
        .end((err) => {
          err ? done(err) : done();
        });
    });
  });

  describe("ANALYSIS get analysis of previous picture", () => {
    it("should return an analysis", (done) => {
      app
        .get("/api/analysis/" + analysisId)
        .set({
          "Content-Type": "application/json",
          authorization: token
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err) => {
          err ? done(err) : done();
        });
    });
  });

  describe("ANALYSIS get analysis with wrong id", () => {
    it("should be rejected", (done) => {
      app
        .get("/api/analysis/" + 0)
        .set({
          "Content-Type": "application/json",
          authorization: token
        })
        .expect("Content-Type", /json/)
        .expect(404)
        .end((err) => {
          err ? done(err) : done();
        });
    });
  });

  describe("STATISTICS get statistics for previous analysis", () => {
    it("should return statistics", (done) => {
      app
        .get("/api/statistics/" + userId)
        .set({
          "Content-Type": "application/json",
          authorization: token
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err) => {
          err ? done(err) : done();
        });
    });
  });

  describe("STATISTICS not get a statistic", () => {
    it("should be rejected", (done) => {
      app
        .get("/api/statistics/" + 0)
        .set({
          "Content-Type": "application/json",
          authorization: token
        })
        .expect("Content-Type", /json/)
        .expect(406)
        .end((err) => {
          err ? done(err) : done();
        });
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
          Accept: "application/json",
          authorization: token
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err) => (err ? done(err) : done()));
    });
  });

  describe("VERIFY old user token as wrong", () => {
    const data: IRegister = {
      name: "test",
      email: "phuc.vuuu@gmail.com",
      password: "test"
    };
    it("should be rejected", (done) => {
      app
        .get("/api/verifyToken")
        .send(data)
        .set({
          Accept: "application/json",
          authorization: token
        })
        .expect("Content-Type", /json/)
        .expect(404)
        .end((err) => (err ? done(err) : done()));
    });
  });
});
