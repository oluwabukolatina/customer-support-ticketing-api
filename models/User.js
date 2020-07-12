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
  createdAt: { type: Date, default: Date.now },
  requests: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
});
module.exports = model('User', User);
