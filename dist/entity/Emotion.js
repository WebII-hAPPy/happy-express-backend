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
var Emotion = /** @class */ (function() {
  function Emotion() {}
  __decorate(
    [typeorm_1.PrimaryGeneratedColumn(), __metadata("design:type", Number)],
    Emotion.prototype,
    "id",
    void 0
  );
  __decorate(
    [typeorm_1.Column("double precision"), __metadata("design:type", Number)],
    Emotion.prototype,
    "anger",
    void 0
  );
  __decorate(
    [typeorm_1.Column("double precision"), __metadata("design:type", Number)],
    Emotion.prototype,
    "contempt",
    void 0
  );
  __decorate(
    [typeorm_1.Column("double precision"), __metadata("design:type", Number)],
    Emotion.prototype,
    "disgust",
    void 0
  );
  __decorate(
    [typeorm_1.Column("double precision"), __metadata("design:type", Number)],
    Emotion.prototype,
    "fear",
    void 0
  );
  __decorate(
    [typeorm_1.Column("double precision"), __metadata("design:type", Number)],
    Emotion.prototype,
    "happiness",
    void 0
  );
  __decorate(
    [typeorm_1.Column("double precision"), __metadata("design:type", Number)],
    Emotion.prototype,
    "neutral",
    void 0
  );
  __decorate(
    [typeorm_1.Column("double precision"), __metadata("design:type", Number)],
    Emotion.prototype,
    "sadness",
    void 0
  );
  __decorate(
    [typeorm_1.Column("double precision"), __metadata("design:type", Number)],
    Emotion.prototype,
    "surprise",
    void 0
  );
  Emotion = __decorate([typeorm_1.Entity()], Emotion);
  return Emotion;
})();
exports.Emotion = Emotion;
//# sourceMappingURL=Emotion.js.map
