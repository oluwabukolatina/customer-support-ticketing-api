import { config } from 'dotenv';

config();
export default {
  APP_JWT_SECRET: 'fleekpay',
  APP_DB: 'mongodb://admin:password1@ds045007.mlab.com:45007/cts',
};
