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
var config_1 = require("../../src/config");
var index_1 = require("../../src/index");
var crypto_1 = require("../../src/crypto");
var validateEncryption = require("./utils").validateEncryption;
var delay = function (ms) { return new Promise(function (res) { return setTimeout(res, ms); }); };
function closeAllServers(servers) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(servers.map(function (server) {
                        return server.close(function () {
                            server.closeAllConnections();
                        });
                    }))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, delay(100)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function sendMessage(userPort, message, destinationUserId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:".concat(userPort, "/sendMessage"), {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            message: message,
                            destinationUserId: destinationUserId,
                        }),
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getLastMessageDestination(nodePort) {
    return __awaiter(this, void 0, void 0, function () {
        var lastMessageDestination;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:".concat(nodePort, "/getLastMessageDestination"))
                        .then(function (res) { return res.json(); })
                        .then(function (json) { return json === null || json === void 0 ? void 0 : json.result; })];
                case 1:
                    lastMessageDestination = _a.sent();
                    return [2 /*return*/, lastMessageDestination];
            }
        });
    });
}
function getLastReceivedEncryptedMessage(nodePort) {
    return __awaiter(this, void 0, void 0, function () {
        var lastReceivedEncryptedMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:".concat(nodePort, "/getLastReceivedEncryptedMessage"))
                        .then(function (res) { return res.json(); })
                        .then(function (json) { return json === null || json === void 0 ? void 0 : json.result; })];
                case 1:
                    lastReceivedEncryptedMessage = _a.sent();
                    return [2 /*return*/, lastReceivedEncryptedMessage];
            }
        });
    });
}
function getLastReceivedDecryptedMessage(nodePort) {
    return __awaiter(this, void 0, void 0, function () {
        var lastReceivedDecryptedMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:".concat(nodePort, "/getLastReceivedDecryptedMessage"))
                        .then(function (res) { return res.json(); })
                        .then(function (json) { return json === null || json === void 0 ? void 0 : json.result; })];
                case 1:
                    lastReceivedDecryptedMessage = _a.sent();
                    return [2 /*return*/, lastReceivedDecryptedMessage];
            }
        });
    });
}
function getPrivateKey(nodePort) {
    return __awaiter(this, void 0, void 0, function () {
        var strPrvKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:".concat(nodePort, "/getPrivateKey"))
                        .then(function (res) { return res.json(); })
                        .then(function (json) { return json.result; })];
                case 1:
                    strPrvKey = _a.sent();
                    return [2 /*return*/, strPrvKey];
            }
        });
    });
}
function getLastSentMessage(userPort) {
    return __awaiter(this, void 0, void 0, function () {
        var lastSentMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:".concat(userPort, "/getLastSentMessage"))
                        .then(function (res) { return res.json(); })
                        .then(function (json) { return json === null || json === void 0 ? void 0 : json.result; })];
                case 1:
                    lastSentMessage = _a.sent();
                    return [2 /*return*/, lastSentMessage];
            }
        });
    });
}
function getLastReceivedMessage(userPort) {
    return __awaiter(this, void 0, void 0, function () {
        var lastReceivedMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:".concat(userPort, "/getLastReceivedMessage"))
                        .then(function (res) { return res.json(); })
                        .then(function (json) { return json === null || json === void 0 ? void 0 : json.result; })];
                case 1:
                    lastReceivedMessage = _a.sent();
                    return [2 /*return*/, lastReceivedMessage];
            }
        });
    });
}
function getLastCircuit(userPort) {
    return __awaiter(this, void 0, void 0, function () {
        var circuit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:".concat(userPort, "/getLastCircuit"))
                        .then(function (res) { return res.json(); })
                        .then(function (json) { return json.result; })];
                case 1:
                    circuit = _a.sent();
                    return [2 /*return*/, circuit];
            }
        });
    });
}
function getNodeRegistry() {
    return __awaiter(this, void 0, void 0, function () {
        var nodes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("http://localhost:".concat(config_1.REGISTRY_PORT, "/getNodeRegistry"))
                        .then(function (res) { return res.json(); })
                        .then(function (json) { return json.nodes; })];
                case 1:
                    nodes = _a.sent();
                    return [2 /*return*/, nodes];
            }
        });
    });
}
describe("Onion Routing", function () {
    describe("Project is setup correctly - 4 pt", function () {
        describe("Can start a specific number of nodes and users - 1 pt", function () {
            var servers = [];
            afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, closeAllServers(servers)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Can start 1 node and 1 user", function () { return __awaiter(void 0, void 0, void 0, function () {
                var isNodeLive, isUserLive;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, index_1.launchNetwork)(1, 1)];
                        case 1:
                            servers = _a.sent();
                            return [4 /*yield*/, fetch("http://localhost:".concat(config_1.BASE_ONION_ROUTER_PORT + 0, "/status"))
                                    .then(function (res) { return res.text(); })
                                    .then(function (text) { return text === "live"; })];
                        case 2:
                            isNodeLive = _a.sent();
                            expect(isNodeLive).toBeTruthy();
                            return [4 /*yield*/, fetch("http://localhost:".concat(config_1.BASE_USER_PORT + 0, "/status"))
                                    .then(function (res) { return res.text(); })
                                    .then(function (text) { return text === "live"; })];
                        case 3:
                            isUserLive = _a.sent();
                            expect(isUserLive).toBeTruthy();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Can start 10 node and 2 user", function () { return __awaiter(void 0, void 0, void 0, function () {
                var index, isNodeLive, index, isUserLive;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, index_1.launchNetwork)(10, 2)];
                        case 1:
                            servers = _a.sent();
                            index = 0;
                            _a.label = 2;
                        case 2:
                            if (!(index < 10)) return [3 /*break*/, 5];
                            return [4 /*yield*/, fetch("http://localhost:".concat(config_1.BASE_ONION_ROUTER_PORT + index, "/status"))
                                    .then(function (res) { return res.text(); })
                                    .then(function (text) { return text === "live"; })];
                        case 3:
                            isNodeLive = _a.sent();
                            expect(isNodeLive).toBeTruthy();
                            _a.label = 4;
                        case 4:
                            index++;
                            return [3 /*break*/, 2];
                        case 5:
                            index = 0;
                            _a.label = 6;
                        case 6:
                            if (!(index < 2)) return [3 /*break*/, 9];
                            return [4 /*yield*/, fetch("http://localhost:".concat(config_1.BASE_USER_PORT + index, "/status"))
                                    .then(function (res) { return res.text(); })
                                    .then(function (text) { return text === "live"; })];
                        case 7:
                            isUserLive = _a.sent();
                            expect(isUserLive).toBeTruthy();
                            _a.label = 8;
                        case 8:
                            index++;
                            return [3 /*break*/, 6];
                        case 9: return [2 /*return*/];
                    }
                });
            }); });
            it("Can start 2 node and 10 user", function () { return __awaiter(void 0, void 0, void 0, function () {
                var index, isNodeLive, index, isUserLive;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, index_1.launchNetwork)(2, 10)];
                        case 1:
                            servers = _a.sent();
                            index = 0;
                            _a.label = 2;
                        case 2:
                            if (!(index < 2)) return [3 /*break*/, 5];
                            return [4 /*yield*/, fetch("http://localhost:".concat(config_1.BASE_ONION_ROUTER_PORT + index, "/status"))
                                    .then(function (res) { return res.text(); })
                                    .then(function (text) { return text === "live"; })];
                        case 3:
                            isNodeLive = _a.sent();
                            expect(isNodeLive).toBeTruthy();
                            _a.label = 4;
                        case 4:
                            index++;
                            return [3 /*break*/, 2];
                        case 5:
                            index = 0;
                            _a.label = 6;
                        case 6:
                            if (!(index < 10)) return [3 /*break*/, 9];
                            return [4 /*yield*/, fetch("http://localhost:".concat(config_1.BASE_USER_PORT + index, "/status"))
                                    .then(function (res) { return res.text(); })
                                    .then(function (text) { return text === "live"; })];
                        case 7:
                            isUserLive = _a.sent();
                            expect(isUserLive).toBeTruthy();
                            _a.label = 8;
                        case 8:
                            index++;
                            return [3 /*break*/, 6];
                        case 9: return [2 /*return*/];
                    }
                });
            }); });
            it("The registry exists", function () { return __awaiter(void 0, void 0, void 0, function () {
                var isRegistryLive;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, index_1.launchNetwork)(2, 10)];
                        case 1:
                            servers = _a.sent();
                            return [4 /*yield*/, fetch("http://localhost:".concat(config_1.REGISTRY_PORT, "/status"))
                                    .then(function (res) { return res.text(); })
                                    .then(function (text) { return text === "live"; })];
                        case 2:
                            isRegistryLive = _a.sent();
                            expect(isRegistryLive).toBeTruthy();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("Define simple GET routes - 1 pt", function () {
            var servers = [];
            beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _servers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, index_1.launchNetwork)(10, 2)];
                        case 1:
                            _servers = _a.sent();
                            servers.push.apply(servers, _servers);
                            return [2 /*return*/];
                    }
                });
            }); });
            afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, closeAllServers(servers)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("calling /getLastReceivedEncryptedMessage on a node before it received anything returns { result: null }", function () { return __awaiter(void 0, void 0, void 0, function () {
                var lastReceivedEncryptedMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getLastReceivedEncryptedMessage(config_1.BASE_ONION_ROUTER_PORT + 0)];
                        case 1:
                            lastReceivedEncryptedMessage = _a.sent();
                            expect(lastReceivedEncryptedMessage).toBeNull();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("calling /getLastReceivedDecryptedMessage on a node before it received anything returns { result: null }", function () { return __awaiter(void 0, void 0, void 0, function () {
                var lastReceivedDecryptedMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getLastReceivedDecryptedMessage(config_1.BASE_ONION_ROUTER_PORT + 9)];
                        case 1:
                            lastReceivedDecryptedMessage = _a.sent();
                            expect(lastReceivedDecryptedMessage).toBeNull();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("calling /getLastMessageDestination on a node before it received anything returns { result: null }", function () { return __awaiter(void 0, void 0, void 0, function () {
                var lastMessageDestination;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getLastMessageDestination(config_1.BASE_ONION_ROUTER_PORT + 3)];
                        case 1:
                            lastMessageDestination = _a.sent();
                            expect(lastMessageDestination).toBeNull();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("calling /getLastMessageDestination on a node before it received anything returns { result: null }", function () { return __awaiter(void 0, void 0, void 0, function () {
                var lastMessageDestination;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getLastMessageDestination(config_1.BASE_ONION_ROUTER_PORT + 1)];
                        case 1:
                            lastMessageDestination = _a.sent();
                            expect(lastMessageDestination).toBeNull();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("calling /getLastReceivedMessage on a user before it received anything returns { result: null }", function () { return __awaiter(void 0, void 0, void 0, function () {
                var lastReceivedMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getLastReceivedMessage(config_1.BASE_USER_PORT + 1)];
                        case 1:
                            lastReceivedMessage = _a.sent();
                            expect(lastReceivedMessage).toBeNull();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("calling /getLastSentMessage on a user before it received anything returns { result: null }", function () { return __awaiter(void 0, void 0, void 0, function () {
                var lastSentMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getLastSentMessage(config_1.BASE_USER_PORT + 0)];
                        case 1:
                            lastSentMessage = _a.sent();
                            expect(lastSentMessage).toBeNull();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("Nodes are registered on the registry - 1 pt", function () {
            var servers = [];
            beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _servers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, index_1.launchNetwork)(10, 2)];
                        case 1:
                            _servers = _a.sent();
                            servers.push.apply(servers, _servers);
                            return [2 /*return*/];
                    }
                });
            }); });
            afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, closeAllServers(servers)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Each node is registered", function () { return __awaiter(void 0, void 0, void 0, function () {
                var nodes, _loop_1, index;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getNodeRegistry()];
                        case 1:
                            nodes = _a.sent();
                            _loop_1 = function (index) {
                                var node = nodes.find(function (_n) { return _n.nodeId === index; });
                                expect(node).not.toBeUndefined();
                            };
                            for (index = 0; index < 10; index++) {
                                _loop_1(index);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Each node has a public key in the right format", function () { return __awaiter(void 0, void 0, void 0, function () {
                var nodes, _loop_2, index;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getNodeRegistry()];
                        case 1:
                            nodes = _a.sent();
                            expect(nodes.length).toBe(10);
                            _loop_2 = function (index) {
                                var node = nodes.find(function (_n) { return _n.nodeId === index; });
                                expect(node !== undefined && /^[A-Za-z0-9+/]{392}$/.test(node.pubKey)).toBeTruthy();
                            };
                            for (index = 0; index < 10; index++) {
                                _loop_2(index);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            it("All public keys are different", function () { return __awaiter(void 0, void 0, void 0, function () {
                var nodes, pubKeys, index;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getNodeRegistry()];
                        case 1:
                            nodes = _a.sent();
                            pubKeys = new Set();
                            for (index = 0; index < nodes.length; index++) {
                                pubKeys.add(nodes[index].pubKey);
                            }
                            expect(pubKeys.size).toBe(10);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Can get the private key of any node through the /getPrivateKey route", function () { return __awaiter(void 0, void 0, void 0, function () {
                var nodes, index, node, strPrvKey, prvKey, b64Message, encrypted, decrypted;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getNodeRegistry()];
                        case 1:
                            nodes = _a.sent();
                            index = 0;
                            _a.label = 2;
                        case 2:
                            if (!(index < nodes.length)) return [3 /*break*/, 8];
                            node = nodes[index];
                            return [4 /*yield*/, getPrivateKey(config_1.BASE_ONION_ROUTER_PORT + node.nodeId)];
                        case 3:
                            strPrvKey = _a.sent();
                            expect(/^[-A-Za-z0-9+/]*={0,3}$/.test(strPrvKey)).toBeTruthy();
                            return [4 /*yield*/, (0, crypto_1.importPrvKey)(strPrvKey)];
                        case 4:
                            prvKey = _a.sent();
                            b64Message = btoa("hello world");
                            return [4 /*yield*/, (0, crypto_1.rsaEncrypt)(b64Message, node.pubKey)];
                        case 5:
                            encrypted = _a.sent();
                            return [4 /*yield*/, (0, crypto_1.rsaDecrypt)(encrypted, prvKey)];
                        case 6:
                            decrypted = _a.sent();
                            // verify that the retrieved private key corresponds to the public key in the registry
                            expect(decrypted).toBe(b64Message);
                            _a.label = 7;
                        case 7:
                            index++;
                            return [3 /*break*/, 2];
                        case 8: return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("Sending messages to users - 1 pt", function () {
            var servers = [];
            beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _servers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, index_1.launchNetwork)(10, 2)];
                        case 1:
                            _servers = _a.sent();
                            servers.push.apply(servers, _servers);
                            return [2 /*return*/];
                    }
                });
            }); });
            afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, closeAllServers(servers)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("Each user can receive a message", function () { return __awaiter(void 0, void 0, void 0, function () {
                var index, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            index = 0;
                            _a.label = 1;
                        case 1:
                            if (!(index < 2)) return [3 /*break*/, 4];
                            return [4 /*yield*/, fetch("http://localhost:".concat(config_1.BASE_USER_PORT + index, "/message"), {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        message: "Hello user",
                                    }),
                                }).then(function (res) { return res.text(); })];
                        case 2:
                            response = _a.sent();
                            expect(response).toBe("success");
                            _a.label = 3;
                        case 3:
                            index++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            it("After receiving a message, a user's /getLastReceivedMessage route returns the right message", function () { return __awaiter(void 0, void 0, void 0, function () {
                var randomNumber, randomMessage, receivedMessage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            randomNumber = crypto
                                .getRandomValues(new Uint32Array(1))[0]
                                .toString();
                            randomMessage = "Hello user, my favourite number is ".concat(randomNumber);
                            return [4 /*yield*/, fetch("http://localhost:".concat(config_1.BASE_USER_PORT + 0, "/message"), {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        message: randomMessage,
                                    }),
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, getLastReceivedMessage(config_1.BASE_USER_PORT + 0)];
                        case 2:
                            receivedMessage = _a.sent();
                            expect(receivedMessage).toBe(randomMessage);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("Creating all cryptographic functions - 4pt", function () {
        it("Can generate RSA key pair - 0.5pt", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, publicKey, privateKey;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, crypto_1.generateRsaKeyPair)()];
                    case 1:
                        _a = _b.sent(), publicKey = _a.publicKey, privateKey = _a.privateKey;
                        expect(publicKey).toBeTruthy();
                        expect(publicKey.algorithm.name).toBe("RSA-OAEP");
                        expect(privateKey.algorithm.name).toBe("RSA-OAEP");
                        expect(publicKey.extractable).toBe(true);
                        expect(privateKey.extractable).toBe(true);
                        expect(publicKey.type).toBe("public");
                        expect(privateKey.type).toBe("private");
                        return [2 /*return*/];
                }
            });
        }); });
        it("Can export and import a public key - 0.25pt", function () { return __awaiter(void 0, void 0, void 0, function () {
            var publicKey, strPubKey, _publicKey, _strPubKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, crypto_1.generateRsaKeyPair)()];
                    case 1:
                        publicKey = (_a.sent()).publicKey;
                        return [4 /*yield*/, (0, crypto_1.exportPubKey)(publicKey)];
                    case 2:
                        strPubKey = _a.sent();
                        return [4 /*yield*/, (0, crypto_1.importPubKey)(strPubKey)];
                    case 3:
                        _publicKey = _a.sent();
                        return [4 /*yield*/, (0, crypto_1.exportPubKey)(_publicKey)];
                    case 4:
                        _strPubKey = _a.sent();
                        expect(strPubKey).toBe(_strPubKey);
                        expect(strPubKey).not.toBe("");
                        return [2 /*return*/];
                }
            });
        }); });
        it("Can export and import a private key - 0.25pt", function () { return __awaiter(void 0, void 0, void 0, function () {
            var privateKey, strPrvKey, _privateKey, _strPrvKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, crypto_1.generateRsaKeyPair)()];
                    case 1:
                        privateKey = (_a.sent()).privateKey;
                        return [4 /*yield*/, (0, crypto_1.exportPrvKey)(privateKey)];
                    case 2:
                        strPrvKey = _a.sent();
                        if (strPrvKey === null)
                            throw new Error("strPrvKey is null");
                        return [4 /*yield*/, (0, crypto_1.importPrvKey)(strPrvKey)];
                    case 3:
                        _privateKey = _a.sent();
                        return [4 /*yield*/, (0, crypto_1.exportPrvKey)(_privateKey)];
                    case 4:
                        _strPrvKey = _a.sent();
                        expect(strPrvKey).toBe(_strPrvKey);
                        expect(strPrvKey).not.toBe("");
                        return [2 /*return*/];
                }
            });
        }); });
        it("Can rsa encrypt and decrypt - 0pt", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, publicKey, privateKey, b64Message, encrypted, _b, _c, decrypted;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, (0, crypto_1.generateRsaKeyPair)()];
                    case 1:
                        _a = _d.sent(), publicKey = _a.publicKey, privateKey = _a.privateKey;
                        b64Message = btoa("Hello World!!");
                        _b = crypto_1.rsaEncrypt;
                        _c = [b64Message];
                        return [4 /*yield*/, (0, crypto_1.exportPubKey)(publicKey)];
                    case 2: return [4 /*yield*/, _b.apply(void 0, _c.concat([_d.sent()]))];
                    case 3:
                        encrypted = _d.sent();
                        return [4 /*yield*/, (0, crypto_1.rsaDecrypt)(encrypted, privateKey)];
                    case 4:
                        decrypted = _d.sent();
                        // verify that the retrieved private key corresponds to the public key in the registry
                        expect(decrypted).toBe(b64Message);
                        return [2 /*return*/];
                }
            });
        }); });
        test.todo("Hidden test - Can rsa encrypt and decrypt - 1pt");
        it("Can generate symmetric key - 0.5 pt", function () { return __awaiter(void 0, void 0, void 0, function () {
            var symKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, crypto_1.createRandomSymmetricKey)()];
                    case 1:
                        symKey = _a.sent();
                        expect(symKey).toBeTruthy();
                        expect(symKey.algorithm.name).toBe("AES-CBC");
                        expect(symKey.extractable).toBe(true);
                        expect(symKey.type).toBe("secret");
                        return [2 /*return*/];
                }
            });
        }); });
        it("Can export and import a symmetric key - 0.5pt", function () { return __awaiter(void 0, void 0, void 0, function () {
            var symKey, strSymKey, _symKey, _strSymKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, crypto_1.createRandomSymmetricKey)()];
                    case 1:
                        symKey = _a.sent();
                        return [4 /*yield*/, (0, crypto_1.exportSymKey)(symKey)];
                    case 2:
                        strSymKey = _a.sent();
                        return [4 /*yield*/, (0, crypto_1.importSymKey)(strSymKey)];
                    case 3:
                        _symKey = _a.sent();
                        return [4 /*yield*/, (0, crypto_1.exportSymKey)(_symKey)];
                    case 4:
                        _strSymKey = _a.sent();
                        expect(strSymKey).toBe(_strSymKey);
                        expect(strSymKey).not.toBe("");
                        return [2 /*return*/];
                }
            });
        }); });
        it("Can symmetrically encrypt and decrypt - 0pt", function () { return __awaiter(void 0, void 0, void 0, function () {
            var symKey, b64Message, encrypted, decrypted, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, crypto_1.createRandomSymmetricKey)()];
                    case 1:
                        symKey = _b.sent();
                        b64Message = btoa("HelloWorld");
                        return [4 /*yield*/, (0, crypto_1.symEncrypt)(symKey, b64Message)];
                    case 2:
                        encrypted = _b.sent();
                        _a = crypto_1.symDecrypt;
                        return [4 /*yield*/, (0, crypto_1.exportSymKey)(symKey)];
                    case 3: return [4 /*yield*/, _a.apply(void 0, [_b.sent(), encrypted])];
                    case 4:
                        decrypted = _b.sent();
                        // verify that the retrieved private key corresponds to the public key in the registry
                        expect(decrypted).toBe(b64Message);
                        return [2 /*return*/];
                }
            });
        }); });
        test.todo("Hidden test - Can symmetrically encrypt and decrypt - 1pt");
    });
    describe("Can forward messages through the network - 10 pt", function () {
        var servers = [];
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _servers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, index_1.launchNetwork)(10, 2)];
                    case 1:
                        _servers = _a.sent();
                        servers.push.apply(servers, _servers);
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, closeAllServers(servers)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("User 0 can say Hello World! to user 1 - 4 pt", function () { return __awaiter(void 0, void 0, void 0, function () {
            var receivedMessage, lastSentMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sendMessage(config_1.BASE_USER_PORT + 0, "Hello World!", 1)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, getLastReceivedMessage(config_1.BASE_USER_PORT + 1)];
                    case 2:
                        receivedMessage = _a.sent();
                        expect(receivedMessage).toBe("Hello World!");
                        return [4 /*yield*/, getLastSentMessage(config_1.BASE_USER_PORT + 0)];
                    case 3:
                        lastSentMessage = _a.sent();
                        expect(lastSentMessage).toBe("Hello World!");
                        return [2 /*return*/];
                }
            });
        }); });
        it("The circuit from 0 to 1 is respected - 1 pt", function () { return __awaiter(void 0, void 0, void 0, function () {
            var callNumbers, index, circuit, index_2, sum, frequencies, index, freq;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        callNumbers = new Array(10).fill(0);
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < 150)) return [3 /*break*/, 5];
                        return [4 /*yield*/, sendMessage(config_1.BASE_USER_PORT + 0, "Hello World", 1)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, getLastCircuit(config_1.BASE_USER_PORT + 0)];
                    case 3:
                        circuit = _a.sent();
                        expect(circuit).not.toBeUndefined();
                        // circuit has 3 nodes
                        expect(circuit.length).toBe(3);
                        // nodes are unique
                        expect(new Set(circuit).size).toBe(3);
                        for (index_2 = 0; index_2 < circuit.length; index_2++) {
                            callNumbers[circuit[index_2]] += 1;
                            expect(typeof circuit[index_2]).toBe("number");
                        }
                        // all nodes exist
                        expect(Math.max.apply(Math, circuit)).toBeLessThanOrEqual(9);
                        expect(Math.min.apply(Math, circuit)).toBeGreaterThanOrEqual(0);
                        _a.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 1];
                    case 5:
                        sum = callNumbers.reduce(function (acc, val) { return acc + val; }, 0);
                        frequencies = callNumbers.map(function (val) { return val / sum; });
                        // each node has more or less 10% occurence
                        for (index = 0; index < frequencies.length; index++) {
                            freq = frequencies[index];
                            expect(freq).toBeGreaterThanOrEqual(0.05);
                            expect(freq).toBeLessThanOrEqual(0.15);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        it("Each node in the circuit forwarded the message to the right node - 2pt", function () { return __awaiter(void 0, void 0, void 0, function () {
            var circuit, lastDecrypted, index, nextDestination, actualNextDestination, lastReceivedEncryptedMessage, lastReceivedDecryptedMessage, lastDestination, actualLastDestination, lastReceivedEncryptedMessage, lastReceivedDecryptedMessage, receivedMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sendMessage(config_1.BASE_USER_PORT + 0, "Hello world", 1)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, getLastCircuit(config_1.BASE_USER_PORT + 0)];
                    case 2:
                        circuit = _a.sent();
                        index = 0;
                        _a.label = 3;
                    case 3:
                        if (!(index < circuit.length - 1)) return [3 /*break*/, 8];
                        return [4 /*yield*/, getLastMessageDestination(config_1.BASE_ONION_ROUTER_PORT + circuit[index])];
                    case 4:
                        nextDestination = _a.sent();
                        actualNextDestination = config_1.BASE_ONION_ROUTER_PORT + circuit[index + 1];
                        expect(nextDestination).toBe(actualNextDestination);
                        return [4 /*yield*/, getLastReceivedEncryptedMessage(config_1.BASE_ONION_ROUTER_PORT + circuit[index])];
                    case 5:
                        lastReceivedEncryptedMessage = _a.sent();
                        if (lastDecrypted) {
                            expect(lastReceivedEncryptedMessage).toBe(lastDecrypted);
                        }
                        expect(lastReceivedEncryptedMessage !== null &&
                            /^[A-Za-z0-9+/=]*$/.test(lastReceivedEncryptedMessage)).toBeTruthy();
                        return [4 /*yield*/, getLastReceivedDecryptedMessage(config_1.BASE_ONION_ROUTER_PORT + circuit[index])];
                    case 6:
                        lastReceivedDecryptedMessage = _a.sent();
                        lastDecrypted = lastReceivedDecryptedMessage;
                        expect(lastReceivedDecryptedMessage !== null &&
                            /^[A-Za-z0-9+/=]*$/.test(lastReceivedDecryptedMessage)).toBeTruthy();
                        _a.label = 7;
                    case 7:
                        index++;
                        return [3 /*break*/, 3];
                    case 8: return [4 /*yield*/, getLastMessageDestination(config_1.BASE_ONION_ROUTER_PORT + circuit[circuit.length - 1])];
                    case 9:
                        lastDestination = _a.sent();
                        actualLastDestination = config_1.BASE_USER_PORT + 1;
                        expect(lastDestination).toBe(actualLastDestination);
                        return [4 /*yield*/, getLastReceivedEncryptedMessage(config_1.BASE_ONION_ROUTER_PORT + circuit[circuit.length - 1])];
                    case 10:
                        lastReceivedEncryptedMessage = _a.sent();
                        expect(lastReceivedEncryptedMessage !== null &&
                            /^[A-Za-z0-9+/=]*$/.test(lastReceivedEncryptedMessage)).toBeTruthy();
                        return [4 /*yield*/, getLastReceivedDecryptedMessage(config_1.BASE_ONION_ROUTER_PORT + circuit[circuit.length - 1])];
                    case 11:
                        lastReceivedDecryptedMessage = _a.sent();
                        expect(lastReceivedDecryptedMessage).toBe("Hello world");
                        return [4 /*yield*/, getLastReceivedMessage(config_1.BASE_USER_PORT + 1)];
                    case 12:
                        receivedMessage = _a.sent();
                        expect(receivedMessage).toBe("Hello world");
                        return [2 /*return*/];
                }
            });
        }); });
        it("The right message is passed to each node - 1pt", function () { return __awaiter(void 0, void 0, void 0, function () {
            var circuit, index, lastReceivedEncryptedMessage, lastReceivedDecryptedMessage, privateKey, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sendMessage(config_1.BASE_USER_PORT + 0, "We are finally testing the whole decentralised network !", 1)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, getLastCircuit(config_1.BASE_USER_PORT + 0)];
                    case 2:
                        circuit = _a.sent();
                        index = 0;
                        _a.label = 3;
                    case 3:
                        if (!(index < circuit.length - 1)) return [3 /*break*/, 9];
                        return [4 /*yield*/, getLastReceivedEncryptedMessage(config_1.BASE_ONION_ROUTER_PORT + circuit[index])];
                    case 4:
                        lastReceivedEncryptedMessage = _a.sent();
                        return [4 /*yield*/, getLastReceivedDecryptedMessage(config_1.BASE_ONION_ROUTER_PORT + circuit[index])];
                    case 5:
                        lastReceivedDecryptedMessage = _a.sent();
                        return [4 /*yield*/, getPrivateKey(config_1.BASE_ONION_ROUTER_PORT + circuit[index])];
                    case 6:
                        privateKey = _a.sent();
                        return [4 /*yield*/, validateEncryption(lastReceivedEncryptedMessage, lastReceivedDecryptedMessage, privateKey)];
                    case 7:
                        isValid = _a.sent();
                        expect(isValid).toBeTruthy();
                        _a.label = 8;
                    case 8:
                        index++;
                        return [3 /*break*/, 3];
                    case 9: return [2 /*return*/];
                }
            });
        }); });
        test.todo("Hidden test - the right message is passed to each node - 2pt");
    });
    describe("Hidden tests - 2 pt", function () {
        var servers = [];
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _servers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, index_1.launchNetwork)(10, 2)];
                    case 1:
                        _servers = _a.sent();
                        servers.push.apply(servers, _servers);
                        return [2 /*return*/];
                }
            });
        }); });
        afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, closeAllServers(servers)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        test.todo("Hidden test - Can send an empty message - 1pt");
        test.todo("Hidden test - Edge case #2 - 1pt");
    });
});
