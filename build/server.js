"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var database_1 = __importDefault(require("./database/database"));
var App = require('./app');
dotenv_1.config();
var PORT = process.env.APP_PORT || 4190;
database_1.default.connectToDb()
    .then(function () {
    App.listen(PORT, function () {
        console.log('db connected');
        console.log("listening on " + PORT);
    });
}).catch(function () {
    console.log('failed');
});
