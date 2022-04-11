import express from 'express';
import _ from 'lodash';
import requestController from '../controller/requestController.js';
import resultController from '../controller/resultController.js';
import jobsController from '../controller/jobController.js';

export const router = express.Router();

router.post('/api/request', function (req, res) {
  if (!req.body?.url) {
    res.send('Error: Your need to send a least an URL');
  } else {
    // Extract custom header, customer header start with h: (example {'h:customerHeader": "json"})
    // const customerHeader = _.chain(req.body)
    //   .pickBy((value, key) => _.startsWith(key, 'h:'))
    //   .mapKeys((value, key) => key.slice(2))
    //   .value();

    // // Extract custom header, customer header start with v: (example {'v:customerData": "json"})
    // const customerPayload = _.chain(req.body)
    //   .pickBy((value, key) => _.startsWith(key, 'v:'))
    //   .mapKeys((value, key) => key.slice(2))
    //   .value();

    // const authHeader = req.headers?.authorization;

    requestController
      .addRequest(req.body)
      .then((data) => {
        res.status(data.status).send({ message: data });
      })
      .catch((err) => {
        res.status(err.status).send({ message: err.message });
      });
  }
});

router.get('/api/results', async (req, res) => {
  const { jobId } = req.query;
  if (!jobId) {
    res.send('Error: An jobId should be provide');
  } else {
    const futureResultJobById = await resultController.getResultByJobId(jobId);
    res.send(futureResultJobById);
  }
});

router.get('/api/jobs', async (req, res) => {
  const futureResultJobById = await jobsController.getJobs();
  res.send(futureResultJobById);
});