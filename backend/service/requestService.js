import _ from 'lodash';
import axiosInstance from '../utils/axios.js';
import {
  saveRequestResult,
  getAllReceiverEmail,
  getLatestResultByJobId,
  saveIncident,
} from '../service/mongoService.js';
import { sendErrorEmail } from '../service/mailService.js';
import { sendErrorSMS } from './SMSService.js';

// request : url, method, header, payload, auth
export const callRequest = async (request, agendaJobId) => {
  const { data, headers, payload, auth } = request;
  const { method, url } = data;

  const axiosOption = {
    method,
    url,
    ...(!auth || (!headers && { headers: { auth, ...headers } })),
    ...(!payload && { data: payload }),
  };

  const futureResultRequest = await axiosInstance(axiosOption)
    .then((response) => {
      return {
        statusCode: response.status,
        duration: response.duration,
        statusText: response.statusText,
      };
    })
    .catch((error) => {
      // Check if the server give a response, otherwise we took the axios error code and text
      const errorStatusCode = _.get(error, 'response.status', error.errno);
      const errorStatusText = _.get(error, 'response.statusText', error.code);

      const errors = {
        startTime: error.config.metadata.startTime,
        statusCode: errorStatusCode,
        statusText: errorStatusText,
      };

      errorHandler(request, errors, agendaJobId);

      return errors;
    });

  saveRequestResult({ agendaJobId, url, created: new Date(), ...futureResultRequest });
};

const errorHandler = async (request, currentError, jobId) => {
  const latestRequestResult = await getLatestResultByJobId(jobId).then((res) => _.head(res));

  // We send an email if the previous status is different then the current status code error
  if (latestRequestResult?.statusCode !== currentError.statusCode) {
    console.log(`========> New incident Job : ${jobId}!`);
    getAllReceiverEmail()
      .then((receivers) => {
        if (!_.isEmpty(receivers)) {
          const { startTime, statusCode, statusText } = currentError;
          const url = request.data.url;
          const message = `Error on ${request.data.url} at ${startTime} with code ${statusCode} (${statusText})`;
          const subject = `Error on ${url} at ${startTime}`;

          // sending SMS with Mailgun
          sendErrorEmail(message, subject, receivers)
            .then(() => console.log('Sending mail'))
            .catch((error) => console.log('Error sending mail', error));

          // sending SMS with Twilio
          // sendErrorSMS(message);
        }
      })
      .catch((error) => console.log(`Error during the fetching of receivers : ${error}`));

    // save incident into database
    await saveIncident(request, currentError, jobId);
  }
};

const requestService = {
  requestApi: async (request, agendaJobId) => callRequest(request, agendaJobId),
};

export default requestService;
