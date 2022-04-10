import { Agenda } from 'agenda/es.js';
import mongoose from 'mongoose';
import allDefinitions from './definition.js';

const connectionOpts = {
  mongo: mongoose.connection,
  db: { collection: 'agenda_jobs' },
};

export const agenda = new Agenda(connectionOpts);

// Define all agenda jobs
allDefinitions(agenda);

// logs all registered jobs
console.log({ jobs: agenda._definitions });
