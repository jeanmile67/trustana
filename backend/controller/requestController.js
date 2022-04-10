import { mongooseRequestSchema } from '../model/requestSchema.js';
import { callRequest } from '../service/requestService.js';

const requestController = {
  addRequest(data) {
    return new Promise((resolve, reject) => {
      console.log(data);
      const request = mongooseRequestSchema(data);
      callRequest(request);

      // Save the request on bdd
      request
        .save()
        .then(function () {
          resolve({ status: 200, message: 'Request inserted Successfully' });
        })
        .catch(function (err) {
          reject({ status: 500, message: `Error ${err}` });
        });
    });
  },
  getRequest(data) {
    return new Promise((resolve) => {
      resolve({ status: 200, message: 'TODO' });
    });
  },
};

export default requestController;
