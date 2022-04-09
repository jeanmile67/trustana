import express from 'express';
import mongoose from 'mongoose';
import { router as indexRoute } from './routes/paths.js';

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
  if (err) {
    console.log(err);
    process.exit(-1);
  }
  console.log(`Server listening to port http://localhost:${port}`);
});
