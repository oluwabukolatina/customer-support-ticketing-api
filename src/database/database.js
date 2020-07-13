import mongoose from 'mongoose';
import { config } from 'dotenv';

const { connect } = mongoose;

config();
const dbUrl = process.env.APP_DB;

async function connectToDb() {
  try {
    return await connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    return error;
  }
}
export default { connectToDb };
