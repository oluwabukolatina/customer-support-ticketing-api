const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const Request = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = model('Request', Request);
