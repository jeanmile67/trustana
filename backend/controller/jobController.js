import { agenda } from '../service/jobs/index.js';

const jobController = {
  getJobs: () => agenda.jobs(),
};

export default jobController;
