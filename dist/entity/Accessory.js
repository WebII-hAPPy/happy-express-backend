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
var Analysis_1 = require("./Analysis");
var Accessory = /** @class */ (function() {
  function Accessory() {}
  __decorate(
    [typeorm_1.PrimaryGeneratedColumn(), __metadata("design:type", Number)],
    Accessory.prototype,
    "id",
    void 0
  );
  __decorate(
    [typeorm_1.Column(), __metadata("design:type", String)],
    Accessory.prototype,
    "type",
    void 0
  );
  __decorate(
    [typeorm_1.Column("float"), __metadata("design:type", Number)],
    Accessory.prototype,
    "confidence",
    void 0
  );
  __decorate(
    [
      typeorm_1.ManyToOne(
        function(type) {
          return Analysis_1.Analysis;
        },
        function(analysis) {
          return analysis.accessories;
        }
      ),
      __metadata("design:type", Analysis_1.Analysis)
    ],
    Accessory.prototype,
    "analysis",
    void 0
  );
  Accessory = __decorate([typeorm_1.Entity()], Accessory);
  return Accessory;
})();
exports.Accessory = Accessory;
//# sourceMappingURL=Accessory.js.map
