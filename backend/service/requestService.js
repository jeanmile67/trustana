import axiosInstance from '../utils/axios.js';
import { saveRequestResult, getAllReceiverEmail } from '../service/mongoService.js';
import { sendErrorEmail } from '../service/mailService.js';

// request : url, method, header, payload, auth
export const callRequest = async (request, agendaJobId) => {
  const { method, url } = request;

  const futureResultRequest = await axiosInstance({
    method,
    url,
  })
    .then((response) => {
      return {
        statusCode: response.status,
        duration: response.duration,
        statusText: response.statusText,
      };
    })
    .catch((error) => {
      errorHandler(error);
      return {
        statusCode: error.response.status,
        statusText: error.response.statusText,
      };
    });

  saveRequestResult({ agendaJobId, url, created: new Date(), ...futureResultRequest });
};

const errorHandler = (error) => {
  console.log('inside errorHandler');
  getAllReceiverEmail()
    .then((receivers) => {
      sendErrorEmail(error, receivers)
        .then(() => console.log('sending mail'))
        .catch((error) => console.log('error sending mail', error));
    })
    .catch((error) => console.log(`Error retreive recivers : ${error}`));
};

const requestService = {
  requestApi: async (request, agendaJobId) => callRequest(request, agendaJobId),
};

export default requestService;
