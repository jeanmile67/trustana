// import { schedule } from '../service/jobs/scheduler.js';
// import { saveRequestQuery } from '../service/mongoService.js';

// const getController = {
//   addRequest(data) {
//     return new Promise((resolve, reject) => {
//       console.log('requestController', data);

//       // Save the request on bdd
//       const futureSaveQuery = saveRequestQuery(data);

//       // Create request job
//       const futureJob = schedule
//         .requestApi(data)
//         .then(() => {
//           return resolve({ status: 200, message: 'Job launch Successfully' });
//         })
//         .catch((err) => {
//           return reject({ status: 500, message: `Error ${err}` });
//         });

//       return Promise.all([futureSaveQuery, futureJob]);
//     });
//   },
// };

// export default requestController;
