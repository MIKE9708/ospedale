import { Context } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
export declare class RecordController extends ContractExtension {
    constructor();
    addRecord(ctx: Context, param: string): Promise<Object>;
    updateRecord(ctx: Context, param: string): Promise<Object>;
    deleteRecord(ctx: Context, id: string): Promise<Object>;
    freeAllPatient(ctx: Context, doctorId: string): Promise<void>;
    freeSinglePatient(ctx: Context, doctorId: string, patientId: string): Promise<Object>;
    getFreePatient(ctx: Context): Promise<Object>;
    reassignPatient(ctx: Context, doctorId: string, patientId: string): Promise<void>;
}
