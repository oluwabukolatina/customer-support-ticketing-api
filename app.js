const express = require('express');

const app = express();
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const request = require('./src/v1/request/requestRouter');
const customerAuth = require('./src/v1/customer/auth/auth');

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/v1/fliqpay', request);
app.use('/api/v1/fliqpay/customer/auth', customerAuth);

module.exports = app;
