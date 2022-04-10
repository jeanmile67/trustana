// import { Agenda } from 'agenda/es';
import axiosInstance from '../utils/axios.js';


// request : url, method, header, payload, auth
export const callRequest = async (request) => {
  console.log('inside callRequest', request);
  const { method, url } = request;

  // await axiosInstance({
  //   method,
  //   url,
  // })
  //   .then((response) => {
  //     console.log(response.status);
  //     console.log(response.duration);
  //     // pingTask.start(frequency);
  //     return JSON.stringify({ status: response.status, duration: response.duration });
  //   })
  //   .catch((error) => {
  //     console.log(error.toJSON());
  //     return error.toJSON();
  //   });

  console.log(`coucou je fais un ping sur ${url}, with ${method}`);
  return Promise.resolve(200);
};

const requestService = {
  requestApi: async (request) => callRequest(request),
};

// agenda.on('ready', () => console.log('Agenda started!')).on('error', () => console.log('Agenda connection error!'));

// // define all agenda jobs
// allDefinitions(agenda);

// // logs all registered jobs
// console.log({ jobs: agenda._definitions });

export default requestService;
