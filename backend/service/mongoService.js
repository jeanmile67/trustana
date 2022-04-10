import mongoose from 'mongoose';
import { mongooseRequestQuerySchema } from '../model/requestQuerySchema.js';
import { mongooseRequestResultSchema } from '../model/requestResultSchema.js';

// Save frontend request on mongo
export const saveRequestQuery = async (data) => {
  const requestQuerySchema = mongooseRequestQuerySchema(data);

  return new Promise((resolve, reject) => {
    requestQuerySchema
      .save()
      .then(() => resolve({ status: 200, message: 'Query inserted Successfully' }))
      .catch((err) => reject({ status: 500, message: `Error ${err}` }));
  });
};

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

// Get result from a Job
export const getResultByJob = async (jobId) => {
  console.log('inside getResultByJob', jobId);
  const query = { agendaJobId: new mongoose.Types.ObjectId(jobId) };

  return new Promise((resolve, reject) => {
    mongooseRequestResultSchema
      .find(query)
      .limit(100)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
