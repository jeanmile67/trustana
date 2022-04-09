import express from 'express';
import mongoose from 'mongoose';
import { formatISO9075 } from 'date-fns';
import { router as indexRoute } from './routes/paths.js';
import pingTask from './service/scheduler.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(indexRoute);

mongoose.connect(
  'mongodb://localhost:27017/trustana',
  {
    authSource: 'admin',
    user: 'root',
    pass: 'example',
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
