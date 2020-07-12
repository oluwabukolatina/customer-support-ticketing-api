const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const User = new Schema({

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
  level: Number,
  createdAt: { type: Date, default: Date.now },
});
module.exports = model('User', User);
