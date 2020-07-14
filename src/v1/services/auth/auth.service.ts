/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../../../config/config';
import User from '../../models/User';
import { UserInterface } from '../../interface/user/user.interface';

dotenv.config();

const saltRounds = 10;

/**
 * performs all action related to user:
 * getting a user
 */
class AuthService {
  /**
   * @description register a user
   * @returns {object} request or throw error
   * @param email
   * @param password
   * @param role
   */
  static registerAUser = async (email: string, password: string, role: string) => {
    console.log('service');
    // return bcrypt.hash(password, saltRounds, (err, hash) => {
    //   // Store hash in your DB.
    //   if (err) throw err;
    //
    //   newUser.password = hash;
    //   newUser.save()
    //       .then((savedUser) => {
    //         jwt.sign({
    //               id: savedUser._id,
    //               role: savedUser.role,
    //               email: savedUser.email,
    //             },
    //             process.env.APP_JWT_SECRET,
    //             { expiresIn: 3600000 },
    //             (errToken, token) => {
    //               if (errToken) throw errToken;
    //               return res.status(201).json({
    //                 message: role ? 'admin created' : 'customer created',
    //                 user: {
    //                   id: savedUser._id,
    //                   email: savedUser.email,
    //                 },
    //                 token,
    //               });
    //             });
    //       })
    //       .catch(() => {
    //         res.status(400).json({ message: 'Something went wrong!' });
    //       });
    // });

    const newUser = new User({
      email,
      password,
      role: role || 'customer',
    });

    await bcrypt.hash(password, saltRounds, (err, hash) => {
      // Store hash in your DB.
      if (err) throw err;
      newUser.password = hash;
      return newUser.save()
        .then((savedUser) => {
          console.log(savedUser);
          jwt.sign({
            id: savedUser._id,
            role: savedUser.role,
            email: savedUser.email,
          },
          config.APP_JWT_SECRET,

          { expiresIn: 3600000 },
          (errToken, token) => {
            if (errToken) return errToken;
            // return { token, savedUser };

            // return res.status(201).json({
            //   message: role ? 'admin created' : 'customer created',
            //   user: {
            //     id: savedUser._id,
            //     email: savedUser.email,
            //   },
            //   token,
            // });
          });
        })
        .catch((e) => e,
          // res.status(400).json({ message: 'Something went wrong!' });
        );
    });
  };
}

export default AuthService;
