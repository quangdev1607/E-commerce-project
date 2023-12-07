import React from "react";
import { useSearchParams } from "react-router-dom";
import { PaginationItems } from "../components";
import usePagination from "../hooks/usePagination";
const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, 2);
  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = +import.meta.env.VITE_LIMIT_PRODUCT || 10;
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start} - ${end}`;
  };
  return (
    <div className="flex items-center w-main justify-between">
      {!params.get("page") && (
        <span className="text-sm italic">{`Show products 1 - ${
          import.meta.env.VITE_LIMIT_PRODUCT || 10
        } of ${totalCount}`}</span>
      )}
      {params.get("page") && <span className="text-sm italic">{`Show products ${range()} of ${totalCount}`}</span>}
      <div className="flex items-center">
        {pagination?.map((el) => (
          <PaginationItems key={el}>{el}</PaginationItems>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
