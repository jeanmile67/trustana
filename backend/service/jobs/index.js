import { Agenda } from 'agenda/es.js';
import mongoose from 'mongoose';
import allDefinitions from './definition.js';

export const agenda = new Agenda({
  mongo: mongoose.connection,
});

// Define all agenda jobs
allDefinitions(agenda);

// logs all registered jobs
console.log({ jobs: agenda._definitions });
