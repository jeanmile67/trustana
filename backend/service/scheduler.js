import cron from 'node-cron';
import { formatISO9075 } from 'date-fns';

const EVERY_30_SECONDS = '*/30 * * * * *';
const EVERY_MINUTES = '* * * * *';
const EVERY_5_MINUTES = '*/5 * * * *';
const EVERY_15_MINUTES = '*/15 * * * *';
const EVERY_30_MINUTES = '*/30 * * * *';
const EVERY_HOUR = '* */1 * * *';

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

export default pingTask;
