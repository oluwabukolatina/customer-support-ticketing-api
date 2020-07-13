import {Document, Model, model, Types, Schema, Query} from 'mongoose';
import validator from 'validator';

/**
 * @param email:string
 * @param password:string
 */

const UserModel = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value: string) => validator.isEmail(value),
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

export interface IUser extends Document {
  email: string;
  password: string;
  requests: Types.Array<string>;
}
export default model<IUser>('User', UserModel);
