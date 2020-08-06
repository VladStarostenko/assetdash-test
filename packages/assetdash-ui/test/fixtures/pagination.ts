export const pagination = {
  total: 3,
  lastPage: 1,
  perPage: 100,
  currentPage: 1,
  from: 0,
  to: 3
};

export function page(pageNumber: number, ofTotal = 3) {
  return {
    ...pagination,
    currentPage: pageNumber,
    lastPage: ofTotal
  };
}
