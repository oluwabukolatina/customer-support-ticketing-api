const express = require('express');

const app = express();
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const customerRequest = require('./src/v1/customer/requests/requestRoute');
const customerAuth = require('./src/v1/customer/auth/auth');
const adminAuth = require('./src/v1/admin/auth/auth');
const adminRequest = require('./src/v1/admin/requests/requestRoute');

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/v1/fliqpay/customer/request', customerRequest);
app.use('/api/v1/fliqpay/customer/auth', customerAuth);
app.use('/api/v1/fliqpay/admin/auth', adminAuth);
app.use('/api/v1/fliqpay/admin/request', adminRequest);

module.exports = app;
