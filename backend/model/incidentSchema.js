import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  agendaJobId: mongoose.ObjectId,
  request: JSON,
  error: JSON,
  created: { type: Date, default: Date.now },
});

export const mongooseIncidentSchema = mongoose.model('incident', incidentSchema);
