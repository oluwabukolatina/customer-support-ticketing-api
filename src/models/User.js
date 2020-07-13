const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;
const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => validator.isEmail(value),
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
