import { model, Schema } from 'mongoose';
import { UserInterface } from '../interface/user/user.interface';

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
});
export default model<UserInterface>('User', UserSchema);
