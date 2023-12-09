import clsx from "clsx";
import { memo } from "react";

const InputFields = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
  style,
  fullWidth,
  placeholder,
}) => {
  return (
    <div className={clsx("flex flex-col gap-1", fullWidth && "w-full")}>
      <input
        className={clsx(
          "border-b-4 border-gray w-full my-2 pb-2 focus-visible:outline-none focus:border-purple-600",
          style
        )}
        type={type || "text"}
        name={nameKey}
        placeholder={placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={(e) => setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))}
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />

      {invalidFields?.some((el) => el?.name === nameKey) && (
        <small className="text-main font-normal text-sm italic">
          {invalidFields?.find((el) => el?.name === nameKey)?.msg}
        </small>
      )}
    </div>
  );
};

export default memo(InputFields);
