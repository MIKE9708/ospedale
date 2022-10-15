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
exports.DoctorController = void 0;
const recordController_1 = require("./../record/recordController");
const asset_1 = require("../../utility/asset");
const fabric_contract_api_1 = require("fabric-contract-api");
const contractExtension_1 = require("../../utility/contractExtension");
class DoctorController extends contractExtension_1.ContractExtension {
    constructor() {
        super("doctor");
    }
    async addDoctor(ctx, param) {
        const params = JSON.parse(param);
        const exist = await this.get(ctx, params.id);
        if (exist) {
            throw new Error("The doctor  with id:" + params.id + " already exists");
        }
        const doctor = {
            type: "doctor",
            id: params.id,
            patients: [],
            idHospital: params.idHospital,
            nome: params.nome,
            cognome: params.cognome
        };
        return Promise.all([
            await ctx.stub.putState('doctor' + '-' + doctor.id, Buffer.from(JSON.stringify(doctor)))
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async deleteDoctor(ctx, param) {
        const recordClass = new recordController_1.RecordController();
        const params = JSON.parse(param);
        const exists = await this.get(ctx, params.id);
        if (!exists) {
            throw new Error(`The doctor ${params.id} does not exist`);
        }
        recordClass.freePatient(ctx, params.doctorId);
        return Promise.all([
            await ctx.stub.deleteState('doctor-' + params.id)
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async getMyPatientsRecord(ctx, id) {
        const exists = await this.get(ctx, id);
        const patients_record = new recordController_1.RecordController();
        let res = await patients_record.getAll(ctx);
        if (!exists) {
            throw new Error(`The doctor ${id} does not exist`);
        }
        res = res.filter((elem) => elem.doctorId === id);
        return { status: asset_1.Status.Success, message: res };
    }
    async addPatient(ctx, param) {
        const params = JSON.parse(param);
        const recordClass = new recordController_1.RecordController();
        await recordClass.reassignPatient(ctx, params.doctorId, params.patientId);
        const exists = await this.get(ctx, params.doctorId);
        exists.patients = [...exists.patients, params.patientId];
        return { status: asset_1.Status.Success, message: "Operazione effettuata" };
    }
}
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "addDoctor", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "deleteDoctor", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getMyPatientsRecord", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "addPatient", null);
exports.DoctorController = DoctorController;
//# sourceMappingURL=doctorController.js.map