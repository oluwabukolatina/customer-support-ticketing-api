const express = require('express');

const app = express();
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const request = require('./v1/customer/request/requestRouter');
const customerAuth = require('./v1/customer/auth/auth');

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/v1/fliqpay', request);
app.use('/api/v1/fliqpay/customer/auth', customerAuth);

module.exports = app;
