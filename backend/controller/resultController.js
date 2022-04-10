import { getResultByJob } from '../service/mongoService.js';

const resultController = {
  getResultByJobId: (jobId) => getResultByJob(jobId),
};

export default resultController;
