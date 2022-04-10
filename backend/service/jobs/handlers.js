import RequestService from '../requestService.js';

const JobHandlers = {
  requestApi: async (job, done) => {
    const { data } = job.attrs;
    await RequestService.requestApi(data);
    done();
  },
};

export default JobHandlers;
