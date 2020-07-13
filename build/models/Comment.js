"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema, model = mongoose.model;
var Comment = new Schema({
    comment: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    commenter: {
        type: Schema.Types.ObjectId,
        required: true,
        // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
        // will look at the `onModel` property to find the right model.
        ref: 'User',
    },
});
module.exports = model('Comment', Comment);
