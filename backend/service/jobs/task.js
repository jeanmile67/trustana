// import { Agenda } from 'agenda/es';
import cron from 'node-cron';
// import axiosInstance from '../../../utils/axios.js';
import { formatISO9075 } from 'date-fns';

const EVERY_30_SECONDS = '*/30 * * * * *';
const EVERY_MINUTES = '* * * * *';
const EVERY_5_MINUTES = '*/5 * * * *';
const EVERY_15_MINUTES = '*/15 * * * *';
const EVERY_30_MINUTES = '*/30 * * * *';
const EVERY_HOUR = '* */1 * * *';

// const mongoConnectionString = 'mongodb://localhost:27017/trustana';
// const agenda = new Agenda({ db: { address: mongoConnectionString }, collection: 'agendaJobs' });

// agenda.define('printEveryMinute', async () => {
//   console.log('running agenda a task');
//   console.log('Job done');
// });
// agenda.every('Every minutes', 'printEveryMinute');

// (async function () {
//   await agenda.start();
//   await agenda.every('1 month', 'print agenda every minutes');
// })();

const pingTask = (frequency) => {
  const pingSchedule = cron.schedule(getFrequency(frequency), () => {
    console.log('running a task every minute');
    console.log(formatISO9075(Date.now(), { representation: 'time' }));
  });

  pingSchedule.start();
};

const getFrequency = (frequency) => {
  switch (frequency) {
    case 0.5:
      return EVERY_30_SECONDS;
    case 5:
      return EVERY_5_MINUTES;
    case 15:
      return EVERY_15_MINUTES;
    case 30:
      return EVERY_30_MINUTES;
    case 60:
      return EVERY_HOUR;
    default:
      return EVERY_MINUTES;
  }
};

// request : url, method, header, payload, auth
export const callRequest = async (request) => {
  // const { method, url, frequency } = request;

  // console.log(method);
  // console.log(url);
  // console.log(frequency);

  // await axiosInstance({
  //   method,
  //   url,
  // })
  //   .then((response) => {
  //     console.log(response.status);
  //     console.log(response.duration);
  //     // pingTask.start(frequency);
  //     return JSON.stringify({ status: response.status, duration: response.duration });
  //   })
  //   .catch((error) => {
  //     console.log(error.toJSON());
  //     return error.toJSON();
  //   });

  console.log('coucou je fais un ping');
};

// agenda.on('ready', () => console.log('Agenda started!')).on('error', () => console.log('Agenda connection error!'));

// // define all agenda jobs
// allDefinitions(agenda);

// // logs all registered jobs
// console.log({ jobs: agenda._definitions });

export default pingTask;
