import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  url: {
    type: String,
    require: true,
  },
  method: {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'DELETE'],
    default: 'GET',
  },
  header: String,
  payload: String,
  auth: String,
  created: { type: Date, default: Date.now() },
});


export const mongooseRequestSchema = mongoose.model('Request', requestSchema);

export default requestSchema;
