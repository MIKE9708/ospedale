"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fabric_network_1 = require("fabric-network");
var FabricCAServices = require("fabric-ca-client");
var path = require("path");
var fs = require("fs");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var ccpPath, ccp, caURL, ca, walletPath, wallet, userIdentity, adminIdentity, provider, adminUser, secret, enrollment, x509Identity, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    ccpPath = path.resolve(__dirname, '..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
                    ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
                    caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
                    ca = new FabricCAServices(caURL);
                    walletPath = path.join(process.cwd(), '../wallet');
                    return [4 /*yield*/, fabric_network_1.Wallets.newFileSystemWallet(walletPath)];
                case 1:
                    wallet = _a.sent();
                    console.log("Wallet path: ".concat(walletPath));
                    return [4 /*yield*/, wallet.get('appUser')];
                case 2:
                    userIdentity = _a.sent();
                    if (userIdentity) {
                        console.log('An identity for the user "appUser" already exists in the wallet');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, wallet.get('admin')];
                case 3:
                    adminIdentity = _a.sent();
                    if (!adminIdentity) {
                        console.log('An identity for the admin user "admin" does not exist in the wallet');
                        console.log('Run the enrollAdmin.ts application before retrying');
                        return [2 /*return*/];
                    }
                    provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
                    return [4 /*yield*/, provider.getUserContext(adminIdentity, 'admin')];
                case 4:
                    adminUser = _a.sent();
                    return [4 /*yield*/, ca.register({ affiliation: 'org1.department1', enrollmentID: 'appUser', role: 'client' }, adminUser)];
                case 5:
                    secret = _a.sent();
                    return [4 /*yield*/, ca.enroll({ enrollmentID: 'appUser', enrollmentSecret: secret })];
                case 6:
                    enrollment = _a.sent();
                    x509Identity = {
                        credentials: {
                            certificate: enrollment.certificate,
                            privateKey: enrollment.key.toBytes()
                        },
                        mspId: 'Org1MSP',
                        type: 'X.509'
                    };
                    return [4 /*yield*/, wallet.put('appUser', x509Identity)];
                case 7:
                    _a.sent();
                    console.log('Successfully registered and enrolled admin user "appUser" and imported it into the wallet');
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error("Failed to register user \"appUser\": ".concat(error_1));
                    process.exit(1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
main();
