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
import { ec as EC } from "elliptic";
import * as sha256 from "sha256";
import * as bip39 from "bip39";
import * as HDKey from "hdkey";
export var signTransaction = function (transactionHex) { return __awaiter(void 0, void 0, void 0, function () {
    var privateKey, transactionBytes, transactionHash, signature, signatureBytes, signatureLength, signedTransactionBytes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getKey()];
            case 1:
                privateKey = _a.sent();
                transactionBytes = Buffer.from(transactionHex, "hex");
                transactionHash = Buffer.from(sha256.x2(transactionBytes), "hex");
                signature = privateKey.sign(transactionHash, { canonical: true });
                signatureBytes = Buffer.from(signature.toDER());
                signatureLength = uvarint64ToBuf(signatureBytes.length);
                signedTransactionBytes = Buffer.concat([
                    transactionBytes.slice(0, -1),
                    signatureLength,
                    signatureBytes,
                ]);
                return [2 /*return*/, signedTransactionBytes.toString("hex")];
        }
    });
}); };
export var getKey = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ec, seed, hdKey, seedHex;
    return __generator(this, function (_a) {
        ec = new EC("secp256k1");
        seed = bip39.mnemonicToSeedSync("weather noble barely volume bind lemon raven cruel diamond hover siren canvas");
        console.log("seed", seed);
        hdKey = HDKey.fromMasterSeed(seed).derive("m/44'/0'/0'/0/0", false);
        seedHex = hdKey.privateKey.toString("hex");
        return [2 /*return*/, ec.keyFromPrivate(seedHex)];
    });
}); };
export var uvarint64ToBuf = function (uint) {
    var result = [];
    while (uint >= 0x80) {
        result.push(Number((BigInt(uint) & BigInt(0xff)) | BigInt(0x80)));
        uint = Number(BigInt(uint) >> BigInt(7));
    }
    result.push(uint | 0);
    return Buffer.from(result);
};
//# sourceMappingURL=utils.js.map