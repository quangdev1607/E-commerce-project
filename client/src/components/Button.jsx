import React from "react";

const Button = ({ name, handleOnClick, style, iconBefore, iconAfter }) => {
	return (
		<button
			onClick={() => {
				handleOnClick && handleOnClick();
			}}
			className={style ? style : "px-4 py-2 rounded-md text-white bg-main text-semibold"}
		>
			{iconBefore}
			<span>{name}</span>
			{iconAfter}
		</button>
	);
};

export default Button;
