/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = 10;

/**
 * performs all action related to user:
 * getting a user
 */
class AuthService {
  /**
   * @description register a user
   * @param { object } data
   * @returns {object} request or throw error
   */
  static async registerUser(data) {
    console.log(data);
    const { password, role } = data;
    return bcrypt.hash(password, saltRounds, (err, hash) => {
      // Store hash in your DB.
      if (err) throw err;
      data.password = hash;
      data.save()
        .then((savedUser) => {
          jwt.sign({
            id: savedUser._id,
            role: savedUser.role,
            email: savedUser.email,
          },
          process.env.APP_JWT_SECRET,
          { expiresIn: 3600000 },
          (errToken, token) => {
            if (errToken) return errToken;

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
        .catch(() => {
          res.status(400).json({ message: 'Something went wrong!' });
        });
    });
  }
}

export default AuthService;
