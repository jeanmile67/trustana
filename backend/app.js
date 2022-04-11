import express from 'express';
import mongoose from 'mongoose';
import { EXPRESS_CONF, MONGO_CONF } from './config.js';
import { router as indexRoute } from './routes/paths.js';
import { agenda } from './service/jobs/index.js';

const app = express();
const port = EXPRESS_CONF.port || 5000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
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
      process.exit(-1);
    }
    console.log('connected to DB');
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
app.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err);
    process.exit(-1);
  }
  console.log(`Server listening to port http://localhost:${port}`);
});