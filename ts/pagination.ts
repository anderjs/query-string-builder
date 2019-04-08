function paginationArray(numberOfPages: number): number[] {
  return Array(numberOfPages).fill(null).map((_, index) => index + 1);
};

function paginationOffset(currentPage: number, numOfPages: number[], offsetLeft: number, offsetRight: number): number [] {
  const size: number = numOfPages.length;
  return numOfPages.filter((page) => {
    return page >= Math.max(1, currentPage - offsetLeft) && page <= Math.min(size, currentPage + offsetRight);
  });
};