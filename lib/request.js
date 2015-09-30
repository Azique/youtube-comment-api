var debug = require('debug')('request');
var rp = require('request-promise');
var cookieJar = rp.jar();
var request = rp.defaults({
  jar: cookieJar,
  resolveWithFullResponse: true
});

module.exports = {
  'get': getRequest,
  'post': postRequest,
  'CookieJar': cookieJar
};

function getRequest(url) {
  debug('GET %s', url);
  return sendRequest({
    method: 'GET',
    url: url
  });
}

function postRequest(url, form) {
  debug('POST %s %s', url, JSON.stringify(form));
  return sendRequest({
    method: 'POST',
    url: url,
    form: form
  });
}

function sendRequest(options) {
  return request(options).then(function(response) {
    if (!response) {
      throw new Error('Request failed. Empty response.');
    }
    if (response.statusCode !== 200) {
      var e = new Error('Request failed ' + request.statusCode);
      e.status = response.statusCode;
      throw e;
    }
    var body = response.body.toString();
    debug('response received, length: %d', body.length);
    return body
  });
}
