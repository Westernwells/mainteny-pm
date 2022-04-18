export const formatSearchParamsPageIndex = (
  pageIndex: number,
  queryParams: URLSearchParams,
) => {
  const currentParams = Object.fromEntries([...queryParams]);
  return {...currentParams, pageIndex: pageIndex.toString()};
};

export const formatSearchParamsPageSize = (
  newPageSize: number,
  queryParams: URLSearchParams,
) => {
  const currentParams = Object.fromEntries([...queryParams]);
  return {...currentParams, pageSize: newPageSize.toString()};
};
