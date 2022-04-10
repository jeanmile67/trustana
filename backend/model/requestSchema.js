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
  frequency: {
    type: Number,
    enum: [0.5, 1, 5, 15, 30, 60],
    default: 1,
  },
  header: String,
  payload: String,
  auth: String,
  created: { type: Date, default: Date.now },
});


export const mongooseRequestSchema = mongoose.model('request_query', requestSchema);

export default requestSchema;
