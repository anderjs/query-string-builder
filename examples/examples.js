const utils = require('../index');

const newsfeedIsSelected = true;
const queryString = utils.HTTP.URL.buildQueryString({
  encode: true, 
  search: 'search',
  data: [
    { key: 'newsfeed', value: 'venezuela', validation: newsfeedIsSelected },
    { key: 'about', value: 'Nicolas Maldito Maduro' }
  ]
}).set({
  key: 'government',
  value: 'australia',
  validate: true
});