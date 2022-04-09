import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  url: {
    type: String,
    require: true,
  },
  method: {
    type: ['GET', 'POST', 'PUT', 'DELETE'],
    default: 'GET',
  },
  header: String,
  payload: String,
  auth: String,
  created: { type: Date, default: Date.now() },
});

mongoose.model('Request', requestSchema);

export default requestSchema;
