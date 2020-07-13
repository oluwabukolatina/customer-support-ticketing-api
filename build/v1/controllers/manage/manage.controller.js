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
/* eslint-disable no-underscore-dangle */
var RequestService = require('../../services/requests/admin/request.service');
var SingleRequest = require('../../services/requests/shared/request.service');
var ManageService = require('../../services/manage/manage.service');
/**
 * super admin requests controller perform -
 * delete requests,
 * get all customers
 * get all admin
 */
module.exports = /** @class */ (function () {
    function ManageController() {
    }
    /**
     * @description delete reqyest
     * @param {object} req
     * @param {object} res
     */
    ManageController.deleteRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, request, deletedRequest, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, SingleRequest.getARequest(id)];
                    case 2:
                        request = _a.sent();
                        if (!request)
                            res.status(400).json({ message: 'Request Not Found', status: false });
                        return [4 /*yield*/, RequestService.deleteRequest(id)];
                    case 3:
                        deletedRequest = _a.sent();
                        if (deletedRequest.ok === 1)
                            res.status(200).json({ message: 'Request deleted', status: true });
                        return [2 /*return*/, res.status(400).json({ message: 'Unable to delete request', status: false })];
                    case 4:
                        e_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: 'Something went wrong while deleting request!' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description retrieve and return all customeers
     * @param {object} req
     * @param {object} res
     * @returns {Array}
     */
    ManageController.getAllCustomers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, data, customers, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        data = { role: 'customer', email: email };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ManageService.fetchUsers(data)];
                    case 2:
                        customers = _a.sent();
                        if (!customers)
                            res.status(400).json({ message: 'Could not get customers', status: false });
                        return [2 /*return*/, res.status(200).json({ message: 'Fetched customers', status: true, data: customers })];
                    case 3:
                        e_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: 'Something went wrong while getting users', status: false })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description retrieve and return all admins
     * @param {object} req
     * @param {object} res
     * @returns {Array}
     */
    ManageController.getAllAdmins = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, role, data, admins, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, role = _a.role;
                        data = { role: role, email: email };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ManageService.fetchAdmin(data)];
                    case 2:
                        admins = _b.sent();
                        if (!admins)
                            res.status(400).json({ message: 'Could not get admins', status: false });
                        return [2 /*return*/, res.status(200).json({ message: 'Fetched admins', status: true, data: admins })];
                    case 3:
                        e_3 = _b.sent();
                        return [2 /*return*/, res.status(400).json({ message: 'Something went wrong while getting users', status: false })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description upgrade an admin to superadmin
     * @param {object} req
     * @param {object} res
     */
    ManageController.upgradeAdminRole = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var role, id, data, upgrade, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        role = req.body.role;
                        id = req.params.id;
                        data = { role: role };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ManageService.upgradeRole(id, data)];
                    case 2:
                        upgrade = _a.sent();
                        if (!upgrade)
                            res.status(400).json({ message: 'Could not upgrade user role', status: false });
                        return [2 /*return*/, res.status(200).json({
                                message: "Updated role to " + role,
                                status: true,
                                data: {
                                    role: upgrade.role,
                                    id: upgrade._id,
                                    email: upgrade.email,
                                },
                            })];
                    case 3:
                        e_4 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: 'Something went wrong while getting users', status: false })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description retrieve and return single user of all levels
     * @param {object} req
     * @param {object} res
     * @returns {object}
     */
    ManageController.getOneUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, user, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        data = { _id: id };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ManageService.getUser(data)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(400)
                                    .json({
                                    message: 'Could not get user',
                                    status: false,
                                })];
                        }
                        if (user.role === 'customer')
                            res.status(200).json({ message: 'Fetch customer', status: true, user: user });
                        return [2 /*return*/, res.status(200).json({
                                message: 'Fetch admin',
                                status: true,
                                user: {
                                    role: user.role,
                                    id: user._id,
                                    email: user.email,
                                },
                            })];
                    case 3:
                        e_5 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: 'Something went wrong while getting users', status: false })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description delete an admin
     * @param {object} req
     * @param {object} res
     * @returns {object} response
     */
    ManageController.deleteAdmin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, user, deletedAdmin, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        data = { _id: id };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, ManageService.getUser(data)];
                    case 2:
                        user = _a.sent();
                        if (!user)
                            res.status(404).json({ message: 'Not Found', status: false });
                        return [4 /*yield*/, ManageService.deleteUser(id)];
                    case 3:
                        deletedAdmin = _a.sent();
                        if (!deletedAdmin)
                            return [2 /*return*/, res.status(400).json({ message: 'Unable to delete admin', status: false })];
                        return [2 /*return*/, res.status(200).json({ message: 'Admin Deleted', status: true })];
                    case 4:
                        e_6 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: 'Something went wrong while deleting user', status: false })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ManageController;
}());
