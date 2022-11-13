import { Context } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
export declare class RecordController extends ContractExtension {
    constructor();
    addRecord(ctx: Context, param: string): Promise<Object>;
    updateRecord(ctx: Context, param: string): Promise<Object>;
    deleteRecord(ctx: Context, id: string): Promise<Object>;
    freePatient(ctx: Context, doctorId: string): Promise<void>;
    getFreePatient(ctx: Context): Promise<Object>;
    reassignPatient(ctx: Context, doctorId: string, patientId: string): Promise<void>;
}
