import RequestService from '../requestService.js';

const JobHandlers = {
  requestApi: async (job, done) => {
    console.log(`#requestApi start`);
    const { data } = job.attrs;
    console.log('inside JobHandlers requestApi');
    await RequestService.requestApi(data);

    console.log(`#requestApi finished`);
    done();
  },
};

export default JobHandlers;
