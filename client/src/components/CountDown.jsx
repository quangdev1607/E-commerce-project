import React from "react";
import { memo, useState } from "react";

const CountDown = ({ unit, number }) => {
	return (
		<div className="w-[30%] h-[60px] flex flex-col items-center justify-center bg-gray-100 rounded-sm">
			<span className="text-4 font-semibold">{number}</span>
			<span className=" text-[12px] font-light">{unit}</span>
		</div>
	);
};

export default memo(CountDown);
