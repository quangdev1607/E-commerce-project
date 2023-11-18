import React from "react";
import { navigations } from "../utils/constants";
import { NavLink } from "react-router-dom";
import icons from "../utils/icons";

const Navigation = () => {
	const { FaArrowDown } = icons;
	return (
		<div className="border-y w-main h-[48px] py-2 flex justify-between items-center ">
			<div>
				{navigations.map((el) => (
					<NavLink
						className={({ isActive }) =>
							isActive ? "pr-12 hover:text-main text-main" : "pr-12 hover:text-main"
						}
						key={el.id}
						to={el.path}
					>
						{el.value}
					</NavLink>
				))}
			</div>
			<div>
				<p>Search Item</p>
			</div>
		</div>
	);
};

export default Navigation;
