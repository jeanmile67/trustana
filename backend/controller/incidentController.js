import { getErrorsByJob } from '../service/mongoService.js';

const incidentController = {
  getErrorsByJobId: (jobId) => getErrorsByJob(jobId),
};

export default incidentController;
