import axios from 'axios';
import { MAILGUN_CONF } from '../config.js';

const mailgun = {
  baseUrl: MAILGUN_CONF.baseUrl,
  domain: MAILGUN_CONF.domain,
  apiKey: MAILGUN_CONF.api_key,
};

export const sendErrorEmail = async (message, subject, receivers) => {
  return axios({
    method: 'post',
    url: `${mailgun.baseUrl}/${mailgun.domain}/messages`,
    auth: {
      username: 'api',
      password: mailgun.apiKey,
    },
    params: {
      from: 'Trustana Case Study <casestudy@trustana.com>',
      to: receivers.map((receiver) => receiver.mail),
      subject: subject,
      text: message,
    },
  });
};