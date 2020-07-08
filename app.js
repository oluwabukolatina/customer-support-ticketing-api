const express = require('express');

const app = express();
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const customerRequest = require('./src/v1/routes/requests/customers/requestRoute');
const customerAuth = require('./src/v1/customer/auth/auth');
const adminAuth = require('./src/v1/admin/auth/auth');
const adminRequest = require('./src/v1/routes/requests/admin/request.route');
const commentRoute = require('./src/v1/routes/comments/comment.route');
const authRoute = require('./src/v1/routes/auth/auth');

app.get('/', (req, res) => res.send('Hello World!'));
const baseUrl = '/api/v1/fliqpay';

app.use(`${baseUrl}/customer/request`, customerRequest);
app.use(`${baseUrl}/auth`, authRoute);
// app.use(`${baseUrl}/customer/auth`, customerAuth);
// app.use(`${baseUrl}/admin/auth`, adminAuth);
app.use(`${baseUrl}/admin/request`, adminRequest);
app.use(`${baseUrl}/comment/request`, commentRoute);

module.exports = app;
