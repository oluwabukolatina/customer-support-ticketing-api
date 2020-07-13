import { config } from 'dotenv';
import * as http from 'http';
import { connection } from 'mongoose';
import db from './database/database';
import { app } from './app';

config();
const PORT = process.env.APP_PORT || 4190;
const server = http.createServer(app);
server.listen(PORT);
server.on('listening', async () => {
  console.info(`Listening on port ${PORT}`);
  await db.connectToDb();
  connection.on('open', () => {
    console.info('Connected to db.');
  });
  connection.on('error', (err: any) => {
    console.error(err);
  });
});
