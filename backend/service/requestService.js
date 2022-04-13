import _ from 'lodash';
import axiosInstance from '../utils/axios.js';
import {
  saveRequestResult,
  getAllReceiverEmail,
  getLatestResultByJobId,
  saveIncident,
} from '../service/mongoService.js';
import { sendErrorEmail } from '../service/mailService.js';

// request : url, method, header, payload, auth
export const callRequest = async (request, agendaJobId) => {
  const { data, headers, payload, auth } = request;

  const { method, url } = data;

  const futureResultRequest = await axiosInstance({
    method,
    url,
    headers: { auth, ...headers },
    data: payload,
  })
    .then((response) => {
      return {
        statusCode: response.status,
        duration: response.duration,
        statusText: response.statusText,
      };
    })
    .catch((error) => {
      // Check if the server give a response, otherwise we took the axis error code and text
      const errorStatusCode = _.get(error, 'response.status', error.errno);
      const errorStatusText = _.get(error, 'response.statusText', error.code);

      errorHandler(request, error, agendaJobId);

      // server no response, we use axios error code and text
      return {
        statusCode: errorStatusCode,
        statusText: errorStatusText,
      };
    });

  saveRequestResult({ agendaJobId, url, created: new Date(), ...futureResultRequest });
};

const errorHandler = async (request, currentError, jobId) => {
  const latestRequestResult = await getLatestResultByJobId(jobId).then((res) => _.head(res));

  // We send an email if the previous status is different then the current status code error
  const currentErrorStatus = _.get(currentError, 'response.status', currentError.errno);

  if (latestRequestResult?.statusCode !== currentErrorStatus) {
    getAllReceiverEmail()
      .then((receivers) => {
        sendErrorEmail(currentError, receivers)
          .then(() => console.log('Sending mail'))
          .catch((error) => console.log('Error sending mail', error));
      })
      .catch((error) => console.log(`Error retreive recivers : ${error}`));

    // save incident into database
    await saveIncident(request, currentError, jobId);
  }
};

const requestService = {
  requestApi: async (request, agendaJobId) => callRequest(request, agendaJobId),
};

export default requestService;
