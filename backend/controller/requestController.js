import { schedule } from '../service/jobs/scheduler.js';
import { saveRequestQuery } from '../service/mongoService.js';

const requestController = {
  addRequest(requestData) {
    return new Promise((resolve, reject) => {
      // Create request job
      return schedule
        .requestApi(requestData)
        .then((job) => {
          // Save the request and the jobId on bdd
          const agendaJobId = job.attrs._id;
          saveRequestQuery(requestData, agendaJobId);

          return resolve(`Job #${agendaJobId} launch Successfully`);
        })
        .catch((err) => {
          return reject(`Error ${err}`);
        });
    });
  },
};

export default requestController;
