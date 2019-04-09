const createQueryParameters = require('../lib/query-string');

const queryString = Object.freeze({
  build(properties) {
    return createQueryParameters({...properties});
  }
});

queryString.build({}).forEach((value, index, queryString) => {

});