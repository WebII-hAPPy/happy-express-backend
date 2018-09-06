"use strict";
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Emotion_1 = require("./Emotion");
var Accessory_1 = require("./Accessory");
var User_1 = require("./User");
var MakeUp_1 = require("./MakeUp");
var FacialHair_1 = require("./FacialHair");
var Hair_1 = require("./Hair");
var Analysis = /** @class */ (function() {
  function Analysis() {}
  __decorate(
    [typeorm_1.PrimaryGeneratedColumn(), __metadata("design:type", Number)],
    Analysis.prototype,
    "id",
    void 0
  );
  __decorate(
    [
      typeorm_1.ManyToOne(
        function(type) {
          return User_1.User;
        },
        function(user) {
          return user.analyses;
        }
      ),
      __metadata("design:type", User_1.User)
    ],
    Analysis.prototype,
    "user",
    void 0
  );
  __decorate(
    [typeorm_1.Column("timestamp"), __metadata("design:type", String)],
    Analysis.prototype,
    "time",
    void 0
  );
  __decorate(
    [
      typeorm_1.OneToOne(function(type) {
        return Emotion_1.Emotion;
      }),
      typeorm_1.JoinColumn(),
      __metadata("design:type", Emotion_1.Emotion)
    ],
    Analysis.prototype,
    "emotion",
    void 0
  );
  __decorate(
    [typeorm_1.Column(), __metadata("design:type", Number)],
    Analysis.prototype,
    "smile",
    void 0
  );
  __decorate(
    [
      typeorm_1.OneToMany(
        function(type) {
          return Accessory_1.Accessory;
        },
        function(accessory) {
          return accessory.analysis;
        }
      ),
      __metadata("design:type", Array)
    ],
    Analysis.prototype,
    "accessories",
    void 0
  );
  __decorate(
    [
      typeorm_1.OneToOne(function(type) {
        return MakeUp_1.MakeUp;
      }),
      typeorm_1.JoinColumn(),
      __metadata("design:type", MakeUp_1.MakeUp)
    ],
    Analysis.prototype,
    "makeUp",
    void 0
  );
  __decorate(
    [typeorm_1.Column(), __metadata("design:type", String)],
    Analysis.prototype,
    "glasses",
    void 0
  );
  __decorate(
    [typeorm_1.Column(), __metadata("design:type", String)],
    Analysis.prototype,
    "gender",
    void 0
  );
  __decorate(
    [typeorm_1.Column(), __metadata("design:type", String)],
    Analysis.prototype,
    "age",
    void 0
  );
  __decorate(
    [
      typeorm_1.OneToOne(function(type) {
        return FacialHair_1.FacialHair;
      }),
      __metadata("design:type", FacialHair_1.FacialHair)
    ],
    Analysis.prototype,
    "facialHair",
    void 0
  );
  __decorate(
    [
      typeorm_1.OneToOne(function(type) {
        return Hair_1.Hair;
      }),
      __metadata("design:type", Hair_1.Hair)
    ],
    Analysis.prototype,
    "hair",
    void 0
  );
  Analysis = __decorate([typeorm_1.Entity()], Analysis);
  return Analysis;
})();
exports.Analysis = Analysis;
//# sourceMappingURL=Analysis.js.map
