import React from "react";
import ad1 from "../assets/pr-1.jpg";
import ad2 from "../assets/pr-2-1.jpg";
import ad3 from "../assets/pr-2-2.jpg";
import ad4 from "../assets/pr-3.jpg";
const Advertising = () => {
	return (
		<section className="w-full flex mt-5 justify-between">
			<div className="w-[49%]">
				<img src={ad1} alt="ad1" />
			</div>
			<div className="flex flex-col justify-between gap-4 w-[23%]">
				<img src={ad2} alt="ad2" />
				<img src={ad3} alt="ad3" />
			</div>
			<div className="w-[23%]">
				<img src={ad4} alt="ad4" />
			</div>
		</section>
	);
};

export default Advertising;
