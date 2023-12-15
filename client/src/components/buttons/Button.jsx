import clsx from "clsx";
import { memo } from "react";

const Button = ({ fullWidth, disabled, name, handleOnClick, style, iconBefore, iconAfter, type = "button" }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
      className={clsx(
        style
          ? style
          : `${fullWidth && "w-full"} px-4 py-2 rounded-md text-white  bg-main text-semibold hover:opacity-70`
      )}
    >
      {iconBefore}
      <span>{name}</span>
      {iconAfter}
    </button>
  );
};

export default memo(Button);
