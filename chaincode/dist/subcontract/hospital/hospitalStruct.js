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
exports.HospitalStruct = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
let HospitalStruct = class HospitalStruct {
    constructor(id, nome, citta, adminId) {
        this.type = "hospital";
        this.id = id;
        this.nome = nome;
        this.citta = citta;
        this.adminId = adminId;
    }
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], HospitalStruct.prototype, "type", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], HospitalStruct.prototype, "id", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], HospitalStruct.prototype, "nome", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], HospitalStruct.prototype, "adminId", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], HospitalStruct.prototype, "citta", void 0);
HospitalStruct = __decorate([
    fabric_contract_api_1.Object(),
    __metadata("design:paramtypes", [String, String, String, String])
], HospitalStruct);
exports.HospitalStruct = HospitalStruct;
//# sourceMappingURL=hospitalStruct.js.map