import { schedule } from '../service/jobs/scheduler.js';

const requestController = {
  addRequest(data) {
    return new Promise((resolve, reject) => {
      // Save the request on bdd
      // const requestSchema = mongooseRequestSchema(data);
      // const futureRequest = requestSchema
      //   .save()
      //   .then(() => {
      //     resolve({ status: 200, message: 'Request inserted Successfully' });
      //   })
      //   .catch((err) => {
      //     reject({ status: 500, message: `Error ${err}` });
      //   });

      // Create request job
      const futureJob = schedule
        .requestApi(data)
        .then(() => {
          resolve({ status: 200, message: 'Request inserted Successfully' });
        })
        .catch((err) => {
          reject({ status: 500, message: `Error ${err}` });
        });

      // Promise.all([futureRequest])
      //   .then(resolve('Request inserted Successfully'))
      //   .error(reject('Error inserted Successfully'));
      return futureJob;
    });
  },
};

export default requestController;
