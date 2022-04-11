import mongoose from 'mongoose';

const errorReceiverSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  mail: String,
  phone: String,
});

export const mongooseErrorReceiverSchema = mongoose.model('error_receivers', errorReceiverSchema);
