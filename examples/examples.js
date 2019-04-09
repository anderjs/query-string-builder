const utils = require('../index');

const newsfeedIsSelected = true;
const queryString = utils.HTTP.URL.buildQueryString({
  encode: true, 
  search: 'search',
  data: [
    { key: 'newsfeed', value: 'venezuela' },
    { key: 'about', value: 'politics' }
  ]
});