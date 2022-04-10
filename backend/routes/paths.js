import express from 'express';
import requestController from '../controller/requestController.js';

export const router = express.Router();

router.post('/api/request', (req, res) => {
  requestController
    .addRequest(req.body)
    .then((data) => {
      res.status(data.status).send({ message: data });
    })
    .catch((err) => {
      res.status(err.status).send({ message: err.message });
    });
});

// router.get('/api/request', (req, res) => {
//   const dbConnect = dbo.getDb();

//   dbConnect
//     .collection('listingsAndReviews')
//     .find({})
//     .limit(50)
//     .toArray(function (err, result) {
//       if (err) {
//         res.status(400).send('Error fetching listings!');
//       } else {
//         res.json(result);
//       }
//     });
// });