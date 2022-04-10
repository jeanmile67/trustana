import { mongooseRequestResultSchema } from '../model/requestResultSchema.js';

// Save frontend request on mongo
export const saveRequest = () => {};
// const futureRequest = requestSchema
//   .save()
//   .then(() => {
//     resolve({ status: 200, message: 'Request inserted Successfully' });
//   })
//   .catch((err) => {
//     reject({ status: 500, message: `Error ${err}` });
//   });

// Save result on mongo
export const saveRequestResult = async (data) => {
  const requestResultSchema = mongooseRequestResultSchema(data);
  
  return new Promise((resolve, reject) => {
    requestResultSchema
      .save()
      .then(() => {
        resolve({ status: 200, message: 'Result inserted Successfully' });
      })
      .catch((err) => {
        reject({ status: 500, message: `Error ${err}` });
      });
  });
};
