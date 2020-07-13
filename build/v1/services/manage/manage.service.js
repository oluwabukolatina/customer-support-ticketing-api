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
var User = require('../../../models/User');
/**
 * performs all action related to managing:
 * fetching all customers,

 * */
module.exports = /** @class */ (function () {
    function ManageService() {
    }
    /**
     * @description Retrieve and return all users
     * - either with, query; email
     * @returns {Array} of users or throw error
     */
    ManageService.fetchUsers = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var email, role, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = data.email, role = data.role;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!email) return [3 /*break*/, 3];
                        return [4 /*yield*/, User.find(data, '-password')];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, User.find({ role: role }, '-password')];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        e_1 = _a.sent();
                        return [2 /*return*/, e_1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Retrieve and return all aadmin
     * - either with, query; email
     * @returns {Array} of users or throw error
     */
    ManageService.fetchAdmin = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var email, role, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = data.email, role = data.role;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!email) return [3 /*break*/, 3];
                        return [4 /*yield*/, User.find({ email: email }, '-password -requests')];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, User.find({ role: role }, '-password -requests')];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        e_2 = _a.sent();
                        return [2 /*return*/, e_2];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description upgrade user role
     * - user id and data(role it should be upgraded to)
     */
    ManageService.upgradeRole = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User.findByIdAndUpdate(id, data, { new: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_3 = _a.sent();
                        return [2 /*return*/, e_3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Retrieve and return a user
     * - either with, query; email
     * @returns {object} of user or throw error
     */
    ManageService.getUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User.findById(data, '-password').populate('requests')];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_4 = _a.sent();
                        return [2 /*return*/, e_4];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Delete an admin
     * @param { int } id
     */
    ManageService.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User.findByIdAndDelete(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_5 = _a.sent();
                        return [2 /*return*/, e_5];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ManageService;
}());
