"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contracts = void 0;
//import { AdminHospitalController } from './subcontract/adminHospital/adminHospitalController';
const doctorController_1 = require("./subcontract/doctor/doctorController");
//import { HospitalController } from './subcontract/hospital/hospitalController';
//import { RecordController } from './subcontract/record/recordController';
//import { PatientController } from './subcontract/patient/patientController';
exports.contracts = [doctorController_1.DoctorController];
//# sourceMappingURL=index.js.map