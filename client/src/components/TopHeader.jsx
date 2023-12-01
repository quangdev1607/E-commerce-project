import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrent } from "../store/user/asyncActions";
import { logout } from "../store/user/userSlice";
import icons from "../utils/icons";
import path from "../utils/path";

const TopHeader = () => {
  const { GrLogout } = icons;
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) dispatch(getCurrent());
  }, [dispatch, isLoggedIn]);
  return (
    <div className=" flex items-center justify-center w-full h-[38px] bg-main text-white text-xs">
      <div className="w-main flex items-center justify-between">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <span>
              Welcome {current?.firstname} {current?.lastname}
            </span>
            <span onClick={() => dispatch(logout())}>
              <GrLogout className=" hover:opacity-70 cursor-pointer" />
            </span>
          </div>
        ) : (
          <Link className="hover:text-black" to={`/${path.LOGIN}`}>
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
