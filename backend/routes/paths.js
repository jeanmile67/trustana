import express from 'express';
import requestController from '../controller/requestController.js';
import resultController from '../controller/resultController.js';

export const router = express.Router();

router.post('/api/request', (req, res) => {
  requestController
    .addRequest(req.body)
    .then((data) => {
      res.status(data.status).send({ message: data });
    })
    .catch((err) => {
      res.status(err.status).send({ message: err.message });
    });
});

router.get('/api/request', async (req, res) => {
  const { jobId } = req.query;
  const futureResultJobById = await resultController.getResultByJobId(jobId);
  res.send(futureResultJobById);
});