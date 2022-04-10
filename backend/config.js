import 'dotenv/config';

export const EXPRESS_CONF = {
  port: process.env.EXPRESS_PORT,
};

export const MONGO_CONF = {
  databaseURL: process.env.MONGO_URL,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
};
