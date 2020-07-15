import { Document } from 'mongoose';
import { UserInterface } from '../user/user.interface';

export interface RequestInterface extends Document {
    name: string;
    status: string;
    // creator?: string
    creator: UserInterface['_id'];
    // comments: Array<any>;
}
