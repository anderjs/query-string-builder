/**
 * @param {number} numberOfPages total of pages to build in array.
 */
 function paginationArray(numberOfPages) {
  return typeof numberOfPages === 'number' ?
    Array(numberOfPages).fill(null).map((_, index) => index + 1) : []
};

module.exports = {
  paginationArray
};



