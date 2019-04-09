const queryString = require('./lib/query-string');
const urlQueryString = queryString.build({
  search: 'q',
  queries: [
    { key: 'brands', value: 'diamond' },
  ],
  encode: true
});

console.log(urlQueryString.get('sdfasd'));