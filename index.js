const http = require('./lib/http');

/**
 * @function HTTP provides a useful resources for HTTP resources.
 * @returns {object} =>
 * @type {object} url
 * @property {function} buildQueryString
 */
const HTTP = () => {
  return Object.freeze({
    url: {
      buildQueryString(properties) { return http.createUrlParameters(properties) },
    }
  });
};

module.export = HTTP;