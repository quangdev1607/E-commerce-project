import { memo } from "react";

const Button = ({ disabled, name, handleOnClick, style, iconBefore, iconAfter, type = "button" }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
      className={style ? style : "px-4 py-2 rounded-md text-white  bg-main text-semibold hover:opacity-70"}
    >
      {iconBefore}
      <span>{name}</span>
      {iconAfter}
    </button>
  );
};

export default memo(Button);
