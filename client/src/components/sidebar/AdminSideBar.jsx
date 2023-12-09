import clsx from "clsx";
import { Fragment, memo, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { adminSideBarItems } from "../../utils/adminConstants";
import path from "../../utils/path";

const activeStyles = "px-4 py-2 flex items-center gap-2  bg-gray-300";
const notActiveStyles = "px-4 py-2 flex items-center gap-2  hover:bg-gray-300";

const AdminSideBar = () => {
  const navigate = useNavigate();
  const [actived, setActived] = useState([]);
  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === tabID)) setActived((prev) => prev.filter((el) => el !== tabID));
    else setActived((prev) => [...prev, tabID]);
  };
  return (
    <div className=" bg-white h-full py-4">
      <div className="flex flex-col justify-center items-center p-4 gap-2">
        <img
          onClick={() => navigate(`/${path.HOME}`)}
          className="w-[200px] object-contain cursor-pointer"
          src={logo}
          alt="logo"
        />
        <small className="font-medium text-base tracking-wide">Admin Workspace</small>
      </div>
      <div>
        {adminSideBarItems.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) => clsx(isActive && activeStyles, !isActive && notActiveStyles)}
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === "MULTIPLE" && (
              <div onClick={() => handleShowTabs(+el.id)} className="flex flex-col ">
                <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-600 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {actived.some((id) => +id === +el.id) ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />}
                </div>
                {actived.some((id) => +id === +el.id) && (
                  <div className="flex flex-col">
                    {el.subMenu.map((item) => (
                      <NavLink
                        key={item.text}
                        to={item.path}
                        onClick={(e) => e.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(isActive && activeStyles, !isActive && notActiveStyles, "pl-10")
                        }
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(AdminSideBar);
