const http = require('./lib/http');

const HTTP = () => {
  return Object.freeze({
    url: {
      buildQueryString(model) { return http.createUrlParameters(model) },
    }
  });
};

var url = HTTP().url.buildQueryString({
  encode: true,
  search: 'search',
  data: [
    { key: 'q', value: 'btc to usd' }
  ]
});