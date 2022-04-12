import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { EXPRESS_CONF, MONGO_CONF } from './config.js';
import { router as indexRoute } from './routes/paths.js';
import { agenda } from './service/jobs/index.js';

const app = express();
const port = EXPRESS_CONF.port || 5000;

// Enable cors from localhost
const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

// Parse request body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Router
app.use(indexRoute);

// Mongo
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
    } else {
      console.log('Connecttion to mongo successful');
    }
  }
);

// agenda
(async function () {
  await agenda.start();
})();

agenda
  .on('ready', () => console.log('Agenda connection to Mongo successful'))
  .on('start', (job) => console.log('Job %s starting', job.attrs.name))
  .on('error', () => console.log('Agenda connection to Mongo error !'));

// Express
app.listen(port, '0.0.0.0', function (err) {
  if (err) {
    console.log(err);
    process.exit(-1);
  }
  console.log(`Server listening to port http://0.0.0.0:${port}`);
});