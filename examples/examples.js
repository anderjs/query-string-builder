const createQueryParameters = require('../lib/queries');

const queryString = Object.freeze({
  build(properties) {
    return createQueryParameters({...properties});
  }
});

queryString.build({}).forEach((value, index, queryString) => {

});