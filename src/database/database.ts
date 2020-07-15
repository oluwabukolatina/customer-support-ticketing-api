import { connect } from 'mongoose';
import config from '../config/config';

async function connectToDb() {
  try {
    return await connect(config.APP_DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    return error;
  }
}
export default { connectToDb };
