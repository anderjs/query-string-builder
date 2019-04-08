/**
 * @param {number} numberOfPages total of pages to build in array.
 */
 function paginationArray(numberOfPages) {
  return typeof numberOfPages === 'number' ?
    Array(numberOfPages).fill(null).map((_, index) => index + 1) : []
  };
  
  
  /**
   * 
   * @param {number} currentPage 
   * @param {array} arrayOfPages 
   * @param {number} offsetLeft 
   * @param {offsetRight} offsetRight 
   * @description
   * Shows an array of pagination with and offset with left, right.
   * @example
   * paginationOffset(1, [1, 2, 3, 4, 5], 2, 2)
   * ouput: [1, 2, 3]
   */
  function paginationOffset (currentPage, numOfPages, offsetLeft, offsetRight) {
    const size = arrayOfPages.length;
    return numOfPages.filter((page) => {
      return page >= Math.max(1, currentPage - offsetLeft) && page <= Math.min(size, currentPage + offsetRight);
    });
  };

module.exports = {
  paginationArray,
  paginationOffset
};



