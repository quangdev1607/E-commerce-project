import { memo } from "react";
import { NavLink } from "react-router-dom";
import { navigations } from "../../utils/constants";

const Navigation = () => {
  return (
    <div className="border-y w-main h-[48px] py-2 flex justify-between items-center ">
      <div>
        {navigations.map((el) => (
          <NavLink className="pr-12 hover:text-main " key={el.id} to={el.path}>
            {el.value}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default memo(Navigation);
