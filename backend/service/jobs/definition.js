import JobHandlers from './handlers.js';

const requestDefinitions = (agenda) => {
  agenda.define('request-api', JobHandlers.requestApi);
};

const definitions = [requestDefinitions];

const allDefinitions = (agenda) => {
  definitions.forEach((definition) => definition(agenda));
};

export default allDefinitions;
