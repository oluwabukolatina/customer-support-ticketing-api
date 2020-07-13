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
var RequestService = require('../../../services/requests/customers/request.service');
var SingleRequest = require('../../../services/requests/shared/request.service');
/**
 * authenticated customer requests controller perform -
 * fetching signed in user requests,
 * getting a particular request
 *making a request
 * */
module.exports = /** @class */ (function () {
    function RequestController() {
    }
    /**
     * @description create a request with the id of the curently logged in user
     * @param {object} req
     * @param {object} res
     * @returns {object} response
     */
    RequestController.createRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var name, user, id, newRequest, request, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = req.body.name;
                        user = req.user;
                        id = user.id;
                        if (!name)
                            return [2 /*return*/, res.status(400).json({ status: false, message: 'Name of request required' })];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        newRequest = {
                            name: name,
                            creator: id,
                        };
                        return [4 /*yield*/, RequestService.createARequest(newRequest)];
                    case 2:
                        request = _a.sent();
                        if (!request)
                            return [2 /*return*/, res.status(400).json({ message: 'Unable to create request' })];
                        return [2 /*return*/, res.status(201).json({
                                message: 'Request created!',
                                request: {
                                    status: request.status,
                                    id: request.id,
                                    name: request.name,
                                    createdAt: request.createdAt,
                                },
                            })];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, res.status(400).send('Something went wrong!')];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description retrieve and return all signed in user requests
     * @param {object} req
     * @param {object} res
     * @returns {Array}
     */
    RequestController.getAUserRequests = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, query, requests, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.user.id;
                        query = { creator: id };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, RequestService.fetchAllRequests(query)];
                    case 2:
                        requests = _a.sent();
                        if (!requests)
                            return [2 /*return*/, res.status(400).json({ message: 'Unable to get requests', status: false })];
                        return [2 /*return*/, res.status(200).json({
                                message: 'Fetched requests',
                                status: true,
                                requests: requests,
                            })];
                    case 3:
                        e_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: 'Something went wrong while getting requests!' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // a customer can only get her own single request
    /**
     * @description get a specific request belonging to the currently logged in user
     * @param {object} req
     * @param {object} res
     * @returns {object} request
     */
    RequestController.getARequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, query, request, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        user = req.user;
                        query = { _id: id, creator: user.id };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, SingleRequest.getARequest(query)];
                    case 2:
                        request = _a.sent();
                        if (!request)
                            return [2 /*return*/, res.status(404).json({ message: 'Request not found', status: false })];
                        return [2 /*return*/, res.status(200).json({ message: 'Fetched a request', status: true, request: request })];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: 'Something went wrong here!' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return RequestController;
}());
