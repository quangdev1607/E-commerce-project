import React, { memo } from "react";
import { Link } from "react-router-dom";
import path from "../utils/path";

const TopHeader = () => {
	return (
		<div className=" flex items-center justify-center w-full h-[38px] bg-main text-white text-xs">
			<div className="w-main flex items-center justify-between">
				<span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
				<Link className="hover:text-black" to={`/${path.LOGIN}`}>
					Sign In or Create Account
				</Link>
			</div>
		</div>
	);
};

export default memo(TopHeader);
