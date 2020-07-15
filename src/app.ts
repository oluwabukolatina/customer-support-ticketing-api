import express from 'express';
import authRoute from './v1/routes/auth/auth.routes';
import customerRequest from './v1/routes/requests/customers/request.route';
import adminRequest from './v1/routes/requests/admin/request.route';
import customerCommentRoutes from './v1/routes/comments/customer/comment.route';
import adminCommentRoutes from './v1/routes/comments/admin/comment.route';
import ManagementRoutes from './v1/routes/manage/manage.route';

const app = express();
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello World!'));
const baseUrl = '/api/v1/fliqpay';
app.use(`${baseUrl}/auth`, authRoute);
app.use(`${baseUrl}/customer/request`, customerRequest);
app.use(`${baseUrl}/admin/request`, adminRequest);
app.use(`${baseUrl}/admin/comment/request`, adminCommentRoutes);
app.use(`${baseUrl}/customer/comment/request`, customerCommentRoutes);
app.use(`${baseUrl}/super-admin`, ManagementRoutes);
// eslint-disable-next-line import/prefer-default-export
export { app };
