import clsx from "clsx";
import { memo } from "react";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";

const PaginationItems = ({ children }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const handlePagination = () => {
    const queries = Object.fromEntries([...params]);
    // let param = [];
    // for (let i of params.entries()) param.push(i);
    // const queries = {};
    // for (let i of param) {
    //   queries[i[0]] = i[1];
    // }
    if (Number(children)) queries.page = children;
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  };
  return (
    <button
      type="button"
      className={clsx(
        "p-4 w-10 h-10 flex items-center justify-center",
        Number(children) && "hover:rounded-full hover:bg-gray-300 cursor-pointer",
        +params.get("page") === +children && "rounded-full bg-gray-300",
        !+params.get("page") && children === 1 && "rounded-full bg-gray-300"
      )}
      onClick={handlePagination}
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
};

export default memo(PaginationItems);
