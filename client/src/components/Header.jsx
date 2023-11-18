import React from "react";
import logo from "../assets/logo.png";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import path from "../utils/path";

const Header = () => {
	const { FaPhone, IoIosMail, FaUser, FaShoppingCart } = icons;
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
				<div className="flex items-center px-5 border-r">
					<FaUser color="red" className="w-[20px] h-[20px]" />
				</div>
				{/* ----------------------------------------------------------------------- */}
				<div className="flex items-center px-5 ">
					<span className="flex gap-3 items-center">
						<FaShoppingCart color="red" className="w-[20px] h-[20px]" />
						<span className="text-medium">0 item(s)</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Header;
