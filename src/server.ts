import { config } from 'dotenv';
import db from './database/database'

const App = require('./app');

config();
const PORT = process.env.APP_PORT || 4190;
db.connectToDb()
  .then(() => {
    App.listen(PORT, () => {
      console.log('db connected');
      console.log(`listening on ${PORT}`);
    });
  }).catch(() => {
    console.log('failed');
  });
