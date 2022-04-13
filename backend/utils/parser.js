import _ from 'lodash';

export const parseRequest = (reqBody, reqAuth) => {
  // Extract : url, method, frequency
  const { url, method, frequency, ...restBodyData } = reqBody;

  const mainData = {
    url,
    method: method ? method : 'GET',
    frequency: frequency ? frequency : 1,
  };

  // Extract custom header, customer header start with h: (example {'h:customerHeader": "json"})
  const customerHeaders = _.chain(restBodyData)
    .pickBy((value, key) => _.startsWith(key, 'h:'))
    .mapKeys((value, key) => key.slice(2))
    .value();

  // Extract custom header, customer header start with v: (example {'v:customerData": "json"})
  const customerPayload = _.chain(restBodyData)
    .pickBy((value, key) => _.startsWith(key, 'v:'))
    .mapKeys((value, key) => key.slice(2))
    .value();

  return {
    data: mainData,
    headers: customerHeaders,
    payload: customerPayload,
    auth: reqAuth?.authorization,
  };
};
