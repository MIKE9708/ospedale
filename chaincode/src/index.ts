import { AdminHospitalController } from './subcontract/adminHospital/adminHospitalController';
import { DoctorController } from './subcontract/doctor/doctorController';
import { HospitalController } from './subcontract/hospital/hospitalController';
import { RecordController } from './subcontract/record/recordController';
import { PatientController } from './subcontract/patient/patientController';

export const contracts: any[] = [AdminHospitalController,DoctorController,RecordController,HospitalController,PatientController];
