import React from "react";
import { Sidebar, Banner } from "../../components/index";

const Home = () => {
	return (
		<div className="w-main flex">
			<div className="border w-[30%] flex flex-col flex-auto gap-5">
				<Sidebar />
				<span>Deal daily</span>
			</div>
			<div className="border w-[70%] flex flex-col flex-auto gap-5 pl-5">
				<Banner />
				<span>Best sellers</span>
			</div>
		</div>
	);
};

export default Home;
