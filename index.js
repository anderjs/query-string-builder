const http = require('./lib/http');

const queryString = Object.freeze({
  build(properties) {
    return http.createUrlParameters(properties) 
  }
});

let s = queryString.build({
  search: 'search',
  queries: [
    { key: 'products', value: 'samsung'}
  ],
  encode: false
});

console.log(s);

module.export = queryString;