const utils = require('../index');

const queryString = utils.http.url.buildQueryString({
  encode: true, 
  search: 'q',
  data: [
    { key: 'results', value: 'google analythics' }
  ]
});

console.log(queryString);