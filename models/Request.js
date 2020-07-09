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

  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
});
module.exports = model('Request', Request);
