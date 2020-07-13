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
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../../../models/User');
require('dotenv').config();
var saltRounds = 10;
module.exports = {
    registerUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, role, user, newUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password, role = _a.role;
                        if (!email)
                            return [2 /*return*/, res.status(400).send({ message: 'please enter your email', status: 'failed' })];
                        if (!password)
                            return [2 /*return*/, res.status(400).send({ message: 'please enter your password', status: 'failed' })];
                        return [4 /*yield*/, User.findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (user)
                            return [2 /*return*/, res.status(400).send({ message: 'user already exists', status: 'failed' })];
                        newUser = new User({
                            email: email,
                            password: password,
                            role: role,
                        });
                        return [2 /*return*/, bcrypt.hash(password, saltRounds, function (err, hash) {
                                // Store hash in your DB.
                                if (err)
                                    throw err;
                                newUser.password = hash;
                                newUser.save()
                                    .then(function (savedUser) {
                                    jwt.sign({
                                        id: savedUser._id,
                                        role: savedUser.role,
                                        email: savedUser.email,
                                    }, process.env.APP_JWT_SECRET, { expiresIn: 3600000 }, function (errToken, token) {
                                        if (errToken)
                                            throw errToken;
                                        return res.status(201).json({
                                            message: role ? 'admin created' : 'customer created',
                                            user: {
                                                id: savedUser._id,
                                                email: savedUser.email,
                                            },
                                            token: token,
                                        });
                                    });
                                })
                                    .catch(function () {
                                    res.status(400).json({ message: 'Something went wrong!' });
                                });
                            })];
                }
            });
        });
    },
    loginUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password;
            return __generator(this, function (_b) {
                _a = req.body, email = _a.email, password = _a.password;
                if (!email)
                    res.status(400).send({ message: 'please enter your email', status: 'failed' });
                if (!password)
                    res.status(400).send({ message: 'please enter your password', status: 'failed' });
                // check if user exists
                User.findOne({ email: email })
                    .then(function (user) {
                    if (!user)
                        return res.status(400).json({ message: 'User doesnt exist!' });
                    return bcrypt.compare(password, user.password, function (err, result) {
                        if (err)
                            throw Error;
                        if (result === false)
                            return res.status(403).send({ status: 'failed', message: 'invalid credentials' });
                        return jwt.sign({
                            id: user.id,
                            role: user.role,
                            email: user.email,
                        }, process.env.APP_JWT_SECRET, { expiresIn: 3600000 }, function (error, token) {
                            if (error)
                                throw error;
                            return res.status(200).json({
                                data: {
                                    id: user._id,
                                    email: user.email,
                                },
                                token: token,
                            });
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    },
};
