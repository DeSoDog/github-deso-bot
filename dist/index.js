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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import cors from "cors";
import { Deso } from "deso-protocol";
import express from "express";
var deso = new Deso({ identityConfig: { host: "server" } });
var getSinglePost = function () { return __awaiter(void 0, void 0, void 0, function () {
    var postData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, deso.posts.getSinglePost({
                    PostHashHex: "d30d715dfdc59955ae239635833367dd6c367bb52771bc47f507ccfb4060d53a",
                })];
            case 1:
                postData = _a.sent();
                return [2 /*return*/, postData];
        }
    });
}); };
var app = express();
app.use(express.json());
app.use(cors());
var oy = "";
var PORT = 3000;
app.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send(oy);
        return [2 /*return*/];
    });
}); });
app.post("/deso-workspace", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var commits, repo, message, keyPair, post, signedTransactionHex, e_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                commits = (_a = req.body) === null || _a === void 0 ? void 0 : _a.commits;
                repo = (_b = req.body) === null || _b === void 0 ? void 0 : _b.repository;
                oy = "";
                if (!(commits.length > 0)) return [3 /*break*/, 5];
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                message = __spreadArray([
                    "".concat(commits[0].author.name, " Pushed to ").concat(repo.name.toString(), " \n"),
                    "  Commits: \n"
                ], commits.map(function (commit) {
                    return "    ".concat(commit.author.name, ": ").concat(commit.message, " \u2705");
                }), true).join("\n")
                    .toString();
                oy = message;
                keyPair = deso.utils.generateKeyFromSource({
                    mnemonic: "horn ripple stadium gallery wolf vast doll race blanket modify palm into",
                });
                return [4 /*yield*/, deso.posts.submitPost({
                        UpdaterPublicKeyBase58Check: "BC1YLfiECJp52WjUGtdqo7rUxpWnYfqyxwL1CDRyDv2wddMxA1E4RtK",
                    })];
            case 2:
                post = _c.sent();
                post.constructedTransactionResponse.TransactionHex;
                return [4 /*yield*/, deso.utils.signMessageLocally({
                        keyPair: keyPair,
                        transactionHex: post.constructedTransactionResponse.TransactionHex,
                    })];
            case 3:
                signedTransactionHex = _c.sent();
                deso.identity.submitTransaction(signedTransactionHex);
                return [3 /*break*/, 5];
            case 4:
                e_1 = _c.sent();
                console.log(e_1);
                console.log("failed to post github status check");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
    var keyPair, post, signedTransactionHex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                keyPair = deso.utils.generateKeyFromSource({
                    mnemonic: "horn ripple stadium gallery wolf vast doll race blanket modify palm into",
                });
                console.log(keyPair);
                return [4 /*yield*/, deso.posts.submitPost({
                        UpdaterPublicKeyBase58Check: "BC1YLfiECJp52WjUGtdqo7rUxpWnYfqyxwL1CDRyDv2wddMxA1E4RtK",
                    })];
            case 1:
                post = _a.sent();
                post.constructedTransactionResponse.TransactionHex;
                return [4 /*yield*/, deso.utils.signMessageLocally({
                        keyPair: keyPair,
                        transactionHex: post.constructedTransactionResponse.TransactionHex,
                    })];
            case 2:
                signedTransactionHex = _a.sent();
                deso.identity.submitTransaction(signedTransactionHex);
                console.log("listening on port 3000");
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=index.js.map