const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const Admin = new Schema({

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
    default: 'admin',
  },

  createdAt: { type: Date, default: Date.now },
});
module.exports = model('Admin', Admin);
