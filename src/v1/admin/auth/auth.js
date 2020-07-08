/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../../../../models/Admin');
require('dotenv').config();

const saltRounds = 10;

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).send({ message: 'please enter your email', status: 'failed' });

  if (!password) return res.status(400).send({ message: 'please enter your password', status: 'failed' });

  // check if user exists
  const user = await Admin.findOne({ email });
  if (user) return res.status(400).send({ message: 'user already exists', status: 'failed' });

  const newUser = new Admin({
    email,
    password,
  });

  return bcrypt.hash(password, saltRounds, (err, hash) => {
    // Store hash in your DB.
    if (err) throw err;

    newUser.password = hash;
    newUser.save()
      .then((savedUser) => {
        jwt.sign({
          id: savedUser._id,
          role: user.role,

        },
        process.env.APP_JWT_SECRET,
        { expiresIn: 3600000 },
        (errToken, token) => {
          if (errToken) throw errToken;
          return res.status(200).json({
            message: 'admin created',
            user: {
              id: savedUser._id,
              email: savedUser.email,
            },
            token,
          });
        });
      })
      .catch(() => res.status(400).json({ message: 'Something went wrong!' }));
  });
});

router.post('/login', async (req, res) => {
  const {

    email,
    password,

  } = req.body;

  if (!email) res.status(400).send({ message: 'please enter your email', status: 'failed' });

  if (!password) res.status(400).send({ message: 'please enter your password', status: 'failed' });

  // check if user exists
  Admin.findOne({ email })
    .then((user) => {
      if (!user) return res.status(400).json({ message: 'User doesnt exist!' });
      return bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw Error;
        if (result === false) return res.status(403).send({ status: 'failed', message: 'invalid credentials' });

        return jwt.sign({
          id: user.id,
          role: user.role,
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
});

module.exports = router;
