const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));

const app = express_1.default();
const logger = require('morgan');

app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const customerRequest = require('./v1/routes/requests/customers/request.route');
const adminRequest = require('./v1/routes/requests/admin/request.route');
const authRoute = require('./v1/routes/auth/auth');
const customerCommentRoutes = require('./v1/routes/comments/customer/comment.route');
const adminCommentRoutes = require('./v1/routes/comments/admin/comment.route');
const ManagementRoutes = require('./v1/routes/manage/manage.route');

app.get('/', (req, res) => res.send('Hello World!'));
const baseUrl = '/api/v1/fliqpay';
app.use(`${baseUrl}/customer/request`, customerRequest);
app.use(`${baseUrl}/auth`, authRoute);
app.use(`${baseUrl}/admin/request`, adminRequest);
app.use(`${baseUrl}/admin/comment/request`, adminCommentRoutes);
app.use(`${baseUrl}/customer/comment/request`, customerCommentRoutes);
app.use(`${baseUrl}/super-admin`, ManagementRoutes);
module.exports = app;
