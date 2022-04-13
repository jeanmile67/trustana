import _ from 'lodash';
import axiosInstance from '../utils/axios.js';
import { saveRequestResult, getAllReceiverEmail, getLatestResultByJobId } from '../service/mongoService.js';
import { sendErrorEmail } from '../service/mailService.js';

// request : url, method, header, payload, auth
export const callRequest = async (request, agendaJobId) => {
  const { data, headers, payload, auth } = request;

  const { method, url } = data;

  const futureResultRequest = await axiosInstance({
    method,
    url,
    headers: { headers, auth },
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
      errorHandler(error, agendaJobId);
      return {
        statusCode: error.response.status,
        statusText: error.response.statusText,
      };
    });

  saveRequestResult({ agendaJobId, url, created: new Date(), ...futureResultRequest });
};

const errorHandler = async (currentError, jobId) => {
  const latestRequestResult = await getLatestResultByJobId(jobId).then((res) => _.head(res));

  // We send an email if the previous status is different then the current status code error
  if (latestRequestResult?.statusCode !== currentError?.response?.status) {
    getAllReceiverEmail()
      .then((receivers) => {
        sendErrorEmail(currentError, receivers)
          .then(() => console.log('sending mail'))
          .catch((error) => console.log('error sending mail', error));
      })
      .catch((error) => console.log(`Error retreive recivers : ${error}`));
  }
};

const requestService = {
  requestApi: async (request, agendaJobId) => callRequest(request, agendaJobId),
};

export default requestService;
