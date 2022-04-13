import twilio from 'twilio';
import { TWILIO_CONF } from '../config.js';

const twilioConf = {
  accountSid: TWILIO_CONF.account_sid,
  authToken: TWILIO_CONF.auth_token,
};

const client = new twilio(twilioConf.accountSid, twilioConf.authToken);

export const sendErrorSMS = async (message) => {
  return client.messages
    .create({
      messagingServiceSid: 'MGdf5cfe341448333106d8329b0f038c67',
      body: message,
      to: '+84339074491',
    })
    .then((message) => console.log(message))
    .catch((error) => console.log(error))
    .done();
};
