"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express = require("express");
var bodyParser = require("body-parser");
var routes_1 = require("./routes");
typeorm_1
  .createConnection()
  .then(function(connection) {
    return __awaiter(_this, void 0, void 0, function() {
      var app;
      return __generator(this, function(_a) {
        app = express();
        app.use(bodyParser.json());
        // register express routes from defined application routes
        routes_1.Routes.forEach(function(route) {
          app[route.method](route.route, function(req, res, next) {
            var result = new route.controller()[route.action](req, res, next);
            if (result instanceof Promise) {
              result.then(function(result) {
                return result !== null && result !== undefined
                  ? res.send(result)
                  : undefined;
              });
            } else if (result !== null && result !== undefined) {
              res.json(result);
            }
          });
        });
        // setup express app here
        // ...
        // start express server
        app.listen(3000);
        // insert new users for test
        // await connection.manager.save(
        //   connection.manager.create(User, {
        //     firstName: "Timber",
        //     lastName: "Saw",
        //     age: 27
        //   })
        // );
        // await connection.manager.save(
        //   connection.manager.create(User, {
        //     firstName: "Phantom",
        //     lastName: "Assassin",
        //     age: 24
        //   })
        // );
        console.log(
          "Express server has started on port 3000. Open http://localhost:3000/users to see results"
        );
        return [2 /*return*/];
      });
    });
  })
  .catch(function(error) {
    return console.log(error);
  });
//# sourceMappingURL=index.js.map
