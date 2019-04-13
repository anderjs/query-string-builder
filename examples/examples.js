const queryString = require('../lib/query-string');

const queryStringObject = queryString.build({
  search: 'q',
  queries: [
    { key: 'newsfeed', value: 'USA', validation: 1 === 1 },
    { key: 'about', value: 'javascript' }
  ],
  encode: true
});
console.log(queryStringObject.get('newsfeed'));