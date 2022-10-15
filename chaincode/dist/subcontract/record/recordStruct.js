"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordStruct = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
let RecordStruct = class RecordStruct {
    constructor(id, doctorId, personalData, info) {
        this.type = "record";
        this.id = id;
        this.doctorId = doctorId;
        this.personalData = personalData;
        this.info = info;
    }
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], RecordStruct.prototype, "type", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], RecordStruct.prototype, "id", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], RecordStruct.prototype, "doctorId", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Object)
], RecordStruct.prototype, "personalData", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Object)
], RecordStruct.prototype, "info", void 0);
RecordStruct = __decorate([
    fabric_contract_api_1.Object(),
    __metadata("design:paramtypes", [String, String, Object, Object])
], RecordStruct);
exports.RecordStruct = RecordStruct;
//# sourceMappingURL=recordStruct.js.map