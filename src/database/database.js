const mongoose = require('mongoose');
require('dotenv').config();

const { connect } = mongoose;

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
