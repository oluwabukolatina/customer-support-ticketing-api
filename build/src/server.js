"use strict";
var mongoose = require('mongoose');
var App = require('./app');
require('dotenv').config();
var PORT = process.env.APP_PORT || 4190;
require('dotenv').config();
mongoose
    .connect(process.env.APP_DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(function () {
    App.listen(PORT, function () {
        console.log("listening on " + PORT);
        console.log('db connected');
    });
}).catch(function (err) {
    console.log(err);
});
