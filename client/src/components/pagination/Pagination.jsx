import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import { PaginationItems } from "..";
import usePagination from "../../hooks/usePagination";
const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, +params.get("page") || 1);
  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = +import.meta.env.VITE_LIMIT || 10;
    const start = Math.min((currentPage - 1) * pageSize + 1, totalCount);

    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start} - ${end}`;
  };
  return (
    <div className="flex items-center w-full justify-between">
      {!params.get("page") && (
        <span className="text-sm italic">{`${totalCount !== 0 ? "Show products 1" : `Show products 0`} - ${Math.min(
          import.meta.env.VITE_LIMIT,
          totalCount
        )} of ${totalCount}`}</span>
      )}
      {params.get("page") && <span className="text-sm italic">{`Show products ${range()} of ${totalCount}`}</span>}
      <div className="flex items-center">
        {pagination?.map((el, idx) => (
          <PaginationItems key={idx}>{el}</PaginationItems>
        ))}
      </div>
    </div>
  );
};

export default memo(Pagination);
