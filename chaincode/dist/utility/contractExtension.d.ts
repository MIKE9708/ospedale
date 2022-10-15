import { Context, Contract } from 'fabric-contract-api';
export declare abstract class ContractExtension extends Contract {
    constructor(name: string);
    getAll(ctx: Context): Promise<string>;
    get(ctx: Context, assetID: string): Promise<Object>;
    protected getAsset(ctx: Context, type: string, assetID: string): Promise<Object>;
}
