import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getCurrent } from "../../store/user/asyncActions";
import { clearMessage, logout } from "../../store/user/userSlice";
import icons from "../../utils/icons";
import path from "../../utils/path";

const TopHeader = () => {
  const { GrLogout } = icons;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, current, msg } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
      return () => {
        clearTimeout(setTimeoutId);
      };
    }, 1000);
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (msg)
      Swal.fire({
        title: "Oops",
        text: msg,
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Maybe later...",
      }).then((rs) => {
        if (rs.isConfirmed) {
          dispatch(clearMessage());
          navigate(`/${path.LOGIN}`);
        } else {
          dispatch(clearMessage());
        }
      });
  }, [msg]);
  return (
    <div className=" flex items-center justify-center w-full h-[38px] bg-main text-white text-xs">
      <div className="w-main flex items-center justify-between">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        {isLoggedIn && current ? (
          <div className="flex items-center gap-2">
            <span>
              Welcome {current?.firstname} {current?.lastname}
            </span>
            <span
              onClick={() => {
                navigate(`/${path.HOME}`);
                dispatch(logout());
              }}
            >
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
