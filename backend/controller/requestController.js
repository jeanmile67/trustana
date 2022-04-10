import { schedule } from '../service/jobs/scheduler.js';
import { saveRequestQuery } from '../service/mongoService.js';

const requestController = {
  addRequest(data) {
    return new Promise((resolve, reject) => {
      console.log('requestController', data);

      // Create request job
      return schedule
        .requestApi(data)
        .then((job) => {
          // Save the request and the jobId on bdd
          const agendaJobId = job.attrs._id;
          saveRequestQuery(data, agendaJobId);

          return resolve({ status: 200, message: `Job #${agendaJobId} launch Successfully` });
        })
        .catch((err) => {
          return reject({ status: 500, message: `Error ${err}` });
        });
    });
  },
};

export default requestController;
