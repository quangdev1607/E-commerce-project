import { memo, useCallback, useEffect, useState } from "react";
import { createSearchParams, useParams, useSearchParams } from "react-router-dom";
import withBaseComponent from "../../hocs/withBaseComponent";
import { options } from "../../utils/constants";

const SortFilter = ({ navigate }) => {
  const [sort, setSort] = useState("");
  const { category } = useParams();
  const [params] = useSearchParams();

  const handleSortSelect = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    console.log(queries);
    if (sort !== "") {
      queries.sort = sort;
      navigate({
        pathname: `/${category}`,
        search: createSearchParams(queries).toString(),
      });
    }
  }, [sort]);
  return (
    <div className="flex flex-col gap-4 pr-2 ">
      <label htmlFor="sortItems">Sort by:</label>
      <select
        value={sort}
        onChange={(e) => handleSortSelect(e.target.value)}
        id="sortItems"
        className="bg-gray-50 border border-gray-300 p-1"
      >
        <option value={""}>--Choose an option--</option>
        {options.map((el) => (
          <option key={el.id} value={el.value}>
            {el.text}
          </option>
        ))}
      </select>
    </div>
  );
};
export default withBaseComponent(memo(SortFilter));
