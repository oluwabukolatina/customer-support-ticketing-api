"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema, model = mongoose.model;
var User = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'customer',
    },
    createdAt: { type: Date, default: Date.now },
    requests: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
});
module.exports = model('User', User);
