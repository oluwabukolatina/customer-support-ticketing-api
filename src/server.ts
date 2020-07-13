const mongoose = require('mongoose');
const dotenv = require('dotenv');
const App = require('./app');

dotenv.config();

const PORT = process.env.APP_PORT || 4190;
console.log(PORT);

require('dotenv').config();

mongoose
  .connect(process.env.APP_DB,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    App.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
      console.log('db connected');
    });
  }).catch((err: string) => {
    console.log(err);
  });
