import axiosInstance from '../utils/axios.js';
import {saveRequestResult} from '../service/mongoService.js'

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
      return {
        statusCode: error.response.status,
        statusText: error.response.statusText,
      };
    });

  saveRequestResult({ agendaJobId, url, created: new Date(), ...futureResultRequest });
};

const requestService = {
  requestApi: async (request, agendaJobId) => callRequest(request, agendaJobId),
};

export default requestService;
