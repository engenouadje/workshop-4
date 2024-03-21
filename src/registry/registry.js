"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchRegistry = void 0;
var body_parser_1 = require("body-parser");
var express_1 = require("express");
var config_1 = require("../config");
var crypto_1 = require("../crypto");
function launchRegistry() {
    return __awaiter(this, void 0, void 0, function () {
        var _registry, registeredNodes, _privateKey, _a, privateKey, publicKey, _b, _c, error_1, server;
        var _d;
        var _this = this;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _registry = (0, express_1.default)();
                    _registry.use(express_1.default.json());
                    _registry.use(body_parser_1.default.json());
                    registeredNodes = [];
                    _privateKey = null;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, (0, crypto_1.generateRsaKeyPair)()];
                case 2:
                    _a = _e.sent(), privateKey = _a.privateKey, publicKey = _a.publicKey;
                    return [4 /*yield*/, (0, crypto_1.exportPrvKey)(privateKey)];
                case 3:
                    _privateKey = _e.sent();
                    _c = (_b = registeredNodes).push;
                    _d = { nodeId: "registry" };
                    return [4 /*yield*/, (0, crypto_1.exportPubKey)(publicKey)];
                case 4:
                    _c.apply(_b, [(_d.pubKey = _e.sent(), _d)]);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _e.sent();
                    console.error("Error generating RSA key pair:", error_1);
                    process.exit(1); // Exit with an error code if key generation fails
                    return [3 /*break*/, 6];
                case 6:
                    _registry.get("/status", function (req, res) {
                        res.send("live");
                    });
                    _registry.post("/registerNode", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, nodeId, pubKey, existingNode, publicKey, error_2;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = req.body, nodeId = _a.nodeId, pubKey = _a.pubKey;
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    // Validate the request body
                                    if (!nodeId || !pubKey) {
                                        throw new Error("Missing required fields: nodeId and pubKey");
                                    }
                                    existingNode = registeredNodes.find(function (node) { return node.nodeId === nodeId; });
                                    if (existingNode) {
                                        throw new Error("Node with ID already exists");
                                    }
                                    return [4 /*yield*/, (0, crypto_1.importPubKey)(pubKey)];
                                case 2:
                                    publicKey = _b.sent();
                                    // Add the node to the registry
                                    registeredNodes.push({ nodeId: nodeId, pubKey: pubKey });
                                    res.send("Node registered successfully");
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_2 = _b.sent();
                                    if (error_2 instanceof Error) {
                                        console.error(error_2.message);
                                        res.status(400).send(error_2.message);
                                    }
                                    else {
                                        console.error("Unexpected error type:", error_2);
                                        res.status(500).send("Internal server error");
                                    }
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    // Allow retrieval of all registered nodes
                    _registry.get("/getNodeRegistry", function (req, res) {
                        var responsePayload = { nodes: registeredNodes };
                        res.json(responsePayload);
                    });
                    // Securely store and expose the private key only for authorized testing purposes
                    _registry.get("/getPrivateKey", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (!_privateKey) {
                                return [2 /*return*/, res.status(404).send("Private key not available")];
                            }
                            return [2 /*return*/, res.json({ result: _privateKey })];
                        });
                    }); });
                    server = _registry.listen(config_1.REGISTRY_PORT, function () {
                        console.log("registry is listening on port ".concat(config_1.REGISTRY_PORT));
                    });
                    return [2 /*return*/, server];
            }
        });
    });
}
exports.launchRegistry = launchRegistry;
