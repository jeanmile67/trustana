import mongoose from 'mongoose';

const requestQuerySchema = new mongoose.Schema({
  agendaJobId: mongoose.ObjectId,
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


export const mongooseRequestQuerySchema = mongoose.model('request_query', requestQuerySchema);

export default requestQuerySchema;
