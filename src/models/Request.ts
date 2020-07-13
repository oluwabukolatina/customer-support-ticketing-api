import { Document, model, Schema } from 'mongoose';
import { IUser } from './User';

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
export interface IRequest extends Document {
  name: string;
  status: string;
  creator: IUser;
  // comments: Array<any>;
}

export default model<IRequest>('Request', Request);
