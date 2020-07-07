const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Customer = require('../../../models/Customer');
require('dotenv').config();

const saltRounds = 10;

router.post('/login', async (req, res) => {
  const {

    email,
    password,

  } = req.body;

  if (!email) {
    return res
      .status(400)
      .send({ message: 'please enter your email', status: 'failed' });
  }

  if (!password) {
    return res
      .status(400)
      .send({ message: 'please enter your password', status: 'failed' });
  }

  // check if user exists
  Customer.findOne({ email })
    .then((user) => {
      console.log(user);
      if (!user) return res.status(400).json({ message: 'User doesnt exist!' });
      bcrypt.compare(password, user.password, (err, result) => {
        // result == true
        if (err) throw Error;
        if (result === false) return res.status(403).send({ status: 'failed', message: 'invalid credentials' });

        jwt.sign({
          id: user.id,
        },
        process.env.APP_JWT_SECRET,
        { expiresIn: 3600000 },
        (error, token) => {
          if (error) throw error;
          return res.status(200).json({
            // message: 'user created',
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

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).send({ message: 'please enter your email', status: 'failed' });

  if (!password) return res.status(400).send({ message: 'please enter your password', status: 'failed' });

  // check if user exists
  const user = await Customer.findOne({ email });
  if (user) return res.status(400).send({ message: 'user already exists', status: 'failed' });

  const newUser = new Customer({
    email,
    password,
  });

  bcrypt.hash(password, saltRounds, (err, hash) => {
    // Store hash in your DB.
    if (err) throw err;

    newUser.password = hash;
    newUser.save()
      .then((savedUser) => {
        jwt.sign({
          id: savedUser._id,
        },
        process.env.APP_JWT_SECRET,
        { expiresIn: 3600000 },
        (errToken, token) => {
          if (errToken) throw errToken;
          return res.status(200).json({
            message: 'user created',
            user: {
              id: savedUser._id,
              email: savedUser.email,
            },
            token,
          });
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({ message: 'Something went wrong!' });
      });
  });
});

module.exports = router;
