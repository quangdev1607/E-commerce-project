import { memo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createSlug } from "../../utils/helpers";
const Sidebar = () => {
  const { categories } = useSelector((state) => state.app);
  return (
    <div>
      <div className="border flex flex-col items-center">
        <div className="w-full px-5 py-3 bg-main text-white">
          <h3 className="text-lg font-semibold uppercase">ALL Collections</h3>
        </div>

        {categories.map((item) => (
          <NavLink
            key={item._id}
            to={createSlug(item.category)}
            className="px-5 py-4 w-full text-[14px] hover:text-main"
          >
            {item.category}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default memo(Sidebar);
