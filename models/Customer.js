const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const Customer = new Schema({

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  createdAt: { type: Date, default: Date.now },
});
module.exports = model('Customer', Customer);
