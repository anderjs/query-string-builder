const http = require('./lib/http');
const page = require('./lib/pagination');
/**
 * @function HTTP provides a useful resources for HTTP resources.
 * @returns {object} =>
 * @type {object} url
 * @property {function} buildQueryString
 */
const HTTP = () => {
  return Object.freeze({
    URL: {
      buildQueryString(properties) { return http.createUrlParameters(properties) },
    }
  });
};

const pagination = () => {
  return Object.freeze({
    arrayOf(numberOfPages) { return page.paginationArray(numberOfPages); },
    calculate(totalOfItems, itemsPerPage, getNumberOfPages = false) {
      let calc = Math.ceil(totalOfItems / itemsPerPage);
      if(!getNumberOfPages)  return calc;
      return this.arrayOf(calc);
    },
    offsetOf(currentPage, numOfPages, offsetLeft, offsetRight) {
      return page.paginationOffset(currentPage, numOfPages, offsetLeft, offsetRight);
    }
  });
};

module.exports = {
  HTTP: HTTP(),
  pagination: pagination()
};