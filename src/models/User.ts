import { Document, model, Schema } from 'mongoose';

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
});
export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
}

export default model<IUser>('User', UserSchema);
// export const User = model<IUser>('User', UserSchema)
