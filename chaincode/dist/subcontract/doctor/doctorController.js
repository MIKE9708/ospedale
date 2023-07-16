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
    async InitLedger(ctx) {
        const doctor = [
            {
                type: "doctor",
                id: "2",
                patients: ["4"],
                nome: "Luca",
                cognome: "Sarchese"
            },
            {
                type: "doctor",
                id: "5",
                patients: [],
                nome: "Mario",
                cognome: "Rossi"
            }
        ];
        const patient = [
            {
                type: "record",
                id: "3",
                doctorId: "2",
                personalData: {
                    cf: "GNINRC89S12F158P",
                    name: "Enrico",
                    surname: "Gini",
                    birth: "12/11/1989",
                    weight: 72.6,
                    height: 1.80,
                    number: "3267178194",
                    nation: "Italia",
                    nascita: "Messina"
                },
                info: {
                    pastMedicalProblems: "",
                    allergies: "Celiachia,Polvere",
                    medicinesTaken: ""
                }
            },
            {
                type: "record",
                id: "4",
                doctorId: '',
                personalData: {
                    cf: "MRLMRA72S12C351G",
                    name: "Mario",
                    surname: "Merola",
                    birth: "12/11/1972",
                    weight: 60.00,
                    height: 1.60,
                    number: "3267173424",
                    nation: "Italia",
                    nascita: "Catania"
                },
                info: {
                    pastMedicalProblems: "Diabete tipo 1",
                    allergies: "Pesche",
                    medicinesTaken: "Insulina Lispro"
                }
            }
        ];
        for (const asset of doctor) {
            await ctx.stub.putState('doctor' + '-' + asset.id, Buffer.from(JSON.stringify(asset)));
        }
        for (const asset of patient) {
            await ctx.stub.putState('record' + '-' + asset.id, Buffer.from(JSON.stringify(asset)));
        }
    }
    async addDoctor(ctx, param) {
        const params = JSON.parse(param);
        const exist = await this.get(ctx, params.id);
        if (!exist) {
            throw new Error("The doctor  with id:" + params.id + " already exists");
        }
        const doctor = {
            type: "doctor",
            id: params.id,
            patients: [],
            nome: params.nome,
            cognome: params.cognome
        };
        return Promise.all([
            await ctx.stub.putState('doctor' + '-' + doctor.id, Buffer.from(JSON.stringify(doctor)))
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async deleteDoctor(ctx, id) {
        const recordClass = new recordController_1.RecordController();
        //const params = JSON.parse(param);
        const exists = await this.get(ctx, id);
        if (exists == undefined) {
            throw new Error(`The doctor ${id} does not exist`);
        }
        await recordClass.freeAllPatient(ctx, id);
        return Promise.all([
            await ctx.stub.deleteState("doctor-" + id)
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
    async getMyPatientsRecord(ctx, id) {
        const exists = await this.get(ctx, id);
        const patients_record = new recordController_1.RecordController();
        let res = JSON.parse(await patients_record.getAll(ctx));
        if (!exists) {
            throw new Error(`The doctor ${id} does not exist`);
        }
        if (res.length > 0) {
            res = res.filter((elem) => elem.doctorId === id);
            return { status: asset_1.Status.Success, message: res };
        }
        else
            return { status: asset_1.Status.Success, message: [] };
    }
    async addPatient(ctx, param) {
        const params = JSON.parse(param);
        const recordClass = new recordController_1.RecordController();
        await recordClass.reassignPatient(ctx, params.doctorId, params.patientId);
        const exists = await this.get(ctx, params.doctorId);
        if (exists) {
            throw new Error("The doctor does not exitsts " + param);
        }
        let updatedValue = exists;
        updatedValue.patients = [...exists.patients, params.patientId];
        return Promise.all([await ctx.stub.putState('doctor-' + params.doctorId, Buffer.from(JSON.stringify(updatedValue)))
        ]).then(() => { return { status: asset_1.Status.Success, message: "Operazione effettuata" }; });
    }
}
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "InitLedger", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "addDoctor", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "deleteDoctor", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getMyPatientsRecord", null);
__decorate([
    fabric_contract_api_1.Transaction(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "addPatient", null);
exports.DoctorController = DoctorController;
//# sourceMappingURL=doctorController.js.map