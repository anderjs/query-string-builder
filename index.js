const queries = require('./lib/queries');

const queryString = Object.freeze({
  build(properties) {
    return queries.createQueryParameters({...properties});
  }
});
