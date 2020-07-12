/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../../../models/User');
require('dotenv').config();

const saltRounds = 10;

module.exports = {

  async registerUser(req, res) {
    const {
      email, password, role,
    } = req.body;

    if (!email) return res.status(400).send({ message: 'please enter your email', status: 'failed' });

    if (!password) return res.status(400).send({ message: 'please enter your password', status: 'failed' });

    // check if user exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).send({ message: 'user already exists', status: 'failed' });

    const newUser = new User({
      email,
      password,
      role,
    });

    return bcrypt.hash(password, saltRounds, (err, hash) => {
      // Store hash in your DB.
      if (err) throw err;

      newUser.password = hash;
      newUser.save()
        .then((savedUser) => {
          jwt.sign({
            id: savedUser._id,
            role: savedUser.role,
            email: savedUser.email,
          },
          process.env.APP_JWT_SECRET,
          { expiresIn: 3600000 },
          (errToken, token) => {
            if (errToken) throw errToken;
            return res.status(200).json({
              message: role ? 'admin created' : 'customer created',
              user: {
                id: savedUser._id,
                email: savedUser.email,
              },
              token,
            });
          });
        })
        .catch(() => {
          res.status(400).json({ message: 'Something went wrong!' });
        });
    });
  },

  async loginUser(req, res) {
    const {

      email,
      password,

    } = req.body;

    if (!email) res.status(400).send({ message: 'please enter your email', status: 'failed' });

    if (!password) res.status(400).send({ message: 'please enter your password', status: 'failed' });

    // check if user exists
    User.findOne({ email })
      .then((user) => {
        if (!user) return res.status(400).json({ message: 'User doesnt exist!' });
        return bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw Error;
          if (result === false) return res.status(403).send({ status: 'failed', message: 'invalid credentials' });

          return jwt.sign({
            id: user.id,
            role: user.role,
            email: user.email,
          },
          process.env.APP_JWT_SECRET,
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
      });
  },

};
