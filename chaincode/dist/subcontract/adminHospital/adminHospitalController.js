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
exports.AdminHospitalController = void 0;
const asset_1 = require("../../utility/asset");
const fabric_contract_api_1 = require("fabric-contract-api");
const contractExtension_1 = require("../../utility/contractExtension");
class AdminHospitalController extends contractExtension_1.ContractExtension {
    constructor() {
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("admin");
    }
    async addAdminHospital(ctx, param) {
        const params = JSON.parse(param);
        const exist = await this.get(ctx, params.id);
        if (exist) {
            throw new Error("The doctor  with id:" + params.id + " already exists");
        }
        const adminHospital = {
            type: "adminHospital",
            id: params.id,
            nome: params.nome,
            cognome: params.cognome
        };
        return Promise.all([
            await ctx.stub.putState('adminHospital' + '-' + adminHospital.id, Buffer.from(JSON.stringify(adminHospital)))
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async deleteAdminHospital(ctx, param) {
        const params = JSON.parse(param);
        const exists = await this.get(ctx, params.id);
        if (!exists) {
            throw new Error(`The admin of the hospital ${params.id} does not exist`);
        }
        return Promise.all([
            await ctx.stub.deleteState('adminHospital-' + params.id)
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
}
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AdminHospitalController.prototype, "addAdminHospital", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], AdminHospitalController.prototype, "deleteAdminHospital", null);
exports.AdminHospitalController = AdminHospitalController;
//# sourceMappingURL=adminHospitalController.js.map