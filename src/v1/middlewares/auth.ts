import {
  Request, Response, NextFunction,
} from 'express';
import jwt from 'jsonwebtoken';
// import { UserParams } from '../interfaces/definition';

import config from '../../config/config';

export interface UserParams extends Request {
  user?: any
}

function auth(req: UserParams, res: Response, next: NextFunction) {
// to fetch the token
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({ message: 'No token, authorization denied!', status: false });
  }
  try {
    const decoded = jwt.verify(token, config.APP_JWT_SECRET);
    // as DecodedInterface;
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(400).json({ message: 'Token not valid' });
  }

  // verify the token
}

export default auth;
