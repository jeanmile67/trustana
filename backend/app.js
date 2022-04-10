import express from 'express';
import mongoose from 'mongoose';
import { formatISO9075 } from 'date-fns';
import { EXPRESS_CONF, MONGO_CONF } from './config.js';
import { router as indexRoute } from './routes/paths.js';

const app = express();
const port = EXPRESS_CONF.port || 5000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(indexRoute);

mongoose.connect(
  MONGO_CONF.databaseURL,
  {
    authSource: 'admin',
    user: MONGO_CONF.user,
    pass: MONGO_CONF.pass,
  },
  function (err) {
    if (err) {
      console.log(err);
      process.exit(-1);
    }
    console.log('connected to DB');
  }
);

app.listen(port, 'localhost', function (err) {
  console.log(formatISO9075(Date.now(), { representation: 'time' }));
  if (err) {
    console.log(err);
    process.exit(-1);
  }
  console.log(`Server listening to port http://localhost:${port}`);
});
