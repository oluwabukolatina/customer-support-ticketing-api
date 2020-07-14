/* eslint-disable no-underscore-dangle */
import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserInterface } from '../../interface/user/user.interface';

import UserService from '../../services/user/user.service';
import config from '../../../config/config';
import User from '../../models/User';
import AuthService from '../../services/auth/auth.service';

const saltRounds = 10;

/**
 * auth controller
 * create a new user,
 * sign in user,
 */

class AuthController {
  /**
     * @description create a new user from a user object
     * @param {object} req
     * @param {object} res
     * @returns {object} created user
     */
  static async registerUser(req: Request, res: Response) {
    const {
      email, password, role,
    } = req.body;

    if (!email) return res.status(400).send({ message: 'please enter your email', status: 'failed' });
    if (!password) return res.status(400).send({ message: 'please enter your password', status: 'failed' });
    try {
      const findUser = await UserService.getAUser(email);
      if (findUser) return res.status(400).json({ message: 'User already exists', status: false });
      const newUser = new User({
        email,
        password,
        role,
      });
      return bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
          .then((savedUser) => {
            jwt.sign({
              id: savedUser._id,
              role: savedUser.role,
              email: savedUser.email,
            },
            config.APP_JWT_SECRET,
            { expiresIn: 3600000 },
            (errToken, token) => {
              if (errToken) throw errToken;
              return res.status(201).json({
                message: role ? 'admin created' : 'customer created',
                user: {
                  id: savedUser._id,
                  email: savedUser.email,
                },
                token,
              });
            });
          })
          .catch((e) => res.status(400).json({ message: 'Unable to create user', status: false }));
      });
    } catch (e) {
      return res.status(400).json({ message: 'Something went wrong', status: false });
    }
  }

  /**
   * @description login user
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static async loginUser(req: Request, res: Response) {
    const { body } = req;
    const {
      email,
      password,
    } = body;
    if (!email) res.status(400).send({ message: 'please enter your email', status: 'failed' });

    if (!password) res.status(400).send({ message: 'please enter your password', status: 'failed' });
    // check if user exists
    const user: UserInterface = await UserService.getAUser(email);
    if (!user) return res.status(404).json({ message: 'User doesnt exist!' });
    return bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw Error;
      if (!result) return res.status(403).send({ status: 'failed', message: 'invalid credentials' });
      return jwt.sign({
        id: user.id,
        role: user.role,
        email: user.email,
      },
      config.APP_JWT_SECRET,
      { expiresIn: 3600000 },
      (error, token) => {
        if (error) throw error;
        return res.status(200).json({
          data: {
            id: user._id,
            email: user.email,
          },
          token,
        });
      });
    });
  }
}

export default AuthController;
