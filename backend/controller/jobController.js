import { agenda } from '../service/jobs/index.js';
import mongoose from 'mongoose';

const jobController = {
  getJobs: () => agenda.jobs(),
  cancelJob: (jobId) => agenda.cancel({ _id: new mongoose.Types.ObjectId(jobId) }),
};

export default jobController;
