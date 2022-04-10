import RequestService from '../requestService.js';

const JobHandlers = {
  requestApi: async (job, done) => {
    const { data, _id } = job.attrs;
    const agendaJobId = _id;
    await RequestService.requestApi(data, agendaJobId);
    done();
  },
};

export default JobHandlers;
