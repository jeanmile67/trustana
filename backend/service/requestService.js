import axiosInstance from '../utils/axios.js';
import {saveRequestResult} from '../service/mongoService.js'

// request : url, method, header, payload, auth
export const callRequest = async (request) => {
  console.log(request)
  const { method, url } = request;

  const futureResultRequest = await axiosInstance({
    method,
    url,
  }).then((response) => {
    return { statusCode: response.status, duration: response.duration };
  })
  .catch((error) => {
    console.log(error.toJSON());
    return error.toJSON();
  });

  saveRequestResult({ url, created: new Date(), ...futureResultRequest });
};

const requestService = {
  requestApi: async (request) => callRequest(request),
};

export default requestService;
