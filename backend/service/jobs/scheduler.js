import { agenda } from './index.js';

export const schedule = {
  requestApi: async (data) => {
    const frequency = data.frequency || 1
    agenda.create('request-api', data).repeatEvery(`${frequency} minute`).save()
  },
};
