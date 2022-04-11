import 'dotenv/config';

export const EXPRESS_CONF = {
  port: process.env.EXPRESS_PORT,
};

export const MONGO_CONF = {
  databaseURL: process.env.MONGO_URL,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
};

export const MAILGUN_CONF = {
  baseUrl: process.env.MAILGUN_URL,
  domain: process.env.MAILGUN_DOMAIN,
  api_key: process.env.MAILGUN_API_KEY,
};
