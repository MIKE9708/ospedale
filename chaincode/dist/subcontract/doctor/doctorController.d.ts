import { Context } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
export declare class DoctorController extends ContractExtension {
    constructor();
    InitLedger(ctx: Context): Promise<void>;
    addDoctor(ctx: Context, param: string): Promise<Object>;
    deleteDoctor(ctx: Context, id: string): Promise<Object>;
    getMyPatientsRecord(ctx: Context, id: string): Promise<Object>;
    addPatient(ctx: Context, param: string): Promise<Object>;
}
