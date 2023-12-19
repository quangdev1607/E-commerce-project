import clsx from "clsx";
import React, { useState } from "react";
import Select from "react-select";
const CustomSelect = ({ label, placeholder, onChange, options = [], value, className, wrapClassName }) => {
  return (
    <div className={wrapClassName}>
      {label && <h3 className="font-medium">{label}</h3>}
      <Select
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={(val) => onChange(val)}
        formatOptionLabel={(option) => {
          return (
            <div className="flex text-black items-center gap-2">
              <span>{option.label}</span>
            </div>
          );
        }}
        className={{ control: () => clsx("border-2 py-[2px]", className) }}
      />
    </div>
  );
};

export default CustomSelect;
