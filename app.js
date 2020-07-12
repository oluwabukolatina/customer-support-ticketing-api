const express = require('express');

const app = express();
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const customerRequest = require('./src/v1/routes/requests/customers/request.route');
const adminRequest = require('./src/v1/routes/requests/admin/request.route');
const authRoute = require('./src/v1/routes/auth/auth');
const customerComment = require('./src/v1/routes/comments/customer/comment.route');
const adminComment = require('./src/v1/routes/comments/admin/comment.route');

app.get('/', (req, res) => res.send('Hello World!'));
const baseUrl = '/api/v1/fliqpay';
app.use(`${baseUrl}/customer/request`, customerRequest);
app.use(`${baseUrl}/auth`, authRoute);
app.use(`${baseUrl}/admin/request`, adminRequest);
app.use(`${baseUrl}/admin/comment/request`, adminComment);
app.use(`${baseUrl}/customer/comment/request`, customerComment);

module.exports = app;
