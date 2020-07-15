import { model, Schema } from 'mongoose';
import { RequestInterface } from '../interfaces/request/request.interface';

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
});
export default model<RequestInterface>('Request', Request);
