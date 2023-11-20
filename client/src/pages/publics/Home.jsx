import React, { memo, useState, useEffect } from "react";
import {
	Sidebar,
	Banner,
	BestSeller,
	DealDaily,
	Featured,
	Advertising,
} from "../../components/index";

const Home = () => {
	return (
		<>
			<div className="w-main flex">
				<div className=" w-[25%] flex flex-col flex-auto gap-5">
					<Sidebar />
					<DealDaily />
				</div>
				<div className=" w-[75%] flex flex-col flex-auto gap-5 pl-5">
					<Banner />
					<BestSeller />
				</div>
			</div>
			<div className="w-full h-auto ">
				<section className="w-full py-[15px] pr-[15px] border-b-2  border-main">
					<span className=" uppercase font-semibold text-[20px] ">Featured Product</span>
				</section>
				<Featured />
				<Advertising />
			</div>

			<div className="w-full h-[500px]"></div>
		</>
	);
};

export default memo(Home);
