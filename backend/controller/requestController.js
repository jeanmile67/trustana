import { mongooseRequestSchema } from '../model/requestSchema.js';

const requestController = {
  addRequest(data) {
    return new Promise((resolve, reject) => {
      console.log(data);
      const Request = mongooseRequestSchema(data);
      Request.save()
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
