const mongoose = require('mongoose');
const App = require('./app');
require('dotenv').config();

const PORT = process.env.APP_PORT || 4190;
require('dotenv').config();

mongoose
  .connect(process.env.APP_DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    App.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
      console.log('db connected');
    });
  }).catch((err) => {
    console.log(err);
  });
