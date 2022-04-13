import { agenda } from './index.js';

export const schedule = {
  requestApi: async (requestData) => {
    return agenda.create('request-api', requestData).repeatEvery(`${requestData.data.frequency} minute`).save();
  },
};
