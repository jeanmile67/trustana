import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { router as indexRoute } from './routes/paths.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(indexRoute);
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/trustana', function (err) {
  if (err) {
    console.log(err);
    process.exit(-1);
  }
  console.log('connected to DB');
});

app.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
    process.exit(-1);
  }
  console.log(`Servcer listening to port http://localhost:${port}`);
});
