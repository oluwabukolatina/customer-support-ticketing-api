import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const Comment = new Schema({
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
//   onModel: {
//     type: String,
//     required: true,
//     enum: ['Admin', 'Customer'],
//   },
});
export default model('Comment', Comment);
