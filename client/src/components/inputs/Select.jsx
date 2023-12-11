import clsx from "clsx";
import { memo } from "react";

const Select = ({ label, register, options = [], errors, id, validate, fullWidth, style, defaultValue }) => {
  return (
    <div className={clsx("flex flex-col  gap-2", style)}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        defaultValue={defaultValue}
        className={clsx("form-select", fullWidth && "w-full")}
        id={id}
        {...register(id, validate)}
      >
        <option value="">--Choose options---</option>
        {options?.map((el, idx) => (
          <option key={idx} value={el.code}>
            {el.value}
          </option>
        ))}
      </select>
      {errors[id] && <small className="text-xs text-main italic">{errors[id]?.message}</small>}
    </div>
  );
};

export default memo(Select);
