"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contracts = void 0;
//import { AdminHospitalController } from './subcontract/adminHospital/adminHospitalController';
const doctorController_1 = require("./subcontract/doctor/doctorController");
//import { HospitalController } from './subcontract/hospital/hospitalController';
const recordController_1 = require("./subcontract/record/recordController");
exports.contracts = [doctorController_1.DoctorController, recordController_1.RecordController];
//# sourceMappingURL=index.js.map