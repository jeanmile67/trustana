import mongoose from 'mongoose';

const requestResultSchema = new mongoose.Schema({
  agendaJobId: mongoose.ObjectId,
  url: {
    type: String,
    require: true,
  },
  statusCode: Number,
  duration: Number,
  statusText: String,
  alertSent: Boolean,
  created: { type: Date, default: Date.now },
});

export const mongooseRequestResultSchema = mongoose.model('request_result', requestResultSchema);
