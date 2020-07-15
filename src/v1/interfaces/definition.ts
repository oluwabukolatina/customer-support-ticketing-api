import { Request } from 'express';

export interface UserParams extends Request {
  user?: any
}
