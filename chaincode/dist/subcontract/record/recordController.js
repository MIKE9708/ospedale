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
exports.RecordController = void 0;
const asset_1 = require("../../utility/asset");
const fabric_contract_api_1 = require("fabric-contract-api");
const contractExtension_1 = require("../../utility/contractExtension");
class RecordController extends contractExtension_1.ContractExtension {
    constructor() {
        //do un nome al contratto che ho creato per distinguerlo dagli altri
        super("record");
    }
    async addRecord(ctx, param) {
        const params = JSON.parse(param);
        const exist = await this.get(ctx, params.id);
        if (exist) {
            throw new Error("The record  with id:" + params.id + " already exists");
        }
        const record = {
            type: "record",
            id: params.id,
            doctorId: params.doctorId,
            personalData: {
                cf: params.cf,
                name: params.name,
                surname: params.surname,
                birth: params.birth,
                weight: params.weight,
                height: params.height,
                nation: params.nation,
                number: params.number,
                nascita: params.nascita
            },
            info: {
                pastMedicalProblems: params.pastMedicalProblems,
                allergies: params.allergies,
                medicinesTaken: params.medicinesTaken
            }
        };
        return Promise.all([
            await ctx.stub.putState('record' + '-' + record.id, Buffer.from(JSON.stringify(record)))
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async updateRecord(ctx, param) {
        const params = JSON.parse(param);
        const exist = await this.get(ctx, params.id);
        if (!exist) {
            throw new Error("The record  with id:" + params.id + " does not exists");
        }
        let updatedRecord = exist;
        /*
        updatedRecord.info.personalData.name=params.name?(params.name):(updatedRecord.info.personalData.name);
        updatedRecord.info.personalData.surname=params.surname?(params.surname):(updatedRecord.info.personalData.surname);
        updatedRecord.info.personalData.birth=params.birth?(params.birth):(updatedRecord.info.personalData.name);
        updatedRecord.info.personalData.weight=params.weight?(params.weight):(updatedRecord.info.personalData.name);
        updatedRecord.info.personalData.height=params.height?(params.height):(updatedRecord.info.personalData.height);
        updatedRecord.info.personalData.nation=params.nation?(params.nation):(updatedRecord.info.personalData.nation);
        updatedRecord.info.personalData.number=params.number?(params.number):(updatedRecord.info.personalData.number);
        updatedRecord.pastMedicalProblems=params.pastMedicalProblems?(params.pastMedicalProblems):(updatedRecord.pastMedicalProblems);
        updatedRecord.medicinesTaken=params.medicinesTaken?(params.medicinesTaken):(updatedRecord.medicinesTaken);
        updatedRecord.allergies=params.allergies?(params.allergies):(updatedRecord.allergies); */
        for (const key in updatedRecord) {
            updatedRecord[key] = params[key] ? (params[key]) : (updatedRecord[key]);
        }
        return Promise.all([
            await ctx.stub.putState('record' + '-' + updatedRecord.id, Buffer.from(JSON.stringify(updatedRecord)))
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async deleteRecord(ctx, id) {
        //const params = JSON.parse(param);
        const exists = await this.get(ctx, id);
        if (!exists) {
            throw new Error(`The record ${id} does not exist`);
        }
        return Promise.all([
            await ctx.stub.deleteState('record-' + id)
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async freePatient(ctx, doctorId) {
        const patientsRecord = await this.getAll(ctx);
        const patientRecord = patientsRecord.filter((val) => val.doctorId === doctorId);
        for (const asset of patientRecord) {
            asset.doctorId = undefined;
            await ctx.stub.putState('patient' + '-' + asset.Id, Buffer.from(JSON.stringify(asset)))
                .then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
        }
    }
    async getFreePatient(ctx) {
        const patientsRecord = JSON.parse(await this.getAll(ctx));
        const patientRecord = patientsRecord.filter((val) => val.doctorId === undefined || val.doctorId === '');
        return { status: asset_1.Status.Success, message: patientRecord };
    }
    async reassignPatient(ctx, doctorId, patientId) {
        const patientsRecord = JSON.parse(await this.getAll(ctx));
        var patientRecord = patientsRecord.filter((val) => val.doctorId == '');
        patientRecord.doctorId = doctorId;
        await ctx.stub.putState('record' + '-' + patientRecord.id, Buffer.from(JSON.stringify(patientRecord)));
    }
}
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], RecordController.prototype, "addRecord", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], RecordController.prototype, "updateRecord", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], RecordController.prototype, "deleteRecord", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], RecordController.prototype, "freePatient", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], RecordController.prototype, "getFreePatient", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], RecordController.prototype, "reassignPatient", null);
exports.RecordController = RecordController;
//# sourceMappingURL=recordController.js.map