import clsx from "clsx";
import { Fragment, memo, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import avatar from "../../assets/avatar-default.jpg";
import logo from "../../assets/logo.png";
import { memberSideBarItems } from "../../utils/memberConstants";
import path from "../../utils/path";

const activeStyles = "px-4 py-2 flex items-center gap-2  bg-gray-300";
const notActiveStyles = "px-4 py-2 flex items-center gap-2  hover:bg-gray-300";

const MemberSideBar = () => {
  const { current } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [actived, setActived] = useState([]);
  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === tabID)) setActived((prev) => prev.filter((el) => el !== tabID));
    else setActived((prev) => [...prev, tabID]);
  };
  return (
    <div className=" bg-white h-full py-4">
      <div className="flex flex-col justify-center items-center p-2 mb-4 ">
        <img className="w-[200px]  object-contain cursor-pointer" src={current?.avatar || avatar} alt="avatar" />
        <small className=" pt-2 font-medium text-base tracking-wide">{`${current?.firstname} ${current?.lastname}`}</small>
        <small className={clsx(current?.isBlocked && "text-[20px] text-main font-medium", "text-sm text-green-400")}>
          {current?.isBlocked ? "Blocked" : "Active"}
        </small>
        <small className="text-sm font-bold">{current?.role.toUpperCase()}</small>
      </div>
      <div>
        {memberSideBarItems.map((el) => (
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
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(MemberSideBar);
