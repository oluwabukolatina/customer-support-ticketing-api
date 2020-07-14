import { config } from 'dotenv';
import db from './database/database';
import { app } from './app';

config();
const PORT = process.env.APP_PORT || 4190;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  db.connectToDb().then(() => console.log('connected to db'))
    .catch(() => console.log('something went wrong'));
});
