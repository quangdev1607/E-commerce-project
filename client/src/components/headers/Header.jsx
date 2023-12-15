import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import withBaseComponent from "../../hocs/withBaseComponent";
import { showCartModal } from "../../store/app/appSlice";
import icons from "../../utils/icons";
import path from "../../utils/path";
const Header = ({ dispatch }) => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);

  const { FaPhone, IoIosMail, FaUser, FaShoppingCart } = icons;

  useEffect(() => {
    const handleClickOutSide = (e) => {
      const profilePanel = document.getElementById("profile-panel");
      if (!profilePanel?.contains(e.target)) setIsShowOption(false);
    };
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);
  return (
    <div className=" w-main h-[110px] py-[34px] flex justify-between ">
      <Link to={`/${path.HOME}`}>
        <img className="w-[234px] object-contain" src={logo} alt="logo" />
      </Link>
      <div className="flex text-[13px]">
        <div className="flex flex-col items-center px-5 border-r">
          <span className="flex gap-3 items-center">
            <FaPhone color="red" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span className="font-light text-xs">Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        {/* ----------------------------------------------------------------------- */}
        <div className="flex flex-col items-center px-5 border-r">
          <span className="flex gap-3 items-center">
            <IoIosMail color="red" />
            <span className="text-[13px] font-semibold ">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span className="font-light text-xs ">Online Support 24/7</span>
        </div>
        {/* ----------------------------------------------------------------------- */}
        {current && (
          <>
            <div className="flex items-center border-r px-5 ">
              <span onClick={() => dispatch(showCartModal())} className="flex gap-3 items-center cursor-pointer">
                <FaShoppingCart color="red" className="w-[20px] h-[20px]" />
                <span className="text-medium">
                  {current?.cart.length > 0 ? `${current?.cart.length} items` : "0 item"}
                </span>
              </span>
            </div>
            <div
              onClick={() => setIsShowOption((prev) => !prev)}
              id="profile-panel"
              className={`relative flex items-center px-6 gap-2  cursor-pointer  ${!current && `disabled-link`}`}
            >
              <FaUser color="red" className="w-[20px] h-[20px]" />
              {isShowOption && (
                <div className="flex flex-col gap-2  absolute top-full left-0 bg-gray-100 border min-w-[150px]">
                  <Link className="p-3 w-full hover:bg-sky-300" to={`/${path.MEMBER}/${path.PERSONAL}`}>
                    Personal
                  </Link>
                  {current?.role === "admin" && (
                    <Link className="p-3 w-full hover:bg-sky-300" to={`/${path.ADMIN}/${path.DASHBOARD}`}>
                      Admin
                    </Link>
                  )}
                </div>
              )}
            </div>
            {/* ----------------------------------------------------------------------- */}
          </>
        )}
      </div>
    </div>
  );
};

export default withBaseComponent(memo(Header));
