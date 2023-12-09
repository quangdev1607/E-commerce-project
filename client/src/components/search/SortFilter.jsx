import { memo } from "react";
import { options } from "../../utils/constants";

const SortFilter = ({ value, changeSortValue }) => {
  return (
    <div className="flex flex-col gap-4 pr-2 ">
      <label htmlFor="sortItems">Sort by:</label>
      <select
        value={value}
        onChange={(e) => changeSortValue(e.target.value)}
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

export default memo(SortFilter);
