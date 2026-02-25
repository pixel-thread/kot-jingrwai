import { DEFAULT_PAGE_SIZE } from "./paginationOptions";

type GetMetaProps = {
  total: number;
  currentPage: number;
};
export const getMeta = ({ total, currentPage }: GetMetaProps) => {
  const totalPages = Math.ceil(total / DEFAULT_PAGE_SIZE);

  return {
    total,
    page: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};
