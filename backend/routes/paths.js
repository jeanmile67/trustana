import express from 'express';
import { parseRequest } from '../utils/parser.js';
import requestController from '../controller/requestController.js';
import resultController from '../controller/resultController.js';
import jobsController from '../controller/jobController.js';

export const router = express.Router();

router.get('/about', function (req, res) {
  res.send('Trustana backend study case');
});

router.post('/api/request', function (req, res) {
  if (!req.body?.url) {
    res.send('Error: Your need to send a least an URL');
  } else {
    // Parse the body and header auth
    const requestData = parseRequest(req.body, req.headers);

    requestController
      .addRequest(requestData)
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
