const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const Request = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = model('Request', Request);
