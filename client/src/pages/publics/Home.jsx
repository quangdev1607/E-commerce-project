import React from "react";
import { Sidebar, Banner, BestSeller } from "../../components/index";

const Home = () => {
	return (
		<>
			<div className="w-main flex">
				<div className=" w-[25%] flex flex-col flex-auto gap-5">
					<Sidebar />
					<div></div>
				</div>
				<div className=" w-[75%] flex flex-col flex-auto gap-5 pl-5">
					<Banner />
					<BestSeller />
				</div>
			</div>
			<div className="w-full h-[500px]"></div>
		</>
	);
};

export default Home;
