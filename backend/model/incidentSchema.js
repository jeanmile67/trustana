import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  url: {
    type: String,
    require: true,
  },
  agendaJobId: mongoose.ObjectId,
  params: JSON,
  statusCode: Number,
  statusText: String,
  alertSent: Boolean,
  created: { type: Date, default: Date.now },
});

export const mongooseIncidentSchema = mongoose.model('incident', incidentSchema);
