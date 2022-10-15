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
exports.ContractExtension = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
class ContractExtension extends fabric_contract_api_1.Contract {
    constructor(name) {
        super(name);
    }
    async getAll(ctx) {
        const allResults = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            }
            catch (err) {
                console.log(err);
                record = strValue;
            }
            if (record.type == this.getName()) {
                allResults.push(record);
            }
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
    async get(ctx, assetID) {
        return await this.getAsset(ctx, this.getName(), assetID);
    }
    async getAsset(ctx, type, assetID) {
        console.log(`${type}-${assetID}`);
        let asset = Buffer.from(await ctx.stub.getState(`${type}-${assetID}`)).toString('utf8');
        let record = JSON.parse(asset.length == 0 ? "{}" : asset);
        if (record.type == type) {
            return record;
        }
        return {};
    }
}
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], ContractExtension.prototype, "getAll", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], ContractExtension.prototype, "get", null);
exports.ContractExtension = ContractExtension;
//# sourceMappingURL=contractExtension.js.map