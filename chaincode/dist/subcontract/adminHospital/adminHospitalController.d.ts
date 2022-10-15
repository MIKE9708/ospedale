import { Context } from "fabric-contract-api";
import { ContractExtension } from '../../utility/contractExtension';
export declare class AdminHospitalController extends ContractExtension {
    constructor();
    addAdminHospital(ctx: Context, param: string): Promise<Object>;
    deleteAdminHospital(ctx: Context, param: string): Promise<Object>;
}
